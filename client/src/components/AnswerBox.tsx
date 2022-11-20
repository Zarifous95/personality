import "../styles/answerBox.css";

interface Props {
  text: string;
  id: string;
  onClick: () => void;
  selectedId: string;
}

export function AnswerBox(props: Props) {
  return (
    <>
      <div className="answer-box">
        <input
          id={props.id}
          type="radio"
          onChange={() => {}}
          checked={props.selectedId === props.id}
        />
        <label
          htmlFor={props.id}
          onClick={(_e) => {
            props.onClick();
          }}
        >
          {props.text}
        </label>
      </div>
    </>
  );
}
