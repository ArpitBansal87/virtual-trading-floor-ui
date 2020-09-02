import React, { useEffect, useState } from "react";
import PortFolioElement from "./portfolioElement";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Typography } from "@material-ui/core";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";

const PortfolioListing = () => {
  const [portfolioStocks, setportfolioStocks] = useState({ response: [] });
  const [holdingsValue, setHoldingsValue] = useState({
    current: 0,
    invested: 0,
  });

  useEffect(() => {
    const client = new W3CWebSocket(
      process.env.REACT_APP_WS_API_URL +
        "/portfolio?userIdentifier=" +
        sessionStorage.getItem("userId")
    );
    client.onopen = () => {
      console.log("Connection Established");
    };

    client.onmessage = (message) => {
      const responseObj = JSON.parse(message.data);
      setportfolioStocks(responseObj);
      let currentValue = 0;
      let investedValue = 0;
      responseObj.response.forEach((holding) => {
        currentValue += holding.currentPrice * holding.tradeQuantity;
        investedValue += holding.avgPrice * holding.tradeQuantity;
      });
      setHoldingsValue({
        current: currentValue,
        invested: investedValue,
      });
      sessionStorage.setItem("portfolios", JSON.stringify(responseObj));
    };

    client.onclose = () => {
      console.log("Connection Closed");
    };
  }, []);
  return (
    <>
      <div>
        <h3>Holdings({portfolioStocks.response.length}): </h3>
        <div
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <Typography>
              Current: {Number.parseFloat(holdingsValue.current).toFixed(2)}
            </Typography>
            <Typography>
              Invested: {Number.parseFloat(holdingsValue.invested).toFixed(2)}
            </Typography>
          </div>
          <div>
            {holdingsValue.current > holdingsValue.invested ? (
              <TrendingUpIcon fontSize="large" style={{ color: "green" }} />
            ) : (
              <TrendingDownIcon fontSize="large" style={{ color: "red" }} />
            )}
          </div>
        </div>
        {portfolioStocks.response.length === 0 ? (
          <h4>Your portfolio is empty</h4>
        ) : (
          portfolioStocks.response.map((portfolioStock, index) => (
            <PortFolioElement
              key={"portfolio-" + index}
              data={portfolioStock}
            ></PortFolioElement>
          ))
        )}
      </div>
    </>
  );
};

export default PortfolioListing;
