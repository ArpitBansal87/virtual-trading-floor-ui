import React, { useEffect, useState } from "react";
import PortFolioElement from "./portfolioElement";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const PortfolioListing = () => {
  const [portfolioStocks, setportfolioStocks] = useState({ response: [] });

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
    };

    client.onclose = () => {
      console.log("Connection Closed");
    };
  }, []);
  return (
    <div>
      <ul>
        {portfolioStocks.response.length === 0 ? (
          <li>
            <h3>No Portfolios Loaded</h3>
          </li>
        ) : (
          portfolioStocks.response.map((portfolioStock, index) => (
            <li key={index}>
              <PortFolioElement data={portfolioStock}></PortFolioElement>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PortfolioListing;
