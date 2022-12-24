var firebaseConfig = {
  apiKey: "AIzaSyCc157iG5CAkhZPk_Sb3XPh7KsHYKM1igo",
  authDomain: "webchat-24cda.firebaseapp.com",
  projectId: "webchat-24cda",
  storageBucket: "webchat-24cda.appspot.com",
  messagingSenderId: "959282709270",
  appId: "1:959282709270:web:1f17699089745acf988637"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const username = prompt("Username:");

function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span><strong>${messages.username}</strong><br> </span><small>${messages.message}</small></li><br>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
