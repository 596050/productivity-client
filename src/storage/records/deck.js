import { List, Record } from "immutable";
export default Record(
  { id: "", title: "", questions: List(), createdOn: Date.now() },
  "Deck"
);
