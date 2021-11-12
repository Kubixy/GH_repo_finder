import { Table } from "semantic-ui-react";

export default function GridElement(props) {
  const { info, index } = props;
  const url = info.url;
  delete info.url;

  return (
    <Table.Row
      key={index}
      onClick={() => {
        window.open(url);
      }}
    >
      {Object.keys(info)?.map((x, index) => {
        return <Table.Cell key={index}>{info[x]}</Table.Cell>;
      })}
    </Table.Row>
  );
}
