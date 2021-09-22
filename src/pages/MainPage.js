import { Icon } from "semantic-ui-react";
import UserInput from "../components/UserInput";

export default function Main() {
  return (
    <>
      <Icon name="github" size="massive" />
      <h1>Search for a user</h1>
      <UserInput />
    </>
  );
}
