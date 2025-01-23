import React, { useState, useEffect  } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSQLiteContext } from "expo-sqlite";



export default function App() {


  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    email: "",
    phone: "",
    message: "",
    country: "", 
  });

  const database = useSQLiteContext();


  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {

    const { first_name, second_name, email, phone, message, country } = formData;

    if (first_name && second_name && email && phone && country && message) {


      database.runAsync("INSERT INTO users(first_name, second_name, email) VALUES (?,?,?);", [
        first_name,  second_name, email, 
      ]);

      Alert.alert("Formulario enviado", `¡Gracias, ${formData.first_name}!`);
      setFormData({
        first_name: "",
        second_name:"",
        email: "",
        phone: "",
        message: "",
        country: "",
      });
    } else {
      Alert.alert("Error", "Por favor, completa todos los campos.");
    }
  };



  useEffect(() => {
  
  }, []);

  return (
    <View style={styles.container}>



      <Text style={styles.title}>Formulario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombres"
        value={formData.name}
        onChangeText={(text) => handleInputChange("first_name", text)}
      />

<TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={formData.name}
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

      <Text style={styles.label}>Selecciona tu país:</Text>
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

      <Button title="Enviar" onPress={handleSubmit} />
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
    color: "#000", // Cambia el color del texto del Picker
  },
});
