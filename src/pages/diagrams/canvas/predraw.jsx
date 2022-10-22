import { resizeCanvas } from './resizeCanvas';

export function predraw(context, canvas) {
  // context.save()
  //const { width, height } = canvas.getBoundingClientRect()
  resizeCanvas(canvas);
  //  console.log(width + ' ' + height);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
