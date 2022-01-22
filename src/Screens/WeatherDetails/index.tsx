import React, { useEffect, useState } from "react"
import { FlatList, ScrollView, View, Image } from "react-native"
import { Appbar, Button, Portal, Dialog, Paragraph, Surface, Text, } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch } from "react-redux"
import { apiOpenWeather } from "../../../services/api"
import { getGrauType, getPlaces } from "../../../services/localStorage"
import { MView } from "../../Components"
import { deleteCity } from "../../Redux/modules/places/action"
import { convertToFahrenheit, moment } from "./../../../services/utils"
export default function WeatherDetails(props: any) {
  const dispatch = useDispatch()
  const { data } = props.route.params
  const [result, setResult] = useState([])
  const [modalDelete, setModalDelete] = useState(false)
  const [grauType, setGrauTypeState] = useState(props.route.params.grauType)

  const __handleDeleteCity = async (item: string) => {
    try {
      await dispatch(deleteCity(item))
    } finally {
      props.navigation.goBack()
    }
  }

  useEffect(() => {
    setResult(data.daily.slice(0, -2))
  }, [])

  const __renderCardsWeather = ({ item, index }) => {
    return (
      <MView my={12} flex={1}>
        <Surface style={{ padding: 15, borderRadius: 15 }}>
          <MView flexDirection="row" justifyContent="space-between" pb={32}>
            <MView>
              <Text style={{ fontSize: 24, fontWeight: "700", color: '#000', textTransform: "capitalize" }}>{index === 0 && "Hoje" || index === 1 && "Amanhã" || moment.unix(item.dt).format("dddd")}</Text>
              <Text style={{ fontSize: 15, color: '#000' }}>{moment.unix(item.dt).format("DD [de] MMMM")}</Text>
            </MView>
            <MView>
              <Text style={{ fontSize: 38, color: '#f28200' }}>{grauType ? convertToFahrenheit(item.temp.day) : Math.floor(item.temp.day)}º</Text>

            </MView>
          </MView>
          <MView style={{ flexDirection: 'row', justifyContent: "space-between" }}>

            <MView>
              <MView flexDirection="row" alignItems="center">
                <Image style={{ width: 18, height: 30 }} source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }} />
                <Text style={{ fontSize: 13, color: '#f28200', paddingLeft: 5, textTransform: "capitalize" }}>{item.weather[0].description}</Text>
              </MView>

              <Text style={{ fontSize: 13, color: '#000' }}>{grauType ? convertToFahrenheit(item.temp.min) : Math.floor(item.temp.min)}º / {grauType ? convertToFahrenheit(item.temp.max) : Math.floor(item.temp.max)}º</Text>
            </MView>

          </MView>
        </Surface>
      </MView>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action icon="chevron-left" onPress={() => props.navigation.goBack()} />
        <Appbar.Content title={data.name} />
        <Appbar.Action icon="delete-forever" onPress={() => setModalDelete(true)} />
      </Appbar.Header>
      <View style={{ flex: 1 }}>

        <Text style={{ textAlign: "center", paddingVertical: 10 }}>Previsão para os próximos 5 dias</Text>

        <FlatList
          data={result}
          extraData={result}
          nestedScrollEnabled={false}
          disableVirtualization={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={__renderCardsWeather}
          ListFooterComponent={
            <View>
              <Button contentStyle={{ height: 50, justifyContent: "center" }}
                style={{ borderRadius: 10 }}
                icon={() => <Icon name="delete-forever" color={"#FFF"} size={19} />}
                mode="contained"
                color={'#e00004'}
                onPress={() => setModalDelete(true)}>Remover Cidade</Button>
            </View>
          }
          ListFooterComponentStyle={{ marginVertical: 40 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <Portal>
        <Dialog visible={modalDelete} onDismiss={() => setModalDelete(false)}>
          <Dialog.Title>Deseja remover essa cidade?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Ao tocar em remover, você removerá a cidade da sua lista de cidades salvas.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalDelete(false)}>Cancelar</Button>
            <Button onPress={() => __handleDeleteCity(data.place_id)}>Remover</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}