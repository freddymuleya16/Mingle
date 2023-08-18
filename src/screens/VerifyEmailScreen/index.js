import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { BackgroundImage, Container, ContentContainer, FormContainer, HeaderText, Label, LinkText, TCText } from '../SignInScreen/styles';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, sendVerificationEmail } from '../../firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase.config';
import { setUserData } from '../../redux/actions/userActions';
import { styled } from 'styled-components';

export const DoubleInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 16px;
`;
const MAX_TRIES = 10;
const VERIFY_INTERVAL = 10000;

export default function VerifyEmailScreen() {
    const reduxUser = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();

    const [tries, setTries] = useState(0);
    function handleSendVerification() {
        dispatch(sendVerificationEmail());
    }


    useEffect(() => {
        const intervalId = setInterval(async () => {
            const user = FIREBASE_AUTH.currentUser;
            if (user) {
                await user.reload();
                if (user.emailVerified) {
                    reduxUser.emailVerified = true
                    clearInterval(intervalId);
                    dispatch(setUserData(reduxUser));
                } else {
                    setTries((prevTries) => prevTries + 1);
                    if (tries >= MAX_TRIES) {
                        FIREBASE_AUTH.signOut();
                    }
                }
            }
        }, VERIFY_INTERVAL);

        return () => clearInterval(intervalId);
    }, [dispatch, reduxUser, tries]);

    return (
        <BackgroundImage>
            <Container>
                <ContentContainer contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled">
                    <HeaderText>VERIFY YOUR EMAIL</HeaderText>
                    <FormContainer>



                    </FormContainer >
                    <TCText>

                        A verification email has been sent to {FIREBASE_AUTH.currentUser?.email}. Please follow the instructions in the email to verify your email address.
                    </TCText>
                    <DoubleInputContainer>
                        <Button onPress={() => {

                            FIREBASE_AUTH.signOut()
                            dispatch(setUserData(null))
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={handleSendVerification}>
                            Resend
                        </Button>

                    </DoubleInputContainer>

                </ContentContainer>
            </Container>
        </BackgroundImage >

    )
}