import React from "react"
import { TouchableOpacity, Image } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { convertToFahrenheit } from "../../../services/utils"
import { MView, Text } from "../../Components"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { favoriteCity } from "../../Redux/modules/places/action"

export default function CardWeather(props: any) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { grauType, item } = props

  const __handleFavoriteCity = (city: string, value: boolean) => {
    dispatch(favoriteCity(city, value ? true : false))
  }
  const __formatNamePlace = (name: string) => {
    const splited = name.split(",") || 0
    const fomated = {
      country: splited[2] ? splited[2].trim() : "",
      city: splited[0] ? splited[0].trim() : "",
      state: splited[1] ? (` - ${splited[1].trim()}`) : ""
    }

    return fomated
  }
  return (
    <TouchableOpacity style={{ flex: 1, overflow: "hidden", borderRadius: 15, marginVertical: 8 }}
      onPress={() => navigation.navigate("WeatherDetails", {
        data: item,
        grauType: grauType
      })}
    >
      <MView padding={15} backgroundColor="#fff">
        <MView flexDirection="column">
          <MView flex={1} flexDirection="row" alignItems="center" pb={32} justifyContent="space-between">
            <MView flex={1} paddingRight={10}>
              <Text style={{ fontSize: 18, color: '#000' }}>{__formatNamePlace(item.name).city}{__formatNamePlace(item.name).state}</Text>
              <Text style={{ fontSize: 15, color: '#000' }}>{__formatNamePlace(item.name).country}</Text>
            </MView>
            <MView>
              <Text style={{ fontSize: 38, color: '#f28200' }}>{grauType ? convertToFahrenheit(item.current.temp) : Math.floor(item.current.temp)}º</Text>
            </MView>
          </MView>
          <MView flexDirection="row" justifyContent="space-between">
            <MView>
              <MView flexDirection="row" alignItems="center">
                <Image style={{ width: 25, height: 30 }} source={{ uri: `http://openweathermap.org/img/wn/${item.current.weather[0].icon}@2x.png` }} />
                <Text style={{ fontSize: 13, color: '#f28200', paddingLeft: 5, textTransform: "capitalize" }}>{item.current.weather[0].description}</Text>
              </MView>
              <Text style={{ fontSize: 13, color: '#000' }}>{grauType ? convertToFahrenheit(item.daily[0].temp.min) : Math.floor(item.daily[0].temp.min)}º / {grauType ? convertToFahrenheit(item.daily[0].temp.max) : Math.floor(item.daily[0].temp.max)}º</Text>
            </MView>
            <MView>
              <TouchableOpacity onPress={() => __handleFavoriteCity(item.place_id, item.favorite)} style={{ padding: 8, borderRadius: 50 }}>
                <Text style={{ fontSize: 25, color: '#ed0952' }}>
                  {item.favorite && <Icon name="heart" color='#ed0952' size={29} />}
                  {!item.favorite && <Icon name="heart-outline" color='#ed0952' size={29} />}
                </Text>
              </TouchableOpacity>
            </MView>
          </MView>
        </MView>
      </MView>
    </TouchableOpacity>
  )
}