import { combineReducers } from "redux"
import { placesReducer } from "./places/reducer"
import { weatherReducer } from "./weather/reducer"
export const Reducers = combineReducers({
    weatherState: weatherReducer,
    placesState: placesReducer
})

declare global {
    export type RootState = ReturnType<typeof Reducers>
}