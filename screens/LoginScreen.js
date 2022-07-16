import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import firebase from "../database/firebaseDB";

const auth = firebase.auth();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  async function login(){
    try {
      await auth.signInWithEmailAndPassword(email, password);
    }catch (error) {
      console.log(error);
      setErrorText(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat App</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Email"
        value={email}
        onChangeText={(input) => setEmail(input)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(input) => setPassword(input)}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.errorText}>{errorText}</Text>

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
  label: {
    fontSize: 22,
    // textAlign: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 22,
    // textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    // width: "80%",
    padding: 10,
    margin: 20,
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
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
