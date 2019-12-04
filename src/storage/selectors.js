export const STORE_KEY = "data";
export const selectAllCards = state => state.getIn([STORE_KEY, "cards"]);
export const selectCard = (state, id) => state.getIn([STORE_KEY, "cards", id]);
export const selectCardLoading = (state, id = "all") =>
  state.getIn([STORE_KEY, "loading", "cards", id]);
export const selectAllDecks = state => state.getIn([STORE_KEY, "decks"]);
export const selectDeck = (state, id) => state.getIn([STORE_KEY, "decks", id]);
export const selectDeckLoading = (state, id = "all") =>
  state.getIn([STORE_KEY, "loading", "decks", id]);
export const selectDeckCards = (state, deckId) => {
  const questions = selectDeck(state, deckId).get("questions");
  return state
    .getIn([STORE_KEY, "cards"])
    .filter(card => questions.includes(card.get("id")));
};
