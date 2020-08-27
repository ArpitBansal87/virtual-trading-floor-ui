import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Stock from "./stock";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
  },
  logoName: {
    height: 100,
    width: 100,
  },
  ulValue: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  liValue: {
      maxHeight: 400,
      maxWidth: 400
  },
});

const StockMarket = () => {
  const classes = useStyles();

  const [stocksList, setStocksList] = useState({ response: [] });
  useEffect(() => {
    const client = new W3CWebSocket(
      process.env.REACT_APP_WS_API_URL + "/stocks"
    );
    client.onopen = () => {
      console.log("Connection Established");
    };

    client.onmessage = (message) => {
      const responseObj = JSON.parse(message.data);
      setStocksList(responseObj);
    };
  }, []);
  return (
    <div>
      <ul className={classes.ulValue}>
        {stocksList.response.length === 0 ? (
          <li>
            <h3>No Stocks Loaded</h3>
          </li>
        ) : (
          stocksList.response.map((stock, index) => (
            <li key={index} className={classes.liValue}>
              <Stock data={stock} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StockMarket;
