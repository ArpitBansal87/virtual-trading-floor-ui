import React, { useState, useEffect } from "react";
import { Typography, Card } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const StockGallery = () => {
  const [stocksList, setStocksList] = useState([]);

  useEffect(() => {
    const topStockURL = process.env.REACT_APP_HTTP_API_URL + "/getTopStocks";
    fetch(topStockURL, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setStocksList(data.response);
      })
      .catch((data) => {
        console.error(data);
      });
  }, []);

  return (
    <>
      <Typography>This is inside Stock Gallery</Typography>
      {stocksList.length !== 0 ? (
        stocksList.map((item, index) => (
          <Card>
            <Typography>{item.companyName}</Typography>
          </Card>
        ))
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default StockGallery;
