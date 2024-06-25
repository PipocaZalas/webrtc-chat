<script setup lang="ts">
import ChatBox from "@/components/manual-signaling/ChatBox.vue"
import ManualConnectionForm from "@/components/manual-signaling/ManualConnectionForm.vue"

const isConnected = ref<boolean>(false)

const { init } = useManualSignaling()

onMounted(() => {
  init()
})
</script>

<template>
  <div class="min-h-dvh bg-gray-100">
    <div class="text-gray-800 px-6 max-w-lg mx-auto">
      <div class="flex items-center justify-center mb-6 gap-x-2 pt-6">
        <nuxt-link to="/" class="hover:bg-gray-300 px-3 py-2 rounded-md">
          <svg
            fill="#000000"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 330 330"
            xml:space="preserve"
            class="w-6 h-6"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                id="XMLID_92_"
                d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001 l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996 C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
              />
            </g>
          </svg>
        </nuxt-link>
        <h1 class="text-3xl font-black text-center">Manual signaling</h1>
      </div>
      <ChatBox v-if="isConnected" />
      <ManualConnectionForm v-else />
    </div>
  </div>
</template>
