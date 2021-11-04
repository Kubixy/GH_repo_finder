import { useState, useMemo } from "react";
import { Image, Label, Icon } from "semantic-ui-react";
import UserInput from "../UserInput/UserInput";
import { getUserStats } from "./../../utils/api";

import "./UserProfile.scss";

export default function UserProfile(props) {
  const { userAvatar, userName } = props;
  const [userStats, setUsertStats] = useState({
    repos: null,
    follows: null,
    starred: null,
  });

  useMemo(() => {
    getUserStats(userName).then((input) => {
      setUsertStats(input);
    });
  }, [userName]);

  return (
    <div className="UserProfile">
      <div className="UserProfile--avatarName">
        {userAvatar ? (
          <Image src={userAvatar} avatar alt="avatar" />
        ) : (
          <Label content="Image not found!" icon="warning" />
        )}
        <h1>{userName}</h1>
      </div>
      <div className="UserProfile--details">
        <Icon name="archive" />
        <span>{userStats.repos}</span>
        <Icon name="star" />
        <span>{userStats.starred}</span>
        <Icon name="users" />
        <span>{userStats.follows}</span>
      </div>
      <UserInput />
    </div>
  );
}
