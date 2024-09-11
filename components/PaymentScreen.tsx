import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";

const PaymentScreen = (): React.JSX.Element => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cvv, setCvv] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [showCardForm, setShowCardForm] = useState(false);

    const handlePayment = () => {
        console.log('Selected payment method: ', selectedPaymentMethod);
        if (selectedPaymentMethod === 'Card') {
            console.log('Card details: ',{ cardNumber, cardName, cvv });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Payment Method</Text>
        <View style={styles.paymentOptionsContainer}>
            <TouchableOpacity
                style={[styles.paymentButton, styles.upiButton, selectedPaymentMethod === 'UPI' && styles.selectedButton]}
                onPress={() => {
                    setSelectedPaymentMethod('UPI');
                    setShowCardForm(false);
                }}
            >
                <Image source={require('../assets/upi.jpg')} style={styles.icon}/>
                <Text style={styles.buttonText}>UPI</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.paymentButton, styles.googlePayButton, selectedPaymentMethod === 'GooglePay' && styles.selectedButton]}
                onPress={() => { 
                    setSelectedPaymentMethod('GooglePay');
                    setShowCardForm(false);
                }}
            >
                <Image source={require('../assets/gpay.jpg')}
                        style={styles.icon}
                />
                <Text style={styles.buttonText}>Google Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.paymentButton, styles.phonePeButton, selectedPaymentMethod === 'PhonePe' && styles.selectedButton]}
                onPress={() => { 
                    setSelectedPaymentMethod('PhonePe');
                    setShowCardForm(false);
                }}
            >
                <Image source={require('../assets/phonepay.jpg')}
                        style={styles.icon}
                />
                <Text style={styles.buttonText}>PhonePe</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.paymentButton, styles.cardButton, selectedPaymentMethod === 'Card' && styles.selectedButton]}
                onPress={() => { 
                    setSelectedPaymentMethod('Card');
                    setShowCardForm(true);
                }}
            >
                <Text style={styles.buttonText}>Card Payment</Text>
            </TouchableOpacity>
            </View>

             {showCardForm && (
                <View style= {styles.cardForm}>
             <TextInput
                style={styles.input}
                placeholder="Card Number"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Card Name"
                value={cardName}
                onChangeText={setCardName}
            />
            <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
            />
                </View>
        )}
           
            <Button
                title="Proceed"
                buttonStyle={styles.button}
                onPress={handlePayment}
                disabled={!selectedPaymentMethod}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFA07A',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    paymentOptionsContainer: {
        width: '100%',
        marginBottom: 24,
    },
    paymentButton: {
        height: 60,
        width: '100%',
        borderRadius: 10,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    upiButton: {
        backgroundColor: '#D3D3D3', // Light gray for UPI
    },
    googlePayButton: {
        backgroundColor: '#4285F4', // Google Pay color
    },
    phonePeButton: {
        backgroundColor: 'purple', // PhonePe color
    },
    cardButton: {
        backgroundColor: '#FF6347', // Tomato color for Card Payment
    },
    selectedButton: {
        borderWidth: 2,
        borderColor: '#000'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        width: 55,
        height: 30,
        borderRadius: 5
    },
    button: {
        backgroundColor: '#FF4500',
        width: 100,
        borderRadius: 8,
        height: 50,
    },
    cardForm: {
        width: '100%',
        marginBottom: 24,
        backgroundColor:'#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
    },

});

export default PaymentScreen;