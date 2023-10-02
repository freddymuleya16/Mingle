import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppRoot from './src/AppRoot';
import { persistor, store } from './src/redux/store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

export default function App() {
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