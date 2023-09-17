import { Platform, TouchableOpacity, StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useState, FC } from 'react'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login } from "../api/auth"

const User: FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const log = () => {
        login(userName, password)
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.containerKey}
            >
                <ImageBackground
                    source={require("../../assets/cof.jpg")}
                    style={styles.bgimage}
                >
                    <View style={styles.nocturne}>
                        <Text style={styles.userpage}>Login</Text>
                        <TextInput
                            value={userName}
                            onChangeText={(text) => setUserName(text)}
                            style={styles.inputText}
                            placeholder='Email'
                            placeholderTextColor="#D3D3D3"
                        />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.inputText}
                            secureTextEntry={true}
                            placeholder='password'
                            placeholderTextColor="#D3D3D3"
                        />
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                onPress={log}
                                style={styles.add}>
                                <Text style={styles.buttobText1}>
                                    login
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Register')}
                                style={styles.register}
                            >
                                <Text style={styles.buttobText2}>
                                    clik her to register
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default User

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerKey: {
        flex: 1,
    },
    bgimage: {
        resizeMode: "cover",
        flex: 1,
        width: "100%",
        height: "100%",

        alignItems: "center",
        justifyContent: "center"
    },
    nocturne: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
        backgroundColor: "rgba(0,0,0,.7)"
    },
    userpage: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 2,
        marginBottom: 10,
        color: "white"
    },
    inputText: {
        height: 35,
        marginBottom: 15,
        backgroundColor: "white",
        width: "80%",
        borderRadius: 5,
        paddingHorizontal: 15,
    },

    buttons: {
        width: "80%",
        height: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    add: {
        height: "100%",
        width: "50%",
        alignSelf: "center",
        borderRadius: 5,
        backgroundColor: "#0D5B28",
        alignItems: "center",
        justifyContent: "center"
    },
    buttobText1: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold"
    },
    buttobText2: {
        color: "white",
        fontSize: 11,
        fontWeight: "bold"
    },
    register: {},
})