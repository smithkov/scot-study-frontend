import React, { useState } from "react";
import { Icon, Image, Menu } from "semantic-ui-react";
import { primaryColor, imageStyles } from "../utility/constants";

import { Link } from "react-router-dom";
function Banner(props) {
  return (
    <>
      <div class="bg-image">
        <Image
          style={imageStyles(150)}
          className="img-fluid shadow-2-strong mask"
          src="/images/banner2.jpg"
        />
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <h1 className="text-white mb-0">{props.caption}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
