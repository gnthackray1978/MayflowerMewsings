import { lighten, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
 
export const topButtonStyles = makeStyles((theme) => 
    (
        {
            fab: {
                margin: theme.spacing(1),
            },
            extendedIcon: {
                marginRight: theme.spacing(1),
            },
            root: {
                flexGrow: 1,
            },
            grow: {
                marginLeft: 5,
                flexGrow: 1,
            },
            menuButton: {
                marginLeft: -12,        
            },
            tolowerBtn : {
                textTransform: 'none'
            }
        }

    )
);

  