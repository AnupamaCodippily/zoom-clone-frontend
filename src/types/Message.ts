export default interface IChatMessage {
    id: string;
    senderName: string;
    messageBody: string;
    roomId: string;
    meetingName: string;
}