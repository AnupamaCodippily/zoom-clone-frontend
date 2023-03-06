export default interface Participant {
    name?: string;
    meetingId: string;
    settings?: {
      video: boolean;
      mic: boolean;
      allowedVideo: boolean;
    };
    peerId: string;
}