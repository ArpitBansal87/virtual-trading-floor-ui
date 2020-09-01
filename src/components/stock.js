import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

import TextField from "@material-ui/core/TextField";
import { CardActions } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
  },
  logoName: {
    height: 80,
    width: "100%",
    objectFit: "contain",
  },
  switchDivClass: {
    display: "inline-block",
    float: "left",
  },
  qtyField: {
    maxWidth: "4.5rem",
    marginLeft: "1rem",
  },
  removeBoxShadow: {
    boxShadow: "none",
  },
});

const Stock = (props) => {
  const [openForTrade, setOpenForTrade] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isTradeTypeBuy, setIsTradeTypeBuy] = useState(true);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [qtyDisabled, setQtyDisabled] = useState(true);

  const handleTradeToggle = () => {
    if (openForTrade) {
      handleTradeConfirmation();
    }
    setOpenForTrade(!openForTrade);
    settingCorrectMaxQuantity(true);
  };

  const handleQuantityChange = (event) => {
    if (maxQuantity + 1 > event.target.value) {
      setQuantity(event.target.value);
    }
  };

  const cancelTrade = () => {
    setQuantity(0);
    setOpenForTrade(!openForTrade);
    setIsTradeTypeBuy(true);
    // setTradeType("BUY");
  };

  const handleTradeConfirmation = () => {
    const userSessionObj = JSON.parse(sessionStorage.getItem("userData"));
    const tradeValue = (Number.parseFloat(props.data.sharePrice) * Number.parseInt(quantity));
    const newFundsValue = isTradeTypeBuy ? userSessionObj.funds - tradeValue : userSessionObj.funds + tradeValue      
      
    userSessionObj.funds = newFundsValue;
    sessionStorage.setItem("userData", userSessionObj);
    const dataObj = {
      userIdentifier: sessionStorage.getItem("userId"),
      stockSymbol: props.data.symbol,
      tradeType: isTradeTypeBuy ? "BUY" : "SELL",
      quantity: quantity,
      buyPrice: props.data.sharePrice,
      totalShares: props.data.totalShares,
      funds: newFundsValue,
    };
    const formSubmitURL = process.env.REACT_APP_HTTP_API_URL + "/setPosition";
    fetch(formSubmitURL, {
      method: "POST",
      body: JSON.stringify(dataObj),
    })
      .then((response) => {
        cancelTrade();
        return response.json();
      })
      .catch((data) => {
        cancelTrade();
        console.error(data);
      });
  };

  const verifyQuantityOption = (value) => {
    settingCorrectMaxQuantity(value);
    setIsTradeTypeBuy(value);
  };

  const settingCorrectMaxQuantity = (changedValue) => {
    const sessionData = JSON.parse(sessionStorage.getItem("userData"));
    let sellQtyValue = 0;
    if (!changedValue) {
      const portfolioSessionStorage = JSON.parse(
        sessionStorage.getItem("portfolios")
      );
      if (portfolioSessionStorage.response.length !== 0) {
        let test = portfolioSessionStorage.response.find(
          (ele) => ele.stockIdentifier === props.data.symbol
        );
        sellQtyValue = test.tradeQuantity;
      }
    }
    const maxQ = changedValue
      ? Number.parseInt(
          Number.parseFloat(sessionData.funds) /
            Number.parseFloat(props.data.sharePrice)
        )
      : sellQtyValue;
    setMaxQuantity(maxQ);
    isQtyDisabled(changedValue, maxQ);
  };

  const isQtyDisabled = (value, maxQValue) => {
    const portfolioSessionStorage = JSON.parse(
      sessionStorage.getItem("portfolios")
    );
    const isQtyDisabledValue =
      value === true
        ? maxQValue === 0
          ? true
          : false
        : !portfolioSessionStorage.response.some(
            (ele) => ele.stockIdentifier === props.data.symbol
          );
    setQtyDisabled(isQtyDisabledValue);
  };

  const classes = useStyles();

  return (
    <>
      <Card
        className={`${classes.root} ${
          props.isInsideDialog ? classes.removeBoxShadow : ""
        }`}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.data.companyName}
            className={classes.logoName}
            image={props.data.logoImage}
            title={props.data.symbol}
          />
        </CardActionArea>
        <CardContent>
          <div
            className={
              openForTrade ? classes.shareInfoShift : classes.shareInfo
            }
          >
            <Typography gutterBottom variant="h5" component="h2">
              {props.data.companyName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              $ {props.data.sharePrice}
            </Typography>
          </div>
          {openForTrade ? (
            <>
              <div className={classes.switchDivClass}>
                <label>Sell</label>
                <Switch
                  checked={isTradeTypeBuy}
                  onChange={(e) => verifyQuantityOption(e.target.checked)}
                />
                <label>Buy</label>
              </div>
              <TextField
                id={props.data.symbol + "-qty"}
                label="Quantity"
                type="number"
                value={quantity}
                disabled={qtyDisabled}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleQuantityChange}
                size="small"
                className={classes.qtyField}
                InputProps={{ inputProps: { max: maxQuantity, min: 0 } }}
              />
            </>
          ) : (
            <></>
          )}
        </CardContent>
        <CardActions>
          <div>
            <Button onClick={handleTradeToggle} type="submit">
              {openForTrade ? "Confirm" : "Buy/Sell"}
            </Button>
            {openForTrade ? (
              <Button onClick={cancelTrade}>Cancel</Button>
            ) : (
              <></>
            )}
          </div>
        </CardActions>
      </Card>
    </>
  );
};

export default Stock;
