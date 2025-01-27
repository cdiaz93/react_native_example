
import * as SQLite from "expo-sqlite";


//Guardar un registro
interface UserFormData {
    first_name: string;
    second_name: string;
    email: string;
    country: string;
    phone: string;
    message: string;
}

interface User {
    id: number;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    message: string;
    country: string;
}

// Crear tabla
const createTable = async () => {
    try{
        const db = await SQLite.openDatabaseAsync('example.db');
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, first_name TEXT, second_name TEXT, email TEXT, phone TEXT, country TEXT, message TEXT);
        `);
        console.log('Tabla creada con exito');
    }catch (error) {
        console.error('Error al crear la tabla: ', error);
    }
}

const dropTableUsers = async () =>{
    try{
        const db = await SQLite.openDatabaseAsync('example.db');
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            DROP TABLE users;
        `);
        console.log('Tabla eliminada con exito');
    }catch (error) {
        console.error('Error al eliminar la tabla usuarios: ', error);
    }

}

const insertUser = async (formData: UserFormData): Promise<void> => {
    try {
        const db = await SQLite.openDatabaseAsync('example.db');
        const { first_name, second_name, email, phone, country, message } = formData;

        const query = await db.runAsync('INSERT INTO users (first_name, second_name, email, phone, country, message) VALUES (?, ?, ?, ?, ?, ?)',
            first_name, second_name, email, phone, country, message
        );

        console.log(query.lastInsertRowId, query.changes);
    } catch (error) {
        console.error('Error al registrar usuario: ', error);
    }
}

const getUsers = async (): Promise<User[]> => {
    try {
      const db = await SQLite.openDatabaseAsync('example.db');
      const allRows = await db.getAllAsync('SELECT * FROM users');
      return allRows as User[];

    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      return [];
    }
};

const deleteUser = async (id: number): Promise<void> => {
    const db = await SQLite.openDatabaseAsync('example.db');
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        DELETE FROM users WHERE id = ${id};
    `);
}


 

export { createTable, insertUser, getUsers, deleteUser, dropTableUsers };