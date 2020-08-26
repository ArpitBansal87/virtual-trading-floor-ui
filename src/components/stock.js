import React, { useState } from "react";

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
    setTradeType(1);
  };

  const handleTradeConfirmation = () => {
      const dataObj = {
          userIdentifier: sessionStorage.getItem('userId'),
          stockSymbol: props.data.symbol,
          tradeType: tradeType,
          quantity: quantity
      }
      const formSubmitURL = process.env.REACT_APP_HTTP_API_URL + '/setPosition';
        fetch(formSubmitURL, {
            method: 'POST',
            body: JSON.stringify(dataObj)
        })
        .then((response) => {
            return response.json();
        })
        .catch(data => {
            console.error(data);
        })
  };

  const handleTradeTypeToggle = (event) => {
      setTradeType(event.target.value);
  } 

  return (
    <>
      <div>
        <span>{props.data.companyName}</span>
        <span>{props.data.sharePrice}</span>
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
      </div>
    </>
  );
};

export default Stock;
