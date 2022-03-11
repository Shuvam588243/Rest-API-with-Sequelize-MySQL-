var request = require("request-promise");
const axios = require("axios");

AzureClientId = "ea6b8143-53a3-45f8-b332-5d6cfe5658fe";
AzureClientSecret = "TrnyzD3eZ.:4.9jzHR4fvPgM:C-pp=Gt";
AzureTenantId = "06835426-2f76-49e4-8846-9e1eaf18119e";

var tokenOptions = {
  method: "POST",
  url: `https://login.microsoftonline.com/${AzureTenantId}/oauth2/v2.0/token`,
  //'url': `https://login.microsoftonline.com/06835426-2f76-49e4-8846-9e1eaf18119e/oauth2/v2.0/token`,
  headers: {
    "Content-Type": [
      "application/x-www-form-urlencoded",
      "application/x-www-form-urlencoded",
    ],
  },
  form: {
    grant_type: "client_credentials",
    client_id: AzureClientId,
    //'client_id': 'ea6b8143-53a3-45f8-b332-5d6cfe5658fe',
    client_secret: AzureClientSecret,
    //'client_secret': 'TrnyzD3eZ.:4.9jzHR4fvPgM:C-pp=Gt',
    scope: "https://graph.microsoft.com/.default",
  },
};

const getAzureToken = async () => {
  let token = null;

  try {
    let tokenResponse = await request(tokenOptions);
    let jsonResponse = JSON.parse(tokenResponse);
    token = jsonResponse.access_token;
  } catch (error) {
    console.log(error);
  }

  return token;
};

// Get Direct Reportees options
const getDirectReporteeRequest = async (token, email) => {
  console.log(token, email);
  let options = {
    method: "GET",
    url: `https://graph.microsoft.com/v1.0/users/somil.vijay@celebaltech.com/directreports`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await axios(options);
  console.log("==========>", JSON.parse(response));
};

const getAllUsers = async (token) => {
  try {
    var config = {
      method: "get",
      url: `https://graph.microsoft.com/v1.0/users`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    let response = await axios(config);
    return response.data;
  } catch (err) {
    console.log("here");
    error(err);
  }
};

const getManager = async (token, email) => {
  try {
    var config = {
      method: "get",
      url: `https://graph.microsoft.com/v1.0/me/manager`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    let response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("here");
    console.log(error);
  }
};

module.exports.finalCall = async (foo, email) => {
  let token = await getAzureToken();
  console.log("Token", token);
  switch (foo) {
    case "report": {
      return getDirectReporteeRequest(token, email);
    }
    case "manager": {
      return getManager(token, email);
    }
  }
};

module.exports.getAllUsersAPI = async () => {
  try {
    let token = await getAzureToken();
    return getAllUsers(token);
  } catch (error) {
    console.log(error);
  }
};
