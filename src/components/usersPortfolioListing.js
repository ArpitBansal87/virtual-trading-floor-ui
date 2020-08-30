import React, { useEffect, useState } from "react";
import * as constants from "./../constants/URLConstants";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const UserPortfolioListing = (props) => {
  console.log(props);

  const [userList, setUserList] = useState({ response: [] });

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

  return (
    <>
      <h2>Online Users</h2>
      <ul>
        {userList.response.length === 0 ? (
          <li>
            <h3>No User found</h3>
          </li>
        ) : (
          userList.response.map((item, index) => 
            item.isLoggedIn ? <li key={index}>{item.firstName}</li> : <></>
          )
        )}
      </ul>
    </>
  );
};

export default UserPortfolioListing;
