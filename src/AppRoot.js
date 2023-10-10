import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store/configureStore';
import AppNavigator from './Navigation/AppNavigator';
import Loading from './components/Loading';
import { getUserData } from './redux/actions/userActions';
import Banner from './components/Banner';
import PremiumModal from './components/PremiumModal';

const AppRoot = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);

  return (
    <>
      <Loading />
      {user && <Banner user={user}/>}
      <PremiumModal/>
      <AppNavigator />
    </>

  );
};

export default AppRoot;
