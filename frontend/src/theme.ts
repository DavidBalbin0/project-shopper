import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#d9d9d9',
        },
        primary: {
                main: '#59FF57',
        },
        info: {
            main: '#001C71',
        },
        secondary: {
            main: '#323232',
            light: '#D9D9D9'
        },

    }
});

export default theme;
