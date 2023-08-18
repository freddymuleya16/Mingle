import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from './actions/toastActions';

const ToastComponent = () => {
  const dispatch = useDispatch();
  const { message, isVisible } = useSelector((state) => state.toast);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000); // Hide toast after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  return (
    <View>
      {isVisible && (
        <View>
          <Text>{message}</Text>
        </View>
      )}
    </View>
  );
};

export default ToastComponent;
