import {FDLayout} from "./FDLayout.js";
import {CameraView} from "./CameraView.js";
import {Graph} from "./Graph.js";

//removed param ctx
//didnt appear to be used.
export function Drawing(channel, graph, settings, dataSource){
    this.graph = graph;
    
    this.settings = settings;
    this.channel = channel;
    this.layouts =[];
    this.dataSource = dataSource;

    this.topYear= this.dataSource.TopYear;
    this.bottomYear =this.dataSource.BottomYear;
    this.currentYear =this.dataSource.BottomYear;
}


//init
//add new layout

Drawing.prototype ={
    Init : function(){

        var parentLayout = this.layout = new FDLayout(this.channel, this.graph,
            new CameraView(this.settings.colourScheme, window.innerWidth, window.innerHeight),
            this.settings, null, null, null,this.dataSource);   
        
        //base layout.
        this.layouts.push({ layout: parentLayout, type: 'parent' });
    },

    
    AddLayout : function(parentLayout, entry){
        // adds a node to a parent layout
        // if entry is specified then adds edges/nodes representing 
        // biographical information

        // create a new graph

        var infoGraph = new Graph(this.channel);

        var centreNode = infoGraph.newNode({
            label: '',
            parentId: entry.data.RecordLink.PersonId,
            type: 'infonode'
        });

        

        if (entry.data.RecordLink.Name != '') {
            var nameNode = infoGraph.newNode({
                label: entry.data.RecordLink.Name,
                parentId: entry.data.RecordLink.PersonId,
                type: 'infonode'
            });

            infoGraph.newEdge(centreNode, nameNode, { type: 'data', directional: false });
        }

        if (entry.data.RecordLink.DOB != '') {
            var dobNode = infoGraph.newNode({
                label: 'DOB:' + entry.data.RecordLink.DOB,
                parentId: entry.data.RecordLink.PersonId,
                type: 'infonode'
            });

            infoGraph.newEdge(centreNode, dobNode, { type: 'data', directional: false });
        }

        if (entry.data.RecordLink.DOD != '') {
            var dodNode = infoGraph.newNode({
                label: 'DOD:' + entry.data.RecordLink.DOD,
                parentId: entry.data.RecordLink.PersonId,
                type: 'infonode'
            });

            infoGraph.newEdge(centreNode, dodNode, { type: 'data', directional: false });
        }

        if (entry.data.RecordLink.BirthLocation != '') {
            var blocNode = infoGraph.newNode({
                label: 'Born: ' + entry.data.RecordLink.BirthLocation,
                parentId: entry.data.RecordLink.PersonId,
                type: 'infonode'
            });

            infoGraph.newEdge(centreNode, blocNode, { type: 'data', directional: false });
        }

        if (entry.data.RecordLink.DeathLocation != '') {
            var dlocNode = infoGraph.newNode({
                label: 'Died:' + entry.data.RecordLink.DeathLocation,
                parentId: entry.data.RecordLink.PersonId,
                type: 'infonode'
            });

            infoGraph.newEdge(centreNode, dlocNode, { type: 'data', directional: false });
        }

        return new FDLayout(this.channel,infoGraph,
            new CameraView(this.settings.colourScheme, 200, 200), this.settings, entry, parentLayout, centreNode);

    },

    UpdateActiveLayouts : function(){

        var that = this;

        let onScreenList = that.layouts[0].layout._cameraView.onscreenNodes(that.settings);
        
        // create a list of the new layouts we need to add
        onScreenList.forEach(node => {
            const nodePresent = that.layouts.some(value => 
                value.type === 'child' && value.layout.parentNode.id === node.id
            );

            if (!nodePresent) {
                that.layouts.push({ layout: that.AddLayout(that.layouts[0].layout, node), type: 'child' });
            }
        });
        
      // Remove the layouts for nodes that are no longer on the screen
        for (let i = that.layouts.length - 1; i >= 0; i--) {
            if (that.layouts[i].type === 'child') {
                const nodePresent = onScreenList.some(node => that.layouts[i].layout.parentNode.id === node.id);

                if (!nodePresent) {
                    that.layouts.splice(i, 1);
                }
            }
        }

        that.layouts.forEach(function(layout, index, ar) {
            // if (layout.layout.graph.eventListeners.length == 0)
            //     layout.layout.graph.addGraphListener(that);

            layout.layout._cameraView.adjustPosition();
        });



    },



    TopLayout: function(){
        return this.layouts[0].layout;
    }




};
 
