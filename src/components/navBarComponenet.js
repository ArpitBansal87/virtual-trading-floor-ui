import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import "./../css/dashboard.css";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  flexBox: {
    display: 'flex'
  },
  textAlignCenter: {
    margin: 'auto'
  },
}));

const NavBarComponenet = () => {

  const classes = useStyles();
  const history = useHistory();
  const handleLogout = (event) => {
    console.log(event.target)
    const formSubmitURL = process.env.REACT_APP_HTTP_API_URL + "/logout";
    fetch(formSubmitURL, {
      method: "POST",
      body: JSON.stringify({
        id: sessionStorage.getItem("userId"),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.wasLogoutSuccessfull) {
          sessionStorage.removeItem("userId");
          sessionStorage.removeItem("userData");
          history.push("/");
        }
      });
  }

  const userData = JSON.parse(sessionStorage.userData);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <div className="navBar-container">
              <img
                alt="VTF Logo"
                width="250px"
                height="50px"
                className="hide-element-block"
                src="https://firebasestorage.googleapis.com/v0/b/backup-vtf.appspot.com/o/3611502124_9e607890-cf40-4384-97b7-fee6fca361b3.png?alt=media&token=91b5600c-2c9f-4635-af4b-8dba7761b878"
              />
              <div className={classes.flexBox}>
                <span className={`${classes.textAlignCenter} hide-element-block`}>
                  Hi {userData.firstName} {userData.lastName} !
                </span>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<Icon>power_settings_new</Icon>}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBarComponenet;
