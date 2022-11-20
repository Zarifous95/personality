import React from "react";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { LinkButton } from "../components/LinkButton";
import image from "../resources/image.jpg";
import "../styles/home.css";

function randomUuidChunk() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function randomUuid() {
  return (
    randomUuidChunk() +
    randomUuidChunk() +
    "-" +
    randomUuidChunk() +
    "-3" +
    randomUuidChunk().substr(0, 2) +
    "-" +
    randomUuidChunk() +
    "-" +
    randomUuidChunk() +
    randomUuidChunk() +
    randomUuidChunk()
  ).toLowerCase();
}

export default function Home() {
  const uuid = randomUuid();
  async function handleStartQuiz() {
    const response = await fetch(`http://localhost:5000/quiz/add/${uuid}`);

    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
  }

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
            href={`/personality/${uuid}/1`}
            text="Take a test"
            onClick={() => handleStartQuiz}
          />
        </Card>
      </div>
    </Container>
  );
}
