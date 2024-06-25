<script setup lang="ts">
import { useManualSignaling } from "@/composables/useManualSignaling"

const { debug, localConnection, attachOnIceCandidate } = useManualSignaling()

enum Steps {
  CreateOffer = 1,
  AddRemoteIceCandidate = 2,
}

const localOffer = ref<string>("")
const remoteAnswer = ref<string>("")
const localIce = ref<string>("")
const remoteIce = ref<string>("")
const step = ref<Steps>(Steps.CreateOffer)

attachOnIceCandidate((candidate) => {
  localIce.value = JSON.stringify(candidate, null, 2)
})

const createOffer = async () => {
  const offer = await localConnection.value!.createOffer()
  await localConnection.value!.setLocalDescription(offer)
  localOffer.value = JSON.stringify(offer, null, 2)
}

const setRemoteDescription = async () => {
  const description = JSON.parse(remoteAnswer.value)
  await localConnection.value!.setRemoteDescription(
    new RTCSessionDescription(description)
  )
  step.value = Steps.AddRemoteIceCandidate
}

const addRemoteIceCandidate = async () => {
  const candidate = JSON.parse(remoteIce.value)
  try {
    await localConnection.value!.addIceCandidate(new RTCIceCandidate(candidate))
  } catch (e) {
    console.error("Error adding received ICE candidate", e)
  }
}

onMounted(() => {
  createOffer()
})
</script>

<template>
  <div>
    <h2 class="text-black text-lg font-bold mb-6">
      Sending a connection offer
    </h2>
    <div v-if="step === Steps.CreateOffer" class="mb-8">
      <div>
        <label> Local Offer </label>
        <textarea
          class="w-full text-xs p-2 rounded-md resize-none"
          rows="12"
          :value="localOffer"
          spellcheck="false"
        />
      </div>
      <p>
        Copy and send this to the other peer. As a result you should receive an
        answer.
      </p>
    </div>
    <div v-if="step === Steps.CreateOffer" class="mb-8">
      <div>
        <label> Remote answer </label>
        <textarea
          class="w-full text-xs p-2 rounded-md resize-none"
          rows="12"
          v-model="remoteAnswer"
          spellcheck="false"
        />
      </div>
      <p>
        Paste here the remote answer sent to you and then press on the button
      </p>
      <button
        @click="setRemoteDescription"
        class="rounded-md bg-gray-200 hover:bg-gray-300 grid place-content-center font-medium py-6 px-4"
      >
        Set Remote Description
      </button>
    </div>
    <div v-if="step === Steps.AddRemoteIceCandidate" class="mb-6">
      <div>
        <label> Local Ice Candidate </label>
        <textarea
          class="w-full text-xs p-2 rounded-md resize-none"
          rows="7"
          readonly
          :value="localIce"
          spellcheck="false"
        />
      </div>
      <p>
        Copy and send this to the other peer. As a result you should receive an
        similar ICE candidate.
      </p>
    </div>
    <div v-if="step === Steps.AddRemoteIceCandidate">
      <div>
        <label> Remote Ice Candidate </label>
        <textarea
          class="w-full text-xs p-2 rounded-md resize-none"
          rows="7"
          v-model="remoteIce"
          spellcheck="false"
        />
      </div>
      <p>
        Once you received the remote ICE candidate, paste it here and finally
        establish the connection
      </p>
      <button
        @click="addRemoteIceCandidate"
        class="rounded-md bg-gray-200 hover:bg-gray-300 grid place-content-center font-medium py-6 px-4"
      >
        Establish connection
      </button>
    </div>
  </div>
</template>
