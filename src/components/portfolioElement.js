import React from "react";
import { CardHeader } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
}));

const PortFolioElement = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title={props.data.stockIdentifier}></CardHeader>
      <CardContent>
        <Typography>Quantity: ${props.data.tradeQuantity}</Typography>
        <Typography>Avg Stock Price: ${props.data.avgPrice}</Typography>
        <Typography>Current Stock Price: ${props.data.currentPrice}</Typography>
      </CardContent>
    </Card>
  );
};

export default PortFolioElement;
