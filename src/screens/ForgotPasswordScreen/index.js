import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { BackgroundImage, Container, ContentContainer, FormContainer, HeaderText, Label, LinkText, TCText } from '../SignInScreen/styles';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../firebase/auth';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null)
    const dispatch = useDispatch();
    const handleForgotPassword = () => {
        const errors = {};

        // Check for email
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (Object.keys(errors).length !== 0) {
            setError(errors)
            return;
        }
        dispatch(forgotPassword(email));
    };

    return (
        <BackgroundImage>
            <Container>
                <ContentContainer contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled">
                    <HeaderText>FORGOT PASSWORD</HeaderText>
                    <FormContainer>
                        <Label>Email:</Label>
                        <Input
                            placeholder="Enter email"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="next"
                            error={error?.email}
                            value={email}
                            width={100}
                            onChangeText={setEmail}
                        />

                        <Button   onPress={handleForgotPassword}>
                            Send
                        </Button>
                    </FormContainer >
                    <TCText>
                        Back to  {" "}
                        <LinkText onPress={() => navigation.navigate('SignIn')}>
                            Login
                        </LinkText>
                    </TCText>
                </ContentContainer>
            </Container>
        </BackgroundImage >
    );
}