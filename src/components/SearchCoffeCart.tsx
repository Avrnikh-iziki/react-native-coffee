import React, { FC } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useAppDispatch } from '../Redux/hooks';
import { add } from "../Redux/Reducer"
type itemtype = {
    item: {
        id: string,
        categories: string,
        specification: string,
        size?: string,
        quantity?: number,
        sold?: { price: number, message: string },
        image: string,
        coffeSize: Array<{ size: string, price: number, about: string }>
    }
}
const SearchCoffeCart: FC<itemtype> = ({ item }) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('CofeeDetail', { item })}
        >
            <Image source={{ uri: `${item.image}` }} style={styles.bgimage} />
            <View style={styles.detailsontainer}>
                <Text style={styles.name}>{item.categories}</Text>
                <Text style={styles.spesification}>{item.specification}</Text>
                <Text numberOfLines={2} style={styles.spesification}>{item.coffeSize[0].about}</Text>

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

export default SearchCoffeCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "95%",
        height: 120,
        marginTop: 5,
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "lightgray",
        borderRadius: 15,

    },
    bgimage: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,

    },

    detailsontainer: {
        marginLeft: 15,
        paddingVertical: 5,
        flex: 1
    },
    name: {
        marginTop: 5,
        fontSize: 20,
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
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 5

    },
    price: {
        color: "black",
        fontSize: 14,
        fontWeight: "800",
    },
    button: {
        padding: 2,
        width: 45,
        height: 25,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 13,
        width: "100%",
        height: "100%",
        borderRadius: 50,
        backgroundColor: "#0D5B28",
        textAlignVertical: "center",
        textAlign: "center"
    }
})