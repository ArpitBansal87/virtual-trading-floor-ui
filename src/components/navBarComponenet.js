import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import "./../css/dashboard.css";

const NavBarComponenet = () => {
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
              <div>
                <span className="hide-element-block">
                  Hi {userData.firstName} {userData.lastName} !
                </span>
                <span className="pl-20">Logout</span>
              </div>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBarComponenet;
