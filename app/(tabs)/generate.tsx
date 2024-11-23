import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function GenerateTab() {
    const [showQRCode, setShowQRCode] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Generate a basic QR code</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setShowQRCode(true)}
            >
                <Text style={styles.buttonText}>Generate QR Code</Text>
            </TouchableOpacity>

            {showQRCode && (
                <View style={styles.qrContainer}>
                    <QRCode value="Hello, World!" size={200} />
                </View>
            )}
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
    button: {
        backgroundColor: '#4caf50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    qrContainer: {
        marginTop: 20,
    },
});
