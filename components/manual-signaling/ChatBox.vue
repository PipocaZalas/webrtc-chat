<script setup lang="ts">
import { useManualSignaling } from "@/composables/useManualSignaling"

const { attachOnChannelMessage, dataChannel } = useManualSignaling()

const chatLog = ref<string>("")
const message = ref<string>("")
const chatLogElement = ref<HTMLTextAreaElement | null>(null)

attachOnChannelMessage(async (message: MessageEvent) => {
  chatLog.value += `Remote: ${message.data}\n`
  await nextTick()
  chatLogElement.value!.scrollTop = chatLogElement.value!.scrollHeight
})

const sendMessage = async () => {
  chatLog.value += `You: ${message.value}\n`
  dataChannel.value!.send(message.value)
  message.value = ""
  await nextTick()
  chatLogElement.value!.scrollTop = chatLogElement.value!.scrollHeight
}
</script>

<template>
  <div>
    <h2 class="text-black text-lg font-bold mb-6">Simple chat</h2>
    <p class="mb-6">
      Congratulations! You have successfully connected with another peer using
      WebRTC.
    </p>

    <div>
      <label> Chat log </label>
      <textarea
        ref="chatLogElement"
        class="w-full p-2 rounded-md resize-none"
        rows="12"
        placeholder="You will see the messages here"
        :value="chatLog"
        spellcheck="false"
      />
      <form class="flex" @submit.prevent="sendMessage">
        <input
          type="text"
          class="p-2 border flex-1"
          placeholder="Write your message"
          v-model="message"
        />
        <button
          type="submit"
          class="rounded-md bg-gray-200 hover:bg-gray-300 grid place-content-center font-medium py-6 px-4"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>
