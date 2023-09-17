import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRoute, useNavigation, ParamListBase, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import SearchCoffeCart from "../components/SearchCoffeCart"

import React, { useEffect, useState, FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

type paramlist = {
    data: {
        c_data: Array<{
            id: string,
            categories: string,
            specification: string,
            sold?: { price: number, message: string },
            image: string,
            coffeSize: Array<{ size: string, price: number, about: string }>
        }>,
        search: {
            search: string
        }
    }
}

const Search: FC = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const { c_data, search } = route.params
        setData(c_data.filter((el) => el.categories.toUpperCase().includes(search.toString().toUpperCase())))
    }, [])
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute<RouteProp<paramlist, "data">>()
    return (
        <SafeAreaView>
            <View style={styles.headercontainer}>
                <TouchableOpacity
                    style={styles.goback}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.gobackText}>Search Result</Text>
            </View>
            <View style={styles.container}>
                {
                    data.length > 0
                        ? <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <SearchCoffeCart item={item} />
                            )}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                        />
                        : <Text style={styles.noResult}>No result</Text>
                }

            </View>
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        marginBottom: 30
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
    noResult: {
        width: "100%",
        color: "gray",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 50,
    }
})