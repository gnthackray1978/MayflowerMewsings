 
export function VisControlsUI(channel, settings) {
    this._channel = channel;

    $('body').css("background-color", settings.colourScheme.mapbackgroundColour);


}

VisControlsUI.prototype.InitEvents = function () {
    var that = this;

    $('#saveNode').click(function (e) {
        //action(that.PopulateRecordLink());

        that._channel.emit( "requestSave", { value: undefined } );

        e.preventDefault();
    });

    $('#deleteNode').click(function (e) {
        that._channel.emit( "requestDelete", { value: undefined } );
        e.preventDefault();
    });


    $('#updateNode').click(function (e) {
        //action(that.PopulateRecordLink());

        that._channel.emit( "requestAdd", { value: that.PopulateRecordLink() } );

        e.preventDefault();
    });

    $('#myCanvas').dblclick(function (e) {
        that._channel.emit( "mouseDoubleClick", { value: e } );
        e.preventDefault();
    });

    $('#myCanvas').mousedown(function (e) {
        that._channel.emit( "mouseDown", { value: e } );
        e.preventDefault();
    });

    $('#myCanvas').mouseup(function (e) {
        that._channel.emit( "mouseUp", { value: e } );
        e.preventDefault();
    });

    $('#myCanvas').mousemove(function (e) {
        that._channel.emit( "mouseMove", { value: e } );
        e.preventDefault();
    });

    $(".button_box").mousedown(function (e) {
        that._channel.emit( "buttondown", { value: e } );
        e.preventDefault();
    });

    $(".button_box").mouseup(function (e) {
        that._channel.emit( "buttonup", { value: e } );
        e.preventDefault();
    });


    this._channel.on("nodeSelected", function(data, envelope) {
        console.log('ui node selected caught');
        that.NodeSelected(data.value);
    });

    this._channel.on("nodeHighlighted", function(data, envelope) {
        console.log('ui node highlighted event caught');
    });

    //  //  $('#nodes').html(that.layouts[0].layout._cameraView.countOnscreenNodes());

    //

    this._channel.on("nodecount", function(data, envelope) {
        $('#nodes').html(data.value);
    });

    this._channel.on("energy", function(data, envelope) {
        $('#energy').html(data.value);
    });

    this._channel.on("mapyear", function(data, envelope) {
        $('#map_year').html(data.value);
    });
};

VisControlsUI.prototype.NodeSelected = function (node) {
    //hidPersonId
    $('#hidPersonId').val(node.PersonId);
    $('#txtCName').val(node.FirstName);
    $('#txtSurname').val(node.Surname);
    $('#txtBirYear').val(node.BirthDate);
    $('#txtBapDate').val(node.BaptismDate);
    $('#txtBLocation').val(node.BirthLocation);
    $('#txtDYear').val(node.DOD);
    $('#txtDLocation').val(node.DeathLocation);
    $('#txtOccupationDate').val(node.OccupationDate);
    $('#txtOccupationPlace').val(node.OccupationPlace);
    $('#txtOccupationDesc').val(node.Occupation);
 
    };

VisControlsUI.prototype.NodeHovered = function (node) {

};

VisControlsUI.prototype.PopulateRecordLink = function () {
 
};
