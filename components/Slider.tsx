import React from "react";
import { View , Text ,StyleSheet,TouchableOpacity,Image, Dimensions} from "react-native";
import Swiper from "react-native-swiper";



const {width, height} = Dimensions.get('window');

const Slider = ({navigation}: any) => {
    return (
        <Swiper
        style={styles.wrapper}
        showsButtons={true}
        autoplay={true}
        autoplayTimeout={3}
        dotStyle = {styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        showsPagination={true}
        paginationStyle={styles.paginationStyle}
        >
        <View style= {styles.slide}>
            <Image 
            source={{uri:'https://wallpaperbat.com/img/8632560-cute-books-wallpaper.jpg'}}
            style={styles.image}
            resizeMode="cover"/>
            <View style= {styles.textContainer}>
            <Text style={styles.title}>Discover Best Books</Text>
            <Text style={styles.description}>Browse a wide selection of top-rated books</Text>
            </View>
        </View>
        <View style= {styles.slide}>
        <Image 
            source={{uri:'https://th.bing.com/th/id/OIP.dMBCv__UuwEDwcZIk6i8oQHaNK?rs=1&pid=ImgDetMain'}}
            style={styles.image}
            resizeMode="cover"
            />
            <View style={styles.textContainer}>
            <Text style={styles.title}>Easy Online Payments</Text>
            <Text style={styles.description}>Secure and easy checkout process</Text>
            </View>
        </View>
        <View style= {styles.slide}>
        <Image 
            source={{uri:'https://th.bing.com/th/id/OIP.axb0sZhQglCpR-wKscuipwHaLH?rs=1&pid=ImgDetMain'}}
            style={styles.image}
            resizeMode="cover"
            />
          <View style= {styles.textContainer}>
            <Text style={styles.title}>Vast Genres to Explore</Text>
            <Text style={styles.description}>From fiction to non-fiction, we have it all</Text>
            <TouchableOpacity style={styles.sliderbutton} onPress={()=> navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
         </View>
        </Swiper>
    );
};

const styles = StyleSheet.create({
    wrapper: {
      height:'100%',
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    image: {
      width: width,
      height: height,
      position: 'absolute',
      top: 0,
      left: 0
    },
    textContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: 15,
      borderRadius: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#fff',
      textAlign: 'center',
      textShadowColor: 'rgba(0,0,0,0.8)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 4,
      letterSpacing: 1,
    },
    description: {
      fontSize: 20,
      textAlign: 'center',
      color: '#fff',
      textShadowColor: 'rgba(0,0,0,0.8)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 4,
      lineHeight: 28,
    },
    dotStyle: {
       backgroundColor: '#fff',
       width: 10,
       height: 10,
       borderRadius: 5,
       marginHorizontal: 3,
    },
    activeDotStyle: {
      backgroundColor: '#007bff',
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    paginationStyle: {
        bottom:10,
    },
    
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
   
    sliderbutton: {
      alignItems:'center',
      marginTop: 20,
      width: '50%',
      backgroundColor: 'tomato',
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 25,
      justifyContent: 'center',
    }
  });

export default Slider;