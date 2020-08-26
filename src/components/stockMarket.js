import React, {useEffect, useState} from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Stock from "./stock";

const StockMarket = () => {

  const [stocksList, setStocksList] = useState({response: []});
  useEffect(() => {
    const client = new W3CWebSocket(process.env.REACT_APP_WS_API_URL + '/stocks');
    client.onopen = () => {
        console.log('Connection Established');
    }
  
    client.onmessage = (message) => {
        const responseObj = JSON.parse(message.data)
        setStocksList(responseObj);
    }
  }, []);
    return (
        <div>
            <h2>Value for stock Market</h2>
            <ul>
                {stocksList.response.length === 0 ? <li><h3>No Stocks Loaded</h3></li> :
                stocksList.response.map((stock, index) => <li key={index}><Stock data={stock}/></li>) }
            </ul>
        </div>
    );
}

export default StockMarket;