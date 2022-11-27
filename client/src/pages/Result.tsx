import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import introvert from "../resources/introvert.jpg";
import extrovert from "../resources/extrovert.jpg";
import { LinkButton } from "../components/LinkButton";

interface ResultType {
  quiz_id: string;
  question_id: string;
  value: number;
}

interface ResultText {
  type: string;
  info: string;
  imgUrl: string;
}

const resultText: ResultText[] = [
  {
    type: "Introvert",
    imgUrl: introvert,
    info: "An introvert can be defined as being someone who gets their energy from being in their own company, having time to ‘recharge’ on their own. Someone who is introverted may appear to be withdrawn and shy, although this may not always be the case (Carrigan, 1960).",
  },
  {
    type: "Extrovert",
    imgUrl: extrovert,
    info: "An extrovert is a person with qualities of a personality type known as extroversion, which means that they get their energy from being around other people. Someone who is extroverted may appear as very talkative and may be popular among peers (Carrigan, 1960)",
  },
];

export default function Result() {
  const [results, setResults] = useState<ResultType[]>([]);
  let { quizId } = useParams();
  const [fecthed, setFetched] = useState<boolean>(false);

  let totalScore = useMemo(() => {
    console.log(results);
    return results.reduce((acc, curr) => acc + curr.value, 0);
  }, [results]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `http://localhost:5000/results/${quizId?.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const results = await response.json();
      if (!results) {
        window.alert(`Results with quiz id ${quizId} not found`);
        return;
      }

      setResults(results);
      setFetched(true);
    };

    if (!fecthed) {
      fetchResults();
    }
  }, [fecthed, quizId]);

  const index = totalScore <= 10 ? 0 : 1;

  return (
    <Container>
      <div className="wrapper">
        {index && (
          <Card title={"Results"} imageUrl={resultText[index].imgUrl}>
            <h4>{resultText[index].type}</h4>
            <h5>{resultText[index].info}</h5>

            <div className="flex-container">
              <LinkButton
                className="margin-vertical margin-horizontal"
                href={"/"}
                text="Home"
              />
              <LinkButton
                className="margin-vertical margin-horizontal"
                href={"/personality/"}
                text="Try again"
              />
            </div>
          </Card>
        )}
      </div>
    </Container>
  );
}
