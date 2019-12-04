const required = (value) => value ? undefined : 'Required';
const minLength = (min) => (value) =>
    value && value.length < min ? `Must be ${min} characters or less` : undefined;
const maxLength = (max) => (value) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
const number = (value) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = (min) => (value) =>
    value && value < min ? `Must be at least ${min}` : undefined;
const maxValue = (max) => (value) =>
    value && value > max ? `Must be at most ${max}` : undefined;
const email = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;
const url = (value) =>
    value && !/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi.test(value) ?
        'Invalid URL' : undefined;

export const validators = {
    required,
    minLength,
    maxLength,
    number,
    minValue,
    maxValue,
    email,
    url
};

export const getValidators = ({ min, max, minLength, maxLength, required, type }) => {
    const response = [];

    if (required) {
        response.push(validators.required);
    }

    if (min) {
        response.push(validators.minValue(min));
    }

    if (max) {
        response.push(validators.maxValue(max));
    }

    if (minLength) {
        response.push(validators.minLength(max));
    }

    if (maxLength) {
        response.push(validators.maxLength(max));
    }

    if (type === 'email') {
        response.push(validators.email);
    }

    if (type === 'url') {
        response.push(validators.url);
    }

    return response;
};
