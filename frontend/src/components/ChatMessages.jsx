import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ChatMessages = ({ allMessages, user, allUsers, currentChat }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);
  return (
    <Messages>
      <div className="textMessages">
        {allMessages?.map((message, index) => {
          const { sender, text, createdAt } = message;
          return (
            <div className="messageContainer" key={index} ref={scrollRef}>
              <div
                className={`${
                  sender === user.userData._id
                    ? "messageContent user"
                    : "messageContent"
                }`}
              >
                <p>{text}</p>
              </div>
              <div
                className={`${
                  sender === user.userData._id
                    ? "messageTime user"
                    : "messageTime"
                }`}
              >
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </div>
            </div>
          );
        })}
      </div>
    </Messages>
  );
};

const Messages = styled.div`
  overflow-y: scroll;
  height: 100%;
  .textMessages {
    overflow-y: scroll;
  }

  .messageContainer {
    padding: 0.2rem 0.3rem;
    margin-bottom: 0.3rem;
  }
  .messageContent {
    display: flex;
    align-items: center;
    gap: 3px;
    .senderImage {
      width: 35px;
      height: 35px;
      align-self: flex-start;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    p {
      max-width: 400px;
      background-color: #360227;
      border-radius: 10px;
      padding: 0.3rem 0.5rem;
    }
  }
  .messageTime {
    color: #000;
    font-size: 0.8rem;
    padding: 0 0.5rem;
    display: flex;
  }
  .messageContent.user {
    flex-direction: row-reverse;
    p {
      background-color: blue;
    }
  }
  .messageTime.user {
    justify-content: flex-end;
  }
`;

export default ChatMessages;
