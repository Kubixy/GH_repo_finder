import { Table } from "semantic-ui-react";

export default function GridElement(props) {
  const { info, index } = props;

  return (
    <Table.Row key={index} onClick={() => window.open(info?.url)}>
      <Table.Cell>{info?.name}</Table.Cell>
      <Table.Cell>{info?.primaryLanguage?.name}</Table.Cell>
      <Table.Cell>{info?.object?.history?.totalCount}</Table.Cell>
    </Table.Row>
  );
}
