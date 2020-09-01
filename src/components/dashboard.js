import React from "react";
import UserPortfolioListing from "./usersPortfolioListing";
import StockMarket from "./stockMarket";
import PortfolioListing from "./portfolioListing";
import NavBarComponenet from "./navBarComponenet";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  md: {
    [theme.breakpoints.up("md")]: {
      maxHeight: "65vh",
      overflowY: "scroll",
    },
  },
  xs: {
    [theme.breakpoints.up("md")]: {
      maxHeight: "45vh",
      overflowY: "scroll",
    },
  }
}));

const Dashboard = () => {
  const classes = useStyles();


  return (
    <div>
      <NavBarComponenet></NavBarComponenet>
      <Box pt={4}>
        <Container>
          <div className="container-content">
            <Grid container spacing={3}>
              <Grid item xs={12} md={9}>
                <Paper className={`${classes.paper} ${classes.md}`}>
                  <StockMarket></StockMarket>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper className={`${classes.paper} ${classes.md}`}>
                  <PortfolioListing></PortfolioListing>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={`${classes.paper} ${classes.xs}`}>
                  <UserPortfolioListing></UserPortfolioListing>
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div className="user-listing"></div>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
