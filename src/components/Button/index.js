import React from 'react';
import { ActivityIndicator } from 'react-native';
//import PropTypes from 'prop-types';

import { ButtonContainer, Container, Text } from './styles';

export default function Button({ children, loading, ...rest }) {
  return (
    <ButtonContainer>
      <Container {...rest}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={{fontFamily:'kalam'}}>{children}</Text>
        )}
      </Container>
    </ButtonContainer>

  );
}

// Button.propTypes = {
//   children: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
// };

// Button.defaultProps = {
//   loading: false,
// };
