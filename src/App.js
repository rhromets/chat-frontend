import React from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import {useAuthState} from "react-firebase-hooks/auth";

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
  return <button onClick={() => {}}> Sign In</button>;
}
function SignOut() {
  return <button onClick={() => {}}> Sign Out</button>;
}
function ChatRoom() {
  return <form></form>;
}

export default App;
