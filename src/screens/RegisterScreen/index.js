import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { BackgroundImage, Container, ContentContainer, FormContainer, HeaderText, Label, LinkText, TCText } from '../SignInScreen/styles';
import { useDispatch } from 'react-redux';
import { signup } from '../../firebase/auth';
import { Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleSignup = () => {
    const errors = {};

    // Check for email
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    // Check for password
    if (!password) {
      errors.password = "Password is required";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
      errors.password =
        "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long";
    }

    // Check for confirm password
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length !== 0) {
      setErrors(errors)
      return;
    }
    dispatch(signup(email, password)).then((data)=>{
      if(data?.error){
        Alert.alert('FAILURE','Ooops - '+data.error?.message,'Oh',{cancelable:false,})
      
      }else{
        Alert.alert('SUCCESS','You have successfully created a Mingle Account','Lets Mingle',{cancelable:false,})
      }
    });

  };

  return (
    <BackgroundImage>
      <Container>
        <ContentContainer contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
          <HeaderText>SIGN UP</HeaderText>
          <FormContainer>
            <Label>Email:</Label>
            <Input
              placeholder="Enter email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              error={errors?.email}
              returnKeyType="next"
              value={email}
              width={100}
              onChangeText={setEmail}
            />

            <Label>Password:</Label>
            <Input
              //  onSubmitEditing={() => passwordRef.current.focus()}

              error={errors?.password}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Label>Confirm Password:</Label>
            <Input
              //  onSubmitEditing={() => passwordRef.current.focus()}

              error={errors?.confirmPassword}
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Button   onPress={handleSignup}>
              Sign up
            </Button>
          </FormContainer >
          <TCText>
            Already have an account?  {" "}
            <LinkText onPress={() => navigation.navigate('SignIn')}>
              Login
            </LinkText>
          </TCText>
        </ContentContainer>
      </Container>
    </BackgroundImage >
  );
}