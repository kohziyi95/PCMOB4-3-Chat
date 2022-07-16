import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import firebase from "../database/firebaseDB";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";

const auth = firebase.auth();
const db = firebase.firestore().collection("messages");

const demoMessage = {
  _id: 1,
  text: "Hello there!",
  createdAt: new Date(),
  user: {
    _id: 2,
    name: "Demo person",
    avatar: "https://placeimg.com/140/140/any",
  },
};

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {

    const unsubscribe = db
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        const updatedNotes = collectionSnapshot.docs.map((doc) => {
          const messages = collectionSnapshot.docs.map((doc) => {
            const date = doc.data().createdAt.toDate();
            const newDoc = { ...doc.data(), createdAt: date };
            return newDoc;
          });
          setMessages(messages);
        });
      });

    auth.onAuthStateChanged((user) => {
      if (user) navigation.navigate("Chat", { id: user.id, emai: user.email });
      else navigation.navigate("Login");
    });

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout} style={{ marginHorizontal: 20 }}>
          <MaterialCommunityIcons name="logout" size={26} color="grey" />
        </TouchableOpacity>
      ),
    });

    // setMessages([demoMessage]);
    return unsubscribe;
  }, []);

  const logout = () => auth.signOut();

  function sendMessages(newMessages) {
    console.log(newMessages);
    // setMessages([...messages, ...newMessages]);
    db.add(newMessages[0]);
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={sendMessages}
        listViewProps={{ style: { backgroundColor: "grey" } }}
        user={{ _id: auth.currentUser?.uid, name: auth.currentUser?.email }}
      />
      {/* <Text style={styles.title}>ChatScreen</Text> */}
      {/* <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
        title="Logout"
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "red",
    margin: 20,
    marginTop: 20,
    paddingHorizontal: 30,
    padding: 15,
    borderRadius: 5,
    width: "30%",
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
});
