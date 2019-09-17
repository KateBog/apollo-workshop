<template>
  <div id="app">
    <h1>Choose your user:</h1>
    <div v-if="$apollo.queries.users.loading">loading</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id" class="user">
        <a href="#" @click.prevent="setUser(user.id)">
          {{ user.name }}, {{ user.id }}
        </a>
      </li>
    </ul>
    <fieldset>
      <legend>Or create new one!</legend>
      <input placeholder="id" type="number" v-model="newUser.id">
      <br>
      <input placeholder="name" type="text" v-model="newUser.name">
      <br>
      <button @click="createNew">create!</button>
    </fieldset>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { AUTH_TOKEN } from './vue-apollo'

export default {
  name: 'app',
  apollo: {
    users: {
      query: gql`query {
        allUsers {
         id
         name
         }
      }`,
      update: data => data.allUsers,
      // pollInterval: 3000,
    },
  },

  data() {
    return {
      myUserId: null,
      newUser: {
        id: null,
        name: '',
      },
    }
  },

  methods: {
    setUser(id) {
      this.myUserId = id
      localStorage.setItem(AUTH_TOKEN, id)
    },
    async createNew() {
      await this.$apollo.mutate({
        mutation: gql`mutation ($id: ID!, $name: String!) {
        createUser(id: $id, name: $name) {
          id
          name
        }
      }`,
        // Parameters
        variables: {
          ...this.newUser,
        },
      })
      this.setUser(this.newUser.id)
      const resp = await this.$apollo.query({
        query: gql`query {
        allUsers {
         id
         name
         }
      }`
      })
      console.log(resp.data.allUsers)
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  ul, li {
    list-style: none;
  }
</style>
