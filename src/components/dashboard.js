import React from 'react';
import UserPortfolioListing from "./usersPortfolioListing";
import StockMarket from './stockMarket';
import PortfolioListing from './portfolioListing';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <div className="user-listing">
                <UserPortfolioListing></UserPortfolioListing>
            </div>
            <div className="stocks-listing">
                <StockMarket></StockMarket>
            </div>
            <div className="portfolio-listing">
                <PortfolioListing></PortfolioListing>
            </div>
        </div>
    )
}

export default Dashboard;