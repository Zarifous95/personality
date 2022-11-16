import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnswerBox } from "../components/AnswerBox";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { LinkButton } from "../components/LinkButton";

interface Question {
  text: string;
  answers: Answers[];
}

interface Answers {
  text: string;
  value: number;
}

export default function PersonalityTest() {
  let { questionId } = useParams();
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:25564/question/${questionId?.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const question = await response.json();
      if (!question) {
        window.alert(`Question with id ${questionId} not found`);
        // navigate("/");
        return;
      }

      setQuestion(question);
    }

    fetchData();

    return;
  }, [questionId]);

  return (
    <Container>
      <div className="wrapper">
        {questionId}
        {question ? (
          <Card title={question.text}>
            {question.answers.map((a, key) => {
              return (
                <AnswerBox
                  key={a.value + key}
                  text={a.text}
                  isSelected={false}
                />
              );
            })}
            <LinkButton
              className="margin-vertical"
              href="/personality"
              text="Take a test"
            />
          </Card>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
}
