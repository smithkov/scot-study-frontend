import React, { useState } from "react";
import { Segment, Icon } from "semantic-ui-react";

function NoTableData() {
  return (
    <>
      <Segment textAlign="center" tertiary>
        <strong> No result found</strong>{" "}
        <Icon size="large" name="frown outline" />
      </Segment>
    </>
  );
}

export default NoTableData;
