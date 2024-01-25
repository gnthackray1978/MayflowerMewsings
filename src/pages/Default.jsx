import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainFeaturedPost from '../features/Blog/MainFeaturedPost.js';
import FeaturedPost from '../features/Blog/FeaturedPost.js';
import { gql} from '@apollo/client';
import BlogMain from '../features/Blog/BlogMain.js';
import Sidebar from '../features/Blog/Sidebar.js';
import Footer from '../features/Blog/Footer.js';
import {useTableState} from '../features/Blog/useTableState';
import {getParams} from '../features/Table/qryStringFuncs'; 


const sidebar = {
  title: 'About',
  description:
    'George N Thackray Genealogy enthusiast and sometime programmer.',
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const GET_BLOGS = gql`
query blog(
   $level: Int!
 ){
    searchBlog(pobj : {levelId : $level}) {
     page
     totalRows
     rows {
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
`;


function Default(props) {
    
    const {className,classes} = props;
  
    var defaultValues = {
      sortColumn : 'level',
      sortOrder : 'asc',
      limit : 0,
      offset :0, 
      level : 0
    };

    var params = getParams(defaultValues);
    
    var state = useTableState(GET_BLOGS,params,'searchBlog');

    return (
        <div>     
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
        </div>
    );

}


export default Default;
