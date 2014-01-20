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
      document.getElementById("zoomOut").onmouseover= zoomOut;

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

      var addInteractiveLink = function(player, marker) {
          var el= $("<div class='playerCard'> " + player.name+ "</div>");
          var pastLocationEl =  $("<div class='playerLocation'>" + player.pastLocation + "</div>");
          el.append(pastLocationEl);
          pastLocationEl.hide();

          el.css("background", "white");
          el.click(function(){
              map.setZoom(15);
              map.setCenter(marker.getPosition());
          });


          el.mouseover(function(){
              map.setZoom(6);
              map.setCenter(marker.getPosition());
              el.css("background", "#98FB98");
              pastLocationEl.show();
          });


          el.mouseout(function(){
              // zoomOut();

              el.css("background", "white");
              pastLocationEl.hide();
          });

          $(".leftBar").append(el);

      };

      var  plotIcon = function(player, icon, latBounds, lat, lon) {

          var myLatLng2 = new google.maps.LatLng(lat, lon);
          var beachMarker2 = new google.maps.Marker({
              position: myLatLng2,
              map: map,
              icon: icon
          });

          latBounds.extend(myLatLng2);
          makeMarkerCenterInit(beachMarker2);

          addInteractiveLink(player, beachMarker2);
          return beachMarker2;
      }

      map.fitBounds(latBounds);

      // TODO: Place better markers:
      // http://stackoverflow.com/questions/6811313/scaling-marker-size-with-marker-icons-from-a-sprite-in-google-maps-api-v3
      var players = [];
      players.push( {
          imgURL: "brett.jpg"
          , name: "Brett Favre"
          , lat: 30.4017
          , lon: -89.0761
          , pastLocation: "Gulfport, Coordinates"
      });


      for(var ii = 0; ii < 50; ii++) {
          var randLat = Math.random() * 40;
          var randLon = Math.random() * 40;
          players.push( {
              imgURL: "tweet.png"
          , name: "tweeterUser" + ii
          , lat: randLat
          , lon: randLon
          });
      }

      // Actually plot some icons:
      for (var ii = 0 ; ii < players.length; ii++) {
          var player = players[ii];
          plotIcon(player, player.imgURL , latBounds, player.lat, player.lon);
      };


      // makeIntoClickableElement("fourth", beachMarker4);
    }

    google.maps.event.addDomListener(window, 'load', initialize);


