 

// export function RenderingHandler(channel, layoutList, renderer) {
//     this._channel = channel;

//     this.layouts = layoutList;

//     this.renderer = renderer;

//     var that = this;

//     this._channel.on("graphChanged", function(data, envelope) {
//         that.start();
//     });

// }

// RenderingHandler.prototype = {
//     //this thing needs to be called
//     start: function() {

//         if (this._started) return;
//         this._started = true;

//         var that = this;

   
//             that.layouts.UpdateActiveLayouts();

//             var energyCount = 0;


//             that.renderer.clear(that.layouts.TopLayout()._cameraView);

          
//             that.layouts.layouts.forEach(function(layout,idx) {

//                 layout.layout.applyCoulombsLaw();
//                 layout.layout.applyHookesLaw();
//                 layout.layout.attractToCentre();
//                 layout.layout.updateVelocity(0.03);
//                 layout.layout.updatePosition(0.03);


//                 var map = layout.layout._cameraView;

//                 // render
//                 layout.layout.eachEdge(function(edge, spring) {
//                    $.proxy(that.renderer.drawEdges(map, edge, spring.point1.p, spring.point2.p), that);
//                 });

//                 layout.layout.eachNode(function(node, point) {
//                     $.proxy(that.renderer.drawNodes(layout.layout, map, node, point.p), that);
//                 });

//                 energyCount += layout.layout.totalEnergy();

//                 idx++;
//             });

//             that._channel.emit( "energy",  {value: energyCount.toFixed(2) });


//             // stop simulation when energy of the system goes below a threshold
//             if (energyCount < 0.01) {
//                 that._started = false;
//                 if (typeof(done) !== 'undefined') {
//                     that.done();
//                 }
//             } else {

         
//             }
//      //   });

//     },
//     done: function() {

//     }

// };
 
