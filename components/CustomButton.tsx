import React from "react";
import { Text, TouchableOpacity,TouchableOpacityProps } from "react-native";
import { styles } from "../assets/styles";

interface CustomButtonProps extends TouchableOpacityProps {
    onPress: () => void;
    title: string;
   
}

const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    title,
    ...touchableProps
}) => {
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            accessible={true}
            accessibilityLabel={title}
            accessibilityRole="button"
            {...touchableProps} // Pass through any additional props
        >
        <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;