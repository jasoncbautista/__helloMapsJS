    function initialize() {
      var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(35, 139),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      // Initializing map objects:
      var map = new google.maps.Map(document.getElementById('map-canvas'),
                                    mapOptions);
      var latBounds = new google.maps.LatLngBounds();

      var zoomOut = function(){
          map.fitBounds(latBounds);
      };
      // Helper functions:
      document.getElementById("zoomOut").onclick = zoomOut;

      var makeIntoClickableElement = function(elId, marker){
          // Setup basic click events:
          var first =
          document.getElementById(elId);
          first.onclick = function(){
              map.setZoom(15);
              map.setCenter(marker.getPosition());
          };
      }


      var makeMarkerCenterInit = function(marker){
        google.maps.event.addListener(marker, 'click', function() {
          map.setZoom(15);
          map.setCenter(marker.getPosition());
        });
      };


      var  plotIcon = function(icon, latBounds, lat, lon) {

          var myLatLng2 = new google.maps.LatLng(lat, lon);
          var beachMarker2 = new google.maps.Marker({
              position: myLatLng2,
              map: map,
              icon: icon
          });

          latBounds.extend(myLatLng2);
          makeMarkerCenterInit(beachMarker2);
          return beachMarker2;

      }
      map.fitBounds(latBounds);

      var players = [];
      players.push( {
          imgURL: "https://s3-us-west-2.amazonaws.com/sqor-images/profile_images/nba/f90b166b-2fee-4577-87e0-f183c67b2a44.filename"
          , name: "STEVE BLAKE"
          , lat: 36
          , lon: -120
      });

      players.push( {
          imgURL: "http://t1.gstatic.com/images?q=tbn:ANd9GcQlDi_Bzg4HvSw6R5s-lqGhzAxCuDx0WUA1NufkS0Czaf-WNX8bkQ"
          , name: "Kobe Bryant"
          , lat: 35
          , lon: -80
      });

      players.push( {
          imgURL: "https://s3-us-west-2.amazonaws.com/sqor-images/profile_images/nba/35d66118-4fc5-438d-b730-ab5e74aa31be.filename"
          , name: "XAVIER HENRY"
          , lat: 40
          , lon: -90
      });

      /*
      players.push( {
          imgURL: ""
          , name: "STEVE BLAKE"

      }; */

      // Actually plot some icons:

      for (var ii = 0 ; ii < players.length; ii++) {
          var player = players[ii];
          plotIcon(player.imgURL , latBounds, player.lat, player.lon);
      };


      // makeIntoClickableElement("fourth", beachMarker4);
    }

    google.maps.event.addDomListener(window, 'load', initialize);


