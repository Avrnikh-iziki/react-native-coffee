import React, { FC } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useAppDispatch } from '../Redux/hooks';
import { add } from "../Redux/Reducer"
type itemtype = {
  item: {
    id: string,
    categories: string,
    specification: string,
    sold?: { price: number, message: string },
    image: string,
    coffeSize: Array<{ size: string, price: number, about: string }>
  }
}
const CoffeeCart: FC<itemtype> = ({ item }) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('CofeeDetail', { item })}
    >
      <View style={styles.imagecontainer}>
        <ImageBackground source={{ uri: `${item.image}` }} style={styles.bgimage} imageStyle={{ borderRadius: 15 }} >
          <View style={styles.inerimagebg}></View>
        </ImageBackground>
      </View>
      <View style={styles.detailsontainer}>
        <Text style={styles.name}>{item.categories}</Text>
        <Text style={styles.spesification}>{item.specification}</Text>
        <View style={styles.price_add}>
          <Text style={styles.price}>$ {item.coffeSize[0].price}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(add(item))}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CoffeeCart

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: 120,
    height: 160,
  },
  imagecontainer: {
    width: "100%",
    height: 80,
    borderRadius: 15,
  },
  bgimage: {
    width: 120,
    height: 80,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,

  },
  inerimagebg: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15,15,15,.5)",
    borderRadius: 15,
  },
  detailsontainer: {
    marginLeft: 5,
    paddingVertical: 5,
  },
  name: {
    marginTop: 0,
    fontSize: 16,
    fontWeight: "600",
    color: "gray",
    letterSpacing: 2

  },
  spesification: {
    fontSize: 12,
    fontWeight: "500",
    color: "gray",
  },
  price_add: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5

  },
  price: {
    color: "black",
    fontSize: 12,
    fontWeight: "700",
  },
  button: {
    padding: 2,
    width: 30,
    height: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#0D5B28",
    textAlignVertical: "center",
    textAlign: "center"
  }
})