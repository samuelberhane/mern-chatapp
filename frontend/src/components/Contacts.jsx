import React from "react";
import styled from "styled-components";
import { imageRoute } from "../utils/apiRoutes";

const Contacts = ({ userContacts, user }) => {
  return (
    <ContactContainer>
      <div className="userContacts">
        <h3>Contacts</h3>
        {userContacts?.map((friend, index) => {
          const { username, profilePicture } = friend;
          return (
            <div className="contact" key={index}>
              <div className="contactInfo">
                <div className="contactImage">
                  <img src={`${imageRoute}/${profilePicture}`} alt="profile" />
                </div>
                <h3 className="contactName">{username} </h3>
              </div>
              <div className="editProfile">
                <button>Edit</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="currentUser">
        <img src={`${imageRoute}/${user.userData.profilePicture}`} alt="" />
        <h2>{user.userData.username}</h2>
      </div>
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  padding: 1rem;
  .currentUser {
    background-color: #cee2fd;
    color: #000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #000;
    }
  }
  .userContacts {
    height: 75vh;
    overflow-y: scroll;
    h3 {
      margin-bottom: 0.5rem;
    }
  }
  .contact {
    background-color: #6866e7;
    position: relative;
    margin-bottom: 1rem;
    border-radius: 4px;
    text-align: center;
    &:hover {
      background-color: #0c0570;
    }
    .contactInfo {
      display: flex;
      align-items: center;

      gap: 1rem;
      .contactImage {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #fff;
        }
      }
    }
    .editProfile {
      position: absolute;
      top: 0;
      right: 0;
      button {
        padding: 0.2rem 0.7rem;
        border-radius: 4px;
        border: none;
        background-color: #57ec57;
        color: #fff;
      }
    }
  }
`;

export default Contacts;
