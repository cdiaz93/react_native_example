import React, { useState, useEffect  } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert, FlatList, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

//Modelo user
import { createTable, insertUser } from "@/db/User";

interface User {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  message: string;
  country: string;
}

export default function CreateUser() {

  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    email: "",
    phone: "",
    message: "",
    country: "", 
  });

  const handleInputChange = (name: keyof User, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { first_name, second_name, email, phone, message, country } = formData;

    if (first_name && second_name && email && phone && country && message) {
      insertUser(formData);

      setFormData({
        first_name: "",
        second_name:"",
        email: "",
        phone: "",
        message: "",
        country: "",
      });
      Alert.alert("Exito", "Usuario registrado.");
    } else {
      Alert.alert("Error", "Por favor, completa todos los campos.");
    }
  };

  useEffect(() => {
    createTable();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Registrar usuario </Text>
      <TextInput
        style={styles.input}
        placeholder="Nombres"
        value={formData.first_name}
        onChangeText={(text) => handleInputChange("first_name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={formData.second_name}
        onChangeText={(text) => handleInputChange("second_name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={formData.email}
        keyboardType="email-address"
        onChangeText={(text) => handleInputChange("email", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={formData.phone}
        keyboardType="phone-pad"
        onChangeText={(text) => handleInputChange("phone", text)}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.country}
          onValueChange={(itemValue) => handleInputChange("country", itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un país" value="" />
          <Picker.Item label="Colombia" value="Colombia" />
          <Picker.Item label="EE.UU" value="EE.UU" />
          <Picker.Item label="Argentina" value="Argentina" />
          <Picker.Item label="Brazil" value="Brazil" />
          <Picker.Item label="España" value="España" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Mensaje"
        value={formData.message}
        multiline
        numberOfLines={4}
        onChangeText={(text) => handleInputChange("message", text)}
      />

      <TouchableOpacity style={styles.buttonSucess} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerContainer: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: "center", 
  },
  picker: {
    // color: "#B0C4DE",
    marginLeft: -10,
  },
  buttonSucess: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#4CD964'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
},
});

