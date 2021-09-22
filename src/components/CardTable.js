import { Table } from "semantic-ui-react";
import RepoCard from "./RepoCard";

export default function CardTable(props) {
  const { data } = props;

  return (
    <div>
      <div className="App--list">
        <Table celled textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Repository</Table.HeaderCell>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Commits</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((x, index) => {
              return <RepoCard key={index} info={x} />;
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
