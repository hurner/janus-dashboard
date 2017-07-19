import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// here import all your reducers from all your modules
import apiResponseModalReducer from './apiResponse.reducer';
import apiListReducer from './apiList.reducer';
import apiReducer from './api.reducer';
import searchReducer from './search.reducer';

export default combineReducers({
  // here combine all reducers:
  apiResponseModalReducer,
  apiListReducer,
  apiReducer,
  searchReducer,
  form: formReducer,
});