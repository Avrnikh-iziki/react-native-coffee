import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation, ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EvilIcons, MaterialIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import React, { useState ,FC } from 'react'
import { add } from "../Redux/Reducer"
import { useAppDispatch } from '../Redux/hooks';

type paramlist = {
    item: {
        item: {
            id: string,
            categories: string,
            specification: string,
            sold?: { price: number, message: string },
            image: string,
            coffeSize: Array<{ size: string, price: number, about: string }>
        },
    }

}
type el = {
    size: string,
    price: number,
    about: string
}
const CoffeeDetail:FC = () => {
    const dispatch = useAppDispatch()
    const route = useRoute<RouteProp<paramlist, "item">>()
    const { item } = route.params
    const [size, setSize] = useState('Small')
    const [elSelected, setElSelected] = useState(item.coffeSize[0])
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const aboutSize = (arr: el[], size: string) => {
        setSize(size)
        arr.forEach((el) => {
            if (el.size === size) setElSelected(el)
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bgcontainer}>
                <ImageBackground source={{ uri: `${item.image}` }} style={styles.bgimage} >
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="keyboard-arrow-left" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => console.log('liked')}
                        >
                            <EvilIcons name="heart" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttom}>
                        <View >
                            <Text style={styles.catergories} >{item.categories}</Text>
                            <Text style={styles.specification}>{item.specification}</Text>
                        </View>
                        <View style={styles.starContainer}>
                            <EvilIcons name="star" size={18} color="white" />
                            <Text style={styles.rating}>4.5</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.types}>
                    <View style={[styles.generaltypes, styles.coffee]}>
                        <MaterialCommunityIcons name="coffee" size={19} color="#DA9100" />
                        <Text style={styles.generaltext}>Coffee</Text>
                    </View>
                    <View style={styles.generaltypes}>
                        <MaterialCommunityIcons name="cup" size={18} color="#DA9100" />
                        <Text style={styles.generaltext}>Choclate</Text>
                    </View>
                    <View style={[styles.generaltypes, styles.roasted]}>
                        <Fontisto name="coffeescript" size={16} color="#DA9100" />
                        <Text style={styles.generaltext}>roated Miduim</Text>
                    </View>
                </View>
                <Text style={styles.sizes}>Coffee Size</Text>
                <View style={styles.pressSize}>
                    {item.coffeSize.map((el: el, index: number) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => aboutSize(item.coffeSize, el.size)}
                        >
                            <Text style={dynamicStyles.coptext(el.size, size)}> {el.size}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.about}>About</Text>
                <View style={styles.aboutcontetnt}>
                    <Text numberOfLines={4} style={styles.description}>
                        {
                            elSelected.about
                        }
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.addtocart}
                    onPress={() => {
                        dispatch(add({ ...item, size }))
                        navigation.navigate('Home')
                    }}
                >
                    <Text style={styles.addtocarttext}>Add to Cart</Text>
                    <Text style={styles.addtocartprice}>$ {elSelected.price}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CoffeeDetail
const dynamicStyles: { coptext: Function } = {
    coptext: (name: string, curent: string) => {
        return {
            paddingVertical: 2,
            paddingHorizontal: 12,
            borderRadius: 20,
            fontSize: 14,
            fontWeight: "600",
            backgroundColor: name === curent ? "#0D5B28" : "white",
            color: name === curent ? "white" : "black",
            alignItems: "center",
            justifyContent: "center"
        }
    },

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgcontainer: {
        flex: 1.2,
    },
    bgimage: {
        width: "100%",
        height: "100%",
        paddingTop: 30,
        alignItems: "center",
        justifyContent: "space-between"
    },
    header: {
        width: "100%",
        height: 50,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    icon: {
        width: 25,
        height: 25,
        backgroundColor: "white",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    buttom: {
        width: "100%",
        marginBottom: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30
    },
    catergories: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 5
    },
    specification: {
        color: "white",
        fontSize: 10,
    },
    rating: {
        color: "white",
        marginLeft: 4
    },
    starContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DA9100",
        paddingHorizontal: 15,
        borderRadius: 30,
        height: 20
    },
    detailContainer: {
        backgroundColor: "white",
        flex: 1,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 20,
        width: "100%",
        height: "100%",
        paddingHorizontal: 20
    },
    types: {
        width: "100%",
        height: 50,
        backgroundColor: "#D3D3D3",
        alignSelf: "center",
        borderRadius: 50,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"

    },
    generaltypes: {
        flex: .3,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700"
    },
    coffee: {
        borderRightColor: "red",
        borderRightWidth: 1,
    },

    roasted: {
        borderLeftColor: "red",
        borderLeftWidth: 1,
        flex: .4,
    },
    generaltext: {
        fontWeight: "500",
        color: "gray",
        marginLeft: 2
    },
    sizes: {
        marginTop: 20,
        fontSize: 15,
        fontWeight: "600",
        color: "gray"
    },
    pressSize: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between",
        marginTop: 5,

    },
    about: {
        color: "gray",
        fontSize: 15,
        fontWeight: "600",
        marginTop: 20
    },
    aboutcontetnt: {
        width: "100%"
    },
    description: {
        color: "gray",
        paddingLeft: 10,
        fontSize: 13
    },
    addtocart: {
        marginTop: 30,
        width: "80%",
        height: 50,
        flexDirection: "row",
        borderRadius: 30,
        backgroundColor: "#0D5B28",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    addtocarttext: {
        flex: .6,
        borderRightColor: "white",
        borderRightWidth: 1,
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "500"

    },
    addtocartprice: {
        flex: .3,
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontWeight: "bold"
    }

})