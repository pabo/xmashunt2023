import { useAtom } from "jotai";
import { cluesAtom, highestZIndexAtom } from "./atoms";
import classes from "./jumble.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";

export const Jumble = () => {
  const [clues] = useAtom(cluesAtom);

  return (
    <div className={classes.jumble}>
      {clues.map((letter, index) => {
        const { answer, solved } = letter;
        return <JumbleLetter key={index} letter={answer} solved={solved} />;
      })}
    </div>
  );
};

export const JumbleLetter = ({ letter, solved }) => {
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(0);
  const [highestZIndex, setHighestZIndex] = useAtom(highestZIndexAtom);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    if (solved && !isSolved) {
      console.log("solved!", letter);
      setIsSolved(true);
      setIsAnimating(true);
    }
  }, [solved, isSolved, letter]);

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    setLeft((x) => x + e.nativeEvent.offsetX - xOffset);
    setTop((y) => y + e.nativeEvent.offsetY - yOffset);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div
      draggable
      className={classNames({
        [classes.jumbleLetter]: true,
        [classes.solved]: solved,
        [classes.fadeIn]: isAnimating,
      })}
      style={{
        top,
        left,
        zIndex,
        visibility: isDragging ? "hidden" : "initial",
      }}
      onAnimationEnd={handleAnimationEnd}
      onDragStart={(e) => {
        e.dataTransfer.dropEffect = "move";
        setTimeout(() => {
          setIsDragging(true);
        }, 0);
        setXOffset(e.nativeEvent.offsetX);
        setYOffset(e.nativeEvent.offsetY);

        setZIndex(highestZIndex + 1);
        setHighestZIndex(highestZIndex + 1);
      }}
      onDragEnd={handleDragEnd}
      onDragExit={() => console.log("cancelled")}
    >
      {letter}
    </div>
  );
};
