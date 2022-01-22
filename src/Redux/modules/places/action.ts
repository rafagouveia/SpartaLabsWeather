import { apiGoogle, apiOpenWeather } from "../../../../services/api"
import { deletePlaces, getPlaces, setPlaces, updatePlaces } from "../../../../services/localStorage"
import { RootNavigation } from "../../../Components"
import store from "../../store"
import { getWeather } from "../weather/action"
import { LOADING_WEATHER } from "../weather/types"
import { GET_PLACES, LOADING_PLACES, SET_PLACES } from "./types"

export const getCities = () => async (dispatch: any) => {
  try {
    dispatch({ type: LOADING_PLACES, loading: true })

    const cities: [] = await getPlaces()
    if (cities) {
      dispatch({ type: GET_PLACES, payload: cities })
      return cities
    }
    return []
  } catch (error) {
    throw new Error("Não foi possivel obter a lista de cidades salvas")
  } finally {
    dispatch({ type: LOADING_PLACES, loading: false })
  }
}


export const deleteCity = (city: string) => async (dispatch: any) => {
  try {
    dispatch({ type: LOADING_PLACES, loading: true })
    const cities: [] = await getPlaces()
    const refactor = cities.filter(el => el.place_id !== city)
    if (cities && refactor) {
      await dispatch({ type: GET_PLACES, payload: refactor })
      await deletePlaces(refactor)
    }
  } catch (error) {
    throw new Error("erro ao deletar a cidade")
  } finally {
    dispatch({ type: LOADING_PLACES, loading: false })
  }

}

export const favoriteCity = (city: string, value: boolean) => async (dispatch: any) => {
  try {
    const cities: [] = await getPlaces()
    if (cities) {
      const refactor = cities.map(el => {
        if (el.place_id === city) {

          return { ...el, favorite: !value }
        }
        return el
      })
      updatePlaces(refactor)
      dispatch({ type: SET_PLACES, payload: refactor })
    }
  } catch {

  }
}


export const searchCities = async (citie: string) => {
  try {
    const { data } = await apiGoogle.get("/place/autocomplete/json", {
      params: {
        input: citie,
        types: "(cities)"
      }
    })
    if (data) {
      return data.predictions
    }
    return []
  } catch (error) {
    throw new Error("Não foi possivel obter a lista de cidades");

  }
}

export const selectCity = (item: object) => async (dispatch: any) => {
  try {
    dispatch({ type: LOADING_WEATHER, loading: true })
    const place: [] = store.getState().placesState.payload
    const { place_id } = item

    const { data } = await apiGoogle.get(`/place/details/json`, {
      params: {
        place_id: place_id,
        fields: "geometry,formatted_address"
      }
    })

    if (data.status === "OK") {
      const { geometry, formatted_address } = data.result
      const weatherData = await getWeather(geometry.location)
      const location = {
        place_id: place_id,
        favorite: false,
        name: formatted_address,
        location: geometry.location,
        current: weatherData.current,
        daily: weatherData.daily
      }

      const refactor = await setPlaces(location, places)
      await dispatch({ type: GET_PLACES, payload: refactor })

    }
  } catch (error) {

    throw new Error("Erro ao selecionar a cidade da lista");

  } finally {
    dispatch({ type: LOADING_WEATHER, loading: false })
    RootNavigation.goBack()
  }
}


export const updateWeatherForPlace = () => async (dispatch: any) => {
  const place: [] = store.getState().placesState.payload

  if (place) {
    const updated = await Promise.all(
      place.map(async (el) => {
        const weatherData = await getWeather(el.location)
        return {
          ...el,
          current: weatherData.current,
          daily: weatherData.daily
        }
      })
    )

    dispatch({ type: GET_PLACES, payload: updated })
    await updatePlaces(updated)
  }
}