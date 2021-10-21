import { Table } from "semantic-ui-react";

export default function GridElement(props) {
  const { info, index } = props;

  return (
    <Table.Row key={index} onClick={() => window.open(info.url)}>
      <Table.Cell>{info.name}</Table.Cell>
      <Table.Cell>{info.primaryLanguage}</Table.Cell>
      <Table.Cell>{info.committedDate}</Table.Cell>
      <Table.Cell>{info.totalCount}</Table.Cell>
    </Table.Row>
  );
}
