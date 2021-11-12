// react component for pagination
import { useState, useEffect } from "react";
import { useValueProvider } from "../../context/ValueProvider";
import PagButton from "./PagButton";

export default function Pagination(props) {
  const { total } = props;
  const [pageCount, setPageCount] = useState([]);
  const [buttonId, setButtonId] = useState(1);
  const { setCursor } = useValueProvider();

  useEffect(() => {
    for (let i = 1; i <= total; i++) {
      pageCount.push(i);
    }
    setPageCount(pageCount);
  }, [pageCount, total]);

  return (
    <div>
      {pageCount.map((item, index) => {
        return (
          <PagButton
            number={item}
            key={index}
            setCursor={setCursor}
            buttonId={buttonId}
            setButtonId={setButtonId}
          />
        );
      })}
    </div>
  );
}
