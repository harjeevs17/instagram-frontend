import { subscribeToTimer } from "../../api/api";
import React, { useEffect, useState } from "react";

const Message = () => {
  const [state, setstate] = useState("no timestamp yet");
  useEffect(() => {
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp,
      })
    );
  });
  return (
    <div>
      <p>hi</p>
      <p>This is the timer value: {state}</p>
    </div>
  );
};
export default Message;
