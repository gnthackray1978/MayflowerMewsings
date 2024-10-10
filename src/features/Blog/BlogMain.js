import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from '../Markdown';

function BlogMain(props) {
  const { posts, title } = props;

  const makeMonthKey =(dateString) => {
    let d = new Date(dateString);
    
    let month = d.getMonth();
    let year = d.getFullYear();

    return month +'-' + year;
  };

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <Markdown className="markdown" data-id ={post.title} data-month = {makeMonthKey(post.dateLastEdit)} key={post.text.substring(0, 40)}>
          {post.text}
        </Markdown>
      ))}
    </Grid>
  );
}

BlogMain.propTypes = {
  //posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default BlogMain;

