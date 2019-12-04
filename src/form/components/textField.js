import { Field } from "redux-form/immutable";
import { getValidators } from "../helpers";
import PropTypes from "prop-types";
import React from "react";
import { TextInput as RNTextField, View, Text } from "react-native";

const TextField = ({
  meta: { touched, error, warning, ...meta },
  input,
  ...props
}) => {
  return (
    <View>
      <RNTextField
        {...props}
        {...input}
        error={error}
        // error={touched && !!error}
        // helperText={touched ? error || warning : null}
      />
      <Text>{touched ? error || warning : null}</Text>
    </View>
  );
};

TextField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
};

const ReduxFormTextField = props => (
  <Field validate={getValidators(props)} {...props} component={TextField} />
);

export default ReduxFormTextField;
