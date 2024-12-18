import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Markdown from '../Markdown';
import Link from '@mui/material/Link';

const makeDate =(dateString) => {
  let d = new Date(dateString);
  return d.toLocaleDateString('en-GB', { day:"numeric", year:"numeric", month:"short"});
};

function FeaturedPost(props) {
  const { post } = props;
  console.log(post.imageURL);

  return (
    <Grid item xs={12} md={6}>     
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Markdown className="markdown" key={post.text.substring(0, 40)}>
              {post.text.length <= 200 ? post.text : post.text.substring(0, 200)}
            </Markdown>
            <Typography variant="subtitle1" color="primary">           
              <Link display="block" variant="body1" href={post.link} key={post.title} >
                Continue reading...
              </Link>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{margin:1, width: 160, height: 230, display: { xs: 'none', sm: 'block' } }}
            image={post.imageURL}
            alt={post.imageDescription}
          />
        </Card>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    dateLastEdit: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    imageDescription: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;