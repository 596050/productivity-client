import {
  CREATE_CARD_START,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_FAILURE,
  FETCH_CARD_START,
  FETCH_CARD_SUCCESS,
  FETCH_CARD_FAILURE,
  FETCH_ALL_CARDS_START,
  FETCH_ALL_CARDS_SUCCESS,
  FETCH_ALL_CARDS_FAILURE,
  UPDATE_CARD_START,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAILURE,
  DELETE_CARD_START,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  CREATE_DECK_START,
  CREATE_DECK_SUCCESS,
  CREATE_DECK_FAILURE,
  FETCH_DECK_START,
  FETCH_DECK_SUCCESS,
  FETCH_DECK_FAILURE,
  FETCH_ALL_DECKS_START,
  FETCH_ALL_DECKS_SUCCESS,
  FETCH_ALL_DECKS_FAILURE,
  UPDATE_DECK_START,
  UPDATE_DECK_SUCCESS,
  UPDATE_DECK_FAILURE,
  DELETE_DECK_START,
  DELETE_DECK_SUCCESS,
  DELETE_DECK_FAILURE
} from "./actions";
import { Map } from "immutable";
import { Card, Deck } from "./records";

export { STORE_KEY } from "./selectors";
export const initialState = Map({
  cards: Map(),
  decks: Map(),
  loading: Map({
    cards: Map(),
    decks: Map()
  }),
  errors: Map({
    cards: Map(),
    decks: Map()
  })
});

export const reducer = (state = initialState, { meta, payload, type }) => {
  switch (type) {
    case CREATE_CARD_START: {
      return state
        .deleteIn(["errors", "cards", "new"])
        .setIn(["loading", "cards", "new"], true);
    }
    case CREATE_CARD_SUCCESS: {
      return state
        .setIn(["cards", payload.get("id")], Card(payload))
        .setIn(["loading", "cards", "new"], false);
    }
    case CREATE_CARD_FAILURE: {
      return state
        .setIn(["errors", "cards", "new"], payload)
        .setIn(["loading", "cards", "new"], false);
    }
    case FETCH_CARD_START: {
      return state
        .deleteIn(["errors", "cards", payload])
        .setIn(["loading", "cards", payload], true);
    }
    case FETCH_CARD_SUCCESS: {
      const id = payload.get("id");
      return state
        .setIn(["cards", id], Card(payload))
        .setIn(["loading", "cards", id], false);
    }
    case FETCH_CARD_FAILURE: {
      const id = meta.get("id");
      return state
        .setIn(["errors", "cards", id], payload)
        .setIn(["loading", "cards", id], false);
    }
    case FETCH_ALL_CARDS_START: {
      return state
        .deleteIn(["errors", "cards", "all"])
        .setIn(["loading", "cards", "all"], true);
    }
    case FETCH_ALL_CARDS_SUCCESS: {
      return state
        .set("cards", payload.map(card => Card(card)))
        .setIn(["loading", "cards", "all"], false);
    }
    case FETCH_ALL_CARDS_FAILURE: {
      return state
        .setIn(["errors", "cards", "all"], payload)
        .setIn(["loading", "cards", "all"], false);
    }
    case UPDATE_CARD_START: {
      const id = payload.get("id");
      return state
        .deleteIn(["errors", "cards", id])
        .setIn(["loading", "cards", id], true);
    }
    case UPDATE_CARD_SUCCESS: {
      const id = payload.get("id");
      return state
        .setIn(["cards", id], Card(payload))
        .setIn(["loading", "cards", id], false);
    }
    case UPDATE_CARD_FAILURE: {
      const id = meta.get("id");
      return state
        .setIn(["errors", "cards", id], payload)
        .setIn(["loading", "cards", id], false);
    }
    case DELETE_CARD_START: {
      return state
        .deleteIn(["errors", "cards", payload])
        .setIn(["loading", "cards", payload], true);
    }
    case DELETE_CARD_SUCCESS: {
      return state
        .deleteIn(["cards", payload])
        .deleteIn(["loading", "cards", payload]);
    }
    case DELETE_CARD_FAILURE: {
      const id = meta.get("id");
      return state
        .setIn(["errors", "cards", id], payload)
        .setIn(["loading", "cards", id], false);
    }
    case CREATE_DECK_START: {
      return state
        .deleteIn(["errors", "decks", "new"])
        .setIn(["loading", "decks", "new"], true);
    }
    case CREATE_DECK_SUCCESS: {
      return state
        .setIn(["decks", payload.get("id")], Deck(payload))
        .setIn(["loading", "decks", "new"], false);
    }
    case CREATE_DECK_FAILURE: {
      return state
        .setIn(["errors", "decks", "new"], payload)
        .setIn(["loading", "decks", "new"], false);
    }
    case FETCH_DECK_START: {
      return state
        .deleteIn(["errors", "decks", payload])
        .setIn(["loading", "decks", payload], true);
    }
    case FETCH_DECK_SUCCESS: {
      const id = payload.get("id");
      return state
        .setIn(["decks", id], Deck(payload))
        .setIn(["loading", "decks", id], false);
    }
    case FETCH_DECK_FAILURE: {
      const id = meta.get("id");
      return state
        .setIn(["errors", "decks", id], payload)
        .setIn(["loading", "decks", id], false);
    }
    case FETCH_ALL_DECKS_START: {
      return state
        .deleteIn(["errors", "decks", "all"])
        .setIn(["loading", "decks", "all"], true);
    }
    case FETCH_ALL_DECKS_SUCCESS: {
      const newState = state
        .set("decks", payload.map(deck => Deck(deck)))
        .setIn(["loading", "decks", "all"], false);
      return newState;
    }
    case FETCH_ALL_DECKS_FAILURE: {
      return state
        .setIn(["errors", "decks", "all"], payload)
        .setIn(["loading", "decks", "all"], false);
    }
    case UPDATE_DECK_START: {
      const id = payload.get("id");
      return state
        .deleteIn(["errors", "decks", id])
        .setIn(["loading", "decks", id], true);
    }
    case UPDATE_DECK_SUCCESS: {
      const id = payload.get("id");
      return state
        .setIn(["decks", id], Deck(payload))
        .setIn(["loading", "decks", id], false);
    }
    case UPDATE_DECK_FAILURE: {
      const id = meta.get("id");
      return state
        .setIn(["errors", "decks", id], payload)
        .setIn(["loading", "decks", id], false);
    }
    case DELETE_DECK_START: {
      return state
        .deleteIn(["errors", "decks", payload])
        .setIn(["loading", "decks", payload], true);
    }
    case DELETE_DECK_SUCCESS: {
      return state
        .deleteIn(["decks", payload])
        .deleteIn(["loading", "decks", payload]);
    }
    case DELETE_DECK_FAILURE: {
      const id = meta.get("id");
      return state
        .setIn(["errors", "decks", id], payload)
        .setIn(["loading", "decks", id], false);
    }
    default: {
      return state;
    }
  }
};

//Map({ a: 1, b: 2 }).map(x => 10 * x)
