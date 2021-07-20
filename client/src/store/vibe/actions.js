import axios from 'axios';

const api = `https://lit-citadel-51863.herokuapp.com/posts`;

export function fetchVibes ({ commit }) {
  axios.get(api, {
    headers: {
      authorization:  `Bearer ${localStorage.token}`
    }
  })
  .then((res) => {
    commit('SET_VIBES', res.data)
  })
}

