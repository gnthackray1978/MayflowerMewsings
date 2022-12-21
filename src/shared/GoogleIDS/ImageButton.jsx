import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import {imageButton} from './styles/styles.jsx';

function ImageButton(props) {
  ////console.log('ImageButton');

  //const { classes } = props;

  const classes = imageButton(props.theme);

  return (
      <div className={classes.root}>
          <ButtonBase
              focusRipple
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              onClick={props.onClick}
              style={{
                width: '100%'
              }}
          >
              <span className={classes.img__overlayInner} />
              <span className={classes.img__overlayOuter} />
              <span className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${props.url})`
                  }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton} />
          </ButtonBase>
      </div>
  );
}


export default ImageButton;
