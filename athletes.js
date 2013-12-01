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
          var el= $("<div> " + player.name+ "</div>");
          var pastLocationEl =  $("<div>" + player.pastLocation + "</div>");
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
              el.css("background", "green");
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
          imgURL: "http://cdn.bleacherreport.net/images_root/users/photos/002/107/585/stevey_b_crop_38x38.jpg?1362873493"
          , name: "Steve Blake"
          , lat: 39
          , lon: -76
          , pastLocation: "Maryland/USA"

      });

      players.push( {
          imgURL: "http://t1.gstatic.com/images?q=tbn:ANd9GcQlDi_Bzg4HvSw6R5s-lqGhzAxCuDx0WUA1NufkS0Czaf-WNX8bkQ"
          , name: "Kobe Bryant"
          , lat: 35
          , lon: -80
          , pastLocation: "Lower Merion HS (PA)/USA"
      });

      players.push( {
          imgURL: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s48x48/592040_672550942763875_1839854811_q.jpg"
          , name: "Xavier Henry"
          , lat: 38.5
          , lon: -98
          , pastLocation: "Kansas/USA"
      });


      players.push( {
          imgURL: "http://d1warraxuf7xh1.cloudfront.net/wp-content/uploads/2013/10/USATSI_7475553_154224518_lowres-150x150-64x64.jpg"
          , name: "Jordan Farmar"
          , lat: 34
          , lon: -118
          , pastLocation:  "UCLA/USA"
      });



      // Actually plot some icons:
      for (var ii = 0 ; ii < players.length; ii++) {
          var player = players[ii];
          plotIcon(player, player.imgURL , latBounds, player.lat, player.lon);
      };


      // makeIntoClickableElement("fourth", beachMarker4);
    }

    google.maps.event.addDomListener(window, 'load', initialize);


