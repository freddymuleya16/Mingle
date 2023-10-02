
//import Geolocation from 'react-native-geolocation-service';

import { Linking } from "react-native";

export const getUserLocation =async () => {
  return {
    latitude:
      -23.8850806,
    longitude:
      29.7311898
  }
}
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
export const calculateDistance = (location1, location2) => {
  const { latitude: lat1, longitude: lng1 } = location1;
  const { latitude: lat2, longitude: lng2 } = location2;

  const earthRadius = 6371; // km
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance.toFixed(0);
};

// Helper function to convert degrees to radians
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};