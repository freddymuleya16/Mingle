import React, { useEffect, useState } from 'react';
import { Platform, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { faImage, faMicrophone, faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native';
import Chat from '../../components/ChatBox';
import ChatList from '../../components/ChatList';
import { decryptMessage, encryptMessage, getChatDocumentWithoutCreating } from '../../utils/helpers';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../firebase.config';
import { useSelector } from 'react-redux';
import KeyboardAvoidingComponent from '../../components/KeyboardAvoidingCoponent';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #fff; 
`;

const MessageBox = styled.View`
  background-color: #e5e7eb;
  height: 80px;
  padding: 10px;
  flex-direction: row;
  
  align-items: center; /* Center items vertically within the MessageBox */
  justify-content: space-between; /* Add space between icons and input */
  border-top-width:2px;
  border-top-style: solid;
  border-top-color:  #9ca3af;
`;

const InputContainer = styled.View`
  flex: 1; /* Take up all horizontal space within the MessageBox */ 
  margin-left: 10px;
  border-radius: 25px; /* Rounded corners for input */ 
  align-items: center; /* Center items horizontally within InputContainer */
  flex-direction: row; /* Make input and icon align horizontally */
`;

const Input = styled.TextInput`
  flex: 1; /* Take up all available width within InputContainer */
  margin-left: 10px; /* Add some space between icon and input text */
`;

const ChatsBox = styled.ScrollView`
  flex: 1;
  background-color: #e5e7eb;
  border-bottom: 5px solid #4b5563;
`

const GradientButton = styled.TouchableOpacity`
border-radius: 9999px;
padding: 1px; 
margin-left: 10px;
`

const Gradient = styled(LinearGradient)`
border-radius: 9999px;
padding: 18px;
height: 100%;
align-items: center;
`

const ChatScreen = ({ route }) => {
  const match = route.params.match;
  const [groupedMessages, setGroupedMessages] = useState({})
  const user = useSelector((state) => state.user.userData);
  const [chatRef, setChatRef] = useState(null);
  const receiverId = match.id
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(0)

  useEffect(() => {
    async function fetchData() {
      // You can await here
      console.log(match.id)
      const response = await getChatDocumentWithoutCreating(user.uid, receiverId, 'messages.js');
      setChatRef(
        response
      );
      console.log('Effect ran false', response)
    }
    fetchData();

  }, [receiverId]);

  useEffect(() => {

    if (chatRef) {
      // Use onSnapshot to listen for changes in the messages collection for this chat
      const unsubscribe = onSnapshot(
        query(
          collection(FIREBASE_DB, `chats/${chatRef}/messages`),
          orderBy("timestamp", "asc")
        ),
        (querySnapshot) => {
          const messages = [];
          // Loop through each document in the messages collection and add it to the messages array
          querySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id, message: decryptMessage(doc.data().message) });
          });
          // setMessages([...messages]); 

          const groupedChats = {};
          messages.forEach((chat) => {
            const { timestamp } = chat;
            let date;
            if (timestamp?.seconds) {
              date = new Date(timestamp.seconds * 1000);
            } else {
              date = new Date();
            }

            const dateString = date.toLocaleDateString('en-GB');
            if (!groupedChats[dateString]) {
              groupedChats[dateString] = [];
            }
            groupedChats[dateString].push(chat);
          });
          // Print the grouped chats
          setGroupedMessages(groupedChats)
        }
      );
      return () => unsubscribe();
    }
  }, [chatRef]);

  const sendMessage = async () => {
    try {
      if (message == '' && selectedFiles.length == 0) return;

      const filteredVideos = selectedFiles.filter(x => x.type == "video/mp4")
      const filteredImages = selectedFiles.filter(x => x.type !== "video/mp4")
      const [videos, images] = await Promise.all(
        [
          handleUpload(filteredVideos),
          handleUpload(filteredImages),
        ])

      const newMessage = {
        sender: getAuth().currentUser.uid,
        message: encryptMessage(message),
        timestamp: serverTimestamp(),
        liked: false,
        videos,
        images
      };
      console.log(videos, images)
      // setMessages([...messages, newMessage]);
      setMessage("");
      await addMessage(chatRef, newMessage);
    }
    catch (error) {
      console.error(error)
    } finally {
      //setLoading(false)
    }
  };

  const handleUpload = async (files) => {
    if (!files) return [];
    if (files.length == 0) return [];
    const storage = getStorage();

    const pictureRefs = await Promise.all(
      files.map((picture) => {

        const fileRef = ref(
          storage,
          `Chats/${Date.now()}-${picture.name}`
        );
        const uploadTask = uploadBytesResumable(fileRef, picture)


        uploadTask.on('state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setUploadProgress(progress);
            switch (snapshot.state) {
              case 'paused':
                //console.log('Upload is paused');
                break;
              case 'running':
                //console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error('Error uploading file:', error);

          },
          async () => {
            try {
              //const pictureRef = await getDownloadURL(fileRef);
              //console.log('pics', pictureRef)
            } catch (error) {
              console.error("Error adding message:", error);
            }
            setSelectedFiles([]);
            setUploadProgress(0);

            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            // return await getDownloadURL(uploadTask.snapshot.ref)
          }
        );

        return uploadTask.then((snapshot) =>
          getDownloadURL(snapshot.ref)
        );
      }))

    return pictureRefs;
  };
  const addMessage = async (chatId, message) => {
    try {
      console.log(message, 'message')
      const messagesRef = collection(FIREBASE_DB, `chats/${chatId}/messages`);
      await addDoc(messagesRef, message);
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  return (
    <KeyboardAvoidingComponent>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <ChatsBox>
          <ChatList groupedChats={groupedMessages} receiver={match} currentUser={user} chatRef={chatRef} />
        </ChatsBox>


        {/* Message box at the bottom */}
        <MessageBox>
          <FontAwesomeIcon icon={faImage} size={30} color="#6b7280" />
          <InputContainer>
            <TextInput
              placeholder='Type a message...'
              placeholderTextColor='#6b7280'
              value={message}
              onChangeText={setMessage}
              multiline={true}
              style={{ flex: 1, fontFamily: 'kalam' }} // Ensure the TextInput takes up all available width
            />
            <FontAwesomeIcon icon={faMicrophone} size={30} color="#6b7280" />
          </InputContainer>
          <GradientButton onPress={sendMessage}>
            <Gradient
              colors={['#319795', '#4fd1c5']} // Add your gradient colors here
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >

              <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Send</Text>
            </Gradient>
          </GradientButton>
        </MessageBox>
      </Container>
    </KeyboardAvoidingComponent>

  );
};

export default ChatScreen;
