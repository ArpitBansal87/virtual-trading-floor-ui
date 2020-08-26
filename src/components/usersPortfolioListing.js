import React, { useEffect, useState } from "react";
import * as constants from "./../constants/URLConstants";

const UserPortfolioListing = (props) => {
  console.log(props);

  const [userList, setUserList] = useState({response: []});

  useEffect(() => {
    const apiURL =
      process.env.REACT_APP_HTTP_API_URL + constants.USER_URL.USER_LIST_URL;
    fetch(apiURL, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2>This is user portfolio listing</h2>
      <ul>
          {
            userList.response.length === 0 ? 
                <li><h3>No User found</h3></li> :
                userList.response.map((item, index) => <li key={index}>{item.firstName}</li>)
          }
      </ul>
    </>
  );
};

export default UserPortfolioListing;
