import React, { useState } from "react";
import styled from "styled-components";
import ChatMessages from "./ChatMessages";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";

const ChatContainer = ({ currentChat, setCurrentChat, user }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiPick = (emoji, e) => {
    setTextMessage(textMessage + emoji.emoji);
  };
  return (
    <Messages>
      {currentChat ? (
        <div className="chat">
          {showEmoji && (
            <div className="emojiPicker">
              <Picker onEmojiClick={handleEmojiPick} />
            </div>
          )}
          <ChatMessages />
          <div className="sendMessage">
            <button className="emoji" onClick={handleEmoji}>
              <BsEmojiSmileFill />
            </button>
            <div className="textMessage">
              <input
                type="text"
                placeholder="Write Your Message"
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
              />
              <button>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="startChat">
          <h1>Welcome, {user.userData.username}</h1>
          <p>Select Contact To Start Chat!</p>
        </div>
      )}
    </Messages>
  );
};

const Messages = styled.div`
  padding: 1rem;

  .emojiPicker {
    position: fixed;
    bottom: 5.5rem;
    .emoji-picker-react {
      background-color: #7826c5;
    }
  }
  .startChat {
    text-align: center;
  }

  .chat {
    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: grid;
    grid-template-rows: 92% 8%;

    .sendMessage {
      background-color: #1b0430;
      border-radius: 0.3rem;
      display: flex;
      align-items: center;

      .emoji {
        flex: 1;
        background-color: transparent;
        border: none;
        color: yellow;
        font-size: 1.2rem;
      }
      .textMessage {
        flex: 9.5;
        background-color: #fff;
        display: flex;
        align-items: center;
        margin-right: 1rem;
        border-radius: 1rem;
        height: 70%;
        input {
          padding: 0 1.4rem;
          background-color: transparent;
          border: none;
          outline: none;
          font-size: 1rem;
          height: 100%;
          flex: 9;
        }
        button {
          flex: 1;
          border: none;
          margin: 0 0.3rem;
          background-color: transparent;
          height: 100%;
          border-radius: 1rem;
          i {
            font-size: 1.5rem;
            color: #08226b;
          }
        }
      }
    }
  }
`;

export default ChatContainer;
