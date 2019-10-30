import React from "react";
import "../assets/main-layout.css";

const MainLayout = props => {
  return (
    <div className="mainlayout">
      <div className="content">{props.children}</div>
    </div>
  );
};

export default MainLayout;
