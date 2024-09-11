import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../redux/userActions';
import CustomButton from './CustomButton';

const LoginScreen = ({ navigation }:any):React.JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();

    const pass = 'CG@Patni16';

    const validate = (): boolean => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!email.includes('@') || !email.includes('.') || !email.includes('com')) {
            setEmailError('Invalid email address');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }else if (password.length < 8 ){
            setPasswordError('Password should not be less than 8 characters');
            isValid = false;
        }else if(password !== pass){
            setPasswordError('Incorrect Password');
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = () => {
        if(validate()){
        dispatch(setUserEmail(email));
        Alert.alert('Login Successful', `Welcome, ${email}`);
        navigation.navigate('HomeTabs');
        }
    };

    const handleForgotPassword = () => {
        if (!email){
            Alert.alert('Email Required','Please Enter your Email Address');
            return;
        }
        Alert.alert('Password Reset',`A password reset link has sent to ${email}`);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Book Heaven</Text>
                <TextInput
                    style={[styles.input, emailError ? styles.errorInput : null]}
                    placeholder='Enter Email'
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    value={email}
                    placeholderTextColor="#a9a9a9"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <TextInput
                    style={[styles.input, passwordError ? styles.errorInput : null]}
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                    placeholderTextColor="#a9a9a9"
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                <CustomButton 
                    onPress={handleLogin}
                    title='Login'
                />
                
                <CustomButton 
                    onPress={handleForgotPassword}
                    title='Forgot Password?' 
                />
                <Text style={styles.signUp}>
                    Don't have an account? <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFA07A',
        alignItems: 'center',
        padding: 20
    },
    innerContainer: {
        width:'100%',
        maxWidth:400,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: '#FFA07A',
        textShadowColor: '#000',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 4,
    },
    input: {
        width: '100%',
        padding: 15,
        borderRadius: 50,
        backgroundColor: '#f0f8ff',
        marginBottom: 15,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    errorInput: {
        borderColor: 'red',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    
    
    forgotPasswordText: {
        color: '#fff',
        fontSize: 14,
    },
    forgotPasswordButton: {
        color: '#FFA500',
       
    },

    signUp: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
        color: '#000'

    },
    signUpLink: {
        color: '#FFA500',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
