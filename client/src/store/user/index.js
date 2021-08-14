import axios from 'axios';
import Joi from 'joi';
//http://localhost:4000
const loginApi = `https://vibehouse-backend.herokuapp.com/api/auth/login`;
const registerApi = `https://vibehouse-backend.herokuapp.com/api/auth/register`;
const api = `https://vibehouse-backend.herokuapp.com/api`;

const schema = Joi.object({
    username: Joi.string()
      .regex(/(^[a-zA-Z0-9_]+$)/)
      .min(2)
      .max(30)
      .required(),
    password: Joi.string().min(8).required(),
    avatar: Joi.any().allow('avatar')
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

};


const actions = {

  async signNewUser( { dispatch }, credentials) {
    console.log(credentials)
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
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("password", user.password);
      formData.append("image", user.avatar);
      let response = await axios.post(registerApi, formData);
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
