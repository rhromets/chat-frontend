import React, {useState} from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyC3-EvrEFUHCsenmkFDNQHaO_nigNp3Ry0",
  authDomain: "chat-frontend-1e43d.firebaseapp.com",
  projectId: "chat-frontend-1e43d",
  storageBucket: "chat-frontend-1e43d.appspot.com",
  messagingSenderId: "581438292796",
  appId: "1:581438292796:web:338d9673b16e39307a9439",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <header>
        <h1>App!!!</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
};

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
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
          placeholder='say something nice'
        />

        <button type='submit' disabled={!formValue}>
          Sent
        </button>
      </form>
    </div>
  );
}

function ChatMessage(props) {
  const {text, uid} = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
