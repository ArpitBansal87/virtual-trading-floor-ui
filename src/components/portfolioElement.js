import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   maxWidth: 345,
  // },
  root: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  textAlignLeft: {
    textAlign: "left",
  },
  textAlignRight: {
    textAlign: "right",
    color: "grey",
  },
}));

const PortFolioElement = (props) => {
  const classes = useStyles();
  const pLAmt = (props.data.currentPrice - props.data.avgPrice).toFixed(2);
  const pLPercentage = ((pLAmt / props.data.avgPrice).toFixed(4) * 100).toFixed(2);
  const ltp = Number.parseFloat(props.data.currentPrice).toFixed(2);
  const avgPrice = Number.parseFloat(props.data.avgPrice).toFixed(2);
  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2} direction="row">
            {/* <Grid item xs={12} sm container direction="row"> */}
            {/* <Grid item xs container direction="column" spacing={2}> */}
            <Grid item xs className={classes.textAlignLeft}>
              <Typography variant="h5">{props.data.stockIdentifier}</Typography>
              <Typography gutterBottom variant="caption">
                Qty: {props.data.tradeQuantity}
              </Typography>
            </Grid>
            <Grid item className={classes.textAlignRight}>
              <div>
                <Typography variant="caption">{avgPrice}</Typography>
              </div>
              <div>
                <Typography variant="caption">LTP: {ltp}</Typography>
              </div>
              <Typography
                variant="subtitle1"
                style={
                  pLAmt > 0
                    ? { color: "darkgreen" }
                    : pLAmt < 0
                    ? { color: "red" }
                    : {}
                }
              >
                {pLPercentage}% {pLAmt}
              </Typography>
            </Grid>
            {/* </Grid> */}
            {/* <Grid item>
                <Typography variant="subtitle1">$19.00</Typography>
              </Grid> */}
            {/* </Grid> */}
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default PortFolioElement;
