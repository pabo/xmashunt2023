import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isStartedAtom = atomWithStorage("isStarted", false);
export const cluesAtom = atomWithStorage("clues", [
  {
    text: [
      "Start with what you just can't buy",
      "End with Wendy's dog",
      "Using your best penmanship",
      "Go write it on a log",
    ],
    answer: "L",
    solved: false,
  },
  {
    text: [
      "Roosevelt and Bridgewater",
      "Are similar in name",
      "While you puzzle late at night",
      "He looks out from the frame",
    ],
    answer: "I",
    solved: false,
  },
  {
    text: [
      "Flour, butter, bacon, eggs",
      "Spinach, cream, and swiss",
      "Do a Good job Keeping House",
      "And you'll end up with this",
    ],
    answer: "K",
    solved: false,
  },
  {
    text: [
      "Three hundred-thirty meters tall",
      "A hundred meters wide",
      "Shrunken down four thousand times",
      "Next to a hen it hides",
    ],
    answer: "C",
    solved: false,
  },
  {
    text: [
      "HERON, EGRET, STORK and CRANE;",
      "Not just guesses for Wordle",
      "Look atop the mystery bird",
      "That stands upon a turtle",
    ],
    answer: "M",
    solved: false,
  },
  {
    text: [
      "Keep this green sphere neatly sorted",
      "Standing in a tower",
      "Rearrange it - no no no!",
      "Why are you so sour?",
    ],
    answer: "H",
    solved: false,
  },
  {
    text: [
      "Justin Trudeau, english cop,",
      "The time from twelve to five",
      "Or the pair that we can thank",
      "For keeping Brett alive",
    ],
    answer: "E",
    solved: false,
  },
  {
    text: [
      "L is for the way you Light the room",
      "A is cause you take Away the gloom",
      "M is Many, Many; any one of Many",
      "P is Pick and choose; through your house you must peruse",
    ],
    answer: "A",
    solved: false,
  },
  {
    text: [
      "Back in June Brett fixed this thing",
      "His work you must undo",
      "Grab a tiny Allen wrench",
      "And loosen the set screw",
    ],
    answer: "E",
    solved: false,
  },
  {
    text: [
      "Not actually my favorite place",
      "But reminiscent of",
      "Look inside the square to see",
      "A memory I love",
    ],
    answer: "C",
    solved: false,
  },
]);

export const numClues = atom((get) => get(cluesAtom).length);

export const currentClueNumberAtom = atom((get) =>
  get(cluesAtom).findIndex((c) => !c.solved)
);

export const currentClueAtom = atom(
  (get) => get(cluesAtom)[get(currentClueNumberAtom)],
  (get, set, value) => {
    // TODO: with is allowed...
    set(cluesAtom, get(cluesAtom).with(get(currentClueNumberAtom), value));

    console.log("with!", value);
  }
);

export const currentClueSolvedAtom = atom(
  (get) => get(currentClueAtom).solved,
  (get, set, value) => {
    console.log("value here is", value);
    set(currentClueAtom, { ...get(currentClueAtom), solved: value });
  }
);

export const currentClueTextAtom = atom(
  (get) => get(cluesAtom)[get(currentClueNumberAtom)].text
);

export const currentAnswerAtom = atom(
  (get) => get(cluesAtom)[get(currentClueNumberAtom)].answer
);

export const jumbleLettersAtom = atom((get) =>
  get(cluesAtom).filter((c) => c.solved)
);

export const hasUnsolvedCluesAtom = atom(
  (get) => get(currentClueNumberAtom) !== -1
);

export const highestZIndexAtom = atom(1);
