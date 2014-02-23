define(['plugins/http', 'durandal/app', 'knockout','gmaps'], function (http, app, ko,gmaps) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    return {
        displayName: 'Maps',
        markers: ko.observableArray([]),
        map:null,
        placeMarker: function(location) {
            var marker = new gmaps.Marker({
                position: location,
                map: this.map
            });
            this.markers.push(marker);
        },
        
        compositionComplete: function () {
            var that = this;
            var mapDiv = document.getElementById('mapcanvas');
            var drawingManager = new gmaps.drawing.DrawingManager({
                drawingMode: gmaps.drawing.OverlayType.MARKER,
                drawingControl: true,
                drawingControlOptions: {
                    position: gmaps.ControlPosition.TOP_CENTER,
                    drawingModes: [
                        gmaps.drawing.OverlayType.MARKER,
                        gmaps.drawing.OverlayType.POLYGON,
                        gmaps.drawing.OverlayType.POLYLINE
                    ]
                }
            });

            that.map = new gmaps.Map(mapDiv, {
                center: new gmaps.LatLng(37.4419, -122.1419),
                zoom: 13,
                mapTypeId: gmaps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: gmaps.NavigationControlStyle.SMALL
                }
            });
            drawingManager.setMap(that.map);
            //gmaps.event.addListener(that.map, 'click', function (event) {
            //    that.placeMarker(event.latLng);
            //});
        },
        activate: function () {
        },
        select: function (item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            item.viewUrl = 'views/detail';
            app.showDialog(item);
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        }
    };
});