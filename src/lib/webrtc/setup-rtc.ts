import servers from "../constants/ice-servers";
import { getLocalStream, setupSelfMediaVideoOnly } from "./setup-media-sources";

export function createPeerConnection(servers: any): RTCPeerConnection {
    const peerConnection = new RTCPeerConnection(servers);
    return peerConnection;
}

export async function setupRTC () {
    const peerConnection =  createPeerConnection(servers);
    setupSelfMediaVideoOnly(peerConnection);
}
