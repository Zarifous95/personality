import React from "react";
import "../styles/card.css";

type Props = {
  children?: React.ReactNode;
  imageUrl?: string;
  title?: string;
};

export function Card({ children, imageUrl, title }: Props) {
  return (
    <div className="card-wrapper">
      <div className="card-content">
        {title ? <h2>{title}</h2> : null}
        {imageUrl ? (
          <img src={imageUrl} className="image-test" alt="placeholder" />
        ) : null}
        {children}
      </div>
    </div>
  );
}
