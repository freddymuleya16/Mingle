import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { setIsPremiumModelOpen } from '../../redux/reducers/modelSlice';
import { openWebsite } from '../../utils/helpers';
import Button from '../Button';

const ModalOverlay = styled(View)`
  position: absolute;
  inset: 0; 
  height:100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled(View)`
  background-color: white;
  width: 100%;
  max-width: 300px; 
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
`;
const ModalBox = styled(View)` 
  width: 100%;
  flex: 1;
  justify-content: center;
`;
const ModalContent = styled(View)`
  padding: 16px;
`;

const ModalHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
`;

const ModalTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  font-family: 'kalam';
`;

const ModalCloseButton = styled(TouchableOpacity)`
  padding: 8px;
`;

const ModalCloseButtonText = styled(Text)`
  font-size: 24px;
  font-family: 'kalam';
`;

const ModalText = styled(Text)`
  color: #666;
  margin-top: 8px;
  font-family: 'kalam';
`;

const ModalList = styled(View)`
  margin-top: 8px;
`;

const ModalListItem = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const ModalListBullet = styled(Text)`
  margin-right: 8px;
  font-family: 'kalam';
`;

const ModalActions = styled(View)`
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-around;
`;

const ModalActionButton = styled(TouchableOpacity)`
  padding: 8px 16px;
  border-radius: 8px;
  color: #000;
  width: 10px;
  height: 10px;
`;

const ModalActionButtonText = styled(Text)`
  color: white;
  font-weight: bold;
`;

const PremiumModal = () => {
    const isPremiumModalOpen = useSelector((state) => state.model.isPremiumModelOpen);
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setIsPremiumModelOpen(false));
    };
    const onUpgrade = () => {
        dispatch(setIsPremiumModelOpen(false));

        openWebsite("https://mingle-sa.vercel.app/subscribe")
    };

    return (
        <Modal
            visible={isPremiumModalOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <ModalOverlay />
            <ModalBox>
                <ModalContainer>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>Upgrade to Premium</ModalTitle>
                            <ModalCloseButton onPress={onClose}>
                                <ModalCloseButtonText>&times;</ModalCloseButtonText>
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalText>
                            Unlock exclusive features and enhance your experience with Premium membership:
                        </ModalText>
                        <ModalList>
                            <ModalListItem>
                                <ModalListBullet>&bull;</ModalListBullet>
                                <ModalText>Enjoy unlimited likes and matches.</ModalText>
                            </ModalListItem>
                            <ModalListItem>
                                <ModalListBullet>&bull;</ModalListBullet>
                                <ModalText>Upload a minimum of 10 pictures.</ModalText>
                            </ModalListItem>
                            <ModalListItem>
                                <ModalListBullet>&bull;</ModalListBullet>
                                <ModalText>Send videos in direct messages.</ModalText>
                            </ModalListItem>
                            <ModalListItem>
                                <ModalListBullet>&bull;</ModalListBullet>
                                <ModalText>Create 30-second video bio posts.</ModalText>
                            </ModalListItem>
                            <ModalListItem>
                                <ModalListBullet>&bull;</ModalListBullet>
                                <ModalText>Record voice notes with a maximum duration of 2 minutes.</ModalText>
                            </ModalListItem>
                            <ModalListItem>
                                <ModalListBullet>&bull;</ModalListBullet>
                                <ModalText>Access an exclusive premium sticker.</ModalText>
                            </ModalListItem>
                            <ModalListItem>
                                <ModalListBullet>&bull;</ModalListBullet>
                                <ModalText>Get unlimited daily matches.</ModalText>
                            </ModalListItem>
                            <ModalListItem>
                                <ModalListBullet>&bull;</ModalListBullet>
                                <ModalText>Receive priority customer support.</ModalText>
                            </ModalListItem>
                        </ModalList>
                        <ModalActions>
                            <Button onPress={onClose}>
                                <ModalActionButtonText>Close</ModalActionButtonText>
                            </Button>
                            <Button onPress={onUpgrade}>
                                <ModalActionButtonText>Upgrade Now</ModalActionButtonText>
                            </Button>
                        </ModalActions>
                    </ModalContent>
                </ModalContainer>
            </ModalBox>

        </Modal>
    );
};

export default PremiumModal;
