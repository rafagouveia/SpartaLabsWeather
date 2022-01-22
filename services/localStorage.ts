import AsyncStorage from "@react-native-async-storage/async-storage";

export const getGrauType = async () => {
  try {
    const result = await AsyncStorage.getItem("grauType")
    return result === "true" ? true : false
  } catch (e) {
    console.error(e)
    throw new Error("Ocorreu um erro ao obter as cidades.")
  }
}

export const setGrauType = async (grau: boolean) => {
  try {
    const result = await AsyncStorage.setItem("grauType", grau ? "true" : "false")
    return result
  } catch (e) {
    console.error(e)
    throw new Error("Ocorreu um erro ao obter as cidades.")
  }
}


export const getPlaces = async () => {
  try {
    const result = await AsyncStorage.getItem("places")
    return JSON.parse(<string>result)
  } catch (e) {
    console.error(e)
    throw new Error("Ocorreu um erro ao obter as cidades.")
  }
}

export const setPlaces = async (location: object, locations: any[]) => {
  try {
    let array = locations || []

    if (locations.length) {
      if (!locations.some(el => el.place_id === location.place_id)) {
        array.push(location)
        await AsyncStorage.setItem("places", JSON.stringify(array))
        console.warn("Achei")
        return array
      }

    } else {
      array.push(location)
      await AsyncStorage.setItem("places", JSON.stringify(array))
      console.warn("Não achei")
      return array
    }
    return array

  } catch (e) {
    console.error(e)
    throw new Error("Ocorreu um erro ao setar as cidades.")
  }
}

export const updatePlaces = async (cities: any[]) => {
  try {

    await AsyncStorage.setItem("places", JSON.stringify(cities))

  } catch (e) {
    console.error(e)
    throw new Error("Ocorreu um erro ao setar as cidades.")
  }
}

export const deletePlaces = async (cities: any[]) => {
  try {

    await AsyncStorage.setItem("places", JSON.stringify(cities))

  } catch (e) {
    console.error(e)
    throw new Error("Ocorreu um erro ao setar as cidades.")
  }
}