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
              <Grid item xs={12} sm={8}>
                <Paper className={classes.paper}>
                  <StockMarket></StockMarket>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
                  <PortfolioListing></PortfolioListing>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
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
