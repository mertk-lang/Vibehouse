import axios from 'axios';
//let api = `https://vibehouse-backend.herokuapp.com`;



const state = {
  comments: [

  ],
  errorMessage: ''
};

const getters = {
  getComments (state) {
    return state.comments;
  }
};


const actions = {

async fetchComments({ commit }, vibe) {
  try {
    let response = await axios.get(`/posts/${vibe._id}/comments`, {
      headers: {
        authorization: `Bearer ${localStorage.token}`
      }
    })
    console.log(response)
    commit('SET_COMMENTS', response.data)
  }

  catch (err) {
    let error = err.message;
    commit('SET_ERROR', error)
  }
},

createComment({ commit, dispatch }, credentials) {
  axios.post(`posts/${credentials.vibe._id}/comments/new`, credentials, {
    headers: {
      authorization: `Bearer ${localStorage.token}`
    }
  })
  .then((credentials) => {
    console.log(credentials.vibe)
    dispatch('fetchComments', credentials.vibe)
  })
  .catch((err) => {
    let error = err.message;
    commit('SET_ERROR', error)
  })
}

};


const mutations = {
  SET_COMMENTS(state, comments) {
    state.comments = comments
  },

  SET_ERROR(state, error) {
    state.errorMessage = error
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
