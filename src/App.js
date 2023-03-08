import { Input } from "@mui/material";
import { FormControlUnstyled } from "@mui/base";
import { useEffect, useState } from "react";
import "./App.css";
import Message from "./Message";
import {
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { colRef } from "./firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    //add a document with the timestamp
    addDoc(colRef, {
      name: username,
      text: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  useEffect(() => {
    setUsername(prompt("Please enter your name: "));
  }, []);

  //Realtime listener to check for changes in the collection
  useEffect(() => {
    const q = query(colRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
      );
    });
  }, []);

  return (
    <div className="App">
      <img
        src="https://imgs.search.brave.com/m1XB9ZcypV2XJrrNAumQC_K5A3hNTlMvHq8jaqKLdrI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/c3BuZy5vcmcvZG93/bmxvYWQvZmFjZWJv/b2stbWVzc2VuZ2Vy/L2xvZ28tZmFjZWJv/b2stbWVzc2VuZ2Vy/LTQwOTYucG5n"
        height="150"
        width="150"
        alt="No"
      />
      <h1>Facebook Messenger</h1>
      <h2>Welcome {username}</h2>

      <form className="App__form">
        {/* <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={sendMessage}
        >
          Send Message
        </Button> */}

        <FormControlUnstyled className="App__formControl" required>
          <Input
            className="App__input"
            type="text"
            placeholder="Enter a message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="App__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControlUnstyled>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} name={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
