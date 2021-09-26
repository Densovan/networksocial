import React from "react";
import { Alert } from "react-bootstrap";
const Message = ({ varaint, children }) => {
  return <Alert variant={varaint}>{children}</Alert>;
};
Message.defaultprop = {
  variant: "info",
};
export default Message;
