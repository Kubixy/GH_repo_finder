import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { githubV4Api } from "../utils/api";
import UserInput from "../components/UserInput/UserInput";
import Grid from "../components/Grid/Grid";
import { validateUsername } from "../utils/Validation";

export default function UserPage() {
  const [userData, setUserData] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    if (validateUsername(loc.pathname.substring(1))) {
      githubV4Api(loc.pathname.substring(1))
        .then((data) => {
          setUserData(data.data.data.user);
          setErrorState(data.data.errors);
        })
        .catch(() => {
          setErrorState(true);
        });
    } else {
      setErrorState(true);
    }
  }, [loc.pathname]);

  return (
    <>
      {errorState ? (
        <>
          {" "}
          <Icon name="github" size="massive" />
          <Header color="red" size="huge">
            User not found, try again
          </Header>
          <UserInput />
        </>
      ) : (
        <>
          <Image src={userData?.avatarUrl} size="small" avatar />
          <h1>{loc.pathname.substring(1)}</h1>
          <Grid data={userData?.repositories?.nodes} />
        </>
      )}
    </>
  );
}
