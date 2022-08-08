import {extendTheme} from 'native-base';
export const theme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        size: 'l',
        p: 3,
        pl: 5,
        color: 'white',
        borderColor: 'white',
        borderWidth: 0,
      },
      baseStyle: {
        marginTop: 6,
        backgroundColor: '#fff5',
      },
    },
    Checkbox: {
      defaultProps: {
        size: 'md',
        colorScheme: 'success',
        p: 1,
      },
      baseStyle: {
        marginTop: 6,
        backgroundColor: '#fff5',
        borderRadius: 20,
      },
    },
    Text: {
      defaultProps: {
        color: '#fff',
      },
    },
    Button: {
      defaultProps: {
        bg: 'white',
        colorScheme: 'dark',
        my: 5,
        p: 3,
      },

      baseStyle: {
        color: 'black',
        backgroundColor: '#fff',
      },
    },
  },
});
