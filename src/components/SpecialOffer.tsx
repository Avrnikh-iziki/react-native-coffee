import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import React, { FC } from 'react'
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
const SpecialOffer:FC<itemtype>= ({ item }) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("CofeeDetail", { item })}
        >
            <Image source={{ uri: `${item.image}` }} style={styles.images} />
            <View style={styles.sold}>
                <Text style={styles.offertext}>Discount Sales</Text>
                <Text style={styles.text}>{item.sold.message}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SpecialOffer

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: "100%",
        flexDirection: "row",
        marginBottom: 15
    },
    images: {
        width: 80,
        height: 80,
        borderRadius: 15,
        marginRight: 5
    },
    sold: {
        height: 80,
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    offertext: {
        fontSize: 12,
        paddingVertical: 2,
        paddingHorizontal: 8,
        fontWeight: "500",
        color: "white",
        width: 140,
        borderRadius: 15,
        textAlign: "center",
        backgroundColor: "#DA9100"
    },
    text: {
        marginTop: 5,
        fontWeight: "500",
        color: "gray",
        fontSize: 12,

    }
})