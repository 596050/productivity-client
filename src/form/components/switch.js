import { FormControl, FormControlLabel } from 'material-ui/Form';
import { Field } from 'redux-form/immutable';
import { getValidators } from '../Helpers';
import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from 'redux-form-material-ui';

const ReduxFormSwitch = (props) => (
    <FormControl>
        <FormControlLabel control={
            <Field validate={getValidators(props)} {...props} component={Switch} />
        } label={props.label} />
    </FormControl>
);

ReduxFormSwitch.propTypes = {
    label: PropTypes.string.isRequired
};

export default ReduxFormSwitch;
