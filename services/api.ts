import axios from "axios";


const keyGoogle = "AIzaSyDN48HyLUTNxUgxyrRqvjmCBRNCRVBOfb0"
const keyOpenWeather = "8eb6366ad9d44c213c922bc9b77a15c1"
const apiGoogle = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api",
    params: {
        key: keyGoogle,
        language: "pt-BR",
        types: "geocode"
    }
})

const apiOpenWeather = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5",
    params: {
        appid: keyOpenWeather
    }
})





export { apiGoogle, apiOpenWeather }