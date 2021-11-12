import React, { useMemo, useState } from "react";

const CONTEXT_CN = React.createContext();

export function ValueProvider(props) {
  const [cursor, setCursor] = useState(null);

  const value = useMemo(() => {
    return {
      cursor,
      setCursor,
    };
  }, [cursor]);

  return <CONTEXT_CN.Provider value={value} {...props} />;
}

export function useValueProvider() {
  const context = React.useContext(CONTEXT_CN);
  if (!context) {
    throw new Error();
  }
  return context;
}
