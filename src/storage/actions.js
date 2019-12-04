import { set, get, getAll, del } from "./helpers";
import { Map } from "immutable";
import { selectDeck } from "./selectors";
import uuid from "uuid/v4";

export const CREATE_CARD_START = "CREATE_CARD_START";
export const CREATE_CARD_SUCCESS = "CREATE_CARD_SUCCESS";
export const CREATE_CARD_FAILURE = "CREATE_CARD_FAILURE";

export const FETCH_CARD_START = "FETCH_CARD_START";
export const FETCH_CARD_SUCCESS = "FETCH_CARD_SUCCESS";
export const FETCH_CARD_FAILURE = "FETCH_CARD_FAILURE";

export const FETCH_ALL_CARDS_START = "FETCH_ALL_CARDS_START";
export const FETCH_ALL_CARDS_SUCCESS = "FETCH_ALL_CARDS_SUCCESS";
export const FETCH_ALL_CARDS_FAILURE = "FETCH_ALL_CARDS_FAILURE";

export const UPDATE_CARD_START = "UPDATE_CARD_START";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";

export const DELETE_CARD_START = "DELETE_CARD_START";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const DELETE_CARD_FAILURE = "DELETE_CARD_FAILURE";

/////////////////////////////////////////////////

export const CREATE_DECK_START = "CREATE_DECK_START";
export const CREATE_DECK_SUCCESS = "CREATE_DECK_SUCCESS";
export const CREATE_DECK_FAILURE = "CREATE_DECK_FAILURE";

export const FETCH_DECK_START = "FETCH_DECK_START";
export const FETCH_DECK_SUCCESS = "FETCH_DECK_SUCCESS";
export const FETCH_DECK_FAILURE = "FETCH_DECK_FAILURE";

export const FETCH_ALL_DECKS_START = "FETCH_ALL_DECKS_START";
export const FETCH_ALL_DECKS_SUCCESS = "FETCH_ALL_DECKS_SUCCESS";
export const FETCH_ALL_DECKS_FAILURE = "FETCH_ALL_DECKS_FAILURE";

export const UPDATE_DECK_START = "UPDATE_DECK_START";
export const UPDATE_DECK_SUCCESS = "UPDATE_DECK_SUCCESS";
export const UPDATE_DECK_FAILURE = "UPDATE_DECK_FAILURE";

export const DELETE_DECK_START = "DELETE_DECK_START";
export const DELETE_DECK_SUCCESS = "DELETE_DECK_SUCCESS";
export const DELETE_DECK_FAILURE = "DELETE_DECK_FAILURE";

const createCardStartAction = card => ({
  type: CREATE_CARD_START,
  payload: card
});

const createCardSuccessAction = card => ({
  type: CREATE_CARD_SUCCESS,
  payload: card
});

const createCardFailureAction = error => ({
  type: CREATE_CARD_FAILURE,
  payload: error
});

const fetchCardStartAction = id => ({
  type: FETCH_CARD_START,
  payload: id
});

const fetchCardSuccessAction = card => ({
  type: FETCH_CARD_SUCCESS,
  payload: card
});

const fetchCardFailureAction = (id, error) => ({
  type: FETCH_CARD_FAILURE,
  payload: error,
  meta: Map({ id })
});

const fetchAllCardsStartAction = () => ({
  type: FETCH_ALL_CARDS_START
});

const fetchAllCardsSuccessAction = cards => ({
  type: FETCH_ALL_CARDS_SUCCESS,
  payload: cards
});

const fetchAllCardsFailureAction = error => ({
  type: FETCH_ALL_CARDS_FAILURE,
  payload: error
});

const updateCardStartAction = card => ({
  type: UPDATE_CARD_START,
  payload: card
});

const updateCardSuccessAction = card => ({
  type: UPDATE_CARD_SUCCESS,
  payload: card
});

const updateCardFailureAction = (id, error) => ({
  type: UPDATE_CARD_FAILURE,
  payload: error,
  meta: Map({ id })
});

const deleteCardStartAction = id => ({
  type: DELETE_CARD_START,
  payload: id
});

const deleteCardSuccessAction = id => ({
  type: DELETE_CARD_SUCCESS,
  payload: id
});

const deleteCardFailureAction = (id, error) => ({
  type: DELETE_CARD_FAILURE,
  payload: error,
  meta: Map({ id })
});

//////////////////////////////////////////////////

const createDeckStartAction = deck => ({
  type: CREATE_DECK_START,
  payload: deck
});

const createDeckSuccessAction = deck => ({
  type: CREATE_DECK_SUCCESS,
  payload: deck
});

const createDeckFailureAction = error => ({
  type: CREATE_DECK_FAILURE,
  payload: error
});

const fetchDeckStartAction = id => ({
  type: FETCH_DECK_START,
  payload: id
});

const fetchDeckSuccessAction = deck => ({
  type: FETCH_DECK_SUCCESS,
  payload: deck
});

const fetchDeckFailureAction = (id, error) => ({
  type: FETCH_DECK_FAILURE,
  payload: error,
  meta: Map({ id })
});

const fetchAllDecksStartAction = () => ({
  type: FETCH_ALL_DECKS_START
});

const fetchAllDecksSuccessAction = cards => ({
  type: FETCH_ALL_DECKS_SUCCESS,
  payload: cards
});

const fetchAllDecksFailureAction = error => ({
  type: FETCH_ALL_DECKS_FAILURE,
  payload: error
});

const updateDeckStartAction = deck => ({
  type: UPDATE_DECK_START,
  payload: deck
});

const updateDeckSuccessAction = deck => ({
  type: UPDATE_DECK_SUCCESS,
  payload: deck
});

const updateDeckFailureAction = (id, error) => ({
  type: UPDATE_DECK_FAILURE,
  payload: error,
  meta: Map({ id })
});

const deleteDeckStartAction = id => ({
  type: DELETE_DECK_START,
  payload: id
});

const deleteDeckSuccessAction = id => ({
  type: DELETE_DECK_SUCCESS,
  payload: id
});

const deleteDeckFailureAction = (id, error) => ({
  type: DELETE_DECK_FAILURE,
  payload: error,
  meta: Map({ id })
});

export const createCard = card => (dispatch, getState) => {
  const promises = [dispatch(createCardStartAction(card))];
  const deck = selectDeck(getState(), card.get("deckId"));
  const id = uuid();
  promises.push(
    set("cards", id, card.set("id", id))
      .then(card =>
        set(
          "decks",
          deck.get("id"),
          deck.update("questions", arr => arr.push(id))
        ).then(deck => dispatch(createCardSuccessAction(card)))
      )
      .catch(error => dispatch(createCardFailureAction(error)))
  );
  return Promise.all(promises);
};

export const fetchCard = id => dispatch => {
  const promises = [dispatch(fetchCardStartAction(id))];
  promises.push(
    get("cards", id)
      .then(card => dispatch(fetchCardSuccessAction(card)))
      .catch(error => dispatch(fetchCardFailureAction(id, error)))
  );
  return Promise.all(promises);
};

export const fetchAllCards = () => dispatch => {
  const promises = [dispatch(fetchAllCardsStartAction())];
  promises.push(
    getAll("cards")
      .then(cards => dispatch(fetchAllCardsSuccessAction(cards)))
      .catch(error => dispatch(fetchAllCardsFailureAction(error)))
  );
  return Promise.all(promises);
};

export const updateCard = card => dispatch => {
  const promises = [dispatch(updateCardStartAction(card))];
  promises.push(
    set("cards", card.get("id"))
      .then(card => dispatch(updateCardSuccessAction(card)))
      .catch(error => dispatch(updateCardFailureAction(card.get("id"), error)))
  );
  return Promise.all(promises);
};

export const deleteCard = id => dispatch => {
  const promises = [dispatch(deleteCardStartAction(id))];
  promises.push(
    delete ("cards", id)
      .then(id => dispatch(deleteCardSuccessAction(id)))
      .catch(error => dispatch(deleteCardFailureAction(id, error)))
  );
  return Promise.all(promises);
};

////////////////////////////////////////////////////////////

export const createDeck = deck => dispatch => {
  const promises = [dispatch(createDeckStartAction(deck))];
  const id = uuid();
  promises.push(
    set("decks", id, deck.set("id", id))
      .then(deck => dispatch(createDeckSuccessAction(deck)))
      .catch(error => dispatch(createDeckFailureAction(error)))
  );
  return Promise.all(promises);
};

export const fetchDeck = id => dispatch => {
  const promises = [dispatch(fetchDeckStartAction(id))];
  promises.push(
    get("decks", id)
      .then(deck => dispatch(fetchDeckSuccessAction(deck)))
      .catch(error => dispatch(fetchDeckFailureAction(id, error)))
  );
  return Promise.all(promises);
};

export const fetchAllDecks = () => dispatch => {
  const promises = [dispatch(fetchAllDecksStartAction())];
  promises.push(
    getAll("decks")
      .then(decks => dispatch(fetchAllDecksSuccessAction(decks)))
      .catch(error => dispatch(fetchAllDecksFailureAction(error)))
  );
  return Promise.all(promises);
};

export const updateDeck = deck => dispatch => {
  const promises = [dispatch(updateDeckStartAction(deck))];
  const id = deck.get("id");
  promises.push(
    set("decks", id, deck)
      .then(deck => dispatch(updateDeckSuccessAction(deck)))
      .catch(error => dispatch(updateDeckFailureAction(id, error)))
  );
  return Promise.all(promises);
};

export const deleteDeck = id => dispatch => {
  const promises = [dispatch(deleteDeckStartAction(id))];
  promises.push(
    delete ("decks", id)
      .then(id => dispatch(deleteDeckSuccessAction(id)))
      .catch(error => dispatch(deleteDeckFailureAction(id, error)))
  );
  return Promise.all(promises);
};
