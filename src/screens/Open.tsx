import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import React, { FC } from 'react'

const Open: FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/co.jpg')} style={styles.image_bg} >
                <Image source={require('../../assets/cof.jpg')} style={styles.image} />
                <View style={styles.iner_c}>
                    <Text style={styles.h1}>Coffee so good,{"\n"}your taste buds{"\n"} will love it</Text>
                    <Text style={styles.h2}>The best grain, the finest roast , the most powerful flavor</Text>
                    <View style={styles.dotes}>
                        <Text style={[styles.dote, styles.first]} />
                        <Text style={styles.dote} />
                        <Text style={styles.dote} />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.start}>Get Started</Text>
                </TouchableOpacity>

            </ImageBackground>
        </View>
    )
}

export default Open

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image_bg: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: "relative"
    },
    image: {
        width: "100%",
        flex: 0.5,
        opacity: .06
    },
    iner_c: {
        flex: .5,
        alignItems: "center",
    },
    h1: {
        color: "gray",
        fontSize: 25,
        width: "100%",
        textAlign: "center",
        letterSpacing: 3,
        fontWeight: "bold",
        marginTop: 100,
    },
    h2: {
        color: "gray",
        marginTop: 20,
        fontSize: 14,
        letterSpacing: 2,
        textAlign: "center"
    },
    dotes: {
        height: 20,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10

    },
    dote: {
        width: 10,
        height: 10,
        backgroundColor: "#0D5B28",
        borderRadius: 50,
        marginHorizontal: 2
    },
    first: {
        width: 20
    },

    button: {
        backgroundColor: "#0D5B28",
        width: "50%",
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        position: "absolute",
        bottom: 50

    },
    start: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"

    }
})