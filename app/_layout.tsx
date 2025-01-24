import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';


//Libreria SQLIte
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
export const DATABASE_NAME = 'users';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

    const migrateDbIfNeeded = async(db: SQLiteDatabase) => {
      const DATABASE_VERSION = 1;
  
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL,
        first_name TEXT NOT NULL, 
        second_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        message TEXT NOT NULL,
        intValue INTEGER);
      `);
    }

  return (
    <SQLiteProvider databaseName="example.db" onInit={migrateDbIfNeeded}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      </SQLiteProvider>
  );
}
