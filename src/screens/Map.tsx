import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
// import { add } from "../api/store"
const Map: FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>I coudn't impliment Map page becouse i only work with web and react-native-map don't  on web page</Text>
            {/* <TouchableOpacity onPress={add}
            >
                <Text style={styles.button}>add data to fireSrore</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15
    },
    text: {
        color: "gray"
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 50,
        backgroundColor: "red"
    }
})