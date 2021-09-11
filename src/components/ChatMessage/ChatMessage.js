import React from "react";

import firebase from "firebase/compat/app";

const auth = firebase.auth();

const ChatMessage = (props) => {
  const {text, uid} = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div>
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
