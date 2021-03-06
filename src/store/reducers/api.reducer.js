import R from 'ramda'

import {
  FETCH_ENDPOINT_START,
  FETCH_ENDPOINT_SUCCESS,
  FETCH_ENDPOINT_SCHEMA_START,
  FETCH_ENDPOINT_SCHEMA_SUCCESS,
  SET_DEFAULT_ENDPOINT,
  EXCLUDE_PLUGIN,
  SELECT_PLUGIN,
  RESET_ENDPOINT,

  SAVE_ENDPOINT_START,
  SAVE_ENDPOINT_SUCCESS,
  SAVE_ENDPOINT_FAILURE,
  DELETE_ENDPOINT_START,
  DELETE_ENDPOINT_SUCCESS,
  DELETE_ENDPOINT_FAILURE
} from '../constants'

export const initialState = {
  api: {},
  apiSchema: {},
  selectedPlugins: [],
  isFetching: false
}

export const adjust = api => api
export const fillSelectedPlugins = api => api.plugins.map(item => item.name)

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SAVE_ENDPOINT_START:
    case DELETE_ENDPOINT_START:
    case FETCH_ENDPOINT_START:
    case FETCH_ENDPOINT_SCHEMA_START: {
      return {
        ...state,
        isFetching: true
      }
    }
    case SAVE_ENDPOINT_SUCCESS:
    case SAVE_ENDPOINT_FAILURE:
    case DELETE_ENDPOINT_SUCCESS:
    case DELETE_ENDPOINT_FAILURE: {
      return {
        ...state,
        isFetching: false
      }
    }
    case FETCH_ENDPOINT_SCHEMA_SUCCESS: {
      return {
        ...state,
        apiSchema: action.payload,
        isFetching: false
      }
    }
    case SET_DEFAULT_ENDPOINT: {
      return {
        ...state,
        api: action.payload
      }
    }
    case FETCH_ENDPOINT_SUCCESS: {
      return {
        ...state,
        api: adjust(action.payload.api),
        response: action.payload.response,
        selectedPlugins: fillSelectedPlugins(action.payload.api),
        isFetching: false
      }
    }
    case EXCLUDE_PLUGIN: {
      return {
        ...state,
        selectedPlugins: R.without(action.payload, state.selectedPlugins)
      }
    }
    case SELECT_PLUGIN: {
      return {
        ...state,
        selectedPlugins: state.selectedPlugins.concat(action.payload)
      }
    }
    case RESET_ENDPOINT: {
      return initialState
    }
    default:
      return state
  }
}
