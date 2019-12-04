import { combineReducers } from "redux-immutable";
import { AppReducer } from "app";
import { RouterReducer } from "router";
import { reducer as formReducer } from "redux-form/immutable";
import { Map } from "immutable";

// import { DeckDetailReducer } from "deck-detail";
import { StorageReducer } from "storage";
import { ApiReducer } from "api";

export const rootReducer = combineReducers({
  [RouterReducer.STORE_KEY]: RouterReducer.reducer,
  form: formReducer,
  [ApiReducer.STORE_KEY]: ApiReducer.reducer
});

export const initialState = Map({
  [RouterReducer.STORE_KEY]: RouterReducer.initialState,
  [ApiReducer.STORE_KEY]: ApiReducer.initialState
});
