<!-- components/DogComponent1.vue -->
<template>
  <div>
    <h1>Dog Component 1</h1>
    <p>Name: {{ name }}</p>
    <button @click="eat">Eat</button>
    <button @click="bark">Bark</button>
    <input
      v-model="newName"
      placeholder="Change Name"
      class="border border-gray-500 rounded px-4 py-2 mx-4"
    />
    <button @click="changeName(newName)" class="bg-gray-800 text-white p-2">
      Change Name
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useDog } from "@/composables/useDog"

const { name, eat, bark, changeName } = useDog()
const newName = ref("")
</script>
