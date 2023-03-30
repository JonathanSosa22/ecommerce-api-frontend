import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function AlertError({ isVisible, dismiss }) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  if (show) {
    return (
      <Alert
        style={{ width: 450, margin: "0 auto" }}
        variant="danger"
        onClose={() => dismiss()}
        dismissible
      >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>The data entered is incorrect!</p>
      </Alert>
    );
  }
}

export default AlertError;
