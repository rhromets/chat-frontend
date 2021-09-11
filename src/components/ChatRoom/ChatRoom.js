import React, {useState} from "react";
import axios from "axios";

import firebase from "firebase/compat/app";
import {useCollectionData} from "react-firebase-hooks/firestore";

import ChatMessage from "../ChatMessage/ChatMessage";

const auth = firebase.auth();
const firestore = firebase.firestore();

const ChatRoom = () => {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(25);

  const [messages] = useCollectionData(query, {idField: "id"});
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const {uid} = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });

    setFormValue("");
  };

  const getAnswerMessage = () => {
    setTimeout(() => {
      axios({
        method: "get",
        url: "https://api.chucknorris.io/jokes/random",
      })
        .then(function (response) {
          const {uid} = auth.currentUser;

          messagesRef.add({
            text: response.data.value.toString(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
          });
        })
        .catch((error) => console.log(error.message));
    }, 10000);
  };

  return (
    <div>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='Type your message'
        />

        <button type='submit' disabled={!formValue} onClick={getAnswerMessage}>
          Sent
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
