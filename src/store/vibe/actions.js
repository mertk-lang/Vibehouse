import axios from 'axios';

let api = `http://localhost:4000/posts`;

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
