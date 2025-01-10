 
export function VisControlsUI(channel, settings) {
    this._channel = channel;
    
   // $('body').css("background-color", settings.colourScheme.mapbackgroundColour);


}

VisControlsUI.prototype.InitEvents = function () {
    var that = this;

    this.eventHandler ={};

    this.eventHandler.saveNodeClick = (e) => {
        //action(that.PopulateRecordLink());

        that._channel.emit( "requestSave", { value: undefined } );

        e.preventDefault();
    };

    this.eventHandler.deleteNodeClick = (e) => {
        that._channel.emit( "requestDelete", { value: undefined } );
        e.preventDefault();
    };


    this.eventHandler.updateNodeclick = (e) => {
        //action(that.PopulateRecordLink());

        that._channel.emit( "requestAdd", { value: that.PopulateRecordLink() } );

        e.preventDefault();
    };

    this.eventHandler.canvasDblClick = (e) => {
        that._channel.emit( "mouseDoubleClick", { value: e } );
        e.preventDefault();
    };

    this.eventHandler.canvasMouseDown = (e) => {
        that._channel.emit( "mouseDown", { value: e } );
        e.preventDefault();
    };

    this.eventHandler.canvasMouseUp = (e) => {
        that._channel.emit( "mouseUp", { value: e } );
        e.preventDefault();
    };

    this.eventHandler.canvasMouseMove = (e) => {
        that._channel.emit( "mouseMove", { value: e } );
        e.preventDefault();
    };

    this.eventHandler.canvasMouseDown = (e) => {
        that._channel.emit( "buttondown", { value: e } );
        e.preventDefault();
    };

    this.eventHandler.canvasMouseUp = (e) => {
        that._channel.emit( "buttonup", { value: e } );
        e.preventDefault();
    };


    this._channel.on("nodeSelected", function(data, envelope) {
   //     console.log('ui node selected caught');
        that.NodeSelected(data.value);
    });

    this._channel.on("nodeHighlighted", function(data, envelope) {
     //   console.log('ui node highlighted event caught');
    });


    //

    this._channel.on("nodecount",  (data, envelop) => {
        //$('#nodes').html(data.value);
    });

    this._channel.on("energy", (data, envelop) => {
        //$('#energy').html(data.value);
    });

    this._channel.on("mapyear", (data, envelop) => {
        //$('#map_year').html(data.value);
    });
};

VisControlsUI.prototype.NodeSelected = function (node) {
    //hidPersonId
//    $('#hidPersonId').val(node.PersonId);
  //  $('#txtCName').val(node.FirstName);
  //  $('#txtSurname').val(node.Surname);
  //  $('#txtBirYear').val(node.BirthDate);
  //  $('#txtBapDate').val(node.BaptismDate);
  //  $('#txtBLocation').val(node.BirthLocation);
  //  $('#txtDYear').val(node.DOD);
  //  $('#txtDLocation').val(node.DeathLocation);
  //  $('#txtOccupationDate').val(node.OccupationDate);
  //  $('#txtOccupationPlace').val(node.OccupationPlace);
  //  $('#txtOccupationDesc').val(node.Occupation);
 
    };

VisControlsUI.prototype.NodeHovered = function (node) {

};

VisControlsUI.prototype.PopulateRecordLink = function () {
 
};
