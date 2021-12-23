import { makeStyles} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export const googleConnectStyles = makeStyles((theme) => 
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
              marginLeft: 50,
              flexGrow: 1,
            },
            menuButton: {
              marginLeft: -12,
              marginRight: 20,
            },
            tolowerBtn : {
              textTransform: 'none'
            },
            avatar: {
              backgroundColor: blue[100],
              color: blue[600],
            },
          
          }

    )
);