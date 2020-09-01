import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as constants from "./../constants/URLConstants";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import UserPortfolioCard from "./userPortfolioCard";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  searchOption: {
    position: 'absolute',
    top: 0,
    right: '1rem',
  }
}));

const UserPortfolioListing = (props) => {
  console.log(props);
  const classes = useStyles();

  const [userList, setUserList] = useState({ response: [] });
  const [searchOption, setSerachOption] = useState('')

  useEffect(() => {
    const client = new W3CWebSocket(
      process.env.REACT_APP_WS_API_URL + constants.USER_URL.USER_LIST_URL
    );
    client.onopen = () => {
      console.log("Connection Established");
    };

    client.onmessage = (message) => {
      const responseObj = JSON.parse(message.data);
      setUserList(responseObj);
    };

    client.onclose = () => {
      console.log("Connection Closed");
    };
  }, []);

  const handleUserSearch = (event) => {
    setSerachOption(event.target.value);
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <h2>List of Users</h2>
        <div className={`${classes.margin} ${classes.searchOption}`}>
          <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            placeholder="Search"
            onChange={handleUserSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap " }}>
        {userList.response.length === 0 ? (
          <h3>No User found</h3>
        ) : (
          userList.response.filter(ele => {
            return ele.firstName.toUpperCase().startsWith(searchOption.toUpperCase());
          }).map((item, index) => (
            <UserPortfolioCard data={item} key={index}></UserPortfolioCard>
          ))
        )}
      </div>
    </>
  );
};

export default UserPortfolioListing;
