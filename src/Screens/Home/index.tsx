import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, Modal, TouchableOpacity, StatusBar, Image } from "react-native"
import { Appbar, Searchbar, Surface, Text, TextInput, List, Switch, Button } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { MView } from "../../Components";
import { apiGoogle, apiOpenWeather } from "../../../services/api";
import { padding, paddingRight } from "styled-system";
import { getGrauType, getPlaces, setGrauType, setPlaces } from "../../../services/localStorage";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { useNavigation } from "@react-navigation/native";
import theme from "./../../Components/theme"
import { useDispatch, useSelector } from "react-redux";
import { favoriteCity, getCities, searchCities, updateWeatherForPlace } from "../../Redux/modules/places/action";
import { convertToFahrenheit } from "../../../services/utils";
import CardWeather from "./CardWeather";

export default function Home(props: any) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { payload, loading } = useSelector((state: RootState) => state.placesState)
  const [grauType, setGrauTypeState] = useState(false)

  useEffect(() => {
    getGrauType().then(response => {
      setGrauTypeState(response)
    })
    dispatch(getCities())
  }, [])

  useEffect(() => {
    dispatch(updateWeatherForPlace())
    let timer = setInterval(() => {

      dispatch(updateWeatherForPlace())

    }, 1000 * 30)

    return () => clearInterval(timer)
  }, [])

  const sortCities = (data: any[]) => {
    const sorties = data.sort((a, b) => a.favorite ? -1 : 1 && b.favorite ? 1 : -1)
    return sorties
  }

  const __handleSetGrauType = () => {
    setGrauTypeState(state => !state)
    setGrauType(!grauType)
  }

  const EmptyResult = () => {
    return (
      <MView mt={32}>
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "700" }}>
          Parece que você ainda não adicionou nenhuma cidade
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center", paddingTop: 16 }}>
          Tente adicionar uma cidade usando o botão de busca
        </Text>
        <MView mt={32}>
          <Button contentStyle={{ height: 50, justifyContent: "center" }}
            style={{ borderRadius: 10 }}
            icon={() => <Icon name="magnify" color={"#FFF"} size={19} />}
            mode="contained"
            color={theme.colors.primary}
            onPress={() => props.navigation.navigate("SearchCities")}>Buscar cidade</Button>
        </MView>
      </MView>
    )
  }

  return (
    <MView >
      <StatusBar backgroundColor={theme.colors.primary} />
      <Appbar.Header>
        <Appbar.Action />
        <Appbar.Content style={{ flex: 1, alignItems: "center" }} title="SpartaLabs Weather" />
        <Appbar.Action icon="magnify" onPress={() => props.navigation.navigate("SearchCities")} />
      </Appbar.Header>
      <MView flexDirection="row" alignItems="center" justifyContent="flex-end" px={24} py={10}>
        <Text style={{ fontWeight: "700", color: "#0008" }}>Fahrenheit (Fº)</Text>
        <MView pl={10}>
          <Switch color={theme.colors.primary} value={grauType} onValueChange={__handleSetGrauType} />
        </MView>
      </MView>
      <MView>
        <FlatList
          data={sortCities(payload)}
          extraData={sortCities(payload)}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          ListEmptyComponent={EmptyResult}
          renderItem={({ item }) => <CardWeather item={item} grauType={grauType} />}
          keyExtractor={(item, index) => item.name}
        />
      </MView>
    </MView>
  )
}