import { Table } from "semantic-ui-react";
import GridElement from "../GridElement";
import { useMemo, useState, useEffect } from "react";

import "./Grid.scss";

export default function CardTable(props) {
  const { userData } = props;
  const [sortState, setSortState] = useState({ property: null, dir: 1 });
  const [data, setData] = useState([]);

  useMemo(() => {
    setData(
      data.sort((a, b) =>
        a[sortState.property] > b[sortState.property]
          ? 1 * sortState.dir
          : -1 * sortState.dir
      )
    );
  }, [sortState, data]);

  useEffect(() => {
    setData(userData);
  }, [userData]);

  return (
    <div>
      <div className="App--grid">
        <Table celled textAlign="center" sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                onClick={() => {
                  setSortState({ property: "name", dir: sortState.dir * -1 });
                }}
              >
                Repository
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => {
                  setSortState({
                    property: "primaryLanguage",
                    dir: sortState.dir * -1,
                  });
                }}
              >
                Language
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => {
                  setSortState({
                    property: "committedDate",
                    dir: sortState.dir * -1,
                  });
                }}
              >
                Last commit
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => {
                  setSortState({
                    property: "totalCount",
                    dir: sortState.dir * -1,
                  });
                }}
              >
                Commits
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((x, index) => {
              return <GridElement key={index} info={x} />;
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
