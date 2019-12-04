import { Field } from "redux-form/immutable";
import { FormControl } from "material-ui/Form";
import { getValidators } from "../helpers";
import { InputLabel } from "material-ui/Input";
import { Checkbox as MuiCheckbox } from "redux-form-material-ui";
import PropTypes from "prop-types";
import React from "react";

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

const Checkbox = props => (
  <FormControl>
    <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
    <Field validate={getValidators(props)} {...props} component={MuiCheckbox} />
  </FormControl>
);

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Checkbox;
