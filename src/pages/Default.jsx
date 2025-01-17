import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainPageHeader from '../features/MainPage/MainPageHeader.jsx';
import FeaturedPost from '../features/Blog/FeaturedPost.js';
import { settings } from '../shared/common.js';
 
 
var mainFeaturedPost= {
  title: 'Loading..',
  text:
    `# GNThackray.co.uk   
    \nScroll down for more info.`,
    imageURL: settings.forumImgUrl,
    imageDescription: 'main image description',
    linkURL : settings.forumUrl,
    linkDescription: 'Continue reading…',
};

var featuredPosts =[
  {
    title: 'Wills Indexs',
    dateLastEdit: 'Nov 12',
    text:
      'Lincolnshire and Norfolk Wills indexs.',
    imageURL: "https://gnthackray.co.uk/images/will.JPG",
    link : "https://gnthackray.co.uk/wlincolnshire",
    imageDescription: 'Image Text',
  },
  {
    title: 'Tree Search',
    dateLastEdit: 'Nov 11',
    text:
      'Search an index of people in uploaded trees.',
    imageURL:"https://gnthackray.co.uk/images/listnames.JPG",
    link : "https://gnthackray.co.uk/ftmpersons",
    imageDescription: 'Image Text',
  },
  {
    title: 'Tree Visualizers',
    dateLastEdit: 'Nov 11',
    text:
      'Draw Ancestor and Descendant trees using conventional and force directed algorithms.',
    imageURL:"https://gnthackray.co.uk/images/treediagrams.JPG",
    link : "https://gnthackray.co.uk/ancestors",
    imageDescription: 'Image Text',
  },
  {
    title: 'Tree Mappers',
    dateLastEdit: 'Nov 11',
    text:
      'Plot trees on google maps, either as a standard plot or heatmap.',
    imageURL:"https://gnthackray.co.uk/images/heatmap.JPG",
    link : "https://gnthackray.co.uk/maps",
    imageDescription: 'Image Text',    
  },
  {
    title: 'Dupe Finder',
    dateLastEdit: 'Nov 11',
    text:
      'Find duplicates in uploaded trees.',
    imageURL:"https://gnthackray.co.uk/images/duplicates.JPG",
    link : "https://gnthackray.co.uk/ftmdupes",
    imageDescription: 'Image Text',    
  },

];



function Default(props) {
    
    const {className,classes} = props;
  
    return (
        <div>     
            <CssBaseline />
            <Container  style = {{"position": "absolute",
                                               "top": "0",
                                              "left": "0",                                               
                                               "maxWidth": "100%",
                                               "backgroundColor": "black",
                                                                                              
            }}>
                <div style={{"position": "absolute",
                             "top": "0",
                             "left": "0",
                             "maxWidth": "99.9%",
                }}>
                  <MainPageHeader post={mainFeaturedPost} featuredPosts={featuredPosts}/>
                </div>
            </Container>          
        </div>
    );

}


export default Default;
