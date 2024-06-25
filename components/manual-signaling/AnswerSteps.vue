<script setup lang="ts">
import { useManualSignaling } from "@/composables/useManualSignaling"

const { debug, localConnection, attachOnIceCandidate } = useManualSignaling()

enum Steps {
  CreateAnswer = 1,
  AddRemoteIceCandidate = 2,
}

const remoteOffer = ref<string>("")
const localAnswer = ref<string>("")
const localIce = ref<string>("")
const remoteIce = ref<string>("")
const step = ref<Steps>(Steps.CreateAnswer)

attachOnIceCandidate((candidate) => {
  localIce.value = JSON.stringify(candidate, null, 2)
})

const createAnswer = async () => {
  const offer = JSON.parse(remoteOffer.value)
  await localConnection.value!.setRemoteDescription(
    new RTCSessionDescription(offer)
  )
  const answer = await localConnection.value!.createAnswer()
  await localConnection.value!.setLocalDescription(answer)
  localAnswer.value = JSON.stringify(answer, null, 2)
  // step.value = Steps.AddRemoteIceCandidate
}
const addRemoteIceCandidate = async () => {
  const candidate = JSON.parse(remoteIce.value)
  try {
    await localConnection.value!.addIceCandidate(new RTCIceCandidate(candidate))
  } catch (e) {
    console.error("Error adding received ICE candidate", e)
  }
}
</script>

<template>
  <div>
    <h2 class="text-black text-lg font-bold mb-6">
      Receiving a connection offer
    </h2>
    <div v-if="step === Steps.CreateAnswer" class="mb-8">
      <div>
        <label> Remote Offer </label>
        <textarea
          class="w-full text-xs p-2 rounded-md resize-none"
          rows="12"
          v-model="remoteOffer"
          spellcheck="false"
        />
      </div>
      <p>
        Paste here the remote offer sent to you and then press on the button
      </p>
      <button
        v-if="!localAnswer"
        @click="createAnswer"
        class="rounded-md bg-gray-200 hover:bg-gray-300 grid place-content-center font-medium py-6 px-4"
      >
        Create an answer
      </button>
    </div>
    <div v-if="step === Steps.CreateAnswer && localAnswer" class="mb-8">
      <div>
        <label> Local answer </label>
        <textarea
          class="w-full text-xs p-2 rounded-md resize-none"
          rows="12"
          readonly
          :value="localAnswer"
          spellcheck="false"
        />
      </div>
      <p>
        Copy and send this to the other peer. As a result you should receive an
        ice candidate.
      </p>
      <button
        @click="step = Steps.AddRemoteIceCandidate"
        class="rounded-md bg-gray-200 hover:bg-gray-300 grid place-content-center font-medium py-6 px-4"
      >
        Ok. I received the ice candidate
      </button>
    </div>
    <div v-if="step === Steps.AddRemoteIceCandidate">
      <div>
        <label> Remote ICE candidate </label>
        <textarea
          class="w-full text-xs p-2 rounded-md resize-none"
          rows="7"
          v-model="remoteIce"
          spellcheck="false"
        />
      </div>
      <p class="mb-6">
        Paste here the remote ICE candidate sent to you and send the local ICE
        candidate since it is required by the other peer and finally establish
        the connection.
      </p>
      <div>
        <label> Local ICE candidate </label>
        <textarea
          class="w-full text-xs p-2 rounded-md resize-none"
          rows="7"
          :value="localIce"
          readonly
          spellcheck="false"
        />
      </div>
      <button
        @click="addRemoteIceCandidate"
        class="rounded-md bg-gray-200 hover:bg-gray-300 grid place-content-center font-medium py-6 px-4"
      >
        Establish connection
      </button>
    </div>
  </div>
</template>
