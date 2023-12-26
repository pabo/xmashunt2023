import { useAtom } from "jotai";
import { Clue } from "./Clue";
import { Jumble } from "./Jumble";
import { hasUnsolvedCluesAtom, isStartedAtom } from "./atoms";
import classes from "./app.module.css";
import { Intro } from "./Intro";

export const App = () => {
  const [hasUnsolvedClues] = useAtom(hasUnsolvedCluesAtom);
  const [isStarted] = useAtom(isStartedAtom);

  return (
    <div
      className={classes.app}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
    >
      {!isStarted && <Intro />}
      {isStarted && hasUnsolvedClues && <Clue />}
      {isStarted && !hasUnsolvedClues && (
        <div
          style={{
            "background-color": "#ffd700",
            opacity: 1,
            "border-radius": "50px",
            padding: "50px",
            margin: "50px",
          }}
        >
          Now just solve the jumble! (the letters are draggable)
        </div>
      )}
      <Jumble />
    </div>
  );
};
