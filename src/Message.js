import { Card, CardContent, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ message, name }, ref) => {
  const isUser = name === message.name;
  return (
    <Card
      ref={ref}
      className={`message ${isUser ? "message__user" : "message__guest"}`}
    >
      <CardContent>
        <Typography color="black" variant="h5" component="h2">
          {!isUser && `${message.name || "Unknown User"}: `}
          {message.text}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default Message;
