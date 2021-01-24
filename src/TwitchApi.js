import {API} from './constants'

export const updateReward = ({title, cost, tickets}) =>{
    
}

export const createReward = ({title, cost, tickets}) =>{
  fetch(API.CUSTOM_REWARDS, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, cost, tickets})
  }).then( res =>  res.json()).then(json => json).catch(err => console.log(err))
}