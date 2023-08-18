import React, { forwardRef } from "react";
//import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Container, ErrorText, TInput } from "./styles";

function Input({ style, icon, error, ...rest }, ref) {
  return (
    <>
      <Container style={style}>
        {icon && <Icon name={icon} size={20}  />}
        <TInput {...rest} ref={ref} />
      </Container>
      {error && <ErrorText>{error}</ErrorText>}
    </> 
  );
}

// Input.propTypes = {
//   icon: PropTypes.string,
//   error: PropTypes.string,
//   style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
// };

// Input.defaultProps = {
//   icon: null,
//   style: {},
// };

export default forwardRef(Input);
