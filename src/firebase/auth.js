import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithCredential,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  linkWithPopup,
} from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import {
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { SET_LOADING, SET_USER_DATA, setLoading, setUserData } from "../redux/actions/userActions";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase.config";

export const signup = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    console.log('Signup: Before creation');

    const userCredential = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    console.log('Signup: After creation');

    dispatch(
      setUserData({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
      })
    );

    dispatch(sendVerificationEmail());
    dispatch(checkUserProfileCompletion());
    console.log('Signup: User successfully created and verification email sent');
  } catch (error) {
    console.error('Signup Error:', error);

    let errorMessage = 'An error occurred while signing up. Please try again later.';

    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already in use. Please use a different email.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Please provide a valid email address.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'The password is too weak. Please choose a stronger password.';
    }
    return errorMessage;
    // Dispatch an action or set a state variable to show the user-friendly error message
  } finally {
    dispatch(setLoading(false));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    console.log('Forgot Password: Before sending password reset email');

    const actionCodeSettings = {
      url: + "https://mingle-sa.vercel.app/auth/login",
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(FIREBASE_AUTH, email);

    console.log('Forgot Password: Password reset email sent successfully');
  } catch (error) {
    console.error('Forgot Password Error:', error);

    let errorMessage = 'An error occurred while sending the password reset email. Please try again later.';

    if (error.code === 'auth/invalid-email') {
      errorMessage = 'Please provide a valid email address.';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'There is no user account associated with this email address.';
    }
    return errorMessage;
    // Dispatch an action or set a state variable to show the user-friendly error message
  } finally {
    dispatch(setLoading(false));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading({ type: SET_LOADING, payload: true }));

  try {
    console.log('Login: Before attempting login', email);

    const userCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    console.log('Login: User successfully logged in', email);

    dispatch(
      setUserData({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,

      })
    );

    dispatch(checkUserProfileCompletion());
    // Dispatch any additional actions or operations here
  } catch (error) {
    console.error('Login Error:', error);

    let errorMessage = 'An error occurred while logging in. Please try again later.';

    if (error.code === 'auth/invalid-email') {
      errorMessage = 'Please provide a valid email address.';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'This account has been disabled. Please contact support for assistance.';
    } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password. Please check your credentials and try again.';
    }
    return errorMessage;
    // Dispatch an action or set a state variable to show the user-friendly error message
  } finally {
    dispatch(setLoading(false));
  }
};



export const logout = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    console.log('Logout: Before logging out');

    await (FIREBASE_AUTH.signOut());

    console.log('Logout: User successfully logged out');

    dispatch(setUserData(null)); // Clear user data after logout

    // Dispatch any additional actions or operations here
  } catch (error) {
    console.error('Logout Error:', error);

    let errorMessage = 'An error occurred while logging out. Please try again later.';
    // You can customize error messages based on your needs
    return errorMessage;
    // Dispatch an action or set a state variable to show the user-friendly error message
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};


export const sendVerificationEmail = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    console.log('Sending Verification Email: Before sending email');

    const actionCodeSettings = {
      handleCodeInApp: true,
    };

    await sendEmailVerification(FIREBASE_AUTH.currentUser);

    console.log('Sending Verification Email: Email verification sent successfully');
  } catch (error) {
    console.error('Sending Verification Email Error:', error);

    let errorMessage = 'An error occurred while sending the verification email. Please try again later.';
    // You can customize error messages based on your needs
    return errorMessage;
  } finally {
    dispatch(setLoading(false));
  }
};


export const checkUserProfileCompletion = () => async (dispatch, getState) => {
  dispatch(setLoading(true));

  try {
    console.log('Checking User Profile Completion');

    const uid = FIREBASE_AUTH.currentUser.uid;
    const userRef = doc(FIREBASE_DB, 'users', uid);

    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const { profileCompleted } = userDoc.data();
      const { userData } = getState().user; // Get current user data from Redux

      dispatch(
        setUserData({
          ...userData,
          profileCompleted,
        })
      );
    } else {
      const { userData } = getState().user; // Get current user data from Redux

      dispatch(
        setUserData({
          ...userData,
          profileCompleted: false,
        })
      );
    }

    console.log('User Profile Completion Checked');
  } catch (error) {
    console.error('User Profile Completion Error:', error);
    // Handle error or dispatch an error action if needed
  } finally {
    dispatch(setLoading(false));
  }
};



export const uploadFormToFirebase = (
  gender,
  orientation,
  firstName,
  lastName,
  age,
  ageRange,
  distance,
  pictures,
  location,
  aboutMe,
  editMode = false
) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    console.log('Uploading Form to Firebase');

    const storage = getStorage();
    const storageRef = ref(storage, 'pictures');
    pictures = [...pictures];

    const pictureRefs = await Promise.all(
      pictures.map((picture) => {
        if (typeof picture === 'string' || picture instanceof String) {
          return picture;
        } else {
          const fileRef = ref(
            storage,
            `pictures/${Date.now()}-${picture.name}`
          );

          // Start uploading the picture and get the download URL
          return uploadBytesResumable(fileRef, picture).then((snapshot) =>
            getDownloadURL(snapshot.ref)
          );
        }
      })
    );

    const db_ = db;
    const currentUser = getAuth().currentUser;

    if (editMode) {
      const userRef = doc(db_, 'users', currentUser.uid);
      await updateDoc(userRef, {
        gender,
        orientation,
        firstName,
        lastName,
        age,
        ageRange,
        distance,
        pictures: pictureRefs,
        aboutMe,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
    } else {
      await setDoc(doc(db_, 'users', currentUser.uid), {
        email: currentUser.email,
        gender,
        orientation,
        firstName,
        lastName,
        age,
        ageRange,
        distance,
        pictures: pictureRefs,
        createdAt: serverTimestamp(),
        profileCompleted: true,
        aboutMe,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
    }

    dispatch(checkUserProfileCompletion());

    console.log('Form Uploaded Successfully');
  } catch (error) {
    console.error('Form Upload Error:', error);

    let errorMessage = 'An error occurred while uploading the form. Please try again later.';
    // Customize error messages based on your needs
    return errorMessage;
  } finally {
    dispatch(setLoading(false));
  }
};


export const facebookSignIn = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const FIREBASE_AUTH = getAuth();
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(FIREBASE_AUTH, provider);

    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
  } catch (error) {
    if (error.code === "FIREBASE_AUTH/account-exists-with-different-credential") {
      const { email } = error.customData;
      const providers = await fetchSignInMethodsForEmail(getAuth(), email);

      if (confirm(`You have already registered with ${providers[0]}. Do you want to link your Facebook account?`)) {
        const provider = new FacebookAuthProvider();
        let prov;
        if (providers[0] === 'google.com') {
          prov = new GoogleAuthProvider();
        } else if (providers[0] === 'password') {
          prov = new EmailAuthProvider();
        }
        const user = await signInWithPopup(getAuth(), prov);
        const FIREBASE_AUTH = getAuth();
        linkWithPopup(FIREBASE_AUTH.currentUser, provider).then((result) => {
          // Accounts successfully linked.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const user = result.user;
          console.log(credential, user)
          // ...
        }).catch((error) => {
          console.log(error)
          // Handle Errors here.
          // ...
        });
        // try {
        //   let prov;
        //   if (providers[0] === 'google.com') {
        //     prov = new GoogleAuthProvider();
        //   } else if (providers[0] === 'password') {
        //     prov = new EmailAuthProvider();
        //   }
        //   const user = await signInWithPopup(getAuth(), prov);
        //   const credential = FacebookAuthProvider.credentialFromError(error);
        //   console.log('credentials',credential)
        //   await linkWithCredential(user, credential);
        //   console.log("New provider successfully linked!");
        // } catch (linkError) {
        //   if (error.code === "FIREBASE_AUTH/popup-blocked") {
        //     // Handle the "popup-blocked" error
        //     alert("Popup blocked. Please enable popups to sign in.");
        //   }
        //   console.error("Error linking provider:", linkError);
        //   // Handle the error that occurred while linking the new provider.
        // }
      } else {
        // User chose not to link accounts, handle as needed.
      }
    } else if (error.code === "FIREBASE_AUTH/popup-blocked") {
      // Handle the "popup-blocked" error
      alert("Popup blocked. Please enable popups to sign in.");
    } else {
      console.error(error);
      dispatch(setError(error));
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const googleSignIn = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const provider = new GoogleAuthProvider();

    const FIREBASE_AUTH = getAuth();

    const result = await signInWithPopup(FIREBASE_AUTH, provider);

    //console.log(result);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.error(error);
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};


export async function getUser(uid) {
  try {
    console.log(`Getting user data for UID: ${uid}`);

    const q = query(collection(db, 'users'), where('__name__', '==', uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`User data not found for UID: ${uid}`);
      return null;
    }

    const doc = querySnapshot.docs[0];
    const user = { id: doc.id, ...doc.data() };

    console.log(`User data fetched successfully for UID: ${uid}`);
    return user;
  } catch (error) {
    console.error(`Error fetching user data for UID ${uid}:`, error);

    let errorMessage = 'An error occurred while fetching user data. Please try again later.';
    // Customize error messages based on your needs
    return errorMessage;

    return null;
  } finally {
    dispatch(setLoading(false));
  }
}
