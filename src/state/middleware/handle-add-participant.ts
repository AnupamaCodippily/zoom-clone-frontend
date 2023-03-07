import makeCallsToAllOtherParticipants from "../../lib/webrtc/make-calls-to-participants";

const handleAddParticipantMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    if (action?.type === "room/setParticipants") {
      // console.log("dispatching", action);

      if (action.payload) {
        makeCallsToAllOtherParticipants(action.payload);
      }
    }
    let result = next(action);
    return result;
  };

export default handleAddParticipantMiddleware;
