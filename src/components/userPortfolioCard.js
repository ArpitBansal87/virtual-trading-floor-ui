import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    maxWidth: "100%",
    padding: 16,
    [theme.breakpoints.up("sm")]: {
      width: "48%",
      maxWidth: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
      maxWidth: "33%",
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

const UserPortfolioCard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item style={{ margin: "auto" }}>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
              invisible={!props.data.isLoggedIn}
            >
              <Avatar
                alt={props.data.firstName}
                src="/static/images/avatar/1.jpg"
              />
            </StyledBadge>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container spacing={2} style={{ textAlign: "center" }}>
              <div style={{ width: "100%" }}>
                <Typography variant="h5">
                  {props.data.firstName} {props.data.lastName}
                </Typography>
              </div>
              <div style={{ width: "100%" }}>
                <Typography variant="caption">
                  Funds: ${Number.parseFloat(props.data.funds).toFixed(2)}
                </Typography>
              </div>
              {props.data.current !== 0 ? (
                <>
                  <div style={{ width: "100%" }}>
                    <Typography variant="caption">
                      Cur. Val: ${props.data.current}
                    </Typography>
                  </div>
                  <div style={{ width: "100%" }}>
                    <Typography variant="caption">
                      Investment: ${props.data.invested}
                    </Typography>
                  </div>
                </>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item style={{ margin: "auto" }}>
              { props.data.pAndL !== 0 ?
              props.data.current > props.data.invested ? (
                <TrendingUpIcon fontSize="large" style={{ color: "green" }} />
              ) : (
                <TrendingDownIcon fontSize="large" style={{ color: "red" }} />
              ): '' }
              <Typography>{props.data.pAndL}%</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default UserPortfolioCard;
