import { API, COOKIE_AUTH_KEY, COOKIE_BROADCASTER_ID_KEY } from "./constants";
import { deleteCookies } from "./utils";

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

const postOptions = {
  method: "POST",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
const deleteOptions = {
  method: "DELETE",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const patchOptions = {
  method: "PATCH",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const getOptions = {
  method: "GET",
  credentials: "include",
};

export const deleteReward = (id, onDelete) => {
  fetch(API.CUSTOM_REWARDS, {
    ...deleteOptions,
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
    ...postOptions,
    body: JSON.stringify({ title, cost, tickets }),
  })
    .then(handleErrors)
    .then((json) => onSave(json, "createReward"))
    .catch((err) => console.log(err));
};

export const updateReward = (data, onSave) => {
  console.log("updateReward", data);
  fetch(API.CUSTOM_REWARDS, {
    ...patchOptions,
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then((json) => {
      onSave(json, "updateReward");
    })
    .catch((err) => console.log(err));
};

export const getAllRewards = (callback) => {
  fetch(API.CUSTOM_REWARDS, getOptions)
    .then(handleErrors)
    .then((response) => {
      callback(response.data, null);
    })
    .catch((err) => {
      callback(null, err);
    });
};
