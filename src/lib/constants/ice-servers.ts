const servers = {
  iceServers: [
    {
      urls: "stun:relay.metered.ca:80",
    },
    {
      urls: "turn:relay.metered.ca:80",
      username: process.env.REACT_APP_TURN_SERVER_USER,
      credential: process.env.REACT_APP_TURN_SERVER_CRED,
    },
    {
      urls: "turn:relay.metered.ca:443",
      username: process.env.REACT_APP_TURN_SERVER_USER,
      credential: process.env.REACT_APP_TURN_SERVER_CRED,
    },
    {
      urls: "turn:relay.metered.ca:443?transport=tcp",
      username: process.env.REACT_APP_TURN_SERVER_USER,
      credential: process.env.REACT_APP_TURN_SERVER_CRED,
    },
  ],
  iceCandidatePoolSize: 10,
};

export default servers;
