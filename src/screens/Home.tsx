import React, { useState, useEffect, FC } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    View,
    Image,
    TextInput,
} from 'react-native'
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
    FontAwesome,
    Ionicons,
    Entypo,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import CoffeeCart from '../components/CoffeeCart';
import SpecialOffer from '../components/SpecialOffer';
import { signOut } from 'firebase/auth'
import { FIRSEBASE_AUTH } from '../../firebaseConfig';

const data = {
    localisation: "Marraksh, Morocco",
    username: "Najib iziki"
}
import { get } from "../api/store"
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
type coffee = {
    name: string,
    icon: MaterialIconName
}
const coffeelist: coffee[] = [
    { name: 'Black', icon: "coffee-maker" },
    { name: 'Latte', icon: "coffee" },
    { name: 'Cappuccino', icon: "coffee-maker-check" },
    { name: 'Americano', icon: "coffee-maker-check-outline" },
    { name: 'Espresso', icon: "coffee-off" },
    { name: 'Doppio', icon: "coffee-to-go" }]


const Home: FC = () => {
    const auth = FIRSEBASE_AUTH
    const [loaded, setLoading] = useState(false)
    const [C_coffe, setC_coffe] = useState('Black')
    const [search, setsearch] = useState('')
    const [slected, setSelected] = useState([])
    const [c_data, setC_Data] = useState([])
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const getdata = async () => {
        const data = await get()
        setC_Data(data)
        setSelected(data.filter((el: any) => el.categories === C_coffe))
        setLoading(true)
    }
    useEffect(() => {
        getdata()
        setSelected(c_data.filter((el) => el.categories === C_coffe))
    }, [C_coffe])

    return (
        <> {
            loaded
                ? <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => signOut(auth)}
                            style={styles.image}
                        >
                            <Image source={require('../../assets/profile.jpg')} style={styles.img} />
                        </TouchableOpacity>
                        <View style={styles.localisation}>
                            <FontAwesome name="map-marker" size={18} color="#0D5B28" />
                            <Text style={styles.city}>{data.localisation}</Text>
                        </View>
                        <View style={styles.notification}>
                            <Ionicons name="md-notifications-outline" size={24} color="#0D5B28" />
                        </View>
                    </View>
                    <View style={styles.search}>
                        <View style={styles.searshIcon}>
                            <FontAwesome name="search" size={20} color="#DA9100" />
                        </View>
                        <TextInput
                            style={styles.textinput}
                            value={search}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text) => setsearch(text)}
                        />
                        <TouchableOpacity
                            style={styles.listIcon}
                            disabled={search == ""}
                            onPress={() => {
                                navigation.navigate('Search', { c_data, search })
                                setsearch('')
                            }}
                        >
                            <Entypo name="list" size={24} color="#DA9100" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categories}>
                        <Text style={styles.categoriesText}>Categories</Text>
                        <FlatList
                            data={coffeelist}
                            renderItem={({ item }) => {
                                let icon: MaterialIconName = item.icon
                                return (
                                    <TouchableOpacity
                                        style={dynamicStyles.coffee(item.name, C_coffe)}
                                        onPress={() => setC_coffe(item.name)}
                                    >
                                        <MaterialCommunityIcons name={icon} size={16} color={item.name === C_coffe ? "white" : "black"} />
                                        <Text style={dynamicStyles.cofeetext(item.name, C_coffe)}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(item) => item.name}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.caffecart}>
                        <FlatList
                            data={slected}
                            renderItem={({ item }) => (
                                <CoffeeCart item={item} />
                            )}
                            keyExtractor={({ id }) => id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.specialoffer}>
                        <Text style={styles.specialofferText}>Special Offer</Text>

                        <FlatList
                            data={c_data.filter((el) => { if ("sold" in el) return el })}
                            renderItem={({ item }) => (
                                <SpecialOffer item={item} />
                            )}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />

                    </View>
                </SafeAreaView>
                : <View style={styles.loading}>
                    <Text style={styles.textLoading} >LOADING...</Text>
                </View >
        }
        </>
    )
}

export default Home

const dynamicStyles: { coffee: Function, cofeetext: Function } = {
    coffee: (name: string, curent: string) => {
        return {
            marginTop: 5,
            marginHorizontal: 10,
            padding: 5,
            paddingHorizontal: 15,
            flexDirection: "row",
            backgroundColor: name === curent ? "#0D5B28" : "#D3D3D3",
            borderRadius: 20
        }
    },
    cofeetext: (name: string, curent: string) => {
        return {
            fontWeight: "bold",
            color: name === curent ? "white" : "black",
        }
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        marginTop: 15,
        marginHorizontal: 15
    },
    header: {
        height: 50,
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
    },
    localisation: {
        flex: .6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    city: {
        marginLeft: 5,
        fontWeight: "bold",
        color: "gray",
        fontSize: 15,
    },
    image: {
        flex: .15,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    notification: {
        flex: .15,
        alignItems: "flex-end",
        justifyContent: "center",
    },

    search: {
        height: 30,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#D3D3D3",
        borderRadius: 50,
        alignSelf: "center"
    },
    textinput: {
        height: "100%",
        flex: .7,
    },
    searshIcon: {
        flex: .1,
    },
    listIcon: {
        flex: .1,
    },
    categories: {
        width: "100%",
        marginTop: 15
    },
    categoriesText: {
        fontSize: 16,
        fontWeight: "600",
        color: "gray",
    },
    coffeeText: {
        fontSize: 15,
        marginLeft: 3
    },
    caffecart: {
        width: "100%",
        marginTop: 30
    },

    specialoffer: {
        width: "100%",
        marginTop: 15,
        flex: 1,
        flexGrow: 1
    },
    specialofferText: {
        color: "gray",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 10,
    },
    loading: {
        flex: 1,
        width: "100%",
        alignContent: "center",
        justifyContent: "center"
    },
    textLoading: {
        textAlign: "center",
        color: "gray"
    }

})