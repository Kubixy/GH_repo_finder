import { Icon, Header } from "semantic-ui-react";
import UserInput from "../components/UserInput/UserInput";

export default function MainPage() {
  return (
    <>
      <Icon name="github" size="massive" />
      <Header size="huge">Search for a user</Header>
      <UserInput />
    </>
  );
}
