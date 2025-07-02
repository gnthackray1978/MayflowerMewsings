import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Markdown from '../Markdown';
import { Canvas } from '../../pages/diagrams/canvas/Canvas';
//import './mainpage.css'
import {LightsHandler} from './Lights.js';

function MainPageHeader(props) {
  const { post ,featuredPosts} = props;  
  const poster = "https://gnthackray.co.uk/images/backgrounds/large.jpg"



  const graph = new LightsHandler();

  const draw = (ctx, graph) => { 
      let canvas = document.getElementById('canvas');    
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
             
              <img id = "treesImg" src={poster} width={"100%"} />
              <Canvas id = "canvas" drawing ={graph} draw={draw} style ={
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

        <div style ={{
                "position": "absolute",
                "top": "600",
                "left": "0",
                "width": "95%",
                "marginLeft": "25px",
                "marginTop": "25px",
            }}>
              <Grid container>
                {featuredPosts.map((post) => (
                  <Grid item xs={12} md={6} key={post.title}>   
                    <div style ={{"marginLeft": "25px",  "marginTop": "25px"}} >
                        <Markdown className="markdown" key={post.title + '-md'}>
                          {post.text.length <= 200 ? post.text : post.text.substring(0, 200)}
                        </Markdown>
                        <Typography variant="subtitle1" color="primary">           
                          <Link display="block" variant="body1" href={post.link} key={post.title + '-link'} >
                            Continue reading...
                          </Link>
                        </Typography>
                    </div>                     
                  </Grid>                          
              ))}
              </Grid>
            </div>
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

  featuredPosts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dateLastEdit: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      imageDescription: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MainPageHeader;