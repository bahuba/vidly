import React from "react";

const Like = (props) => {
  let className = "fa fa-heart";
  if (!props.liked) className += "-o";
  return (
    <i
      onClick={() => props.onClick(props.item)}
      className={className}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
