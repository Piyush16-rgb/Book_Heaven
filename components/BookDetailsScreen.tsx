import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateItemQuantity } from "../redux/cartActions";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { CartItem } from "../redux/cartReducers";

type BookDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookDetails'>;
type BookDetailsScreenRouteProp = RouteProp<RootStackParamList, 'BookDetails'>;

interface Props {
    navigation: BookDetailsScreenNavigationProp;
    route: BookDetailsScreenRouteProp;
}

const BookDetailsScreen: React.FC<Props> = ({ route }: Props): React.JSX.Element => {
    const { book } = route.params;
    const[isExpanded, setIsExpanded] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);


    if (!book) {
        return (
            <View style= {styles.container}>
                <Text style={styles.noDataText}>No book data available</Text>
            </View>
        );
        
    }

    const { title, authors, description, imageLinks, categories, pageCount } = book.volumeInfo;
    const { listPrice , retailPrice } = book.saleInfo;

    const truncatedDescription = description ? description.slice(0 , 100) + '...' : 'No description available';

    const handleAddToCart = (item: CartItem) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        
        if(existingItem){
            Alert.alert (
                'Item Already in Cart',
                `${item.volumeInfo.title} is already in your cart.Quantity updated.`,
                [{text: 'OK'}]
            );
            // Update the quantity of the existing item
            dispatch(updateItemQuantity(item.id, existingItem.quantity + 1));
        } else {
            // Add the new item to the cart with an initial quantity of 1
            dispatch(addToCart({...item, quantity: 1}));
            // Show alert for newly added item
            Alert.alert(
                'Item Added',
                `${item.volumeInfo.title} has been added to your cart.`,
                [{text: 'OK'}]
            );
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
            <Image
                style={styles.thumbnail}
                source={{ uri: imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image' }}
                accessibilityLabel={ title ? `Cover image of ${title}` : `Book cover image`}
            />
            </View>
            <Text style={styles.title}>{title || 'Unknown Title'}</Text>
            {authors && authors.length > 0 && (
            <Text style={styles.author}>by {authors.join(', ')}</Text>
            )}
            {categories && categories.length > 0 && (
                <Text style={styles.categories}>Categories: {categories.join(', ')}</Text>
            )}
            <Text style={styles.pageCount}>Page Count: {pageCount}</Text>
            <Text style={styles.price}>List Price: {listPrice?.amount ? `${listPrice.amount} ${listPrice.currencyCode}` :'N/A'}</Text>
            <Text style={styles.price}>Retail Price: {retailPrice?.amount ? `${retailPrice.amount} ${retailPrice.currencyCode}` :'N/A'}</Text>
            <Text style={styles.description}>
                {isExpanded ? description : truncatedDescription}
            </Text>
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => {
                       setIsExpanded(!isExpanded)
                    }}
                >
                <Text style={styles.toggleButtonText}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={()=> handleAddToCart({...book, quantity: 1})}
                >
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>

                </TouchableOpacity>
        
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFA07A',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    thumbnail: {
        width: 180,
        height: 270,
        borderRadius: 10,
        borderWidth: 2,
        borderColor:'white',
        resizeMode: 'cover',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    author: {
        fontSize: 20,
        color: '#555',
        marginBottom: 5,
    },
    categories: {
        fontSize: 20,
        color: '#555',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    pageCount:{
        fontSize:16,
        color:'#333',
        marginBottom:10,
    },
    description: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 20,
    },
    toggleButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal:20,
        borderRadius: 8,
        backgroundColor: '#007BFF',
        justifyContent:'center',
        alignItems: 'center',
        elevation: 2,
    },
    toggleButtonText: {
        fontSize: 16,
        color: 'fff',
        fontWeight: '800',
    },
    addToCartButton: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        backgroundColor: '#28a745', // Green color for the button
        justifyContent: 'center',
        alignItems:'center',
        elevation: 2,
    },
    addToCartButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    
    noDataText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#333',
    }
});

export default BookDetailsScreen;
