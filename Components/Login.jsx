import React, { useState } from 'react'
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { Button, TouchableRipple } from 'react-native-paper'
import { TextInput } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
// import database from '@react-native-firebase/database';
import auth from "@react-native-firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Snackbar from 'react-native-snackbar';


function Login({ navigation }) {


    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [secureText, setsecureText] = useState(true)
    // // const gotoHome = () => {
    // //     navigation.replace("Main")
    // // }
    // const gotoSignUp = () => {
    //     // 
    // }

    const LoginApp = async () => {
        console.log(Email, Password)
        console.log("Login")
        if (Email !== "" && Password !== "") {
            await auth().signInWithEmailAndPassword(Email, Password).then(async (res) => {
                console.log(res)
                console.log("User ID", res.user.uid)

                // if (res) {

                // navigation.navigate("Main")


                // await AsyncStorage.setItem('logIn', 'true');
                await AsyncStorage.setItem('userId', res?.user?.uid);
                Snackbar.show({
                    text: 'Login Success',
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        //   onPress: () => { /* Do something. */ },
                    },
                })
                setTimeout(() => {
                    getLogin()
                }, 2000);
                // }
            }).catch((err) => {
                console.log("err", err)
                Snackbar.show({
                    text: err.message,
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        //   onPress: () => { /* Do something. */ },
                    },
                })
            })
        } else {
            Snackbar.show({
                text: "Email & Password Can't be null",
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'Ok',
                    textColor: 'green',
                    //   onPress: () => { /* Do something. */ },
                },
            })
        }
        // let key = firestore().collection("USER").doc().id;
        // let obj = {
        //     Email: Email,
        //     Password: Password,
        //     key: key
        // }
        // firestore().collection("USER").doc(key).set(obj)
        //     .then((data) => {
        //         console.log("user add")
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

    }
    const getLogin = async () => {
        const loginCheck = await AsyncStorage.getItem("userId");
        console.log("Login Check", loginCheck);


        try {
            // const parsedLoginCheck = JSON.parse(loginCheck);
            if (loginCheck) {
                navigation.navigate("Main");
            } else {
                navigation.navigate("login");
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
            // Handle the error, e.g., navigate to the login screen
            // navigation.navigate("login");
        }
    }

    React.useEffect(() => {
        getLogin()
    }, [])


    return (
        <ImageBackground source={require("../assets/Images/loginImg.png")} style={{ width: `100%`, height: `100%`, }} >
            <View style={styles.loginDiv}>
                <View style={styles.innerDiv}>
                    <View>
                        <Text style={styles.heading}>
                            Login here
                        </Text>
                    </View>
                    <View style={styles.mainDiv}>

                        <TextInput
                            label="Email"
                            mode='outlined'
                            placeholder='Enter Your Email'
                            value={Email}
                            onChangeText={text => setEmail(text)}
                            right={<TextInput.Icon icon="email" />}
                        />
                        <TextInput
                            label="Password"
                            placeholder='Enter Your Password'
                            mode='outlined'
                            right={secureText ?
                                <TextInput.Icon icon="eye" onPress={() => setsecureText(false)} /> :
                                <TextInput.Icon icon="eye-off" onPress={() => setsecureText(true)} />
                            }
                            secureTextEntry={secureText}
                            style={{ marginTop: 20 }}
                            value={Password}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>

                    <View style={styles.otherLogin}>
                        <Pressable>
                            <Image source={require("../assets/Images/Google.png")} style={styles.otherLoginImg} />
                        </Pressable>
                        <Pressable>
                            <Image source={require("../assets/Images/Facebook.png")} style={styles.otherLoginImg} />
                        </Pressable>
                        <Pressable>
                            <Image source={require("../assets/Images/apple.png")} style={styles.otherLoginImg} />
                        </Pressable>
                    </View>

                    <View style={styles.signUpHere}>
                        <Text style={{ marginRight: 10 }}>
                            Don't have account
                        </Text>
                        <Pressable
                            onPress={() => navigation.replace("signUp")}
                        >
                            <Text style={{ color: "#52CFE0", fontWeight: "bold" }}>
                                Sign Up here
                            </Text>
                        </Pressable>
                    </View>

                    <View>
                        <Button icon="login" mode="contained"
                            onPress={LoginApp}
                            style={{ marginTop: 25, color: "white", backgroundColor: "#2B29A6" }}>
                            Login
                        </Button>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Login


const styles = StyleSheet.create({
    // mainPage: {
    //     backgroundImage: `${uri("./bgImg.jpg")}`
    // },
    loginDiv: {
        padding: 5,
        display: "flex",
        justifyContent: "center",
        fontFamily: "Outfit",
        // borderBlockColor: "black",
        // borderWidth: 1,
        height: `100%`,
        // fontFamily: "Outfit-VariableFont_wght"
    },
    innerDiv: {
        // borderBlockColor: "black",
        // borderWidth: 1,
        borderTopEndRadius: 20,
        borderBottomLeftRadius: 20,
        height: `70%`,
        // fontFamily: "Outfit-VariableFont_wght"
        // boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
        // backgroundColor: "white",
        // zIndex:`-1px`
        // backgroundColor: "#ebc3d9"
    },
    heading: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: "Outfit-VariableFont_wght",
        // fontWeight: ""
    },
    mainDiv: {
        marginTop: `20%`
    },
    otherLogin: {
        // width: `10%`
        // borderBlockColor: "black",
        // borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: 20,

    },
    otherLoginImg: {
        width: 40,
        height: 40,
        display: "flex",
        margin: 15
    }
    , signUpHere: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        // borderBlockColor: "black",
        // borderWidth: 1,
    }

})