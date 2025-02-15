import React from 'react';
import useCanvas from '../useCanvas';
import { predraw } from './predraw';
import { postdraw } from './postdraw';

export function Canvas(props) {

  const { draw, drawing, options, ...rest } = props;

  const canvasRef = useCanvas(draw, drawing, { predraw, postdraw });

  return <canvas ref={canvasRef} {...rest} />;
}
