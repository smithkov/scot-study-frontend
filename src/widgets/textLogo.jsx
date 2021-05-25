import React, { useState } from "react";
import { Icon, Image, Container, Segment, Grid, Menu } from "semantic-ui-react";

function TextLogo(props) {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Segment
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            width: "60%",
          }}
          circular
        >
          <Image fluid src={`/icons/${props.name}`} />
        </Segment>
        <span>{props.text}</span>
      </div>
    </>
  );
}

export default TextLogo;
