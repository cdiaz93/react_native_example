import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';


const App = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        newTable();
        consultar1(setData);

    }, [data]);

    const newTable = async () => {

        const db = await SQLite.openDatabaseAsync('myDatabase.db');
        // Crear tabla
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
        `);
    }

    const registrar = async () => {
        const db = await SQLite.openDatabaseAsync('myDatabase.db');
        
        const randomValue1 = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            INSERT INTO test (value, intValue) VALUES ('test1', ${randomValue1});
        `);
        Alert.alert('Exito', 'Datos Ingresados correctamten en  DB');
    }

    const eliminar = async () => {
        const db = await SQLite.openDatabaseAsync('myDatabase.db');

        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            DELETE FROM test;
        `);
        
        Alert.alert('Exito', 'Datos eliminados');
        consultar1(setData);
    }


  const consultar1 = async (setData) => {
    try {
      const db = await SQLite.openDatabaseAsync('myDatabase.db');
      const allRows = await db.getAllAsync('SELECT * FROM test');
      const formattedData = allRows.map((row) => ({
        id: row.id,
        value: row.value,
        intValue: row.intValue,
      }));
      setData(formattedData); // Guarda los datos en el estado
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
    }
  };


  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text>SQLite Example 1 </Text>

            <TouchableOpacity style={styles.butonSucess} onPress={registrar}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.butonDelete} onPress={eliminar}>
                <Text style={styles.buttonText}>Elimniar</Text>
            </TouchableOpacity>
            {data.length > 0 ? (
                data.map((item) => (
                <Text key={item.id} style={styles.text}>
                    ID: {item.id}, Value: {item.value}, IntValue: {item.intValue}
                </Text>
                ))
            ) : (
                <Text style={styles.text}>Cargando datos...</Text>
            )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },

    butonSucess: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#4CD964'
    },

    butonDelete: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#FF3B30'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

export default App;
