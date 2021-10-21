import { Table } from "semantic-ui-react";
import GridElement from "../GridElement";
import { useMemo, useState } from "react";

import "./Grid.scss";

export default function CardTable(props) {
  const { userData, setUserData } = props;
  const [state, setstate] = useState({ property: null, dir: 1 });

  useMemo(() => {
    setUserData(
      userData.sort((a, b) =>
        a[state.property] > b[state.property] ? 1 * state.dir : -1 * state.dir
      )
    );
  }, [state]);

  return (
    <div>
      <div className="App--grid">
        <Table celled textAlign="center" sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                onClick={() => {
                  setstate({ property: "name", dir: state.dir * -1 });
                }}
              >
                Repository
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => {
                  setstate({
                    property: "primaryLanguage",
                    dir: state.dir * -1,
                  });
                }}
              >
                Language
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => {
                  setstate({
                    property: "committedDate",
                    dir: state.dir * -1,
                  });
                }}
              >
                Last commit
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => {
                  setstate({
                    property: "totalCount",
                    dir: state.dir * -1,
                  });
                }}
              >
                Commits
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {userData?.map((x, index) => {
              return <GridElement key={index} info={x} />;
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
