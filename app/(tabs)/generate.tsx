import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function GenerateTab() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pay Me</Text>
            <View style={styles.qrContainer}>
                <QRCode value="Hello, World!" size={200} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    qrContainer: {
        marginTop: 20,
    },
});
