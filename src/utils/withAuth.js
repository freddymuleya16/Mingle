import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { FIREBASE_AUTH } from '../../firebase.config';
import { setUserData } from '../redux/actions/userActions';

// Define a functional component that checks authentication status
const withAuth = (Component) => {
    return function WithAuthComponent(props) {
        // Get the authentication status from the Redux store
        const user = useSelector((state) => state.user.userData);
        const dispatch = useDispatch();
        if (!FIREBASE_AUTH.currentUser && user) {
            console.log('ALIGNED With auth')
            dispatch(setUserData(null))
            return null;
        } else {
            return <Component {...props} />;
        }
        // If the user is authenticated, render the component, otherwise, redirect to the login page



    };
};

export default withAuth;
