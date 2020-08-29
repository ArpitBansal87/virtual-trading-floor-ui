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
    width: '100%',
    objectFit: 'contain',
  },
  switchDivClass: {
    display: "inline-block",
    float: 'left',
  },
  qtyField: {
    maxWidth: '4.5rem',
    marginLeft: '1rem',
  }
});

const Stock = (props) => {
  const [openForTrade, setOpenForTrade] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [tradeType, setTradeType] = useState("BUY");
  const [isTradeTypeBuy, setIsTradeTypeBuy] = useState(true);

  const handleTradeToggle = () => {
    if (openForTrade) {
      handleTradeConfirmation();
    }
    setOpenForTrade(!openForTrade);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const cancelTrade = () => {
    setQuantity(0);
    setOpenForTrade(!openForTrade);
    setTradeType("BUY");
  };

  const handleTradeConfirmation = () => {
    const dataObj = {
      userIdentifier: sessionStorage.getItem("userId"),
      stockSymbol: props.data.symbol,
      tradeType: tradeType,
      quantity: quantity,
      buyPrice: props.data.sharePrice,
      totalShares: props.data.totalShares,
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

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
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
          <div className={openForTrade ? classes.shareInfoShift : classes.shareInfo}>
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
                  onChange={(e) => setIsTradeTypeBuy(e.target.checked)}
                />
                <label>Buy</label>
              </div>
              <TextField
                id={props.data.symbol + "-qty"}
                label="Quantity"
                type="number"
                value={quantity}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleQuantityChange}
                size="small"
                required
                className={classes.qtyField}
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
