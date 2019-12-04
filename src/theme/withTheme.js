import createTheme, { THEME_KEY } from './createTheme';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

const withTheme = (ChildComponent) => {
    class WithTheme extends Component {
        state = {
            _id: v4(),
            theme: {}
        };

        static propTypes = {
            ChildComponent: PropTypes.node
        };

        static contextTypes = {
            [THEME_KEY]: PropTypes.object
        };

        componentWillMount() {
            const theme = this.context[THEME_KEY] || createTheme();

            theme.subscribe(this.state._id, this.setTheme);
        }

        componentWillUnmount() {
            const theme = this.context[THEME_KEY] || createTheme();

            theme.unsubscribe(this.state._id);
        }

        setTheme = (theme) => {
            this.setState({
                theme
            });
        };

        componentWillUpdate(nextProps, nextState, nextContext) {
            const currentTheme = this.context[THEME_KEY];
            const nextTheme = nextContext[THEME_KEY];

            if (nextTheme && (!currentTheme || currentTheme._id !== nextTheme._id)) {
                this.setState({
                    theme: nextTheme._theme
                });
            }
        }

        render = () => {
            return (
                this.state.theme.layout.width ?
                    <ChildComponent {...this.state} {...this.props} /> :
                    null
            );
        }
    }

    return WithTheme;
};

export default withTheme;
