function getUserIP(): string[] {
  //  onNewIp - your listener function for new IPs
  //compatibility for firefox and chrome
  var myPeerConnection =
    window.RTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
      iceServers: [],
    }),
    noop = function() {},
    localIPs: string[] = [],
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

  function iterateIP(ip: string) {
    console.log(ip);
    localIPs.push(ip);
  }

  //create a bogus data channel
  pc.createDataChannel('');

  // create offer and set local description
  pc.createOffer()
    .then(function(sdp) {
      sdp?.sdp?.split('\n').forEach(function(line) {
        console.log(line);
        if (line.indexOf('candidate') < 0) return;
        line.match(ipRegex)?.forEach(iterateIP);
      });
      pc.setLocalDescription(sdp);
    })
    .catch(function(reason) {
      // An error occurred, so handle the failure to connect
    });

  //listen for candidate events
  pc.onicecandidate = function(ice) {
    console.log(ice);
    if (
      !ice ||
      !ice.candidate ||
      !ice.candidate.candidate ||
      !ice.candidate.candidate.match(ipRegex)
    )
      return;
    ice.candidate.candidate.match(ipRegex)?.forEach(iterateIP);
  };
  return localIPs;
}

export default getUserIP;
