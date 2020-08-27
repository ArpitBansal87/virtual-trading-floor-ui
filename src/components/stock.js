import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  logoName: {
    height: 100,
    width: 100,
  }
});


const Stock = (props) => {
  // TODO: give the user the option to cancel the trade

  const [openForTrade, setOpenForTrade] = useState(false);
  const [quantity, setQuantity] = useState(0)
  const [tradeType, setTradeType] = useState("BUY")

  const handleTradeToggle = () => {
      if(openForTrade) {
        console.log('Place the call for trade');
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
          userIdentifier: sessionStorage.getItem('userId'),
          stockSymbol: props.data.symbol,
          tradeType: tradeType,
          quantity: quantity,
          buyPrice: props.data.sharePrice,
          totalShares: props.data.totalShares
      }
      const formSubmitURL = process.env.REACT_APP_HTTP_API_URL + '/setPosition';
        fetch(formSubmitURL, {
            method: 'POST',
            body: JSON.stringify(dataObj)
        })
        .then((response) => {
            cancelTrade();
            return response.json();
        })
        .catch(data => {
            cancelTrade();
            console.error(data);
        })
  };

  const handleTradeTypeToggle = (event) => {
      setTradeType(event.target.value);
  } 

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
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {props.data.companyName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            $ {props.data.sharePrice}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Trade
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
        <button onClick={handleTradeToggle}>{openForTrade ? 'Confirm' :'Buy/Sell'}</button>

        {openForTrade ? (
          <>
            <label>
              <input
                type="radio"
                name={props.data.symbol + "-trade"}
                value="BUY"
                onChange={handleTradeTypeToggle}
                checked={tradeType === "BUY"}
              ></input>
              Buy
            </label>
            <input type="number" name={props.data.symbol + "-qty"} value={quantity} onChange={handleQuantityChange}></input>
            <label>
              <input
                type="radio"
                name={props.data.symbol + "-trade"}
                value="SELL"
                onChange={handleTradeTypeToggle}
                checked={tradeType === "SELL"}
              ></input>
              Sell
            </label>
            <button onClick={cancelTrade}>Cancel</button>
          </>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
     </>
  );
};

export default Stock;
