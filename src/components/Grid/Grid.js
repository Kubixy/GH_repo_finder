import { Table } from "semantic-ui-react";
import GridElement from "../GridElement";
import { useMemo, useState, useEffect } from "react";
import { pretifyRowName } from "../../utils/StringManipulation";

import "./Grid.scss";

export default function CardTable(props) {
  const { userData, userName } = props;
  const [sortState, setSortState] = useState({ property: null, dir: 1 });
  const [rowNames, setRowNames] = useState([]);
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
    if (userData[0]) {
      setRowNames(Object.keys(userData[0]));
    }
  }, [userData]);

  return (
    <div>
      <div className="App--grid">
        <Table celled textAlign="center" sortable>
          <Table.Header>
            <Table.Row>
              {rowNames.map((value, index) => {
                return (
                  <Table.HeaderCell
                    key={index}
                    onClick={() => {
                      setSortState({
                        property: value,
                        dir: sortState.dir * -1,
                      });
                    }}
                  >
                    {pretifyRowName(value)}
                  </Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((value, index) => {
              return (
                <GridElement key={index} info={value} userName={userName} />
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
