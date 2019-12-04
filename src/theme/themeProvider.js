import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { THEME_KEY, ThemeProps } from './createTheme';

class ThemeProvider extends Component {
    static propTypes = {
        children: PropTypes.node,
        theme: PropTypes.object
    };

    static childContextTypes = {
        [THEME_KEY]: PropTypes.object
    };

    getChildContext() {
        return {
            [THEME_KEY]: this.props.theme
        };
    }

    render = () => (
        <View onLayout={this.props.theme._handleLayout} style={StyleSheet.absoluteFill}>
            {this.props.children}
        </View>
    );
}

export default ThemeProvider;
