import { navigate, NAVIGATE, NAVIGATE_BACK } from "./actions";
import { getLocationPathname } from "./selectors";
import { history } from "./helpers";
import { fromJS } from "immutable";

const RouterMiddleware = ({ dispatch, getState }) => {
  const syncNavigation = location => {
    if (location.pathname !== getLocationPathname(getState())) {
      dispatch(navigate(fromJS(location)));
    }
  };

  history.listen(syncNavigation);

  return next => action => {
    next(action);

    if (action.type === NAVIGATE) {
      history.push(action.payload.toJS());
    }

    if (action.type === NAVIGATE_BACK) {
      history.goBack();
    }
  };
};

export default RouterMiddleware;
