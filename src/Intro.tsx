import { useAtom } from "jotai";
import { isStartedAtom } from "./atoms";

export const Intro = () => {
  const [, setIsStarted] = useAtom(isStartedAtom);
  return (
    <div
      style={{
        "background-color": "#ffd700",
        opacity: 1,
        "border-radius": "50px",
        padding: "50px",
        margin: "50px",
      }}
    >
      <div
        style={{
          padding: "50px",
        }}
      >
        <h2>Welcome to your Christmas Hunt, 2023!</h2>
        Remember when we stayed with you back in June? Remember when you went
        out to a show and left us in your house unsupervised for <i>hours</i>?
        Well...
        <p>
          <button onClick={() => setIsStarted(true)}>Let's get started</button>
        </p>
      </div>
    </div>
  );
};
