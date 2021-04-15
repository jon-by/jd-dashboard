import {
  API,
  COOKIE_AUTH_KEY,
  COOKIE_BROADCASTER_ID_KEY,
  BASE_URL,
} from "./constants";
import { deleteCookies } from "./utils";
export const twitch = window.Twitch.ext;

async function handleErrors(response) {
  if (!response.ok) {
    let error = await response.json();
    if (error.status === 401) {
      deleteCookies([COOKIE_BROADCASTER_ID_KEY, COOKIE_AUTH_KEY]);
      window.location.href = "/login";
    }
    throw Error(error.message);
  }
  return response.json();
}

const getHeaders = (token) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
});

export const deleteReward = (id, onDelete) => {
  fetch(API.CUSTOM_REWARDS, {
    method: "DELETE",
    headers: getHeaders(userToken),
    body: JSON.stringify({ id }),
  })
    .then(handleErrors)
    .then((json) => {
      onDelete(json);
    })
    .catch((err) => console.log(err));
};
export const createReward = ({ title, cost, tickets }, onSave) => {
  fetch(API.CUSTOM_REWARDS, {
    method: "POST",
    headers: getHeaders(userToken),
    body: JSON.stringify({ title, cost, tickets }),
  })
    .then(handleErrors)
    .then((json) => onSave(json, "createReward"))
    .catch((err) => console.log(err));
};

export const setExtremeCost = (
  { broadcasterId, cost },
  setCostSuccess,
  setCostError
) => {
  fetch(BASE_URL + "/extremecost", {
    method: "PUT",
    headers: getHeaders(userToken),
    body: JSON.stringify({ broadcasterId, cost }),
  })
    .then((response) => response.json())
    .then((cost) => {
      setCostSuccess(true);
      console.log(cost);
    })
    .catch((err) => {
      setCostError(true);
      console.log(err);
    });
};

export const getExtremeCost = ({ broadcasterId }) => {
  return fetch(BASE_URL + `/extremecost?id=${broadcasterId}`, {
    method: "GET",
    headers: getHeaders(userToken),
  });
};

export const updateReward = (data, onSave) => {
  console.log("updateReward", data);
  fetch(API.CUSTOM_REWARDS, {
    method: "PATCH",
    headers: getHeaders(userToken),
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then((json) => {
      onSave(json, "updateReward");
    })
    .catch((err) => console.log(err));
};

export const getAllRewards = (callback) => {
  fetch(API.CUSTOM_REWARDS, { method: "GET", headers: getHeaders(userToken) })
    .then(handleErrors)
    .then((response) => {
      callback(response.data, null);
    })
    .catch((err) => {
      callback(null, err);
    });
};

export const createList = (broadcasterId) => {
  fetch(BASE_URL + "/createlist", {
    method: "POST",
    headers: getHeaders(userToken),
    body: JSON.stringify({ broadcasterId }),
  });
};

export const addSongToList = (userToken, song) => {
  console.log("add song: ", userToken, song);
  return fetch(BASE_URL + "/addsong", {
    method: "POST",
    headers: getHeaders(userToken),
    body: JSON.stringify({ song }),
  });
};

export const removeSongFromList = (userToken, songId) => {
  return fetch(BASE_URL + "/songlist", {
    method: "DELETE",
    headers: getHeaders(userToken),
    body: JSON.stringify({ userToken, songId }),
  });
};

export const changeSongStatus = (userToken, songId, danced) => {
  return fetch(BASE_URL + `/songlist/${songId}`, {
    method: "PATCH",
    headers: getHeaders(userToken),
    body: JSON.stringify({ userToken, danced }),
  });
};

export const changeListStatus = (userToken, status) => {
  return fetch(BASE_URL + `/songlist`, {
    method: "PATCH",
    headers: getHeaders(userToken),
    body: JSON.stringify({ userToken, status }),
  });
};

export const setConfig = ({
  userToken,
  extremeCost,
  bannedCost,
  bannedList,
}) => {
  return fetch(BASE_URL + "/setconfig", {
    method: "PUT",
    headers: getHeaders(userToken),
    body: JSON.stringify({ userToken, extremeCost, bannedCost, bannedList }),
  });
};

export const getTwitchConfig = (callback) => {
  twitch.configuration.onChanged(() => {
    let config = twitch.configuration.broadcaster
      ? twitch.configuration.broadcaster.content
      : [];
    try {
      config = JSON.parse(config);
    } catch (e) {
      config = [];
    }
    typeof callback === "function" && callback(config);
  });
};

export const setTwitchConfig = (data, callBack) => {
  twitch.configuration.set("broadcaster", "0.0.1", JSON.stringify(data));
  typeof callBack === "function" && callBack();
};
