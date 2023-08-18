import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store/configureStore';
import AppNavigator from './Navigation/AppNavigator'; 
import Loading from './components/Loading';

const AppRoot = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Loading />
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default AppRoot;
