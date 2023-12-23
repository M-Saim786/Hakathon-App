import React, { useState } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/AntDesign'
// import { DrawerContentScrollView } from '@react-navigation/drawer'

import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';
const DrawerContentMain = [
    {
        name: "home",
        title: "Home",
        color: "gray",
        path: "Home"
    },
    {
        name: "alarm-note",
        // name: "",
        title: "About",
        color: "gray",
        path: "About"
    },
    {
        name: "phone",
        // name: "",
        title: "Contact",
        color: "gray",
        path: "Contact"
    },
    // {
    //     name: "wheel-barrow",
    //     title: "Setting",
    //     color: "gray",
    //     path: "Home"
    // },
    {
        name: "account",
        title: "Profile",
        color: "gray",
        path: "Profile"
    },
    {
        name: "login",
        title: "Logout",
        color: "gray",
        path: "Home"
    }
]
function DrawerContent(props) {
    const [Data, setData] = useState()
    React.useEffect(() => {
        GetData()
    }, [])
    const GetData = async () => {
        const loginCheck = await AsyncStorage.getItem("userId")
        console.log("Check ", loginCheck)
        if (loginCheck
            // JSON.parse(loginCheck)?.length > 1 ||
            // JSON.parse(loginCheck) !== null
        ) {
            // const userDocument = await firestore().collection('User').doc(JSON.parse(loginCheck)).get()
            const userDocument = await firestore().collection('User').doc(loginCheck).get()
            console.log(userDocument["_data"])
            setData(userDocument["_data"])
            if (Data) {
                console.log(Data)
                // navigation.navigate("Main")
            }
        }
        else {
            // props.navigation.navigate("login")
        }
    }


    const Logout = async () => {
        // await AsyncStorage.setItem("login", "false")
        await AsyncStorage.setItem("userId", "")
        GetData()
    }
    return (
        <View style={{
            flex: 1,
        }}>
            <DrawerContentScrollView {...props}>
                <View>
                    <View>
                        <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMGxfpI1Xx_KApN8u-gOQg91QOV5tcgUa25w&usqp=CAU' }} style={{ width: '100%', height: 230, marginTop: '-2%' }}>
                            <Avatar.Image
                                size={80}
                                color="white"
                                source={{
                                    uri: `${!Data?.Img ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRspS_ukYMLvsWX4vPkC7PcTiCqJYIASaWapw&usqp=CAU" : Data?.Img
                                        }`
                                }}
                                style={{ resizeMode: 'contain', marginTop: '12%', marginLeft: "10%" }} />

                            <View style={styles.drawerContent}>
                                <View style={styles.userInfoSection}>

                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>

                                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                            <Title style={styles.title}>{Data?.Name ? Data?.Name : "Name"}</Title>
                                            <Caption style={styles.caption}>{Data ? Data?.Email : "Email"}</Caption>
                                        </View>
                                    </View>
                                </View>

                            </View>

                        </ImageBackground>
                    </View>

                    <Drawer.Section style={styles.drawerSection} >
                        {
                            DrawerContentMain.map((v, i) => {
                                return (
                                    ++i < 5 && <Drawer.Item
                                        key={i}
                                        icon={v.name}
                                        label={v.title}
                                        onPress={() => { props.navigation.navigate(v.path) }}
                                    />
                                )
                            })
                        }

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                {
                    DrawerContentMain.map((v, i) => {
                        return (
                            ++i > 4 &&
                            // <Drawer.Item
                            //  
                            //     style={{ color: "red" }}
                            //     icon="gear"

                            // // 
                            // />
                            <Drawer.Item
                                // style={{ color: "red" }}
                                icon="logout"
                                label={v.title}
                                key={i}
                                onPress={() => Logout()}
                            />

                        )
                    })
                }

            </Drawer.Section>
        </View>
    )
}

export default DrawerContent


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 10,
    },
    Text: {
        fontWeight: 'bold',
        color: 'red'

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '-15%',
        marginLeft: '10%'
    },
    caption: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: '10%'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 10,
        // borderBlockColor: "black",
        // borderWidth: 1,
        // height: `100%`

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});