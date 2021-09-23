import { Table } from "semantic-ui-react";
import GridElement from "../GridElement";

import "./Grid.scss";

export default function CardTable(props) {
  const { data } = props;

  return (
    <div>
      <div className="App--grid">
        <Table celled textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Repository</Table.HeaderCell>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Last commit</Table.HeaderCell>
              <Table.HeaderCell>Commits</Table.HeaderCell>
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
