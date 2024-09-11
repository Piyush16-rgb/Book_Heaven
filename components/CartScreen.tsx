import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { Book } from "./Book";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, updateItemQuantity } from "../redux/cartActions";
import { AppDispatch } from "../redux/store";

const CartScreen: React.FC = ({navigation}: any): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const handleQuantityChange = (id: string, delta: number) => {
        const item = cartItems.find(item => item.id === id);
        if(item) {
            const newQuantity = item.quantity + delta;
            if (newQuantity > 0) {
                dispatch(updateItemQuantity(id, newQuantity));
            }
        }
    };

    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const renderItem = ({ item }: { item: Book  & {quantity: number}}) => (
        <View style={styles.itemContainer}>
            <Image
                style={styles.thumbnail}
                source={{ uri: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image' }}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.volumeInfo.title || 'Unknown Title'}</Text>
                <Text style={styles.author}>by {item.volumeInfo.authors?.join(', ') || 'Unknown Author'}</Text>
                <Text style={styles.price}>
                    {item.saleInfo.listPrice?.currencyCode || 'INR'} {item.saleInfo.listPrice?.amount?.toFixed(2) || '0.00'} x {item.quantity}
                </Text>
                <View style= {styles.quantityControls}>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={()=> handleQuantityChange(item.id, -1)}
                    >
                        <Text style={styles.controlButtonText}>-</Text>    
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                        style= {styles.controlButton}
                        onPress={()=> handleQuantityChange(item.id, 1)}
                    >
                        <Text style={styles.controlButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveFromCart(item.id)}
                >
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

     //Calculate the total price
     const totalPrice = cartItems.reduce((total, item) => {
        const price = item.saleInfo.listPrice?.amount || item.saleInfo.retailPrice?.amount || 0;
        return total + price * item.quantity;
    },0);

    const totalPriceFormatted = cartItems.length > 0
    ? `${cartItems[0].saleInfo.listPrice?.currencyCode || 'INR'} ${totalPrice.toFixed(2)}`
    : 'INR 0.00';

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Image 
                            source={{uri: 'https://via.placeholder.com/150x150?text=Empty+Cart' }}
                            style= {styles.emptyImage}
                        />
                <Text style={styles.emptyMessage}>No items in the cart</Text>
                </View>
            }
    />
    <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: {totalPriceFormatted}</Text>
        <TouchableOpacity
        style= {styles.payButton}
        onPress={()=> navigation.navigate('Payment')}
        accessibilityLabel="Pay Now"
        >
            <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
    </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFA07A',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0,height: 2},
        shadowOpacity: 0.3,
        elevation: 3,
       
    },
    thumbnail: {
        width: 100,
        height: 150,
        borderRadius: 8,
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#333',
    },
    author: {
        fontSize: 16,
        color: '#555',
    },
    price: {
        fontSize: 16,
        color: '#000',
        marginVertical: 5,
    },
    removeButton: {
        width: 100,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#FF6F61',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    emptyMessage: {
        fontSize: 22,
        textAlign: 'center',
        color:'#888',
    },
    totalContainer: {
        marginTop: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    payButton: {
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#32CD32', // Lime Green for Pay button
        alignItems: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    controlButton: {
        backgroundColor: '#FF6F61',
        padding: 10,
        borderRadius: 5,
    },
    controlButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 18,
    }
});

export default CartScreen;
