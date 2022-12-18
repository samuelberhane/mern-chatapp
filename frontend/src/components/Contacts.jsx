import React, { useState } from "react";
import styled from "styled-components";
import { imageRoute, userRoute, uploadRoute } from "../utils/apiRoutes";
import { useGlobalUserContext } from "../context/userContext";
import axios from "axios";

const Contacts = ({ userContacts, user, setCurrentChat, socket }) => {
  const { dispatch } = useGlobalUserContext();
  const [imageFile, setImageFile] = useState("");

  const handleLogout = () => {
    socket.current?.emit("logout", user.userData._id);
    localStorage.removeItem("chatAppUser");
    dispatch({ type: "LOGOUT" });
  };

  const handleUpdate = async () => {
    if (imageFile) {
      const data = new FormData();
      const fileName = Date.now() + imageFile.name;
      data.append("name", fileName);
      data.append("file", imageFile);
      await axios.post(uploadRoute, data);
      let { data: updatedUser } = await axios.put(
        `${userRoute}/${user.userData._id}`,
        {
          profilePicture: fileName,
        }
      );
      dispatch({ type: "UPDATE_PROFILE", payload: updatedUser });
      console.log("updatedUser", updatedUser);
      setImageFile("");
    }
  };
  return (
    <ContactContainer>
      <div className="userContacts">
        <div className="logoutBtn">
          <h3>Contacts</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>

        {userContacts?.map((friend, index) => {
          const { username, profilePicture, _id } = friend;
          return (
            <div
              className="contact"
              key={index}
              onClick={() => setCurrentChat(_id)}
            >
              <div className="contactInfo">
                <div className="contactImage">
                  <img src={`${imageRoute}/${profilePicture}`} alt="profile" />
                </div>
                <h3 className="contactName">{username} </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="currentUser">
        <img
          src={`${imageRoute}/${user.userData.profilePicture}`}
          alt="currentUser"
        />
        <h4>{user.userData.username}</h4>
        <div className="editProfile">
          {!imageFile ? (
            <>
              <label htmlFor="file">Edit</label>
              <input
                type="file"
                id="file"
                value={imageFile}
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </>
          ) : (
            <button onClick={handleUpdate}>update</button>
          )}
        </div>
      </div>
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  padding: 1rem;
  .logoutBtn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    button {
      border: none;
      background: red;
      color: #fff;
      border-radius: 5px;
      padding: 0.3rem 0.6rem;
    }
  }
  .currentUser {
    background-color: #cee2fd;
    color: #000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #000;
    }
    .editProfile {
      position: absolute;
      top: -5px;
      right: 0;
      #file {
        display: none;
      }
      button,
      label {
        padding: 0.2rem 0.7rem;
        border-radius: 4px;
        border: none;
        background-color: #57ec57;
        color: #fff;
        cursor: pointer;
      }
      button {
        padding: 0.3rem 0.7rem;
      }
    }
  }
  .userContacts {
    height: 75vh;
    overflow-y: scroll;
    padding-right: 0.5rem;
    h3 {
      margin-bottom: 0.5rem;
    }
  }
  .contact {
    background-color: #6866e7;
    cursor: pointer;
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
  }
`;

export default Contacts;
