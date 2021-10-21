import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header, Image, Loader, Dimmer, Icon } from "semantic-ui-react";
import { githubV4Api } from "../utils/api";
import UserInput from "../components/UserInput/UserInput";
import Grid from "../components/Grid/Grid";
import { validateUsername } from "../utils/Validation";

export default function UserPage() {
  const [userData, setUserData] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const [userAvatar, setUserAvatar] = useState(null);
  const loc = useLocation();

  useEffect(() => {
    if (validateUsername(loc.pathname.substring(1))) {
      githubV4Api(loc.pathname.substring(1))
        .then((data) => {
          setUserAvatar(data.data.data.user?.avatarUrl);
          let newData = [];

          for (
            let i = 0;
            i < data.data.data.user?.repositories?.nodes.length;
            i++
          ) {
            newData.push({
              name: data.data.data.user?.repositories?.nodes[i].name,
              primaryLanguage:
                data.data.data.user?.repositories?.nodes[i]?.primaryLanguage
                  ?.name,
              committedDate: data.data.data.user?.repositories?.nodes[
                i
              ]?.object?.history?.nodes[0]?.committedDate?.substring(0, 10),
              totalCount:
                data.data.data.user?.repositories?.nodes[i]?.object?.history
                  ?.totalCount,
              url: data.data.data.user?.repositories?.nodes[i].url,
            });
          }

          setUserData(newData);
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
      <Dimmer active={loadingState} inverted>
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
          <Image src={userAvatar} size="small" avatar />
          <Header size="huge">{loc.pathname.substring(1)}</Header>
          <Grid userData={userData} setUserData={setUserData} />
        </>
      )}
    </>
  );
}
