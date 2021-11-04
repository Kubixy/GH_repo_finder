import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header, Loader, Dimmer, Icon } from "semantic-ui-react";
import {
  getUserRepositories,
  getUserAvatar,
  getUserFollowers,
  getUserStarredRepos,
} from "../utils/api";
import UserInput from "../components/UserInput/UserInput";
import Grid from "../components/Grid/Grid";
import { validateUsername } from "../utils/Validation";
import UserProfile from "../components/UserProfile/UserProfile";

export default function UserPage(props) {
  const { location } = props;
  const [userData, setUserData] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const [userAvatar, setUserAvatar] = useState(null);
  const loc = useLocation();
  const userName = loc.pathname.substring(loc.pathname.lastIndexOf("/") + 1);

  useEffect(() => {
    if (validateUsername(userName)) {
      getUserAvatar(userName).then((input) => setUserAvatar(input));

      switch (location) {
        case "repositories":
          getUserRepositories(userName)
            .then((input) => {
              setUserData(input);
            })
            .catch(() => {
              setErrorState(true);
            })
            .finally(() => {
              setLoadingState(false);
            });
          break;
        case "followers":
          getUserFollowers(userName)
            .then((input) => {
              setUserData(input);
            })
            .catch(() => {
              setErrorState(true);
            })
            .finally(() => {
              setLoadingState(false);
            });
          break;
        case "stars":
          getUserStarredRepos(userName)
            .then((input) => {
              setUserData(input);
            })
            .catch(() => {
              setErrorState(true);
            })
            .finally(() => {
              setLoadingState(false);
            });
          break;
        default:
          setErrorState(true);
          setLoadingState(false);
      }
    } else {
      setErrorState(true);
      setLoadingState(false);
    }
  }, [location, userName]);

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
          <UserProfile userAvatar={userAvatar} userName={userName} />
          <Grid userData={userData} location={location} />
        </>
      )}
    </>
  );
}
