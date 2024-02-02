<script setup>

import {ref} from "vue";
import axios from "@/lib/axios.js";

const message = ref('');

async function handleFormSubmit() {

  const response = await axios.post('api/chirps', {
    message: message.value
  })
      .catch(error => {

        if (error.response.status !== 422) throw error

        console.log("ERROR FROM", error.response.data);

        throw Error(error.response.data);

      })

  message.value = '';

  console.log("API Response", response)
}
</script>

<template>
  <main>
    <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <form @submit.prevent="handleFormSubmit">
        <textarea placeholder="What's on your mind?" v-model="message" rows="2" class="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"/>

        <button type="submit" class="mt-4 p-3 rounded bg-purple-700 text-white">Submit</button>
      </form>
    </div>
  </main>
</template>
