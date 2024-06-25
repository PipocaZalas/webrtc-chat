export const useManualSignaling = () => {
  const localConnection = useState<RTCPeerConnection | null>(
    "localConnection",
    () => null
  )
  const dataChannel = useState<RTCDataChannel | null>("dataChannel", () => null)
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  }

  const init = () => {
    console.log("initiating connection and channel...")
    localConnection.value = new RTCPeerConnection(configuration)
    dataChannel.value = localConnection.value.createDataChannel("chat")

    const handleChannelStatusChange = () => {
      if (dataChannel.value) {
        const state = dataChannel.value.readyState
        console.log(`Data channel state is: ${state}`)
      }
    }
    localConnection.value.onicecandidate = ({ candidate }) => {}
    localConnection.value.ondatachannel = (event) => {
      const receiveChannel = event.channel
      receiveChannel.onmessage = () => {}
      receiveChannel.onopen = handleChannelStatusChange
      receiveChannel.onclose = handleChannelStatusChange
    }

    dataChannel.value.onopen = handleChannelStatusChange
    dataChannel.value.onclose = handleChannelStatusChange
  }

  const attachOnIceCandidate = (
    onicecandidate: (candidate: RTCIceCandidate | null) => void
  ) => {
    localConnection.value!.onicecandidate = ({ candidate }) => {
      if (candidate) {
        onicecandidate(candidate)
      }
    }
  }
  const attachOnMessageReceived = (
    onMessageReceived: (event: MessageEvent) => void
  ) => {
    dataChannel.value!.onmessage = (event) => {
      onMessageReceived(event)
    }
  }
  const attachOnDataChannelOpen = (onDataChannelOpen: () => void) => {
    dataChannel.value!.onopen = () => {
      onDataChannelOpen()
    }
  }
  const attachOnChannelMessage = (
    onChannelMessage: (event: MessageEvent) => void
  ) => {
    localConnection.value!.ondatachannel = (event) => {
      event.channel.onmessage = onChannelMessage
    }
  }

  const debug = (): void => {
    console.log(
      `localConnection is ${localConnection.value} and dataChannel is ${dataChannel.value}`
    )
  }

  return {
    localConnection,
    dataChannel,
    init,
    debug,
    attachOnIceCandidate,
    attachOnMessageReceived,
    attachOnDataChannelOpen,
    attachOnChannelMessage,
  }
}
