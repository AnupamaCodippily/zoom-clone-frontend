const servers = {
  iceServers: [
    {
      urls: "stun:relay.metered.ca:80",
    },
    {
      urls: "turn:relay.metered.ca:80",
      username: "8e360a028e42554dd5f74d4c",
      credential: "R7ZU/iChDH4jPqHc",
    },
    {
      urls: "turn:relay.metered.ca:443",
      username: "8e360a028e42554dd5f74d4c",
      credential: "R7ZU/iChDH4jPqHc",
    },
    {
      urls: "turn:relay.metered.ca:443?transport=tcp",
      username: "8e360a028e42554dd5f74d4c",
      credential: "R7ZU/iChDH4jPqHc",
    },
  ],
  iceCandidatePoolSize: 10,
};


export default servers;