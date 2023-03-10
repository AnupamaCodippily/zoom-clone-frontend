import React, { useEffect, useRef } from "react";
import { getCallsList } from "../../lib/sockets/socketListeners";
import IParticipant from "../../types/Participant";

interface ParticipantProps {
  participant: IParticipant;
}

const ParticipantComponent: React.FC<ParticipantProps> = ({ participant }) => {
  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const callsList = getCallsList();
  useEffect(() => {
    for (const call of getCallsList()) {
      if (call.peer === participant.peerId && mediaRef.current) {
        mediaRef.current.srcObject = call.remoteStream;
      }
    }
  }, [callsList, participant.peerId]);

  if (!participant) return null;

  return (
    <div className="participant-block">
      <h4>{participant.name}</h4>

      {!participant.settings?.mic && "(Muted)"}
      {participant.settings?.video && "(Sharing)"}
      {participant.settings?.video && "(Camera off)"}

      <video ref={mediaRef} className="participant-video"></video>
    </div>
  );
};

export default ParticipantComponent;
