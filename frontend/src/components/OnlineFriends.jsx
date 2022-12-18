import React from "react";
import styled from "styled-components";
import { imageRoute } from "../utils/apiRoutes";

const OnlineFriends = ({ onlineUsers, user, allUsers }) => {
  const onlineFriendsId = onlineUsers?.filter(
    (friend) => friend.userId !== user.userData._id
  );
  const onlineFriends = onlineFriendsId?.map((friend) => {
    return allUsers?.find((person) => person._id === friend.userId);
  });

  if (onlineFriends) {
    return (
      <OnlineContainer>
        <h2>Online Friends</h2>
        {onlineFriends.length > 0 && (
          <div className="onlineFriends">
            {onlineFriends?.map((friend, index) => {
              return (
                <div className="onlineFriend" key={index}>
                  {friend?.profilePicture && (
                    <img
                      src={`${imageRoute}/${friend?.profilePicture}`}
                      alt="online friend"
                    />
                  )}
                  {friend?.username && (
                    <p className="username">{friend?.username}</p>
                  )}

                  <p className="onlineDot"></p>
                </div>
              );
            })}
          </div>
        )}
      </OnlineContainer>
    );
  }
};

const OnlineContainer = styled.div`
  padding: 1rem;
  h2 {
    margin-bottom: 1rem;
  }
  .onlineFriends {
    .onlineFriend {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .onlineDot {
        position: absolute;
        background-color: #2cd32c;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        left: 1.7rem;
        top: 0;
      }
    }
  }
`;

export default OnlineFriends;
