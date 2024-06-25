<script setup lang="ts">
import AnswerSteps from "@/components/manual-signaling/AnswerSteps.vue"
import OfferSteps from "@/components/manual-signaling/OfferSteps.vue"
import { useManualSignaling } from "@/composables/useManualSignaling"
import ChatBox from "./ChatBox.vue"

const { attachOnDataChannelOpen, localConnection } = useManualSignaling()

enum ConnectionType {
  Offer = "offer",
  Answer = "answer",
}

const type = ref<ConnectionType | null>(null)
const isConnected = ref<boolean>(false)

watch(localConnection, (connection) => {
  if (connection) {
    attachOnDataChannelOpen(() => {
      isConnected.value = true
    })
  }
})
</script>

<template>
  <ChatBox v-if="isConnected" />
  <template v-else>
    <OfferSteps v-if="type === ConnectionType.Offer" />
    <AnswerSteps v-else-if="type === ConnectionType.Answer" />
    <template v-else>
      <p class="mb-6">
        You can start a connection offer or receive an offer from another peer.
      </p>
      <div class="grid grid-cols-2 gap-2 mb-6">
        <button
          class="rounded-md bg-gray-200 hover:bg-gray-300 grid place-content-center font-medium py-6"
          @click="type = ConnectionType.Offer"
        >
          Start an offer
        </button>
        <button
          class="rounded-md bg-gray-200 hover:bg-gray-300 grid place-content-center font-medium py-6"
          @click="type = ConnectionType.Answer"
        >
          Receive an offer
        </button>
      </div>
    </template>
  </template>
</template>
