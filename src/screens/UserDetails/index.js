import React from 'react';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowAltCircleLeft, faVenus, faMars, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Carousel from '../../components/Carousel';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { calculateDistance } from '../../utils/helpers';
import { setLoading } from '../../redux/actions/userActions';
import { FIREBASE_DB } from '../../../firebase.config';
import {
    doc,
    updateDoc, getDoc, increment
} from "firebase/firestore";
import { getAuth } from 'firebase/auth';


const Container = styled.ScrollView`
  flex: 1;
  background-color: #e5e5e5;
`;

const UserMessageAction = styled.TouchableOpacity`
border-top-width:3px;
border-top-style: solid;
border-top-color:#ccc;
padding: 20px 0; 
`

const ReceiverInfo = styled.View`
  flex: 1;
  background-color: #e5e5e5;
  padding: 10px;
`;

const ReceiverHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ReceiverName = styled.Text`
  font-size: 24px;
  font-family: 'kalam';
`;

const ReceiverGender = styled.Text`
  font-size: 18px;
  font-family: 'kalam';
  text-transform: capitalize;
`;

const ReceiverDistance = styled.Text`
  font-size: 18px;
  font-family: 'kalam';
`;

const IconContainer = styled.TouchableOpacity`
  background-color: transparent;
  padding: 5px;
`;

const ActionContainer = styled.View`
  background-color: #e5e5e5;
  border-left-width: 2px;
  border-bottom-width: 2px;
  border-color: #ccc;
  padding: 0px;
  margin-top: 10px;
`;

const ActionTitle = styled.Text`
  font-size: 24px;
  font-family: 'kalam';
  color: #666;
  text-align: center;
`;

const ActionDescription = styled.Text`
  font-size: 18px;
  font-family: 'kalam';
  color: #666;
  text-align: center;
`;
const CarouselContainer = styled.View`
    height: 500px;
`

const ProfileScreen = ({ navigation, route }) => {
    const receiver = route.params.match;

    const user = useSelector((state) => state.user.userData);
    const distance = calculateDistance(user.location, receiver.location)

    const removeMatch = async (userId, matchId) => {
        setLoading(true)
        try {
            const userDoc = doc(FIREBASE_DB, "users", userId);
            const userSnap = await getDoc(userDoc);
            const userData = userSnap.data();

            const matchDoc = doc(FIREBASE_DB, "users", matchId);
            const matchSnap = await getDoc(matchDoc);
            const matchData = matchSnap.data();

            // Remove the match from the user's matches array
            const updatedUserMatches = userData.matches.filter(
                (match) => {
                    if (match.matchId) {
                        return match.matchId !== matchId
                    } else {
                        return match !== matchId
                    }
                }
            );
            await updateDoc(userDoc, { matches: updatedUserMatches });

            // Remove the user from the match's matches array
            const updatedMatchMatches = matchData.matches.filter(
                (match) => {
                    if (match.matchId) {
                        return match.matchId !== userId
                    } else {
                        return match !== userId
                    }
                }
            );
            await updateDoc(matchDoc, { matches: updatedMatchMatches });
            updateCurrentMatch(null);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };


    const blockUser = async (userId) => {
        setLoading(true)
        try {
            const currentUser = getAuth().currentUser;

            // Remove the user from the current user's matches
            await removeMatch(currentUser.uid, userId);

            // Add the blocked user to the current user's blockedUsers array
            const currentUserDoc = doc(FIREBASE_DB, "users", currentUser.uid);
            await updateDoc(currentUserDoc, { blockedUsers: [userId, ...currentUser?.blockedUsers ?? []] });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }


    };

    const reportAndUnmatchUser = async (userId) => {
        setLoading(true)
        try {
            // Remove the user from the current user's matches
            await blockUser(userId);

            // Report the user by incrementing the reportedCount field
            const userDoc = doc(FIREBASE_DB, "users", userId);
            await updateDoc(userDoc, { reportedCount: increment(1) });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <CarouselContainer>
                    <Carousel images={receiver.pictures} />
                </CarouselContainer>

                <ReceiverInfo>
                    <ReceiverHeader>
                        <ReceiverName>{receiver.firstName} {receiver.lastName} {receiver.age}</ReceiverName>
                        <IconContainer onPress={() => { navigation.pop() }}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} size={30} color='#319795' />
                        </IconContainer>
                    </ReceiverHeader>
                    <ReceiverGender>
                        <FontAwesomeIcon icon={receiver.gender === 'woman' ? faVenus : faMars} size={24} color='#888' /> {receiver.gender}
                    </ReceiverGender>
                    <ReceiverDistance>
                        <FontAwesomeIcon icon={faLocationDot} size={24} color='#888' /> {distance} kilometres away
                    </ReceiverDistance>
                </ReceiverInfo>
                <ActionContainer>
                    <UserMessageAction onConfirm={() => removeMatch(currentUser.id, receiver.id)}>
                        <ActionTitle>Unmatch</ActionTitle>
                        <ActionDescription>No longer interested? Remove them from your matches.</ActionDescription>
                    </UserMessageAction>
                    <UserMessageAction onConfirm={() => blockUser(receiver.id)}>
                        <ActionTitle>Block</ActionTitle>
                        <ActionDescription>You won't see them; they won't see you.</ActionDescription>
                    </UserMessageAction>
                    <UserMessageAction onConfirm={() => reportAndUnmatchUser(receiver.id)}>
                        <ActionTitle>Report</ActionTitle>
                        <ActionDescription>Don't worry - we won't tell them.</ActionDescription>
                    </UserMessageAction>
                </ActionContainer>
            </Container>
        </SafeAreaView>

    );
};

export default ProfileScreen;
