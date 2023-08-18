
//import Geolocation from 'react-native-geolocation-service';

import { Linking } from "react-native";

export const getUserLocation = () => {}
// export const getUserLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         return (position);
//       },
//       error => {
//         console.error('Error getting location:', error);
//       }
//     );
//   };

export const openWebsite = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URL: ${url}`);
    }
  };
  