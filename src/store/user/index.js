import axios from 'axios';
import Joi from 'joi';
const loginApi = `http://localhost:4000/auth/login`;
const registerApi = `http://localhost:4000/auth/register`;
const api = `http://localhost:4000/`;

const schema = Joi.object({
    username: Joi.string()
      .regex(/(^[a-zA-Z0-9_]+$)/)
      .min(2)
      .max(30)
      .required(),
    password: Joi.string().min(8).required(),
  });



const state = {
  token: null,
  user: null,
  errorMessage: null,
};

const getters = {
  getError (state) {
    return state.errorMessage;
},

  getUser (state) {
    return state.user;
},

  getToken (state) {
  return state.token;
},
  getLoading(state) {
    return state.loading;
  }

};


const actions = {

  async signNewUser( { dispatch }, credentials) {
    dispatch('toggleLoading');
    let validation = schema.validate(credentials);
    let error = ""
    if (validation.error === undefined) {
     return dispatch('register', credentials)
    } else {
      error = validation.error.message
      dispatch('handleError', error)
    }
},

  async authenticateUser( { dispatch }, credentials) {
    let validation = schema.validate(credentials);
    let error = ""
    if (validation.error === undefined) {
     return dispatch('login', credentials)
    } else {
      error = validation.error.message
      dispatch('handleError', error)
    }
},

async login({ dispatch }, user) {
        try {
            let response = await axios.post(loginApi, user);
            const token = response.data.token
            localStorage.setItem('token', token)
            axios.defaults.headers.common['authorization'] = `Bearer ${token}`
            dispatch('checkToken', token)
        } catch (e) {
            let error = e.message
            dispatch('handleError', error)
        }
},

async register({ dispatch }, user) {
  try {
      let response = await axios.post(registerApi, user);
      const token = response.data.token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`
      this.$router.push('/')
      dispatch('checkToken', token)
  } catch (e) {
      let error = e.message
      dispatch('handleError', error)
  }
},


async checkToken({ commit, dispatch, state }, token) {
    if(token) {
        commit('SET_TOKEN', token)

    }

    if(!state.token) {
        return
    }

    try {
        let response = await axios.get(api);
        console.log(response);
        commit('SET_USER', response.data.user);
        commit('SET_ERROR', null);
    } catch (e) {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
    }

},

signOut({ commit }) {
    localStorage.removeItem('token');
    commit('SET_TOKEN', null);
    commit('SET_USER', null);
},


 handleError({ commit, dispatch }, error) {
    let handledError = error;
    commit('SET_ERROR', handledError)
},

 emptyError({ dispatch }) {
    let error = ''
    dispatch('handleError', error)
 }
};

const mutations = {
  SET_ERROR(state, handledError) {
    state.errorMessage = handledError
},

SET_USER(state, user) {
    state.user = user;
},

SET_TOKEN(state, token) {
    state.token = token;
},

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
