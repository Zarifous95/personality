import React from "react";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { LinkButton } from "../components/LinkButton";
import image from "../resources/image.jpg";
import "../styles/home.css";

export default function Home() {
  return (
    <Container>
      <div className="wrapper">
        <Card imageUrl={image} title={"Are You an Extrovert or Introvert?"}>
          <h4>Discover where you fall on the introvert-extrovert spectrum.</h4>
          <p>
            Take a quick quiz consisting of 5 well curated questions to get{" "}
            <br /> to know yourself better
          </p>
          <LinkButton
            className="margin-vertical"
            href="/personality"
            text="Take a test"
          />
        </Card>
      </div>
    </Container>
  );
}
