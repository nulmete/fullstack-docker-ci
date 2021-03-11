import { createMuiTheme } from '@material-ui/core/styles';
import Colors from './colors';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
});

export default Theme;
