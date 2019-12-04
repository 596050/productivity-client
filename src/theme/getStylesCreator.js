import { StyleSheet } from 'react-native';
const StyleRegistry = {};

const getStylesCreator = (stylesOrCreator) => {
    const themingEnabled = typeof stylesOrCreator === 'function';

    return (theme, props, id) => {
        const styles = themingEnabled ? stylesOrCreator(theme, props) : stylesOrCreator;
        const classes = {};

        if (!StyleRegistry[id]) {
            StyleRegistry[id] = {};
        }

        for (const key in styles) {
            if (!styles.hasOwnProperty(key)) {
                continue;
            }

            const { xsmall, small, medium, large, xlarge, ...className } = styles[key];
            const breakpointStyles = styles[key][theme.breakpoint];

            classes[key] = { ...className, ...breakpointStyles };
        }

        StyleRegistry[id][theme.breakpoint] = StyleSheet.create(classes);

        return StyleRegistry[id][theme.breakpoint];
    };
};

export default getStylesCreator;
