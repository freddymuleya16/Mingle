import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { isSubscribed, openWebsite } from '../../utils/helpers';
import { useSelector } from 'react-redux';

const BannerContainer = styled(View)`
  background-color: #319795;
  padding: 20px;
  position: absolute;
  width: 60%;
  right: 10px;
  bottom: 100px;
  border-radius: 10px;
  z-index: 20;
`;

const BannerText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: white;
`;

const SubscribeButton = styled(TouchableOpacity)`
  background-color: white;
  padding: 5px 15px;
  border-radius: 5px;
  margin-top: 10px;
`;

const SubscribeButtonText = styled(Text)`
  color: #319795;
  font-weight: bold;
  text-align: center;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
`;

const CloseButtonText = styled(Text)`
  color: white;
  font-weight: bold;
`;

const Banner = ({ user }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) {
      const showBannerTimer = setTimeout(() => {
        setIsDismissed(false);
      }, 5 * 60 * 1000); // 5 minutes in milliseconds

      return () => clearTimeout(showBannerTimer);
    }
  }, [isDismissed]);

  const dismissBanner = () => {
    setIsDismissed(true);
  };

  const handleSubscribe = () => {
    openWebsite("https://mingle-sa.vercel.app/subscribe")
    // Navigate to the subscription screen
    // You can use React Navigation or any other navigation library for this
    // Example: navigation.navigate('Subscribe');
  };

  // Check if user is subscribed (you should define the isSubscribed function)
  // if (isSubscribed(user)) {
  //   return null;
  // }

  if (isDismissed ||  isSubscribed(user)) {
    return null;
  }

  return (
    <BannerContainer>
      <BannerText>Upgrade to Premium for Exclusive Features!</BannerText>
      <SubscribeButton onPress={handleSubscribe}>
        <SubscribeButtonText>Subscribe</SubscribeButtonText>
      </SubscribeButton>
      <CloseButton onPress={dismissBanner}>
        <CloseButtonText>X</CloseButtonText>
      </CloseButton>
    </BannerContainer>
  );
};

export default Banner;
