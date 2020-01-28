// imports always go first - if we're importing anything

const socket = io();

function setUserID(packet) {
  //debugger;
  console.log(packet);
}

function runDisconnectMessage(packet) {
  debugger;
  console.log(packet);
}


//some event handling -> these events are coming from the server
socket.addEventListener('connected', setUserID);
socket.addEventListener('user_disconnect', runDisconnectMessage);