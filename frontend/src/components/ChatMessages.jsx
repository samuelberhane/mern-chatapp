import React from "react";
import styled from "styled-components";
import { imageRoute } from "../utils/apiRoutes";

const ChatMessages = () => {
  return (
    <Messages>
      <div className="currentContact">
        <div className="contactImage">
          <img src={`${imageRoute}/defaultUser.png`} alt="current contact" />
        </div>
        <h2>aaron</h2>
      </div>
      <div className="messageContainer">
        <div className="messageContent">
          <div className="senderImage">
            <img src={`${imageRoute}/defaultUser.png`} alt="" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            laborum ut id eum. Illum, debitis!
          </p>
        </div>
        <div className="messageTime">2 days ago</div>
      </div>
      <div className="messageContainer">
        <div className="messageContent user">
          <div className="senderImage">
            <img src={`${imageRoute}/defaultUser.png`} alt="" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            laborum ut id eum. Illum, debitis!
          </p>
        </div>
        <div className="messageTime user">
          <p>2 days ago</p>{" "}
        </div>
      </div>
    </Messages>
  );
};

const Messages = styled.div`
  overflow-y: scroll;

  .currentContact {
    background-color: #eb68e0;
    display: flex;
    padding: 0.3rem 1rem;
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
  .messageContainer {
    padding: 0.5rem;
    margin-bottom: 0.1rem;
  }
  .messageContent {
    display: flex;
    align-items: center;
    gap: 6px;
    .senderImage {
      width: 40px;
      height: 40px;
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
    font-size: 0.9rem;
    padding: 0.1rem 3.5rem;
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
