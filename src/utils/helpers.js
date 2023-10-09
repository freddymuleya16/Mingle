
//import Geolocation from 'react-native-geolocation-service';

import { collection, getDocs, query, where } from "firebase/firestore";
import { Linking } from "react-native";
import { FIREBASE_DB } from "../../firebase.config"; 

import CryptoJS from 'crypto-js';
 

export const getUserLocation = async () => {
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

export const getChatDocumentWithoutCreating = async (user1Id, user2Id) => {
  const chatCollection = collection(FIREBASE_DB, "chats");
  // Create a query for all chat documents that contain user1Id
  const q = query(chatCollection, where("users", "array-contains", user1Id));
  const querySnapshot = await getDocs(q);
  // Filter the results to find the chat document that contains both user1Id and user2Id
  const matchingDocs = querySnapshot.docs.filter((doc) => {
    return doc.data().users.includes(user2Id);
  });
  // If there's a match, return the chat document ID
  if (matchingDocs.length > 0) {
    return matchingDocs[0].id;
  } else {
    return null;
  }
};
export const encryptMessage = (message) => {
  const encrypted = CryptoJS.AES.encrypt(message, "Q2A2345DF6TA8S7GQ9BEHFBISDVIHURNUHV8OHSLKFUHGF948N2FLOHSOFJPSDKFPOROGNUHR").toString();
  return encrypted;
};

export const decryptMessage = (encryptedMessage) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, "Q2A2345DF6TA8S7GQ9BEHFBISDVIHURNUHV8OHSLKFUHGF948N2FLOHSOFJPSDKFPOROGNUHR").toString(CryptoJS.enc.Utf8);
  return decrypted;
};

export const isSubscribed = (user) => {
  if (user && user.premium === true) {
    // Check the expiry date (assuming 'expiryDate' is a valid date string)
    const currentDate = new Date();
    const expiryDate = new Date(user.expiryDate);

    if (expiryDate > currentDate) {
      return true; // User is subscribed and the subscription is not expired
    } else {
      return false; // User is subscribed, but the subscription has expired
    }
  } else {
    return false; // User is not subscribed
  }
};
 
