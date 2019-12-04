import { FormControl, FormLabel } from 'material-ui/Form';
import { Field } from 'redux-form/immutable';
import { RadioGroup as MuiRadioGroup } from 'redux-form-material-ui';
import PropTypes from 'prop-types';
import React from 'react';

const RadioGroup = ({ classes: { formControl, ...classes }, ...props }) => (
    <FormControl className={formControl || ''}>
        { props.label ? <FormLabel htmlFor={props.name}>{props.label}</FormLabel> : null }
        <Field {...props} classes={classes} component={MuiRadioGroup} name={props.name} />
    </FormControl>
);

RadioGroup.propTypes = {
    classes: PropTypes.object,
    label: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default RadioGroup;
