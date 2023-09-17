import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, FC } from 'react'
import { incriment, decriment, cupSize } from '../Redux/Reducer'
import { useAppDispatch } from '../Redux/hooks'
type el = {
    size: string,
    price: number,
    about: string
}
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

const OrderCart: FC<itemtype> = ({ item }) => {

    const [priceCupSize, setPriceCupSize] = useState(0)
    const [sizeSelected, setsizeSelected] = useState("")
    const selectCupSize = (size: string) => {
        setsizeSelected(size)
        dispatch(cupSize({ id: item.id, size: size }))
        item.coffeSize.forEach((el: el) => {
            if (el.size == size) {
                setPriceCupSize(el.price)
            }
        })
    }

    useEffect(() => {
        selectCupSize(item.size || "Small")
    }, [])

    const dispatch = useAppDispatch()
    return (
        <View style={styles.container}>
            <Image source={{ uri: `${item.image}` }} style={styles.image} />
            <View style={styles.detail} >
                <View style={styles.titles}>
                    <Text style={styles.categories}>{item.categories}</Text>
                    <Text style={styles.specification}>{item.specification}</Text>
                </View>
                <View style={styles.generalactions}>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            onPress={() => selectCupSize("Small")}
                        >
                            <Text style={[styles.sizetext, dynamicStyles.size(sizeSelected, "Small")]} >Small</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => selectCupSize("Medium")}
                        >
                            <Text style={[styles.sizetext, dynamicStyles.size(sizeSelected, "Medium")]}>Medium</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => selectCupSize("Large")}
                        >
                            <Text style={[styles.sizetext, dynamicStyles.size(sizeSelected, "Large")]}>Large</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => dispatch(incriment(item.id))}
                        >
                            <Text style={styles.signs}>+</Text>
                        </TouchableOpacity>
                        <Text>{item.quantity}</Text>
                        <TouchableOpacity
                            onPress={() => dispatch(decriment(item.id))}
                        >
                            <Text style={styles.signs}>-</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.unitprice}>
                        <Text style={styles.unitpricetext}>{item.quantity}</Text>
                        <Text >{(item.quantity * priceCupSize).toFixed(2)}$</Text>
                        <Text style={styles.unitpricetext} >{priceCupSize}</Text>
                    </View>
                </View>
            </View >
        </View >
    )
}

export default OrderCart
const dynamicStyles: { size: Function } = {
    size: (name: string, curent: string) => {
        return {
            backgroundColor: name === curent ? "#DA9100" : "#0D5B28",
        }
    },
}
const styles = StyleSheet.create({
    container: {
        height: 80,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "lightgray",
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: "row"
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 5
    },
    detail: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5
    },
    titles: {
        height: "100%",
        flex: 0.4,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    categories: {
        letterSpacing: 2,
        fontSize: 12,
        fontWeight: "bold"
    },
    specification: {
        fontSize: 9,
    },
    generalactions: {
        flex: .7,
        height: "100%",
        justifyContent: "center",
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sizetext: {
        padding: 1,
        marginLeft: 1,
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: "#0D5B28",
        fontSize: 11,
        borderRadius: 2,
        fontWeight: "bold",
        color: "white"
    },
    button: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5
    },
    signs: {
        height: 16,
        fontSize: 10,
        paddingHorizontal: 18,
        backgroundColor: "#0D5B28",
        color: "white",
        fontWeight: "bold",
        textAlignVertical: "center",
        borderRadius: 2,
        marginBottom: 5
    },
    unitprice: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    unitpricetext: {
        backgroundColor: "#0D5B28",
        width: 42,
        fontSize: 12,
        fontWeight: "bold",
        color: "white",
        borderRadius: 2,
        textAlign: "center"
    },

})