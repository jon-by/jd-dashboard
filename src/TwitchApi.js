import {
  API,
  COOKIE_AUTH_KEY,
  COOKIE_BROADCASTER_ID_KEY,
  BASE_URL,
} from "./constants";
import { deleteCookies } from "./utils";
export const twitch = window.Twitch.ext;
const routes = {
  song: BASE_URL + "/song",
  list: BASE_URL + "/list",
  broadcaster: BASE_URL + "/broadcaster",
  reward: BASE_URL + "/reward",
};

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

let token;

export const authInit = (callback) => {
  twitch.onAuthorized((auth) => {
    console.log(auth);
    token = auth.token;
    typeof callback === "function" && callback(auth);
  });
};

const getHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
};

export const updateRewardsCost = ({ bannedCost, extremeCost }) => {
  return fetch(routes.reward, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ bannedCost, extremeCost }),
  });
};
export const deleteReward = (id, onDelete) => {
  fetch(API.CUSTOM_REWARDS, {
    method: "DELETE",
    headers: getHeaders(),
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
    headers: getHeaders(),
    body: JSON.stringify({ title, cost, tickets }),
  })
    .then(handleErrors)
    .then((json) => onSave(json, "createReward"))
    .catch((err) => console.log(err));
};

export const updateReward = (data, onSave) => {
  console.log("updateReward", data);
  fetch(API.CUSTOM_REWARDS, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then((json) => {
      onSave(json, "updateReward");
    })
    .catch((err) => console.log(err));
};

export const getAllRewards = (callback) => {
  fetch(API.CUSTOM_REWARDS, { method: "GET", headers: getHeaders() })
    .then(handleErrors)
    .then((response) => {
      callback(response.data, null);
    })
    .catch((err) => {
      callback(null, err);
    });
};

export const createList = (broadcasterId) => {
  fetch(routes.list, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ broadcasterId }),
  });
};
export const changeListStatus = (status) => {
  return fetch(routes.list, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
};
export const deleteList = () => {
  return fetch(routes.list, {
    method: "DELETE",
    headers: getHeaders(),
  });
};

export const addSongToList = (song) => {
  const headers = getHeaders();
  console.log("add song: ", song, headers);
  return fetch(routes.song, {
    method: "POST",
    headers,
    body: JSON.stringify({ song }),
  });
};

export const removeSongFromList = (songId) => {
  return fetch(`${routes.song}`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ songId }),
  });
};

export const changeSongStatus = (songId, danced) => {
  return fetch(`${routes.song}/${songId}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ danced }),
  });
};

export const getBroadcaster = () => {
  return fetch(routes.broadcaster, {
    method: "GET",
    headers: getHeaders(),
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
