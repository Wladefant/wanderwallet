import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';

export default function GenerateTab() {
    const [qrUrl, setQrUrl] = useState('');

    const handleGenerateQRCode = () => {
        // Basic string to encode in the QR code
        const basicString = 'Hello, this is a QR Code!';
        // Google Charts API to generate a QR code
        const apiUrl = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(basicString)}`;
        setQrUrl(apiUrl);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Press the button to generate a basic QR code</Text>
            <Button title="Generate QR Code" onPress={handleGenerateQRCode} />
            <View style={styles.qrContainer}>
                {qrUrl ? (
                    <Image
                        source={{ uri: qrUrl }}
                        style={styles.qrCode}
                        resizeMode="contain"
                    />
                ) : (
                    <Text style={styles.placeholderText}>No QR Code yet</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    qrContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    qrCode: {
        width: 200,
        height: 200,
    },
    placeholderText: {
        marginTop: 16,
        fontSize: 16,
        color: 'gray',
    },
});
