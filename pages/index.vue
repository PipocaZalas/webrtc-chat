<script setup lang="ts"></script>

<template>
  <div class="min-h-dvh bg-gray-100 grid place-content-center">
    <div class="text-gray-800 px-6 max-w-lg">
      <h1 class="text-3xl font-black text-center mb-6">
        WebRTC client implementation
      </h1>
      <p>
        WebRTC is a technology that enables real-time communication directly
        between browsers, allowing audio, video, and data sharing.
      </p>
      <p class="mb-6">
        This example implements a simple chat application using it.
      </p>
      <div class="grid grid-cols-2 gap-2">
        <nuxt-link
          class="rounded-md bg-gray-200 hover:bg-gray-300 grid place-content-center font-medium py-6"
          to="/manual-signaling"
        >
          Using manual signaling
        </nuxt-link>
        <nuxt-link
          class="rounded-md bg-gray-200 hover:bg-gray-300 grid place-content-center font-medium py-6"
          to="/server-signaling"
        >
          Using a signaling server
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style></style>
