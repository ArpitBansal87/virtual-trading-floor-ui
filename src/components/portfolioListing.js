import React, { useEffect, useState } from "react";
import PortFolioElement from "./portfolioElement";

const PortfolioListing = () => {
  const [portfolioStocks, setportfolioStocks] = useState({ response: [] });

  useEffect(() => {
    const getPortfolioDetails =
      process.env.REACT_APP_HTTP_API_URL +
      "/portfolio?userIdentifier=" +
      sessionStorage.getItem("userId");
    fetch(getPortfolioDetails, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setportfolioStocks(data);
      });
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
