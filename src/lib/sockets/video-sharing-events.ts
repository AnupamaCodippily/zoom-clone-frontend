import { getPeer } from "../webrtc/create-peerjs-connection";
import setupSocketIOForMessages from "./setupSocketIO";

export function addNewMemberToMeetingWithVideo() {

}

export function addHostToMeetingWithVideo() {
    const peer = getPeer();

    setupSocketIOForMessages().emit('host-turned-on-camera', { hostPeerId: peer.id })
}