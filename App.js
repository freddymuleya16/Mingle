import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppRoot from './src/AppRoot';
import { persistor, store } from './src/redux/store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { useFonts } from '@expo-google-fonts/kalam';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
export default function App() {
  

  let [fontsLoaded, fontError] = useFonts({
    'kalam':require('./assets/Kalam/Kalam-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
          <AppRoot />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>

  );
} 