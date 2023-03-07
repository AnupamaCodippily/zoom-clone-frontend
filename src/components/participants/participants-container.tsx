import React from 'react'
import { useSelector } from 'react-redux';
import { peerId } from '../../lib/webrtc/create-peerjs-connection';
import { RootState } from '../../state/store';
import IParticipant from '../../types/Participant';
import ParticipantComponent from './Participant';

const ParticipantsContainer: React.FC = () => {

    const participants : IParticipant[] = useSelector((state:RootState) => state.room.participants)
    const peer:string = peerId;
  return (
    <div className='participants-list-container'>
        {
            participants?.map((p,k )=> p.peerId !== peer && <ParticipantComponent participant={p} key={k} />)
        }
    </div>
  )
}

export default ParticipantsContainer