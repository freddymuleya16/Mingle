import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { BackgroundImage, Container, ContentContainer, FormContainer, HeaderText, Label, LinkText, TCText } from '../SignInScreen/styles';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../firebase/auth';
import { Alert } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null)
    const dispatch = useDispatch();

    const handleForgotPassword = async () => {
        const errors = {};
        setError(null);
      
        // Check for email
        if (!email) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = "Email is invalid";
        }
      
        if (Object.keys(errors).length !== 0) {
          setError(errors);
          return;
        }
      
        try {
          console.log('Handling Forgot Password: Sending password reset email');
      
          const error = await dispatch(forgotPassword(email));
      
          if (error) {
            // Show an error alert to the user
            Alert.alert(
              'Error',
              error,
              [{ text: 'OK', onPress: () => { } }]
            );
          } else {
            console.log('Handling Forgot Password: Password reset email sent successfully');
            // Show a success alert and navigate here
            Alert.alert(
              'Success',
              'A password reset email has been sent to your email address.',
              [{ text: 'OK', onPress: () => navigation.pop() }]
            );
          }
        } catch (error) {
          console.error('Handling Forgot Password Error:', error);
      
          let errorMessage = 'An error occurred while sending the password reset email. Please try again later.';
          // Customize error messages based on your needs
      
          // Show an error alert to the user
          Alert.alert(
            'Error',
            errorMessage,
            [{ text: 'OK', onPress: () => { } }]
          );
        }
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

                        <Button onPress={handleForgotPassword}>
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