import axios from 'axios';

const api = `https://vibehouse-backend.herokuapp.com/api/posts`;

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

