import React from "react";
import IParticipant from "../../types/Participant";

interface ParticipantProps {
    participant: IParticipant
}

const ParticipantComponent: React.FC<ParticipantProps> = ({participant}) => {

    if (!participant) return null;

  return <div className="participant-block">
    <h4>
        {participant.name}
    </h4>

    { !participant.settings?.mic && "(Muted)" }
    { participant.settings?.video && "(Sharing)" }
    { participant.settings?.video && "(Camera off)"  }

    <video className="participant-video"></video>

  </div>;
};

export default ParticipantComponent;
