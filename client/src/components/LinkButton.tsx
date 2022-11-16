import React from "react";
import "../styles/linkButton.css";

interface Props {
  href: string;
  text?: string;
  className?: string;
}

export function LinkButton(props: Props) {
  const classes = props.className ? props.className : "";
  return (
    <a className={"btn " + classes} href={props.href}>
      {props.text ? props.text : "Go"}
    </a>
  );
}
