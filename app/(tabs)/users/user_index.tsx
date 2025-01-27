import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { IconSymbol } from '@/components/ui/IconSymbol';

//Modelo Users
import { createTable, getUsers, dropTableUsers, deleteUser } from '@/db/User';

interface User {
    id: number;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    message: string;
    country: string;
}

const Index = () => {

    // const [data, setData] = useState([]);
    const [data, setData] = useState<User[]>([]);
    useEffect(() => {
    }, []);

    useFocusEffect(
        useCallback(() => {
            createTable();
            consultarUsuarios();
          return () => {
            console.log('Pantalla desenfocada');
          };
        }, [])
    );

    const consultarUsuarios = async (): Promise<void> => {
        const query: User[] = await getUsers(); 
        if (!query) {
            console.error('No users found');
            return;
        }
        const formattedUsers = query.map(user => ({
            id: user.id || 0,
            first_name: user.first_name || "",  // Mapeamos las propiedades de cada usuario
            second_name: user.second_name || "",
            email: user.email || "",
            phone: user.phone || "",
            message: user.message || "",
            country: user.country || "",
        }));

        setData(formattedUsers);
    }

    const eliminarTablaUsers = async () => {
        Alert.alert("Confirmación", "¿Estás seguro de eliminar la Tabla?", [
            {
                text: "Cancelar",
                onPress: () => console.log("Acción cancelada"),
                style: "cancel",
            },
            { text: "Sí", onPress: async () => {
                await dropTableUsers();
                consultarUsuarios();
            }},
        ], { cancelable: false }
        );
        
    }

    const eliminarUsuario = async (id: number, nombre: string) => {
        Alert.alert("Confirmación", `¿Eliminar a ${nombre}?`, [
            {
                text: "Cancelar",
                onPress: () => console.log("Acción cancelada"),
                style: "cancel",
            },
            { text: "Sí", onPress: async () => {
                await deleteUser(id);
                consultarUsuarios();
            }},
        ], { cancelable: false }
        );
        
    }

    

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}> Listado usuario </Text>
            {data.length > 0 ? (
                data.map((item) => (
                <Text key={item.id} style={styles.text}>
                    Nombres: {item.first_name} {item.second_name}  {"\n"}
                    Email: {item.email}  {"\n"}
                    Telefono: {item.phone} {"\n"}
                    Pais: {item.country} {"\n"}
                    Mensaje: {item.message} {"\n"}
                    
                    
                    <TouchableOpacity style={styles.butonDeleteUser} onPress={() => eliminarUsuario(item.id, item.first_name +' '+ item.second_name)}>
                        <Text style={styles.buttonDeleteUserText}>
                            <IconSymbol size={20} name="trash" color={'white'}/>
                        </Text>
                    </TouchableOpacity>
                </Text>
                ))
            ) : (
                <Text style={styles.text}>Cargando datos...</Text>
            )}

            <TouchableOpacity style={styles.butonDelete} onPress={eliminarTablaUsers}>
                <Text style={styles.buttonText}>Eliminar Tabla Users</Text>
            </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 0,
    },
    text: {
        fontSize: 15,
        marginBottom: 20,
        width: '100%',
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
        // position: 'absolute',s
        top: 100,
        marginTop: 70,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#FF3B30'
    },
    butonDeleteUser:{
        padding: 4,
        backgroundColor: '#FF3B30'
    },
    buttonDeleteUserText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
});

export default Index;
