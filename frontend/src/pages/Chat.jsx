import React, { useState } from "react";
import styled from "styled-components";
import { ChatContainer, Contacts, OnlineFriends } from "../components";
import { userRoute } from "../utils/apiRoutes";
import axios from "axios";
import { useEffect } from "react";
import { useGlobalUserContext } from "../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOption } from "../utils/toastOption";
import loader from "../loader.svg";

const Chat = () => {
  const { user } = useGlobalUserContext();
  const [allUsers, setAllUsers] = useState(null);
  const [currentChat, setCurrentChat] = useState(1);

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
          <Contacts userContacts={userContacts} user={user} />
          <ChatContainer
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            user={user}
          />
          <OnlineFriends />
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
