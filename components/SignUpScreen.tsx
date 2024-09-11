import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,SafeAreaView} from 'react-native';
import CustomButton from './CustomButton';

const SignUpScreen = ({ navigation }: any): React.JSX.Element => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError , setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Basic validation function
  const validate = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setNameError('');
    
    if (!name ) {
      setNameError('Name is Required');
      isValid = false;
    }
    if(!email){
      setEmailError('Email is Required');
      isValid = false;
    }
      else if (!email.includes('@') || !email.includes('.') || !email.includes('com') || email.indexOf('@') > email.indexOf('.')) {
      setEmailError('Invalid email address');
      isValid = false;
    }
    if(!password){
      setPasswordError('Password is Required');
      isValid = false;
    } 
   else if (password.length < 8 ){
      setPasswordError('Password should not be less than 8 characters');
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      setConfirmPasswordError('Confirm Password must match with Password.');
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = () => {
    if (validate()) {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.innerContainer}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput 
        style={[styles.input,nameError ? styles.errorInput: null]} 
        placeholder="Enter Full Name" 
        placeholderTextColor="#a9a9a9"
        value={name}
        onChangeText={setName}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text>:null}
      <TextInput 
        style={[styles.input,emailError ? styles.errorInput : null]} 
        placeholder="Enter your Email" 
        placeholderTextColor="#a9a9a9"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text>:null}
      <TextInput 
        style={[styles.input,passwordError ? styles.errorInput : null]} 
        placeholder="Enter Password" 
        placeholderTextColor="#a9a9a9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text>:null}
      <TextInput 
        style={[styles.input,confirmPasswordError ? styles.errorInput : null]} 
        placeholder="Confirm Password" 
        placeholderTextColor="#a9a9a9"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text>:null}
      <CustomButton 
        title='SignUp' 
        onPress={handleSignUp}
      />
       
      <Text style={styles.footerText}>
        Already have an account? 
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}> Login</Text>
      </Text>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA07A',
    padding: 20,
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
    textAlign:'center',
    color: '#FFA07A',
    marginBottom: 40,
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
  footerText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  errorInput: {
    borderColor:'red',
    borderWidth: 1,
    marginBottom:10
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
 
});

export default SignUpScreen;
