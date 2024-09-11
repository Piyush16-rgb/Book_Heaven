import React from "react";
import { View,Text,StyleSheet,TouchableOpacity, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setUserEmail } from "../redux/userActions";

const ProfileScreen = ({navigation}:any):React.JSX.Element => {
    const {email }= useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUserEmail(''));
        navigation.navigate('Login');
    };

    return(
        <View style={styles.container}>
           
            <View style={styles.card}>
                <Text style={styles.greeting}>Hi, {email}</Text>
                <Text style={styles.detail}>Welcome to your Profile page.</Text>
            </View>
             <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
             </TouchableOpacity>       
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFA07A',
        padding: 20,
    },
   
    card: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginBottom:20 ,
        alignItems: 'center',
    },
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '007bff',
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        color: '#333',
    },
   button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#007bff',
    alignItems: 'center',
   },
   buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
   },
    
});

export default ProfileScreen;