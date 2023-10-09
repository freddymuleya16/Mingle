import React from 'react';
import Modal from 'react-native-modal';
import { Button, ButtonContainer, ButtonText, Container, ModalContainer, Title } from './styles';

export default ConfirmationModal = ({ isVisible, onConfirm, onCancel, title }) => {
    return (
        <Modal isVisible={isVisible}>
            <Container>
                <ModalContainer>
                    <Title>{title ?? 'Are you sure?'}</Title>
                    <ButtonContainer>
                        <Button onPress={onCancel}>
                            <ButtonText>No</ButtonText>
                        </Button>
                        <Button primary onPress={onConfirm}>
                            <ButtonText>Yes</ButtonText>
                        </Button>
                    </ButtonContainer>
                </ModalContainer>
            </Container>
        </Modal>
    );
};
