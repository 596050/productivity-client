import { Record } from "immutable";
export default Record(
  {
    id: "",
    question: "",
    answer: "",
    type: null,
    deckId: null,
    createdOn: Date.now()
  },
  "Card"
);
