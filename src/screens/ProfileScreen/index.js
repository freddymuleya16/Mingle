import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ButtonText,
  Container,
  Content,
  Divider,
  DoubleInput,
  DoubleInputContainer,
  Form,
  Icon,
  ImageContainer,
  Input,
  Label,
  RadioBoarder,
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
import { logout, uploadFormToFirebase } from '../../firebase/auth';
import useImagePicker from '../../hooks/useImagePicker';
import { Alert, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getUserLocation } from '../../utils/helpers';
import { ErrorText } from '../../components/Input/styles';
import { RadioButton } from 'react-native-paper';
import Button from '../../components/Button';

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
  const [location, setLocation] = useState(null)
  const [errors, setErrors] = useState(null)
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(logout());
  };

  const { image, pickImage, setImage } = useImagePicker(true)

  const submitProfile = async () => {
    // validate form fields
    const validatinErrors = {};
    setErrors(null);

    if (!gender) {
      validatinErrors.gender = "Please select your gender";
    }

    if (!orientation) {
      validatinErrors.orientation = "Please select your preferred orientation";
    }

    if (!firstName.trim()) {
      validatinErrors.firstName = "Please enter your first name";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      validatinErrors.firstName = "First name should only contain letters";
    } else if (firstName.length < 2 || firstName.length > 30) {
      validatinErrors.firstName =
        "First name should be between 2 and 30 characters long";
    }

    if (!lastName.trim()) {
      validatinErrors.lastName = "Please enter your last name";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      validatinErrors.lastName = "Last name should only contain letters";
    } else if (lastName.length < 2 || lastName.length > 30) {
      validatinErrors.lastName = "Last name should be between 2 and 30 characters long";
    }

    if (!age) {
      validatinErrors.age = "Please enter your age";
    } else if (age < 18) {
      validatinErrors.age = "You must be at least 18 years old to use this app";
    } else if (!/^\d+$/.test(age)) {
      validatinErrors.age = "Age should only contain numbers";
    }

    if (!minAge) {
      validatinErrors.minAge = "Please enter the minimum age range";
    } else if (!/^\d+$/.test(minAge)) {
      validatinErrors.minAge = "Minimum age should only contain numbers";
    }

    if (!maxAge) {
      validatinErrors.maxAge = "Please enter the maximum age range";
    } else if (!/^\d+$/.test(maxAge)) {
      validatinErrors.maxAge = "Maximum age should only contain numbers";
    }

    if (Number(minAge) > Number(maxAge)) {
      validatinErrors.ageRange = "Minimum age should be less than maximum age";
    }

    if (!distance) {
      validatinErrors.distance = "Please enter your preferred distance";
    } else if (!/^\d+$/.test(distance)) {
      validatinErrors.distance = "Distance should only contain numbers";
    } else if (distance < 0) {
      validatinErrors.distance = "Distance should be a non-negative number";
    }

    if (!image || image.length < 1) {
      validatinErrors.image = "Please upload at least one picture";
    }

    if (!aboutMe) {
      validatinErrors.aboutMe = "Please provide some information about yourself";
    } else if (aboutMe.length < 10) {
      validatinErrors.aboutMe = "About me should be at least 10 characters long";
    } else if (aboutMe.length > 200) {
      validatinErrors.aboutMe = "About me should not exceed 200 characters";
    }

    if (Object.keys(validatinErrors).length > 0) {
      // set validatinErrors in state
      setErrors(validatinErrors);
      console.log(validatinErrors)
      return;
    }

    let value = await getUserLocation();
    setLocation(value);

    if (location == null) {
      Alert(
        "Please allow location access. To do so, please check your browser settings and make sure that location access is enabled for this website."
      );
      return;
    }
    console.log('success') 
    dispatch(
      uploadFormToFirebase(
        gender,
        orientation,
        firstName,
        lastName,
        age,
        `${minAge}-${maxAge}`,
        distance,
        pictures,
        location,
        aboutMe
      )
    ).then(() => { 
    });

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
                <RadioBoarder
                    onPress={() => setGender('man')}>
                  <RadioInput
                    type="radio"
                    name="gender"
                    value="man"
                    checked={gender === 'man'}
                  />
                </RadioBoarder>
                <RadioLabel>Man</RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <RadioBoarder
                    onPress={() => setGender('woman')}>
                  <RadioInput
                    type="radio"
                    name="gender"
                    value="woman"
                    checked={gender === 'woman'}
                  />
                </RadioBoarder>
                <RadioLabel>Woman</RadioLabel>
              </RadioContainer>
            </RadioRow>

            {errors?.gender && <ErrorText>{errors?.gender}</ErrorText>}
            <Divider />
            <Label>Looking for</Label>
            <RadioRow>
              <RadioContainer>
                <RadioBoarder
                    onPress={() => setOrientation('men')}>
                  <RadioInput
                    type="radio"
                    name="orientation"
                    value="men"
                    error={errors?.orientation}
                    checked={orientation === 'men'}
                  />
                </RadioBoarder>

                <RadioLabel>Men</RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <RadioBoarder
                    onPress={() => setOrientation('women')}>
                  <RadioInput
                    type="radio"
                    name="orientation"
                    value="women"
                    checked={orientation === 'women'}
                  />
                </RadioBoarder>
                <RadioLabel>Women</RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <RadioBoarder
                    onPress={() => setOrientation('both')}>
                  <RadioInput
                    type="radio"
                    name="orientation"
                    value="both"
                    checked={orientation === 'both'}
                  />
                </RadioBoarder>
                <RadioLabel>Both</RadioLabel>
              </RadioContainer>
            </RadioRow>

            {errors?.orientation && <ErrorText>{errors?.orientation}</ErrorText>}

            <Divider />
            <Label>My first name is</Label>
            <Input
              placeholder="Enter first name"
              value={firstName}

              error={errors?.firstName}
              onChangeText={setFirstName}
            />
            <Divider />
            <Label>My last name is</Label>
            <Input
              error={errors?.lastName}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Divider />
            <Label>My age</Label>
            <Input
              error={errors?.age}
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
            {errors?.minAge && <ErrorText>{errors?.minAge}</ErrorText>}
            {errors?.maxAge && <ErrorText>{errors?.maxAge}</ErrorText>}
            <Divider />
            <Label>My preferred distance is</Label>
            <Input
              error={errors?.distance}
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
              error={errors?.aboutMe}
              onChangeText={setAboutMe}
            />
            <Divider />
            <Label>And here are my pictures</Label>
            <Input
              error={errors?.image}
              editable={false}
              value={image ? `${image.length} files` : null}
              placeholder="No file chosen"
              onPressOut={pickImage}
            />
            {image && image.map((img, count) => (
              <ImageContainer
                key={count}>
                <Icon onPress={() => {
                  const updatedPictures = [...image];
                  updatedPictures.splice(count, 1);
                  setImage(updatedPictures);
                }}>
                  <FontAwesomeIcon size={30} icon={faXmark} color='#f1f1f1' />
                </Icon>

                <Image
                  source={{ uri: img.uri }}
                  style={{
                    width: '100%',
                    borderRadius: 5,
                    height: 400,
                  }}
                />
              </ImageContainer>

            )
            )}
            <Divider />
            <Button onPress={submitProfile}>
              <ButtonText>Save</ButtonText>
            </Button>
            <SignOutLink onPress={handleSignout}>
              <SignOutText>Sign out</SignOutText>
            </SignOutLink>
          </Content>
        </StyledScrollView>
      </StyledKeyboardAvoidingView>
    </Container>
  );
};

export default ProfileScreen;
