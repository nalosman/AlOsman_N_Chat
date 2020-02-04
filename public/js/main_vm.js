// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

function setUserID({sID, message}) {
  //debugger;
  vm.socketID = sID;
}

function runDisconnectMessage(packet) {
  //debugger;
  console.log(packet);
}

function appendNewMessage(msg) {
  //take the incoming message and push it into the vue Instance
  //
  vm.messages.push(msg);
}

//this is our MAIN Vue Instance
const vm = new Vue({
  data: {
    socketID: "",
    messages: [],
    message: "",
    nickName: "",
  },

  methods: {
    dispatchMessage() {
      //emit a messsage event and send the message to the server
      console.log('handle send message');
      socket.emit('chat_message', {
        content: this.message,
        name: this.nickName || "anonymous"
        // || is called a double pipe operator or an "or" operator
        // if this.nickName is set, use it as the value
        //or just make name "anonymous"
      })

      this.message ="";
    }
  },

  components: {
    newmessage: ChatMessage
  },

  mounted: function() {
    console.log('mounted');
  }
}).$mount("#app");


//some event handling -> these events are coming from the server
socket.addEventListener('connected', setUserID);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage)