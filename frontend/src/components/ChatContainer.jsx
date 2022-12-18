import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatMessages from "./ChatMessages";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import axios from "axios";
import { messageRoute, imageRoute } from "../utils/apiRoutes";

const ChatContainer = ({ currentChat, user, allUsers, socket }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [allMessages, setAllMessages] = useState(null);
  const [recievedMessage, setRecievedMessage] = useState(null);
  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiPick = (emoji, e) => {
    setTextMessage(textMessage + emoji.emoji);
  };

  const handleSubmit = async () => {
    socket.current?.emit("sendMessage", {
      from: user.userData._id,
      to: currentChat,
      text: textMessage,
    });
    await axios.post(
      messageRoute,
      {
        from: user.userData._id,
        to: currentChat,
        text: textMessage,
      },
      { headers: { authorization: `Bearer ${user.token}` } }
    );
    let { data: messages } = await axios.post(
      `${messageRoute}/messages`,
      {
        from: user.userData._id,
        to: currentChat,
      },
      { headers: { authorization: `Bearer ${user.token}` } }
    );
    setAllMessages(messages);
    setTextMessage("");
  };

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      setRecievedMessage({
        sender: data.from,
        text: data.text,
        users: [data.from, data.to],
        createdAt: Date.now(),
      });
    });
  }, [allMessages, socket]);

  useEffect(() => {
    if (recievedMessage) {
      console.log("recievedMessage",recievedMessage)
      setAllMessages((prev) => [...prev, recievedMessage]);
    }
  }, [recievedMessage]);

  useEffect(() => {
    let getMessages = async () => {
      let { data } = await axios.post(
        `${messageRoute}/messages`,
        {
          from: user.userData._id,
          to: currentChat,
        },
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
      setAllMessages(data);
    };
    getMessages();
  }, [currentChat, user]);

  if (!allUsers) return;

  const currentContact = allUsers?.find((user) => user._id === currentChat);
  return (
    <Messages>
      {currentChat ? (
        <div className="chat">
          {showEmoji && (
            <div className="emojiPicker">
              <Picker onEmojiClick={handleEmojiPick} />
            </div>
          )}
          <div className="currentContact">
            <div className="contactImage">
              <img
                src={`${imageRoute}/${currentContact.profilePicture}`}
                alt="current contact"
              />
            </div>
            <h2>{currentContact.username}</h2>
          </div>
          <ChatMessages
            allMessages={allMessages}
            user={user}
            allUsers={allUsers}
            currentChat={currentChat}
          />
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
              <button onClick={handleSubmit}>
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
  height: 87vh;
  .currentContact {
    background-color: #eb68e0;
    display: flex;
    padding: 0.1rem 1rem;
    align-items: center;
    gap: 0.4rem;
    .contactImage {
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #fff;
      }
    }
  }
  .emojiPicker {
    position: fixed;
    bottom: 5.5rem;
  }
  .startChat {
    text-align: center;
  }

  .chat {
    border-radius: 0.5rem;
    background-color: red;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: grid;
    grid-template-rows: 8% 84% 8%;
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
