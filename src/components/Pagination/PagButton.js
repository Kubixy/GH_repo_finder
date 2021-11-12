import { Button } from "semantic-ui-react";

export default function PagButton(props) {
  const { number, buttonId, setButtonId } = props;

  return (
    <Button
      onClick={() => {
        setButtonId(number);
      }}
      primary={number === buttonId}
    >
      {number}
    </Button>
  );
}
