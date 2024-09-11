import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        width:'100%',
        paddingVertical: 15,
        backgroundColor: 'tomato',
        borderRadius: 50,
        alignItems:'center',
        justifyContent:'center',
        marginVertical: 10,
        shadowColor:'#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
