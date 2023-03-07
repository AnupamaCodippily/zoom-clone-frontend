export default interface IParticipant {
    name?: string;
    meetingId: string;
    settings?: {
      video: boolean;
      mic: boolean;
      allowedVideo: boolean;
    };
    peerId: string;
}