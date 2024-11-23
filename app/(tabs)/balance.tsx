import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
} from 'react-native';

export default function BalanceTab() {
    const [walletAddress, setWalletAddress] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [fakeBalance, setFakeBalance] = useState('202.00');
    const [addAmount, setAddAmount] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: '1', type: 'Received', amount: 50, date: '2024-11-22' },
        { id: '2', type: 'Received', amount: 20, date: '2024-11-20' },
        { id: '3', type: 'Received', amount: 50, date: '2023-10-20' },
        { id: '4', type: 'Sent', amount: 20, date: '2023-09-19' },
        { id: '5', type: 'Received', amount: 50, date: '2024-08-19' },
        { id: '6', type: 'Sent', amount: 20, date: '2024-07-18' },
    ]);

    type Transaction = {
        id: string;
        type: string;
        amount: number;
        date: string;
    };

    const handleAddMoney = () => {
        const amount = parseFloat(addAmount);
        if (!isNaN(amount) && amount > 0) {
            setFakeBalance((prev) => (parseFloat(prev) + amount).toFixed(2));
            setTransactions((prev) => [
                ...prev,
                {
                    id: (prev.length + 1).toString(),
                    type: 'Received',
                    amount,
                    date: new Date().toISOString().split('T')[0],
                },
            ]);
            setPopUp(false);
            setAddAmount('');
        } else {
            alert('Please enter a valid amount.');
        }
    };

    const renderTransaction = ({ item }: { item: Transaction }) => (
        <View style={styles.transactionCard}>
            <Text style={styles.transactionType}>
                {item.type}:{' '}
                <Text
                    style={[
                        styles.transactionAmount,
                        { color: item.type === 'Received' ? '#4caf50' : '#f44336' }, // Green for Received, Red for Sent
                    ]}
                >
                    {item.amount} SOL
                </Text>
            </Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loggedIn ? (
                <>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceText}>{fakeBalance} SOL</Text>
                        <Text style={styles.balanceSubText}>Your current balance</Text>
                    </View>

                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTransaction}
                        contentContainerStyle={styles.transactionList}
                    />

                    {/* Floating Action Button */}
                    <TouchableOpacity style={styles.fab} onPress={() => setPopUp(true)}>
                        <Text style={styles.fabText}>+</Text>
                    </TouchableOpacity>

                    {/* Popup Modal */}
                    <Modal
                        visible={popUp}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setPopUp(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Add Money</Text>
                                <TextInput
                                    style={styles.input}
                                    value={addAmount}
                                    onChangeText={setAddAmount}
                                    placeholder="Enter amount"
                                    keyboardType="numeric"
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={styles.modalButtonCancel}
                                        onPress={() => setPopUp(false)}
                                    >
                                        <Text style={styles.modalButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.modalButtonConfirm}
                                        onPress={handleAddMoney}
                                    >
                                        <Text style={styles.modalButtonText}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </>
            ) : (
                <View style={styles.loginContainer}>
                    <Text style={styles.text}>Enter Wallet Address</Text>
                    <TextInput
                        style={styles.input}
                        value={walletAddress}
                        onChangeText={setWalletAddress}
                        placeholder="e.g., 4f3s...8e9k"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => setLoggedIn(true)}
                    >
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    balanceContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    balanceText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4caf50',
    },
    balanceSubText: {
        fontSize: 16,
        color: '#888',
    },
    transactionList: {
        paddingHorizontal: 16,
    },
    transactionCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    transactionType: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    transactionAmount: {
        fontWeight: 'bold',
    },
    transactionDate: {
        marginTop: 4,
        fontSize: 14,
        color: '#888',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: '#4caf50',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    fabText: {
        fontSize: 32,
        color: '#fff',
        lineHeight: 36,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalButtonCancel: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    modalButtonConfirm: {
        backgroundColor: '#4caf50',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    loginButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

