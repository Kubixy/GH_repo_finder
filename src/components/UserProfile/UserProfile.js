import { useState } from "react";
import { Image, Label, Icon } from "semantic-ui-react";
import UserInput from "../UserInput/UserInput";

import "./UserProfile.scss";

export default function UserProfile(props) {
  const { userAvatar, userName } = props;

  return (
    <div className="UserProfile">
      <div className="UserProfile--avatarName">
        {userAvatar ? (
          <Image src={userAvatar} avatar />
        ) : (
          <Label content="Image not found!" icon="warning" />
        )}
        <h1>{userName}</h1>
      </div>
      <UserInput />
      <div className="UserProfile--details">
        <Icon name="archive" />
        <span>10</span>
        <Icon name="star" />
        <span>20</span>
        <Icon name="users" />
        <span>3</span>
      </div>
    </div>
  );
}
