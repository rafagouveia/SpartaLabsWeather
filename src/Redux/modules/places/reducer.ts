import { SET_PLACES, LOADING_PLACES, REMOVE_PLACES, GET_PLACES } from "./types"

const initialPlacesReducer = {
  payload: [],
  loading: false
}
export const placesReducer = (state = initialPlacesReducer, action: any) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        payload: action.payload
      }
    case LOADING_PLACES:
      return {
        ...state,
        loading: action.loading
      }
    case REMOVE_PLACES:
      return {
        ...state,
        payload: action.payload
      }
    case GET_PLACES:
      return {
        ...state,
        payload: action.payload
      }
    default:
      return state
  }
}