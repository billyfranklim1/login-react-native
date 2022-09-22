import { StatusBar } from 'expo-status-bar';
import { React } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#38a69d" barStyle="light-content" />
        <Routes />
      </NavigationContainer>
    </ToastProvider>
  );
}
