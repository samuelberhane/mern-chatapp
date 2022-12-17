import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChatContainer, Contacts, OnlineFriends } from "../components";
import { userRoute, host } from "../utils/apiRoutes";
import axios from "axios";
import { useGlobalUserContext } from "../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOption } from "../utils/toastOption";
import loader from "../loader.svg";
import { io } from "socket.io-client";

const Chat = () => {
  const { user } = useGlobalUserContext();
  const [allUsers, setAllUsers] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("addUser", user.userData._id);
    }
  }, [user]);

  useEffect(() => {
    socket.current?.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user, socket]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        let { data } = await axios.get(userRoute);
        if (data.status === false) toast.error(data.message, toastOption);
        setAllUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  !allUsers && <img src={loader} alt="loader" />;

  const userContacts = allUsers?.filter(
    (contact) => contact._id !== user.userData._id
  );

  return (
    <>
      <Container>
        <h1>Chat With Family And Friends!</h1>
        <div className="chats">
          <Contacts
            userContacts={userContacts}
            user={user}
            setCurrentChat={setCurrentChat}
            socket={socket}
          />
          <ChatContainer
            socket={socket}
            currentChat={currentChat}
            user={user}
            allUsers={allUsers}
          />
          <OnlineFriends
            onlineUsers={onlineUsers}
            user={user}
            allUsers={allUsers}
          />
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  padding: 1rem 2rem;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  h1 {
    height: 2rem;
    margin-bottom: 1.6rem;
    text-align: center;
  }
  .chats {
    height: calc(100% - 4rem);
    display: grid;
    grid-template-columns: 25% 52% 23%;
  }
`;

export default Chat;
