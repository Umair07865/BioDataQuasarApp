// src/store/store.js

import Vuex from 'vuex'
import axios from 'axios'
import { Notify } from 'quasar'
const store = new Vuex.Store({
  state: {
    users: [],
    loading: false,
    alerts: {
      message: '',
      color: '',
      value: false,
      total : 5,
    },
  },
  mutations: {
    addData(state, payload) {
      state.users = payload.users;
      state.total = payload.total / 10;
    },
    filterUsers(state, payload) {
      state.users = payload
    },
    deleteData(state, id) {
      state.users = state.users.users.filter((user) => user.id !== id)
    },
    loading(state, payload) {
      state.loading = payload
    },
  },
  actions: {
    async getData({ commit }, payload) {
      try {
        let url;
        if(payload && payload !== 1) 
        { 
          
          
          url =`https://dummyjson.com/users?limit=15&skip=${payload * 10}`;
        } else {
          url = "https://dummyjson.com/users?limit=15";
        }
        const response = await axios.get(url)
        const data = response.data

        commit('addData', data  )
        commit('loading', false)

        Notify.create({
          message: 'successfully fetched the data!',
          color: 'teal',
          timeout: 3000, 
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async filterUsers({ commit }, payload) {
      if(this.state.users.length  > 1)
      {
      try {
        let url;
        if(payload !== '')
        { 
          url = `https://dummyjson.com/users/search?q=${payload}` ;
        } else {
          url = 'https://dummyjson.com/users'
        }

        const response = await axios.get(url)
        const data = response.data

        commit('filterUsers', data.users)
        commit('loading', false)

        Notify.create({
          message: 'successfully fetched the data!',
          color: 'teal',
          timeout: 3000, 
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    } else {
      Notify.create({
        message: 'No Data Found!',
        color: 'red',
        timeout: 3000,
      })
    }
    },

    async delData({ commit }, payload) {
      try {
        const response = await axios.delete(`https://dummyjson.com/users/${payload}`)
        const data = response.data

        Notify.create({
          message: 'Deleted Succesfully!',
          color: 'red',
          timeout: 3000, 
        })

        commit('deleteData', data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
  getters: {
    getterData: (state) => state.users,
    alertNow: (state) => state.alerts,
    loading: (state) => state.loading,
    total: (state) => state.total,
  },
})

export default store
