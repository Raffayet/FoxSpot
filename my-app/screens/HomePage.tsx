// import React from "react";
// import {
//     StyleSheet,
//     View,
//     Text,
//     ImageBackground,
//     TouchableOpacity,
// } from "react-native";
//
// export default function HomePage({ navigation }: any) {
//     return (
//         <ImageBackground
//             source={require("../assets/home-bg.jpg")} // Place your image in the assets folder
//             style={styles.background}
//         >
//             <View style={styles.overlay}>
//                 <Text style={styles.title}>Explore.</Text>
//                 <Text style={styles.title}>Travel.</Text>
//                 <Text style={styles.title}>Inspire.</Text>
//                 <Text style={styles.subtitle}>
//                     Life is all about the journey. Find yours.
//                 </Text>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.navigate("Map")}
//                 >
//                     <Text style={styles.buttonText}>Get Started →</Text>
//                 </TouchableOpacity>
//             </View>
//         </ImageBackground>
//     );
// }
//
// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     overlay: {
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         padding: 20,
//         borderRadius: 10,
//         alignItems: "center",
//     },
//     title: {
//         fontSize: 36,
//         fontWeight: "bold",
//         color: "#fff",
//         textAlign: "center",
//         marginBottom: 10,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: "#fff",
//         textAlign: "center",
//         marginBottom: 20,
//     },
//     button: {
//         backgroundColor: "#32CD32",
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: "#fff",
//         fontWeight: "bold",
//         fontSize: 16,
//     },
// });
