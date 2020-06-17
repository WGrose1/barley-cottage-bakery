import React from "react";

export default function Background(props) {
  return (
    <img
      src="./assets/blackboard.jpg"
      alt="blackboard background"
      width={"100%"}
      height={"100%"}
      style={{ position: "absolute", zIndex: -999 }}
    />
  );
}
