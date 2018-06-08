import * as React from "react";

export interface Properties {
  message: string;
}

const importantStyle: React.CSSProperties = {
  color: "#ffffff",
  backgroundColor: "#ff0000"
};

const notImportantStyle: React.CSSProperties = {
  color: "#808080",
  backgroundColor: "#ffffff"
};

export const T: React.StatelessComponent<Properties> = (p: Properties) => {
  const textStyle = importantStyle;
  return (
    <p>
      <span style={textStyle}>{p.message}</span>
    </p>
  );
};
