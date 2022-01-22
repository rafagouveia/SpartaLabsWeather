import { apiOpenWeather } from "../../../../services/api"

export const getWeather = async ({ lat, lng }: { lat: number, lng: number }) => {
    const result = await apiOpenWeather.get("/onecall", {
        params: {
            lat: lat,
            lon: lng,
            units: "metric",
            lang: "pt_br"
        }
    })
    return result.data
}