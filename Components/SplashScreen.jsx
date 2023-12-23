import React from 'react'
import { Button, Text } from 'react-native-paper'
import { ImageBackground, View, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
function SplashScreen({ navigation }) {
    React.useEffect(() => {
        // setTimeout(() => {
        //   navigation.replace("signUp")
        // }, 2000);                                                                      
        setTimeout(async () => {
            let data = await AsyncStorage.getItem("user")
            console.log(data)
            if (data == "true") {

                navigation.replace("Main")

            }
            else {
                await AsyncStorage.setItem("user", "true")
                navigation.replace("appIntro")
            }

        }, 3000)
    }, [])
    return (
        <ImageBackground source={require("../assets/Images/signUpImg.png")} style={{ height: `100%`, width: `100%` }}>
            <View style={{ height: `100%`, display: "flex", justifyContent: "space-around", position: "relative" }}>

                <View >
                    <Text style={{ fontSize: 25, textAlign: "center" }}>
                        Welcome..!
                    </Text>
                </View>

                <View style={{ position: "absolute", bottom: 50, width: `100%`, padding: 10 }}>
                    {/* <View>
        <Button title='Goto Drawer' />
      </View>
      <View>
    </View> */}

                    <Button icon="chevron-right" style={{ backgroundColor: "#4FC9DD", color: "white" }} onPress={() => navigation.replace("login")}>
                        Get Started
                    </Button>

                </View>
            </View>
        </ImageBackground>

    )
}

export default SplashScreen