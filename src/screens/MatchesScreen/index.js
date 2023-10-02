import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase.config';
import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { calculateDistance } from '../../utils/helpers';
import Carousel from '../../components/Carousel';
import { styled } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faSadTear, faXmark } from '@fortawesome/free-solid-svg-icons';


const deviceheight = Dimensions.get('window').height

const MatchesScreen = () => {
    const dispatch = useDispatch()
    const [potentialMatches, setPotentialMatches] = useState([]);
    const [images, setImages] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [noMatches, setNoMatches] = useState(false);
    const user = useSelector((state) => state.user.userData);


    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    useEffect(() => {
        setImages([...potentialMatches[0]?.pictures ?? []])
        setActiveIndex(0)
        console.log("Current match", potentialMatches[0])
        if (potentialMatches.length == 0) {
            setNoMatches(true);
        }
    }, [potentialMatches])

    useEffect(() => {

        const usersCollection = collection(FIREBASE_DB, "users");
        // Subscribe to users collection changes in Firestore
        const unsubscribe = onSnapshot(usersCollection, (querySnapshot) => {
            const users = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })).filter((potentialMatch) => {
 
                // Check if the potential match has a location
                if (!potentialMatch.location) {
                    console.log(potentialMatch.firstName, " No Location")
                    return false;

                }

                // Check if the potential match is blocked by the current user
                if (user.blockedUsers && user.blockedUsers.includes(potentialMatch.id)) {
                    console.log(potentialMatch.firstName, ` is blocked by current user`);
                    return false;
                }

                // Calculate the distance between the potential match and the current user
                const distance = calculateDistance(
                    potentialMatch.location,
                    user.location
                );

                // Check if the potential match is within the desired distance
                if (parseFloat(distance) > parseFloat(user.distance)) {
                    console.log(potentialMatch.firstName, ` Too far is ${distance} away prefer ${user.distance}`)
                    return false;
                }

                // Get the potential match's age
                const age = parseInt(potentialMatch.age);

                // Check if the potential match's age is within the desired range
                const [minAge, maxAge] = user.ageRange
                    .split("-")
                    .map((value) => parseInt(value));
                if (age < minAge || age > maxAge) {
                    console.log(potentialMatch.firstName, `  is ${age} old prefer ${user.ageRange}`)
                    return false;
                }

                // Check if the potential match's gender matches the current user's orientation
                if (user.orientation !== potentialMatch.gender && user.orientation !== 'both') {
                    console.info(
                        `Current user (${user.gender}) is looking for ${user.orientation}, but potential match (${potentialMatch.gender}) is the same gender.`
                    );
                    return false;
                }

                // Check if the potential match has already been swiped on by the current user
                if (user.swipingHistory && user.swipingHistory[potentialMatch.id]) {
                    console.log(potentialMatch.firstName, `  ${user.swipingHistory[potentialMatch.id]} already`)
                    return false;
                }

                // Check if the potential match is the current user
                let uid = FIREBASE_AUTH.currentUser.uid;
                if (uid == potentialMatch.id) {
                    console.log(potentialMatch.firstName, ` is me`)
                    return false;
                }

                // If the potential match passes all filters, return true
                return true;
            });

            setPotentialMatches(users);
        });

        // Unsubscribe from Firestore listener when the component unmounts or changes
        return () => {
            unsubscribe();
        };
    }, []);
    
    const handleSwipe = async (swipe, matchId) => {
        // Get user document and update swiping history
        const usersCollection = collection(FIREBASE_DB, "users");
        const userId = FIREBASE_AUTH.currentUser.uid;
        const userDoc = doc(usersCollection, userId);
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.data();

        const updatedData = {
            swipingHistory: {
                [matchId]: swipe,
                ...(userData.swipingHistory || {}),
            },
        };

        user.swipingHistory = updatedData.swipingHistory

        await updateDoc(userDoc, updatedData);

        // Check if the user swiped right and the match also swiped right
        if (swipe === "like") {
            const matchDoc = doc(usersCollection, matchId);
            const matchDocSnapshot = await getDoc(matchDoc);
            const matchDocData = matchDocSnapshot.data();
            if (
                matchDocData.swipingHistory &&
                matchDocData.swipingHistory[userId] === "like"
            ) {
                // Update both users' matches arrays
                const userMatches = userData.matches
                    ? [...userData.matches, { matchId, matchDate: new Date() }]
                    : [{ matchId, matchDate: new Date() }];
                const matchMatches = matchDocData.matches
                    ? [...matchDocData.matches, { userId, matchDate: new Date() }]
                    : [{ userId, matchDate: new Date() }];
                const updatedUserData = { matches: userMatches };
                const updatedMatchData = { matches: matchMatches };

                await updateDoc(userDoc, updatedUserData);
                await updateDoc(matchDoc, updatedMatchData);
                const chatID = await getChatDocument(userId, matchId);
                console.log(chatID, '-created chat')
                // Display match success message
                const fullName = `${matchDocData.firstName} ${matchDocData.lastName}`;
                //toast.success(`Matched with ${fullName}`);
                dispatch(
                    addNotification(matchId, "New Match", `You matched with ${userData.firstName} ${userData.lastName}`)
                );
                dispatch(
                    addNotification(userId, "New Match", `You matched with ${fullName}`)
                );
            }
            // Remove match from potential matches and display next match (if available)
            setPotentialMatches((matches) => {
                const remainingMatches = matches.filter((match) => match.id !== matchId);
                return remainingMatches;
            });
        }

    }
    if (potentialMatches.length === 0) {
        if (true) {
          return (
            <Container>
              <BackgroundImage>
                <CenteredContent>
                  <FontAwesomeIcon icon={faSadTear} size={32} color="#c1c1c1" />
                  <NoMatchesText>No matches found.</NoMatchesText>
                </CenteredContent>
              </BackgroundImage>
            </Container>
          );
        }
       // return <Container><FullscreenLoading /></Container>;
      }
    
    return (
        <GradientContainer
        colors={['#319795', '#4fd1c5']} // Add your gradient colors here
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
    >
        <Container>
            <CarouselContainer>
                <Carousel images={images} />
            </CarouselContainer>
            <ActionsContainer>
                < >
                    <StyledCard>
                        <GradientBackground>
                            <MatchName>
                                {potentialMatches[0].firstName} {potentialMatches[0].lastName}{' '}
                                {potentialMatches[0].age}
                            </MatchName>
                            <MatchDescription>
                                {potentialMatches[0].aboutMe}
                            </MatchDescription>
                        </GradientBackground>
                        <Separator />
                        <ButtonContainer>
                            {/* Replace the onPress handlers with your logic */}
                            <Button onPress={() => handleSwipe('dislike', potentialMatches[0].id)} backgroundColor="#ff4f4f">
                                <FontAwesomeIcon icon={faXmark} size={40} color="#ff4f4f" />
                            </Button>
                            <Button onPress={() => handleSwipe('like', potentialMatches[0].id)} backgroundColor="#4bff4b">
                                <FontAwesomeIcon icon={faHeart} size={40} color="#4bff4b" />
                            </Button>
                        </ButtonContainer>
                    </StyledCard>
                </ >
            </ActionsContainer>
        </Container>
    </GradientContainer>
        
    );
};

export default MatchesScreen;



const CarouselContainer = styled.View`
      flex: 1;
      padding: 0px;
      background-color: red;
    `;

const ActionsContainer = styled(LinearGradient).attrs({
    colors: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)'],
    start: { x: 0, y: 1 },
    end: { x: 0, y: 0 },
})`
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    `;

const MatchText = styled.Text`
      color: #fff;
    `;

const IconContainer = styled.View`
      flex-direction: row;
    `;

const Container = styled.SafeAreaView`
flex: 1;
justify-content: center;
align-items: center;
`;

const StyledCard = styled.View`
margin-top: -24px;
border-radius: 20px;
overflow: hidden; 
`;

const GradientBackground = styled(LinearGradient).attrs({
    colors: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)'],
    start: { x: 0, y: 1 },
    end: { x: 0, y: 0 },
})`
padding: 30px 15px;
`;

const MatchName = styled.Text`
font-size: 24px;
font-weight: bold;
color: white;
`;

const MatchDescription = styled.Text`
font-size: 18px;
color: #ccc;
margin-top: 8px;
max-width: 300px;
`;

const Separator = styled.View`
height: 1px;
background-color: white;
`;

const ButtonContainer = styled.View`
flex-direction: row;
justify-content: space-around;
align-items: center;
padding: 16px;
background-color: black;
`;

const Button = styled(TouchableOpacity)`
width: 80px;
height: 80px;
border-radius: 40px;
border-color: ${(props) => props.backgroundColor || 'transparent'};
border-width: 2px;
align-items: center;
justify-content: center;
`;
const NoMatchesContainer = styled.View`
  flex: 1;
  background-color: #e5e5e5; /* Replace with your desired background color */
`;

const BackgroundImage = styled.View`
  flex: 1;
   background-size: cover;
  justify-content: center;
  align-items: center;
`;

const CenteredContent = styled.View`
  align-items: center;
`;

const NoMatchesText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #c1c1c1;
  margin-top: 10px;
`;
const GradientContainer = styled(LinearGradient)`
 flex:1
`;
