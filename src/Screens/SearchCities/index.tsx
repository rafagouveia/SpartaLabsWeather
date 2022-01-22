import React, { useState } from "react"
import { ActivityIndicator, Appbar, Modal, Portal, ProgressBar } from "react-native-paper"
import { FlatList, TextInput, TouchableOpacity } from "react-native"
import { MView, Text } from "../../Components"
import { searchCities, selectCity } from "../../Redux/modules/places/action"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from "react-redux"




export default function SearchCities(props: any) {
  const dispatch = useDispatch()
  const { loading: loadingWeather } = useSelector((state: RootState) => state.weatherState)
  const { payload: dataPlaces, loading: loadingPlaces } = useSelector((state: RootState) => state.placesState)
  const [query, setQuery] = useState("")
  const [result, setResult] = useState([])

  const __handleSearchCities = async (city: string) => {
    setQuery(city)
    const cities = await searchCities(city)
    setResult(cities)
  }

  const __handleSelectCity = (item: object) => {
    dispatch(selectCity(item))
  }

  const __renderListItems = ({ item }: { item: object }) => (
    <MView>
      <TouchableOpacity onPress={() => __handleSelectCity(item)}>
        <MView backgroundColor={"#fff"} borderRadius={10} margin={10} flexGrow={1} flexDirection="row" px={10} py={15} alignItems="center" justifyContent="space-between">
          <MView flex={1}>
            <Text fontSize={15}>{item.description}</Text>
          </MView>
          <MView pl={20}>
            <Icon name="arrow-right" size={25} />
          </MView>
        </MView>
      </TouchableOpacity>
    </MView>
  )
  const EmptyResult = () => (
    <MView flex={1} px={24}>
      <MView>

        <Text style={{ fontSize: 16, textAlign: "center", paddingTop: 16 }}>
          {query.length > 1 && "Não foi encontrado nenhuma cidade"}
          {!query.length && "Busque pelo nome da cidade desejada"}
        </Text>
      </MView>
    </MView>
  )
  return (
    <MView flex={1}>
      <Appbar.Header >
        <Appbar.Action icon="arrow-left" onPress={() => props.navigation.goBack()} />
        <TextInput onChangeText={(text) => __handleSearchCities(text)} underlineColorAndroid={"#fff8"} placeholderTextColor="#fff8" placeholder="Buscar cidade" style={{ color: "#fff", fontSize: 18, flex: 1, borderRadius: 8 }} value={query} />
        <Appbar.Action icon="close" onPress={() => setQuery("")} />
      </Appbar.Header>
      <MView flex={1}>
        <FlatList
          data={result}
          extraData={result}
          renderItem={__renderListItems}
          ListEmptyComponent={EmptyResult}
          keyExtractor={(item, index) => index.toString()}
        />
      </MView>
      <Portal>
        <Modal visible={loadingWeather}>
          <MView justifyContent="center" alignItems="center" backgroundColor="#fff" p={32} mx={32} borderRadius={15}>
            <MView>
              <ActivityIndicator animating={true} size={40} />
            </MView>
            <MView mt={30}>
              <Text>Adicionando a cidade</Text>
            </MView>
          </MView>

        </Modal>
      </Portal>
    </MView>
  )
}