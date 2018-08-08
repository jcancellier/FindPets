//Fonts
const Fonts = {
    somatic: 'somatic-rounded',
    bebasNeue: 'bebas-neue',
    bariol: 'bariol'
}

Fonts.primary = Fonts.somatic;

//Colors
const Colors = {
    material: {
        red500: '#F44336',
        red400: '#EF5350',
        red300: '#E57373',
        indigo500: '#3F51B5',
        blue500: '#2196F3',
        blue700: '#1976D2',
        green500: '#4CAF50',
        green600: '#43A047',
        green700: '#388E3C',
        gray400: '#BDBDBD',
        gray500: '#9E9E9E'
    },
    flat: {
        clouds: '#ecf0f1',
        concrete: '#95a5a6',
        alizarin: '#e74c3c',
        pomegranate: '#c0392b',
    },
}

//Color to match splash screen
//Colors.primary = '#59b2ab';
Colors.primary = Colors.material.red500;
Colors.secondary = Colors.material.red300;

export {
    Fonts,
    Colors,
}