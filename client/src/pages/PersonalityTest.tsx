import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnswerBox } from "../components/AnswerBox";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { LinkButton } from "../components/LinkButton";

interface Question {
  id: string;
  text: string;
}

interface Answer {
  id: string;
  question_id: string;
  text: string;
  value: number;
}

export default function PersonalityTest() {
  let { questionId, quizId } = useParams();
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>();
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>({
    id: "",
    question_id: "",
    text: "",
    value: 1,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(
        `http://localhost:5000/questions/${questionId?.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const question = await response.json();
      if (!question) {
        window.alert(`Question with id ${questionId} not found`);
        return;
      }

      setQuestion(question[0]);
    };

    const fetchAnswers = async () => {
      const response = await fetch(
        `http://localhost:5000/answers/question/${questionId?.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const answers = await response.json();
      if (!answers) {
        window.alert(`Answers with question_id ${questionId} not found`);
        return;
      }

      setAnswers(answers);
    };

    if (!answers || answers?.length < 0) {
      fetchAnswers();
    }

    if (!question) {
      fetchQuestions();
    }
  }, [question, answers, questionId]);

  function handleSelect(answer: Answer) {
    setSelectedAnswer(answer);
  }

  async function handleNext(
    quizId?: string,
    questionId?: string,
    answer?: Answer
  ) {
    if (!quizId || !questionId || !answer) {
      return;
    }

    const response = await fetch(
      `http://localhost:5000/results/${quizId}/add/${questionId}`,
      {
        method: "POST",
        body: JSON.stringify({ value: answer.value }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
  }

  if (!quizId || !questionId || !question || !answers) {
    return (
      <Container>
        <div className="wrapper"></div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="wrapper">
        {question ? (
          <Card title={question.text}>
            {answers ? (
              answers.map((a, key) => {
                return (
                  <AnswerBox
                    id={a.id}
                    key={a.id + key}
                    text={a.text}
                    onClick={() => {
                      handleSelect(a);
                    }}
                    selectedId={selectedAnswer.id}
                  />
                );
              })
            ) : (
              <></>
            )}
            <div className="flex-container">
              {questionId !== "1" && (
                <LinkButton
                  className="margin-vertical margin-horizontal"
                  href={
                    "/personality/" + quizId + "/" + (parseInt(questionId) - 1)
                  }
                  text="Previous"
                />
              )}
              {questionId !== "5" && (
                <LinkButton
                  className="margin-vertical margin-horizontal"
                  href={
                    "/personality/" + quizId + "/" + (parseInt(questionId) + 1)
                  }
                  disabled={selectedAnswer.id === ""}
                  onClick={() => handleNext(quizId, questionId, selectedAnswer)}
                  text="Next"
                />
              )}
              {questionId === "5" && (
                <LinkButton
                  className="margin-vertical margin-horizontal"
                  href={"/personality/" + quizId + "/results"}
                  onClick={() => handleNext(quizId, questionId, selectedAnswer)}
                  text="Finalize"
                />
              )}
            </div>
          </Card>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
}
