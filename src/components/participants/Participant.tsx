import React from "react";
import Participant from "../../types/Participant";

interface ParticipantProps {
    participant: Participant
}

const ParticipantComponent: React.FC<ParticipantProps> = ({participant}) => {

    if (!participant) return null;

  return <div>
    <h4>
        {participant.name}
    </h4>

    { !participant.settings?.mic && "(Muted)" }
    { participant.settings?.video && "(Sharing)" }
    { participant.settings?.video && "(Camera off)"  }

  </div>;
};

export default Participant;
