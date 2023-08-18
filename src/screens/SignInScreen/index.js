import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Input from '../../components/Input';
import { login } from '../../firebase/auth';
import Button from '../../components/Button';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { BackgroundImage, Container, ContentContainer, FormContainer, HeaderText, Label, LinkText, SocialButton, SocialButtonContainer, TCText } from './styles';
import { openWebsite } from '../../utils/helpers';


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState(null)
  const dispatch = useDispatch();
  //const isLoading = useSelector((state) => state.auth.isLoading);
  //const error = useSelector((state) => state.auth.error);
  //const navigation = useNavigation();


  const handleLogin = () => {
    const errors = {};

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

    if (Object.keys(errors).length !== 0) {
      setValidationErrors(errors)
      return;
    }
    dispatch(login(email, password));
  };

  const handleFacebookSignIn = () => {
    dispatch(facebookSignIn());
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignIn());
  };

  return (
    <BackgroundImage >

      <Container>
        <ContentContainer contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
          <HeaderText>LOG IN</HeaderText>

          <FormContainer >
            <Label>Email:</Label>
            <Input
              placeholder="Enter email"
              error={validationErrors?.email}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              value={email}
              width={100}
              onChangeText={setEmail}
            />

            <Label>Password:</Label>
            <Input
              //  onSubmitEditing={() => passwordRef.current.focus()}

              placeholder="Enter password"
              value={password}

              error={validationErrors?.password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <LinkText onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot password
            </LinkText>

            <Button onPress={handleLogin} >
              Log in
            </Button>
          </FormContainer >
          <TCText>
            Don&apos;t have an account? {" "}
            <LinkText onPress={() => navigation.navigate('Register')}>
              Sign Up
            </LinkText>
          </TCText>
          <SocialButtonContainer>
            <SocialButton onPress={handleFacebookSignIn}>
              <FontAwesomeIcon icon={faFacebook} size={100} color="#007bff" />
            </SocialButton>
            <SocialButton onPress={handleGoogleSignIn}>
              <FontAwesomeIcon icon={faGoogle} size={100} color="#ff0000" />
            </SocialButton>
          </SocialButtonContainer>
          <TCText>
            By logging in, you agree to our{' '}
            <LinkText onPress={() => openWebsite('https://mingle-sa.vercel.app/terms')}>Terms & Conditions</LinkText> and{' '}
            <LinkText onPress={() => openWebsite('https://mingle-sa.vercel.app/privacy')}>Privacy Policy</LinkText>.
          </TCText>

        </ContentContainer>

      </Container>

    </BackgroundImage >
  );
};

export default Login;
