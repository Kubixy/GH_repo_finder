import { Icon } from "semantic-ui-react";
import UserInput from "../components/UserInput/UserInput";

export default function MainPage() {
  return (
    <>
      <Icon name="github" size="massive" />
      <h1>Search for a user</h1>
      <UserInput />
    </>
  );
}
