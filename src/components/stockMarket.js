import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Stock from "./stock";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
  },
  logoName: {
    height: 100,
    width: 100,
  },
  ulValue: {
    display: "flex",
    flexWrap: "wrap",
    padding: 0,
    margin: 0,
    width: '100%',
  },
  liValue: {
    maxHeight: 400,
    minWidth: 245,
    margin: "1rem",
  },
  isActive: {
    fontSize: 48,
    color: "blue",
  },
});

const StockMarket = () => {
  const classes = useStyles();

  const [stocksList, setStocksList] = useState({ response: [] });
  const [gridView, setGridView] = useState(true);

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
    <>
      <div>
        <div style={{ float: "right" }}>
          <ViewModuleIcon
            fontSize="large"
            style={{ cursor: "pointer" }}
            className={gridView ? classes.isActive : classes.isInactive}
            onClick={() => setGridView(true)}
          />
          <ViewStreamIcon
            fontSize="large"
            style={{ cursor: "pointer" }}
            className={gridView ? classes.isInactive : classes.isActive}
            onClick={() => setGridView(false)}
          />
        </div>
        <h3>Stocks</h3>
      </div>

      {gridView ? (
          <div className={classes.ulValue}>
            {stocksList.response.length === 0 ? (
              <div>
                <h3>No Stocks Loaded</h3>
              </div>
            ) : (
              stocksList.response.map((stock, index) => (
                <div key={index} className={classes.liValue}>
                  <Stock data={stock} />
                </div>
              ))
            )}
          </div>
      ) : (
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            columns={[
              {
                title: "Logo",
                field: "logoImage",
                render: (data) => (
                  <img
                    alt="data.companyName"
                    src={data.logoImage}
                    style={{ width: 50, height: 50 }}
                  ></img>
                ),
              },
              { title: "Company Name", field: "companyName" },
              { title: "Share Price", field: "sharePrice" },
              {
                title: "Trade Options",
                field: "tradeOption",
                render: (data) => (
                  <>
                    <Button size="small" color="primary">
                      Trade
                    </Button>
                  </>
                ),
              },
            ]}
            data={stocksList.response}
            title="Stocks"
          />
        </div>
      )}
    </>
  );
};

export default StockMarket;
