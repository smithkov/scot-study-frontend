import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Scot-Study
        </a>
        <span className="ml-1">&copy; 2021 admissions.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://softnergy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Softnergy
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
