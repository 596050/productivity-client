// import { FormControlLabel } from "material-ui/Form";
import { Switch } from "react-native";
import PropTypes from "prop-types";
import React from "react";

// https://redux-form.com/7.4.2/examples/simple/
// https://redux-form.com/7.4.2/docs/api/field.md/
// import React, { Component } from 'react'
//
// class MyCustomInput extends Component {
//   render() {
//     const { input: { value, onChange } } = this.props
//     return (
//       <div>
//         <span>The current value is {value}.</span>
//         <button type="button" onClick={() => onChange(value + 1)}>Inc</button>
//         <button type="button" onClick={() => onChange(value - 1)}>Dec</button>
//       </div>
//     )
//   }
// }
const Radio = props => (
  <FormControlLabel
    {...props}
    control={<Switch />}
    label={props.label}
    value={props.value}
  />
);

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Radio;
