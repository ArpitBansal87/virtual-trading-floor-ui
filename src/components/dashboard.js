import React from "react";
import UserPortfolioListing from "./usersPortfolioListing";
import StockMarket from "./stockMarket";
import PortfolioListing from "./portfolioListing";
import NavBarComponenet from "./navBarComponenet";

const Dashboard = () => {
  return (
    <div>
      <NavBarComponenet></NavBarComponenet>
      <div className="container-content">
        <div className="flexBox">
          <div className="stocks-listing">
            <StockMarket></StockMarket>
          </div>
          <div className="portfolio-listing">
            <PortfolioListing></PortfolioListing>
          </div>
        </div>
        <div className="user-listing">
          <UserPortfolioListing></UserPortfolioListing>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
