
// mosquitto broker  

// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   ScrollView,
// //   StyleSheet,
// //   Alert,
// // } from "react-native";
// // import { useNavigation } from "@react-navigation/native";
// // import { Picker } from "@react-native-picker/picker";
// // import * as Location from "expo-location";
// // import { getDistance } from "geolib";
// // import mqtt from "mqtt";

// // const PARKING_LOCATION = {
// //   latitude: 17.01706194618706,
// //   longitude: 73.33585630398036,
// // };

// // const MQTT_BROKER = "wss://test.mosquitto.org:8081";
// // // const MQTT_BROKER = "wss://test.mosquitto.org";
// // const MQTT_TOPIC = "parking/status";

// // const Parking = () => {
// //   const navigation = useNavigation();
// //   const [selectedFloor, setSelectedFloor] = useState("1 Floor");
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [isWithinRange, setIsWithinRange] = useState(false);
// //   const [slotStatus, setSlotStatus] = useState({});
// //   const [client, setClient] = useState(null);

// //   const parkingSlots = ["A-1", "A-2", "A-3", "A-4"];

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const { status } = await Location.requestForegroundPermissionsAsync();
// //         if (status !== "granted") {
// //           Alert.alert(
// //             "Permission Denied",
// //             "Allow location access to book parking."
// //           );
// //           return;
// //         }
// //         const { coords } = await Location.getCurrentPositionAsync({});
// //         setUserLocation(coords);
// //         setIsWithinRange(getDistance(coords, PARKING_LOCATION) <= 3000);
// //       } catch (error) {
// //         console.error("❌ Location Error:", error);
// //         Alert.alert("Error", "Failed to fetch location.");
// //       }
// //     })();
// //   }, []);

// //   useEffect(() => {
// //     const mqttClient = mqtt.connect(MQTT_BROKER, {
// //       clientId: `react-native-${Math.random().toString(16).substr(2, 8)}`,
// //       reconnectPeriod: 1000,
// //     });

// //     mqttClient.on("connect", () => {
// //       console.log("✅ Connected to MQTT Broker");
// //       mqttClient.subscribe(MQTT_TOPIC, (err) => {
// //         if (err) console.error("❌ Subscription error:", err);
// //       });
// //     });

// //     mqttClient.on("message", (topic, message) => {
// //       try {
// //         const data = JSON.parse(message.toString());
// //         setSlotStatus({
// //           "A-1": data.Sensor1,
// //           "A-2": data.Sensor2,
// //           "A-3": data.Sensor3,
// //           "A-4": data.Sensor4,
// //         });
// //       } catch (error) {
// //         console.error("❌ Error parsing MQTT data:", error);
// //       }
// //     });

// //     mqttClient.on("error", (err) => {
// //       console.error("❌ MQTT Connection Error:", err);
// //     });

// //     setClient(mqttClient);
// //     return () => {
// //       mqttClient.end();
// //     };
// //   }, []);

// //   const handleBooking = (slotId) => {
// //     if (!isWithinRange) {
// //       Alert.alert(
// //         "Warning",
// //         "You are too far from the parking location. Try within 3km."
// //       );
// //       return;
// //     }
// //     navigation.navigate("Book", { selectedSlot: slotId });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.floorContainer}>
// //         <Text style={styles.floorText}>Parking Slots</Text>
// //         <Picker
// //           selectedValue={selectedFloor}
// //           onValueChange={setSelectedFloor}
// //           style={styles.picker}
// //         >
// //           <Picker.Item label="1 Floor" value="1 Floor" />
// //           <Picker.Item label="2 Floor" value="2 Floor" />
// //         </Picker>
// //       </View>

// //       <Text style={styles.entryText}>ENTRY ↓</Text>

// //       <ScrollView contentContainerStyle={styles.gridContainer}>
// //         {parkingSlots.map((slot) => {
// //           const status = slotStatus[slot];
// //           let backgroundColor = "#B8D576";
// //           let buttonText = "BOOK";
// //           let showButton = true;

// //           if (status === "PRESENT") {
// //             backgroundColor = "red";
// //             showButton = false;
// //           } else if (status === "BOOKED") {
// //             backgroundColor = "yellow";
// //             showButton = false;
// //             buttonText = "BOOKED";
// //           }

// //           return (
// //             <View key={slot} style={styles.slotContainer}>
// //               <View style={[styles.slotBox, { backgroundColor }]}>
// //                 <Text style={styles.slotText}>{slot}</Text>
// //                 {showButton && (
// //                   <TouchableOpacity
// //                     style={styles.bookButton}
// //                     onPress={() => handleBooking(slot)}
// //                   >
// //                     <Text style={styles.bookButtonText}>{buttonText}</Text>
// //                   </TouchableOpacity>
// //                 )}
// //               </View>
// //             </View>
// //           );
// //         })}
// //       </ScrollView>

// //       <Text style={styles.entryText}>EXIT ↓</Text>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: "#FFEFC8" },
// //   floorContainer: {
// //     paddingHorizontal: 16,
// //     textAlign: "center",
// //     marginTop: 15,
// //     alignItems: "center",
// //   },
// //   floorText: { fontSize: 25, fontWeight: "600", textAlign: "center" },
// //   picker: { height: 50, width: 150 },
// //   entryText: {
// //     textAlign: "center",
// //     marginTop: 10,
// //     fontSize: 16,
// //     color: "#666",
// //     fontWeight: "bold",
// //   },
// //   gridContainer: {
// //     padding: 9,
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //     justifyContent: "space-between",
// //   },
// //   slotContainer: { width: "48%", marginBottom: 10 },
// //   slotBox: {
// //     borderWidth: 2,
// //     borderRadius: 10,
// //     padding: 29,
// //     alignItems: "center",
// //   },
// //   slotText: { fontSize: 16, fontWeight: "600", color: "#fff" },
// //   bookButton: {
// //     marginTop: 10,
// //     backgroundColor: "#D70654",
// //     paddingVertical: 8,
// //     paddingHorizontal: 20,
// //     borderRadius: 5,
// //   },
// //   bookButtonText: { color: "white", fontWeight: "bold" },
// // });

// // export default Parking;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Picker } from "@react-native-picker/picker";
// import * as Location from "expo-location";
// import { getDistance } from "geolib";
// import mqtt from "mqtt";

// const PARKING_LOCATION = {
//   latitude: 17.01706194618706,
//   longitude: 73.33585630398036,
// };

// // const MQTT_BROKER = "wss://192.168.188.98:8081";
// // const MQTT_BROKER = "wss://test.mosquitto.org:8081";
// // 192.168.188.98 ip
// const MQTT_BROKER = "wss://broker.emqx.io:8081";

// const MQTT_TOPIC = "parking/status";

// const Parking = () => {
//   const navigation = useNavigation();
//   const [selectedFloor, setSelectedFloor] = useState("1 Floor");
//   const [userLocation, setUserLocation] = useState(null);
//   const [isWithinRange, setIsWithinRange] = useState(false);
//   const [slotStatus, setSlotStatus] = useState({
//     "A-1": "ABSENT",
//     "A-2": "ABSENT",
//     "A-3": "ABSENT",
//     "A-4": "ABSENT",
//   });
//   const [client, setClient] = useState(null);
//   const [forceRender, setForceRender] = useState(0); // Forces re-render

//   const parkingSlots = ["A-1", "A-2", "A-3", "A-4"];

//   useEffect(() => {
//     (async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert(
//             "Permission Denied",
//             "Allow location access to book parking."
//           );
//           return;
//         }
//         const { coords } = await Location.getCurrentPositionAsync({});
//         setUserLocation(coords);
//         setIsWithinRange(getDistance(coords, PARKING_LOCATION) <= 3000);
//       } catch (error) {
//         console.error("❌ Location Error:", error);
//         Alert.alert("Error", "Failed to fetch location.");
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     const mqttClient = mqtt.connect(MQTT_BROKER, {
//       clientId: `react-native-${Math.random().toString(16).substr(2, 8)}`,
//       reconnectPeriod: 1000,
//     });

//     mqttClient.on("connect", () => {
//       console.log("✅ Connected to MQTT Broker");
//       mqttClient.subscribe(MQTT_TOPIC, (err) => {
//         if (err) console.error("❌ Subscription error:", err);
//       });
//     });

//     mqttClient.on("message", (topic, message) => {
//       console.log(`📩 MQTT Message Received: ${message.toString()}`);

//       try {
//         const data = JSON.parse(message.toString());
//         console.log("📊 Parsed Data:", data);

//         setSlotStatus((prevStatus) => ({
//           ...prevStatus,
//           "A-1": data.Sensor1 || "ABSENT",
//           "A-2": data.Sensor2 || "ABSENT",
//           "A-3": data.Sensor3 || "ABSENT",
//           "A-4": data.Sensor4 || "ABSENT",
//         }));

//         setForceRender((prev) => prev + 1); // Force re-render
//         console.log("🔄 Updated Slot Status:", slotStatus);
//       } catch (error) {
//         console.error("❌ Error parsing MQTT data:", error);
//       }
//     });

//     mqttClient.on("error", (err) => {
//       console.error("❌ MQTT Connection Error:", err);
//     });

//     setClient(mqttClient);
//     return () => {
//       mqttClient.end();
//     };
//   }, []);

//   const handleBooking = (slotId) => {
//     if (!isWithinRange) {
//       Alert.alert(
//         "Warning",
//         "You are too far from the parking location. Try within 3km."
//       );
//       return;
//     }
//     navigation.navigate("Book", { selectedSlot: slotId });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.floorContainer}>
//         <Text style={styles.floorText}>Parking Slots</Text>
//         <Picker
//           selectedValue={selectedFloor}
//           onValueChange={setSelectedFloor}
//           style={styles.picker}
//         >
//           <Picker.Item label="1 Floor" value="1 Floor" />
//           <Picker.Item label="2 Floor" value="2 Floor" />
//         </Picker>
//       </View>

//       <Text style={styles.entryText}>ENTRY ↓</Text>

//       <ScrollView contentContainerStyle={styles.gridContainer}>
//         {parkingSlots.map((slot) => {
//           const status = slotStatus[slot] || "ABSENT";
//           let backgroundColor = "#B8D576"; // Green for ABSENT
//           let buttonText = "BOOK";
//           let showButton = true;

//           if (status === "PRESENT") {
//             backgroundColor = "red"; // Red for PRESENT
//             showButton = false;
//           } else if (status === "BOOKED") {
//             backgroundColor = "yellow"; // Yellow for BOOKED
//             showButton = false;
//             buttonText = "BOOKED";
//           }

//           return (
//             <View key={slot} style={styles.slotContainer}>
//               <View style={[styles.slotBox, { backgroundColor }]}>
//                 <Text style={styles.slotText}>{slot}</Text>
//                 {showButton && (
//                   <TouchableOpacity
//                     style={styles.bookButton}
//                     onPress={() => handleBooking(slot)}
//                   >
//                     <Text style={styles.bookButtonText}>{buttonText}</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//           );
//         })}
//       </ScrollView>

//       <Text style={styles.entryText}>EXIT ↓</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFEFC8" },
//   floorContainer: {
//     paddingHorizontal: 16,
//     textAlign: "center",
//     marginTop: 15,
//     alignItems: "center",
//   },
//   floorText: { fontSize: 25, fontWeight: "600", textAlign: "center" },
//   picker: { height: 50, width: 150 },
//   entryText: {
//     textAlign: "center",
//     marginTop: 10,
//     fontSize: 16,
//     color: "#666",
//     fontWeight: "bold",
//   },
//   gridContainer: {
//     padding: 9,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   slotContainer: { width: "48%", marginBottom: 10 },
//   slotBox: {
//     borderWidth: 2,
//     borderRadius: 10,
//     padding: 29,
//     alignItems: "center",
//   },
//   slotText: { fontSize: 16, fontWeight: "600", color: "#fff" },
//   bookButton: {
//     marginTop: 10,
//     backgroundColor: "#D70654",
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   bookButtonText: { color: "white", fontWeight: "bold" },
// });

// export default Parking;







// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// EMEX broker

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import mqtt from "mqtt";

const PARKING_LOCATION = {
  latitude: 17.01706194618706,
  longitude: 73.33585630398036,
};

// const MQTT_BROKER = "wss://broker.emqx.io:8081";
const MQTT_BROKER = "ws://broker.emqx.io:8083/mqtt";
const MQTT_TOPIC = "parking/status";

const Parking = () => {
  const navigation = useNavigation();
  const [selectedFloor, setSelectedFloor] = useState("1 Floor");
  const [userLocation, setUserLocation] = useState(null);
  const [isWithinRange, setIsWithinRange] = useState(false);
  const [slotStatus, setSlotStatus] = useState({
    "A-1": "ABSENT",
    "A-2": "ABSENT",
    "A-3": "ABSENT",
    "A-4": "ABSENT",
  });
  const [client, setClient] = useState(null);

  const parkingSlots = ["A-1", "A-2", "A-3", "A-4"];

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Allow location access to book parking."
          );
          return;
        }
        const { coords } = await Location.getCurrentPositionAsync({});
        setUserLocation(coords);
        setIsWithinRange(getDistance(coords, PARKING_LOCATION) <= 3000);
      } catch (error) {
        console.error("❌ Location Error:", error);
        Alert.alert("Error", "Failed to fetch location.");
      }
    })();
  }, []);

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_BROKER, {
      clientId: `react-native-${Math.random().toString(16).substr(2, 8)}`,
      reconnectPeriod: 2000, // Try reconnecting every 2 seconds if disconnected
    });

    mqttClient.on("connect", () => {
      console.log("✅ Connected to EMQX MQTT Broker");
      mqttClient.subscribe(MQTT_TOPIC, (err) => {
        if (err) console.error("❌ Subscription error:", err);
      });
    });

    mqttClient.on("message", (topic, message) => {
      console.log(`📩 MQTT Message Received: ${message.toString()}`);

      try {
        const data = JSON.parse(message.toString());
        console.log("📊 Parsed Data:", data);

        setSlotStatus((prevStatus) => ({
          ...prevStatus,
          "A-1": data.Sensor1 || "ABSENT",
          "A-2": data.Sensor2 || "ABSENT",
          "A-3": data.Sensor3 || "ABSENT",
          "A-4": data.Sensor4 || "ABSENT",
        }));

        console.log("🔄 Updated Slot Status:", slotStatus);
      } catch (error) {
        console.error("❌ Error parsing MQTT data:", error);
      }
    });

    mqttClient.on("error", (err) => {
      console.error("❌ MQTT Connection Error:", err);
    });

    mqttClient.on("reconnect", () => {
      console.log("🔄 Reconnecting to MQTT Broker...");
    });

    mqttClient.on("close", () => {
      console.log("🔌 Disconnected from MQTT Broker");
    });

    setClient(mqttClient);
    return () => {
      mqttClient.end();
    };
  }, []);

  const handleBooking = (slotId) => {
    if (!isWithinRange) {
      Alert.alert(
        "Warning",
        "You are too far from the parking location. Try within 3km."
      );
      return;
    }
    navigation.navigate("Book", { selectedSlot: slotId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.floorContainer}>
        <Text style={styles.floorText}>Parking Slots</Text>
        <Picker
          selectedValue={selectedFloor}
          onValueChange={setSelectedFloor}
          style={styles.picker}
        >
          <Picker.Item label="1 Floor" value="1 Floor" />
          <Picker.Item label="2 Floor" value="2 Floor" />
        </Picker>
      </View>

      <Text style={styles.entryText}>ENTRY ↓</Text>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {parkingSlots.map((slot) => {
          const status = slotStatus[slot] || "ABSENT";
          let backgroundColor = "#B8D576"; // Green for ABSENT
          let buttonText = "BOOK";
          let showButton = true;

          if (status === "PRESENT") {
            backgroundColor = "red"; // Red for PRESENT
            showButton = false;
          } else if (status === "BOOKED") {
            backgroundColor = "yellow"; // Yellow for BOOKED
            showButton = false;
            buttonText = "BOOKED";
          }

          return (
            <View key={slot} style={styles.slotContainer}>
              <View style={[styles.slotBox, { backgroundColor }]}>
                <Text style={styles.slotText}>{slot}</Text>
                {showButton && (
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleBooking(slot)}
                  >
                    <Text style={styles.bookButtonText}>{buttonText}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <Text style={styles.entryText}>EXIT ↓</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFEFC8" },
  floorContainer: {
    paddingHorizontal: 16,
    textAlign: "center",
    marginTop: 15,
    alignItems: "center",
  },
  floorText: { fontSize: 25, fontWeight: "600", textAlign: "center" },
  picker: { height: 50, width: 150 },
  entryText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  gridContainer: {
    padding: 9,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  slotContainer: { width: "48%", marginBottom: 10 },
  slotBox: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 29,
    alignItems: "center",
  },
  slotText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  bookButton: {
    marginTop: 10,
    backgroundColor: "#D70654",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookButtonText: { color: "white", fontWeight: "bold" },
});

export default Parking;








