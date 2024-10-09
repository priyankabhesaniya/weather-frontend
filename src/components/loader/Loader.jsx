import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = ({ height = "100%", top = "0px",position = "absolute",width = "100%" }) => {
  return (
    <div
      style={{
        position,
        top,
        right: "0px",
        left: "0px",
        width,
        height,
        zIndex: "1",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: "3px",
        marginLeft: "auto"
      }}
    >
      <Spinner
        aria-hidden="false"
        size="lg"
        animation="border"
        variant="primary"
        style={{
          position: "absolute",
          top: "calc(50% - 12px)",
          left: "calc(50% - 12px)",
        }}
      />
    </div>
  );
};
export default Loader;
