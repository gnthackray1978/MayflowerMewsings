import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Markdown from './Markdown';


function MainFeaturedPost(props) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.imageURL})`,
      }}
    >
      
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.imageURL} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
          <Markdown className="markdown" key={post.text.substring(0, 40)}>
            {post.text}
          </Markdown>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
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
//  string Text { get; set; }
//  int Level { get; set; }
//  string Title { get; set; }
//  string linkURL { get; set; }
//  string LinkDescription { get; set; }
//  string imageURL { get; set; }
//  string ImageDescription { get; set; }
//  DateTime DateLastEdit { get; set; }
export default MainFeaturedPost;