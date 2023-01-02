import React from "react";
import Participant from "../../types/Participant";

interface ParticipantProps {
    participant: Participant
}

const Participant: React.FC<ParticipantProps> = ({participant}) => {

    if (!participant) return null;

  return <div>
    <h4>
        {participant.name}
    </h4>

    { participant.isMuted && "(Muted)" }
    { participant.isSharing && "(Sharing)" }
    { !participant.isCamOn && "(Camera off)"  }

  </div>;
};

export default Participant;
