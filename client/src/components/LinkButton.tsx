import React from "react";
import "../styles/linkButton.css";

interface Props {
  href: string;
  text?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function LinkButton(props: Props) {
  const classes = props.className ? props.className : "";
  const disabledClass = props.disabled ? " btn-disabled" : "";
  return (
    <a
      className={"btn " + classes + disabledClass}
      href={props.href}
      onClick={() => {
        props.onClick && props.onClick();
      }}
    >
      {props.text ? props.text : "Go to"}
    </a>
  );
}
