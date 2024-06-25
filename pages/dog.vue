<!-- App.vue -->
<template>
  <div class="max-w-lg mx-auto mt-10">
    <DogComponent1 />
    <hr class="border my-10" />
    <DogComponent2 />
  </div>
</template>

<script setup lang="ts">
import DogComponent1 from "@/components/dog/FirstDog.vue"
import DogComponent2 from "@/components/dog/SecondDog.vue"
</script>
