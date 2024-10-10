import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Markdown from '../Markdown';
import ReactPlayer from 'react-player'
//import './mainpage.css'

function MainPageHeader(props) {
  const { post } = props;
  const myVideo = "https://gnthackray.co.uk/images/treelights.mov";
  const poster = "https://gnthackray.co.uk/images/poster.JPG"

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        
      }}
    >
      
      <Grid container>
        <Grid item>
          <Box
            sx={{
              position: 'relative',
            //  p: { xs: 3, md: 6 },s
            //  pr: { md: 0 },
            }}
          >
            <Box
              sx={{
                "position": "absolute",
                "top": "-1",
                "right": "-1",
                "width": "95",
                "height": "70px",
                "background-color": "white",
                /* opacity: 0.5; */
                "border-radius": "1px 1px 1px 25px"
              }}
            ></Box>

            <div  style = {{
                            "width": "100%",
                            "height": "auto",
                            // "position": "absolute",
                           // "top": "0",
                           // "left": "0",
                            }}>
                <ReactPlayer
                    url={myVideo}                  
                    playing
                    width='100%'
                    playsinline = {true}
                    height='100%'
                    controls = {false}
                    volume = {0}
                    loop = {true}
                    muted = {true}
                    autoPlay = {true}
                    style ={{
                       
                    }}
                />
            </div>
                
               

            <Markdown style ={{
                "position": "absolute",
                "top": "0",
                "left": "0",
                "width": "250",
                "marginLeft": "25px",
                "marginTop": "25px",
            }} className="markdown" key={post.text.substring(0, 40)}>
                {post.text}
            </Markdown>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainPageHeader.propTypes = {
  post: PropTypes.shape({
    text: PropTypes.string.isRequired,
    //description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    //image: PropTypes.string.isRequired,
    imageDescription: PropTypes.string.isRequired,
    //imageText: PropTypes.string.isRequired,
    linkURL: PropTypes.string.isRequired,
    //linkText: PropTypes.string.isRequired,

    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainPageHeader;