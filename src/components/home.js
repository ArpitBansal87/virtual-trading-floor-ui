import React, { useState } from "react";
import PropTypes from "prop-types";
import SignIn from "./signIn";
import SignUp from "./signUp";
import "./home.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import StockGallery from "./stockGallery";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const Home = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="home-page-block">
      <div className="home-page-inner-block">
        <header>
          <img
            alt="VTF Logo"
            width="250px"
            height="70px"
            src="https://firebasestorage.googleapis.com/v0/b/backup-vtf.appspot.com/o/3611502124_9e607890-cf40-4384-97b7-fee6fca361b3.png?alt=media&token=91b5600c-2c9f-4635-af4b-8dba7761b878"
          />
        </header>
        <Box pt={10}>
          <Container maxWidth="lg">
            <Grid container justify="center">
              {/* <Grid item>
                <StockGallery></StockGallery>
              </Grid> */}
              <Grid item >
                <Paper>
                  <AppBar position="static">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="sign-in or signup option"
                    >
                      <Tab label="Sign In" {...a11yProps(0)} />
                      <Tab label="Sign Up" {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <SignIn></SignIn>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <SignUp></SignUp>
                  </TabPanel>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
      <blockquote>
        <p>
          Photo by{" "}
          <a href="https://unsplash.com/@nick604?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Nick Chong
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/stock-market?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </a>
        </p>
      </blockquote>
    </div>
  );
};

export default Home;
