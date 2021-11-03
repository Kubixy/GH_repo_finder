import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header, Loader, Dimmer, Icon } from "semantic-ui-react";
import { githubV4Api } from "../utils/api";
import UserInput from "../components/UserInput/UserInput";
import Grid from "../components/Grid/Grid";
import { validateUsername } from "../utils/Validation";
import UserProfile from "../components/UserProfile/UserProfile";

export default function UserPage() {
  const [userData, setUserData] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const [userAvatar, setUserAvatar] = useState(null);
  const loc = useLocation();

  // REFACTOR

  useEffect(() => {
    if (validateUsername(loc.pathname.substring(1))) {
      githubV4Api(loc.pathname.substring(1))
        .then((input) => {
          setUserAvatar(input.userAvatar);
          setUserData(input.userData);
        })
        .catch(() => {
          setErrorState(true);
        })
        .finally(() => {
          setLoadingState(false);
        });
    } else {
      setErrorState(true);
      setLoadingState(false);
    }
  }, [loc.pathname]);

  return (
    <>
      <Dimmer active={loadingState}>
        <Loader inline>Loading</Loader>
      </Dimmer>

      {errorState ? (
        <>
          <Icon name="github" size="massive" />
          <Header color="red" size="huge">
            User not found, try again
          </Header>
          <UserInput />
        </>
      ) : (
        <>
          <UserProfile
            userAvatar={userAvatar}
            userName={loc.pathname.substring(1)}
          />
          <Grid userData={userData} />
        </>
      )}
    </>
  );
}
