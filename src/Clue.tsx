import { useAtom, useSetAtom } from "jotai";
import {
  currentAnswerAtom,
  currentClueAtom,
  currentClueSolvedAtom,
} from "./atoms";
import { useState } from "react";
import classes from "./clue.module.css";
import classNames from "classnames";

export const Clue = () => {
  const [guess, setGuess] = useState("");
  const [currentAnswer] = useAtom(currentAnswerAtom);
  const [currentClue] = useAtom(currentClueAtom);
  const setCurrentClueSolved = useSetAtom(currentClueSolvedAtom);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const nextGuess = event.currentTarget.value
      .charAt(event.currentTarget.value.length - 1)
      .toUpperCase();

    setGuess(nextGuess);
    if (nextGuess === currentAnswer) {
      setIsAnimating(true);
    }
  };

  const handleAnimationEnd = () => {
    console.log("ending");
    setCurrentClueSolved(true);
    setIsAnimating(false);
    setGuess("");
  };

  return (
    <div className={classes.content}>
      <div>
        {currentClue.text.map((text, index) => {
          return <div key={index}>{text}</div>;
        })}{" "}
        {/* (answer: {currentAnswer}) */}
      </div>
      <div className={classes.clue}>
        <input
          autoFocus
          className={classNames({
            [classes.answer]: true,
            [classes.fadeOut]: isAnimating,
          })}
          type="text"
          value={guess}
          onChange={handleChange}
          onAnimationEnd={handleAnimationEnd}
        />
      </div>
    </div>
  );
};
