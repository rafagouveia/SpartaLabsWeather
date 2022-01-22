import { GET_WEATHER, LOADING_WEATHER, REMOVE_WEATHER, SET_WEATHER } from "./types"
const initialWeatherReducer = {
  payload: [],
  loading: false
}
export const weatherReducer = (state = initialWeatherReducer, action: any) => {
  switch (action.type) {
    case SET_WEATHER:
      return {
        ...state,
        payload: action.payload,
      }
    case LOADING_WEATHER:
      return {
        ...state,
        loading: action.loading
      }
    case GET_WEATHER:
      return {
        ...state,
        payload: action.payload,
      }
    case REMOVE_WEATHER:
      return {
        ...state,
        payload: action.payload,
      }
    default:
      return state
  }
}