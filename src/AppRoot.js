import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store/configureStore'; 
import AppNavigator from './Navigation/AppNavigator';
import ProfileScreen from './screens/ProfileScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AppRoot = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
     <AppNavigator/>
              
      </PersistGate>
    </Provider>
  );
};

export default AppRoot;
