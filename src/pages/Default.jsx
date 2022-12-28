import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from '../features/Blog/Header.js';
import MainFeaturedPost from '../features/Blog/MainFeaturedPost.js';
import FeaturedPost from '../features/Blog/FeaturedPost.js';
import { gql} from '@apollo/client';
import BlogMain from '../features/Blog/BlogMain.js';
import Sidebar from '../features/Blog/Sidebar.js';
import Footer from '../features/Blog/Footer.js';
import post1 from '../features/Blog/posts/post1.js';
import post2 from '../features/Blog/posts/post2.js';
import post3 from '../features/Blog/posts/post3.js';
import {useTableState} from '../features/Blog/useTableState';
import {getParams} from '../features/Table/qryStringFuncs'; 

const mainFeaturedPost = {
  title: 'George N Thackray Genealogy enthusiast and sometime programmer',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'George N Thackray Genealogy enthusiast and sometime programmer.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};



function Default(props) {

    const theme = createTheme();

    const {className,classes} = props;

    const GET_MARRIAGES = gql`
    query blog(
       $level: Int!
     ){
      blog{
        search(level : $level) {
         page
         totalResults
         results {
                    id
                    text
                    level
                    title
                    linkURL
                    linkDescription
                    imageURL
                    imageDescription
                    dateLastEdit            
         }
       }
      }
    }
    `;
   
  
      var defaultValues = {
        sortColumn : 'level',
        sortOrder : 'asc',
        limit : 0,
        offset :0, 
        level : 0
      };
  
      var params = getParams(defaultValues);
     
      var state = useTableState(GET_MARRIAGES,params,'blog','search');

    return (
        <div>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
              
              <main>
                <MainFeaturedPost post={state.mainFeaturedPost} />
                <Grid container spacing={4}>
                  {state.featuredPosts.map((post) => (
                    <FeaturedPost key={post.title} post={post} />
                  ))}
                </Grid>
                <Grid container spacing={5} sx={{ mt: 3 }}>
                  <BlogMain title="From the firehose" posts={state.posts} />
                  <Sidebar
                    title={sidebar.title}
                    description={sidebar.description}
                    archives={state.months}
                    social={sidebar.social}
                  />
                </Grid>
              </main>
            </Container>
            <Footer
              title="Footer"
              description="Something here to give the footer a purpose!"
            />
          </ThemeProvider>
        </div>
    );

}


export default Default;
