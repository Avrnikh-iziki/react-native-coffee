import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home, Detail, Userc, Cart } from "../screens/index";
import { AntDesign, Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../Redux/hooks";
import { useState, useEffect } from "react"
import { User, onAuthStateChanged } from "firebase/auth"
import { FIRSEBASE_AUTH } from "../../firebaseConfig"


const Tab = createBottomTabNavigator()

export function Bottomtabs() {

    const order = useAppSelector((state) => state.coffee.coffee).length - 1
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        onAuthStateChanged(FIRSEBASE_AUTH, (user) => {
            setUser(user)
        })
    }, [])

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 0
                },
            }
            }
        >
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarLabel: "home",
                    tabBarActiveTintColor: '#0D5B28',
                    tabBarInactiveTintColor: 'black',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused
                            ? <Entypo name="home" size={28} color="#0D5B28" />
                            : <AntDesign name="home" size={28} color="gray" />
                }}
            />
            < Tab.Screen
                name="Detail"
                component={Detail}
                options={{
                    tabBarLabel: "Map",
                    tabBarActiveTintColor: '#0D5B28',
                    tabBarInactiveTintColor: 'black',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused
                            ? <Ionicons name="map" size={24} color="#0D5B28" />
                            : <Ionicons name="map-outline" size={24} color="black" />
                }}
            />
            < Tab.Screen
                name="Cart"
                component={user ? Cart : Userc}
                options={{
                    tabBarLabel: "Cart",
                    tabBarActiveTintColor: '#0D5B28',
                    tabBarInactiveTintColor: 'black',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused
                            ? <View style={styles.container}>
                                <View style={styles.icon}>
                                    <Ionicons name="cart" size={24} color="#0D5B28" />
                                </View>
                                {(order > 0 && user) && <Text style={styles.order}>{order}</Text>}
                            </View>
                            : <View style={styles.container}>
                                <View style={styles.icon}>
                                    <AntDesign name="shoppingcart" size={24} color="gray" />
                                </View>
                                {(order > 0 && user) && <Text style={styles.order}>{order}
                                </Text>}
                            </View>
                }}
            />
            < Tab.Screen
                name="Order"
                component={Userc}
                options={{
                    tabBarLabel: "User",
                    tabBarActiveTintColor: '#0D5B28',
                    tabBarInactiveTintColor: 'black',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused
                            ? <FontAwesome5 name="user-alt" size={24} color="#0D5B28" />
                            : <FontAwesome5 name="user" size={24} color="gray" />
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    order: {
        position: "absolute",
        bottom: 5,
        left: -3,
        fontSize: 10,
        padding: 3,
        minWidth: 18,
        fontWeight: "bold",
        backgroundColor: "red",
        borderRadius: 50,
        color: "white",
        textAlign: "center"

    },
    icon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})