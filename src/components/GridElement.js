import { Table } from "semantic-ui-react";

export default function GridElement(props) {
  const { info, index, userName } = props;

  return (
    <Table.Row
      key={index}
      onClick={() =>
        window.open("https://github.com/" + userName + "/" + info?.name)
      }
    >
      {Object.keys(info)?.map((x, index) => {
        return <Table.Cell key={index}>{info[x]}</Table.Cell>;
      })}
    </Table.Row>
  );
}
