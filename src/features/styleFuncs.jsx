import { makeStyles} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

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

export const applicationListStyles = makeStyles((theme) => 
    (
        {
            inner: {
              width : 400,            
            },
            root: {
              paddingRight: theme.spacing(1),
              minHeight : window.innerHeight -10
            },
          
            list: {
              width: 420,
            },
          
            fullList: {
              width: 'auto',
            },
            mygrid:{
              margin:'0px'
            },
            input:{
              width: '100px'
            },
            label: {
          
              textAlign: 'center',
          
            },
            toolBar: {
              paddingLeft :'12px',
              minHeight: '0px'
            },
            menuButton: {
              marginLeft: -12,
              marginRight: 20,
            },
            appBar: {
               top: 'auto',
               bottom: 0,
             },
          }

    )
);

export const sideDrawer = makeStyles((theme) => 
(
    {

        root: {
          paddingRight: theme.spacing(1),
          minHeight : window.innerHeight -10
        },
      
        list: {
          width: 420,
        },
      
        fullList: {
          width: 'auto',
        },
        mygrid:{
          margin:'0px'
        },
        input:{
          width: '100px'
        },
        label: {
      
          textAlign: 'center',
      
        },
        toolBar: {
          paddingLeft :'12px',
          minHeight: '0px'
        },
        menuButton: {
          marginLeft: -12,
          marginRight: 20,
        },
        appBar: {
           top: 'auto',
           bottom: 0,
         },
      }

)
);

export const siteDialog = makeStyles((theme) => 
    (
        {
            // fab: {
            //   margin: theme.spacing(1),
            // },
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


export const treeSelector = makeStyles((theme) => 
    (
        {

            toolbarButtons: {
              marginLeft: 'auto',
            },
          
            root: {
              paddingRight: theme.spacing(1),
              minHeight : window.innerHeight -10
            },
          
            list: {
              width: 420,
            },
          
            fullList: {
              width: 'auto',
            },
            mygrid:{
              margin:'0px'
            },
            input:{
              width: '100px'
            },
            label: {
          
              textAlign: 'center',
          
            },
            toolBar: {
              paddingLeft :'12px',
              minHeight: '0px'
            },
            menuButton: {
              marginLeft: -12,
              marginRight: 20,
            },
            appBar: {
               top: 'auto',
               bottom: 0,
             },
          }

    )
);
