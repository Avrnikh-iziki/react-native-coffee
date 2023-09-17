import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { FC } from 'react'
import { useAppSelector } from '../Redux/hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MaterialIcons } from "@expo/vector-icons"
import OrderCart from '../components/OrderCart'
const Cart :FC= () => {
  const data = useAppSelector((state) => state.coffee.coffee).slice(1)


  const calculeTotale = () => {
    let total = 0
    data.forEach(el => {
      el.coffeSize.forEach(cof => {
        if (el.size === cof.size)
          total += el.quantity * cof.price
      })
    })
    return total.toFixed(2)
  }


  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headercontainer}>
        <TouchableOpacity
          style={styles.goback}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="keyboard-arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.gobackText}>Your Orders</Text>
      </View>
      <View style={styles.itmsFlatlist}>
        {
          data.length > 0
            ?
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <OrderCart item={item} />
              )}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}

            />
            : <Text style={styles.noResult}>you dont have any orders</Text>
        }
      </View>
      {data.length > 0 &&
        <View style={styles.container}>
          <Text style={styles.total}>total : {calculeTotale()} $</Text>
        </View>
      }
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginBottom: 20
  },
  container: {
    borderTopColor: "gray",
    borderTopWidth: 2,
    width: "40%",
    marginHorizontal: 20,
    alignSelf: "flex-end",
    alignItems: "center"
  },
  headercontainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginVertical: 20,


  },
  goback: {
    backgroundColor: '#DA9100',
    width: 30,
    height: 30,
    borderRadius: 50,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  gobackText: {
    fontWeight: "600",
    backgroundColor: "#DA9100",
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 50,
    color: "white",
  },
  itmsFlatlist: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 10
  },
  noResult: {
    width: "100%",
    color: "gray",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 50,
  },
  total: {
    color: "gray",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 2

  }
})