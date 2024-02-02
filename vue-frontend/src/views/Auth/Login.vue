<script setup>


import { ref } from 'vue';
import axios from "@/lib/axios.js";

const email = ref('');
const password = ref('');

const csrf = async () => axios.get('/sanctum/csrf-cookie')


console.log('Axios instance', axios.defaults.baseURL)

const handleSubmit = async () => {
  // handle form submission logic
  await csrf();

  const axiosResponse = await axios
      .post('/login', {
        email: email.value,
        password: password.value
      })
      .catch(error => {

        if (error.response.status !== 422) throw error

        console.log("ERROR FROM AUTH LOGIN", error.response.data);

      })

      // const loggedUserReponse = await axios.get('api/user')
      //     .catch(error => {
      //
      //       if (error.response.status !== 422) throw error
      //
      //       console.log("ERROR FROM AUTH LOGIN", error.response.data);
      //
      //     })

  window.location = '/'

  console.log("Login Successful", loggedUserReponse.data);
};

</script>

<template>

  <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center mb-8">{{email}}</div>
    <form class="flex flex-col space-y-2.5" @submit.prevent="handleSubmit">
      <input type="email" v-model="email" class="border-2 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
      <input type="password" v-model="password" class="border-2 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
      <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`">Submit</button>
    </form>
  </div>

</template>

<style scoped>

</style>