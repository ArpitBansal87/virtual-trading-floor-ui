import React from 'react';
import UserPortfolioListing from "./usersPortfolioListing";
import StockMarket from './stockMarket';

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
        </div>
    )
}

export default Dashboard;