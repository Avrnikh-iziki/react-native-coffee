import { Platform, TouchableOpacity, StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useState, FC } from 'react'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons'
import { register } from '../api/auth';
const Register: FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const adduser = () => {
        register(userName, password)
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
                        <View style={styles.icon}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <MaterialIcons name="keyboard-arrow-left" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.userpage}>Register</Text>

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
                                onPress={adduser}
                                style={styles.add}>
                                <Text style={styles.buttobText1}>
                                    register
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={styles.register}
                            >
                                <Text style={styles.buttobText2}>
                                    clik her to login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Register

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
        justifyContent: "center",
        position: "relative",
    },
    nocturne: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 60,
        backgroundColor: "rgba(0,0,0,.7)"
    },
    icon: {
        position: "absolute",
        top: 40,
        left: 30,
        width: 30,
        height: 30,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
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