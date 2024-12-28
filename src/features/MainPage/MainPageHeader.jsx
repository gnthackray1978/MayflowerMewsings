import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Markdown from '../Markdown';
import { Canvas } from '../../pages/diagrams/canvas/Canvas';
//import './mainpage.css'
import {LightsHandler} from './Lights.js';

function MainPageHeader(props) {
  const { post } = props;  
  const poster = "https://gnthackray.co.uk/images/backgrounds/3.jpeg"



  const graph = new LightsHandler();

  const draw = (ctx, graph) => { 
    // ctx.beginPath();
    // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.lineWidth = 4;
    // ctx.strokeStyle = "blue";
    // ctx.stroke();
      let canvas = document.getElementById('canvas');
    // let start;
    // var ctx;
      let image = document.getElementById("treesImg");

      graph.render(ctx,canvas,image);

  }

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
        <Grid item sx ={{"width": "100%"}}>
          <Box
            sx={{
              position: 'relative',
            //  p: { xs: 3, md: 6 },s
            //  pr: { md: 0 },
            }}
          >
            <div id ="container">
              <Box
                sx={{
                  "position": "absolute",
                  "top": "-1",
                  "right": "-1",
                  "width": "95",
                  "height": "70px",
                  "background-color": "white",
                  /* opacity: 0.5; */
                  "border-radius": "1px 1px 1px 25px",
                  "zIndex": "100"
                }}
              ></Box>
              <img id = "treesImg" src={poster} height={window.innerHeight} width='100' />
              <Canvas id = "canvas" graph ={graph} draw={draw} style ={
                {
                  top:"0px", 
                  left : "0px", 
                  position : "absolute", 
                  height:"100%", 
                  width: "100%"
                }                
                }></Canvas>
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