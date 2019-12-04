import { Field } from 'redux-form/immutable';
import { FormControl } from 'material-ui/Form';
import { getValidators } from '../Helpers';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { Select as MuiSelect } from 'redux-form-material-ui';
import PropTypes from 'prop-types';
import React from 'react';

const renderOptions = (options, label, value) => {
    if (!options) {
        return null;
    }

    return options.map((option, key) => {
        return (<MenuItem key={key} value={option.get(value)}>{option.get(label)}</MenuItem>);
    }).toArray();
};

const Select = ({ options, optionLabel, optionValue, className, margin, ...props }) => (
    <FormControl className={className} margin={margin}>
        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
        <Field validate={getValidators(props)} {...props} component={MuiSelect}>
            {renderOptions(options, optionLabel, optionValue)}
        </Field>
    </FormControl>
);

Select.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    margin: PropTypes.string,
    name: PropTypes.string.isRequired,
    optionLabel: PropTypes.string.isRequired,
    optionValue: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([
        ImmutablePropTypes.list,
        ImmutablePropTypes.map
    ])
};

export default Select;
