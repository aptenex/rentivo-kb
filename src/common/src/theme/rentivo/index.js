import colors from './colors';

export const rentivoTheme = {
  breakpoints: [575, 768, 990, 1440],
  space: [0, 5, 8, 10, 15, 20, 25, 30, 33, 35, 40, 50, 60, 70, 80, 85, 90, 100],
  fontSizes: [10, 12, 14, 15, 16, 18, 20, 22, 24, 36, 48, 80, 96],
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
  },
  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em',
  },
  borders: [
    0,
    '1px solid',
    '2px solid',
    '3px solid',
    '4px solid',
    '5px solid',
    '6px solid',
  ],
  radius: [3, 4, 5, 10, 20, 30, 60, 120, '50%'],
  widths: [36, 40, 44, 48, 54, 70, 81, 128, 256],
  heights: [36, 40, 44, 46, 48, 54, 70, 81, 128],
  maxWidths: [16, 32, 64, 128, 256, 512, 768, 1024, 1536],
  colors,
  colorStyles: {
    products : {
      manage : {
        color: '#01b47d',
        background: 'linear-gradient(135deg,#01b47d 0,#01b47d 100%);'
      },
      supply : {
        color: '#e5683a',
        background: 'linear-gradient(-180deg,#e5683a,#f59f3d 43%,#f8cd53)',
        primaryWithBg: {
          color: colors.white,
          backgroundColor: '#e5683a',
          borderColor: '#b9461b',
          backgroundImage: 'linear-gradient(-180deg,#e5683a,#e5683a 43%,#e18a27)',
          '&:hover': {
            backgroundColor: '#e5683a',
            borderColor: '#e5683a',
            backgroundImage: 'linear-gradient(-180deg,#d76136,#d96237 43%,#d38125)',
            boxShadow: '0px 9px 20px -5px rgba(82, 104, 219, 0.57)',
          },
        },
      },
      channels : {
        color: '#012837',
        background: 'linear-gradient(135deg,#012837 0,#1d6683 100%)'
      },
      website : {
        color: '#403d93',
        background: 'linear-gradient(-180deg,#403d93,#5246bd 43%,#6367ce)'
      }
    },

    primary: {
      color: colors.primary,
      border: '1px solid',
      borderColor: colors.primary,
      backgroundColor: colors.transparent,
      '&:hover': {
        color: colors.white,
        backgroundColor: colors.primaryHover,
        borderColor: colors.transparent,
        boxShadow: '0px 9px 20px -5px rgba(82, 104, 219, 0.57)',
        backgroundImage:
          'linear-gradient( 31deg, rgba(215,178,233, 0.4) 0%, rgba(83,105,220, 0.4) 100%)',
      },
    },
    secondary: {
      color: colors.secondary,
      borderColor: colors.secondary,
      '&:hover': {
        color: colors.secondaryHover,
        borderColor: colors.secondaryHover,
      },
    },
    warning: {
      color: colors.yellow,
      borderColor: colors.yellow,
      '&:hover': {
        color: colors.yellowHover,
        borderColor: colors.yellowHover,
      },
    },
    error: {
      color: colors.secondaryHover,
      borderColor: colors.secondaryHover,
      '&:hover': {
        color: colors.secondary,
        borderColor: colors.secondary,
      },
    },

    primaryWithBg: {
      color: colors.white,
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      backgroundImage:
        'linear-gradient( 31deg, #01c88b 0%, #01a975 100%)',
      '&:hover': {
        backgroundColor: '#01a573',
        backgroundImage: 'none',
        borderColor: colors.primaryHover,
        boxShadow: '0px 9px 20px -5px rgba(82, 104, 219, 0.57)',
      },
    },
    secondaryWithBg: {
      color: colors.white,
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
      '&:hover': {
        backgroundColor: colors.secondaryHover,
        borderColor: colors.secondaryHover,
      },
    },
    warningWithBg: {
      color: colors.white,
      backgroundColor: colors.yellow,
      borderColor: colors.yellow,
      '&:hover': {
        backgroundColor: colors.yellowHover,
        borderColor: colors.yellowHover,
      },
    },
    errorWithBg: {
      color: colors.white,
      backgroundColor: colors.secondaryHover,
      borderColor: colors.secondaryHover,
      '&:hover': {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
      },
    },
    transparentBg: {
      backgroundColor: colors.white,
      '&:hover': {
        backgroundColor: colors.white,
      },
    },
  },
  buttonStyles: {
    textButton: {
      border: 0,
      color: colors.primary,
      padding: 0,
      height: 'auto',
      backgroundColor: colors.transparent,
    },
    outlined: {
      borderWidth: '1px',
      borderStyle: 'solid',
      backgroundColor: colors.transparent,
    },
    fab: {
      border: '0',
      width: '40px',
      height: '40px',
      padding: 0,
      borderRadius: '50%',
      justifyContent: 'center',
      'span.btn-icon': {
        paddingLeft: 0,
      },
    },
    extendedFab: {
      border: '0',
      minWidth: '50px',
      height: '40px',
      borderRadius: '50px',
      justifyContent: 'center',
    },
  },
  // FlexBox: {
  //   backgroundColor: 'green'
  // }
};
