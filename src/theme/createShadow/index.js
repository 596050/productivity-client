const shadowAmbientShadowOpacity = 0.25;

function createShadow(...px) {
    return {
        shadowColor: '#000',
        shadowOpacity: shadowAmbientShadowOpacity,
        shadowOffset: { width: px[0], height: px[1] },
        shadowRadius: px[2]
    };
}

const shadows = [
    {},
    createShadow(0, 1, 1),
    createShadow(0, 2, 2),
    createShadow(0, 3, 3),
    createShadow(0, 4, 4),
    createShadow(0, 5, 5),
    createShadow(0, 6, 6),
    createShadow(0, 7, 7),
    createShadow(0, 8, 8),
    createShadow(0, 9, 9),
    createShadow(0, 10, 10),
    createShadow(0, 11, 11),
    createShadow(0, 12, 12),
    createShadow(0, 13, 13),
    createShadow(0, 14, 14),
    createShadow(0, 15, 15),
    createShadow(0, 16, 16),
    createShadow(0, 17, 17),
    createShadow(0, 18, 18),
    createShadow(0, 19, 19),
    createShadow(0, 20, 20),
    createShadow(0, 21, 21),
    createShadow(0, 22, 22),
    createShadow(0, 23, 23),
    createShadow(0, 24, 24)
];

export default (elevation) => {
    if (!shadows[elevation]) {
        return {};
    }

    return {
        ...shadows[elevation],
        elevation
    };
};
