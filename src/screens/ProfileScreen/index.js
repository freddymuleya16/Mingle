import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import {
  Button,
  ButtonText,
  Container,
  Content,
  Divider,
  DoubleInput,
  DoubleInputContainer,
  Form,
  Input,
  Label,
  RadioContainer,
  RadioInput,
  RadioLabel,
  RadioRow,
  SignOutLink,
  SignOutText,
  StyledKeyboardAvoidingView,
  StyledScrollView,
  TextArea,
  Title
} from './styles';

const ProfileScreen = () => {
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [distance, setDistance] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [pictures, setPictures] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewPicture, setPreviewPicture] = useState([]);
  const location = useState(null); // You can also use useState for location

  const dispatch = useDispatch();   

  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Container>
      <StyledKeyboardAvoidingView behavior="padding">
        <StyledScrollView>
          <Content>
            <Title>Find your true L❤️VE</Title>
            <Label>I am a</Label>
            <RadioRow>
              <RadioContainer>
                <RadioInput
                  type="radio"
                  name="gender"
                  value="man"
                  onChange={() => setGender('man')}
                />
                <RadioLabel>Man</RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <RadioInput
                  type="radio"
                  name="gender"
                  value="woman"
                  onChange={() => setGender('woman')}
                />
                <RadioLabel>Woman</RadioLabel>
              </RadioContainer>
            </RadioRow>
            <Divider />
            <Label>Looking for</Label>
            <RadioRow>
              <RadioContainer>
                <RadioInput
                  type="radio"
                  name="orientation"
                  value="men"
                  onChange={() => setOrientation('men')}
                />
                <RadioLabel>Men</RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <RadioInput
                  type="radio"
                  name="orientation"
                  value="women"
                  onChange={() => setOrientation('women')}
                />
                <RadioLabel>Women</RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <RadioInput
                  type="radio"
                  name="orientation"
                  value="both"
                  onChange={() => setOrientation('both')}
                />
                <RadioLabel>Both</RadioLabel>
              </RadioContainer>
            </RadioRow>
            <Divider />
            <Label>My first name is</Label>
            <Input
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Divider />
            <Label>My last name is</Label>
            <Input
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Divider />
            <Label>My age</Label>
            <Input
              placeholder="Enter age"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
            <Divider />
            <Label>My dating range</Label>
            <DoubleInputContainer>
              <DoubleInput
                placeholder="Min age"
                keyboardType="numeric"
                value={minAge}
                onChangeText={setMinAge}
              />
              <DoubleInput
                placeholder="Max age"
                keyboardType="numeric"
                value={maxAge}
                onChangeText={setMaxAge}
              />
            </DoubleInputContainer>
            <Divider />
            <Label>My preferred distance is</Label>
            <Input
              placeholder="Enter distance"
              keyboardType="numeric"
              value={distance}
              onChangeText={setDistance}
            />
            <Divider />
            <Label>About Me</Label>
            <TextArea
              placeholder="About Me"
              multiline={true}
              value={aboutMe}
              onChangeText={setAboutMe}
            />
            <Divider />
            <Button>
              <ButtonText>Save</ButtonText>
            </Button>
            <SignOutLink onClick={handleSignout}>
              <SignOutText>Sign out</SignOutText>
            </SignOutLink>
          </Content>
        </StyledScrollView>
      </StyledKeyboardAvoidingView>
    </Container>
  );
};

export default ProfileScreen;
