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

      players.push( {
          imgURL: "https://pbs.twimg.com/profile_images/2788143344/1d7be5c88d4f5c730f27640e167e83ff_normal.jpeg"
          , name: "Pau Gasol"
          , lat: 41
          , lon: 2.1
          , pastLocation:  "FC Barcelona/Spain"
      });



      players.push( {
          imgURL: "http://cdn.niketalk.com/b/b3/50x50px-ZC-b3e6f1bd_act_jordan_hill.jpeg"
          , name: "Jordan Hill"
          , lat: 34
          , lon: -112
          , pastLocation:  "Arizona/USA"
      });



      players.push( {
          imgURL: "http://static.cdncast.com/resize/64/64/SportsBlogcom/filewarehouse/68793/7e16dd5c7d3253bfd56b875f4ee2f8b8.png"
          , name: "Wesley Johnson"
          , lat: 43
          , lon: -76
          , pastLocation:  "Syracuse/USA"
      });


      players.push( {
          imgURL: "https://pbs.twimg.com/profile_images/378800000147458488/4ccd33bb73e33824b09b7627a225ca68_normal.jpeg"
          , name: "Chris Kaman"
          , lat: 43
          , lon: -85
          , pastLocation:  "Central Michigan/USA"
      });


      players.push( {
          imgURL: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash1/s32x32/1075921_150555651802082_495204332_q.jpg"
          , name: "Ryan Kelly"
          , lat: 36
          , lon: -78.9
          , pastLocation:  "Duke/USA"
      });


      players.push( {
          imgURL: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s48x48/276877_352696224808607_709304749_q.jpg"
          , name: "Jodie Meeks"
          , lat: 37
          , lon: -85
          , pastLocation:  "Kentucky/USA"
      });



      players.push( {
          imgURL: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/s48x48/592167_325967627493317_142653662_q.jpg"
          , name: "Steve Nash"
          , lat: 45.24
          , lon: -75.41
          , pastLocation:  "Santa Clara/Canada"
      });


      players.push( {
          imgURL: "http://mat1.gtimg.com/sports/NBAImages/PlayerImages/sRobertSacre.png"
          , name: "Robert Sacre"
          , lat: 47.66
          , lon: -117.40
          , pastLocation:  "Gonzaga/USA"
      });


      players.push( {
          imgURL: "http://s3.amazonaws.com/iknow_images/tiny_v1/3735779_tiny_v1_c8298195b2dabd03d6ddd5eaa4a6d5fd.jpeg"
          , name: "Shawne Williams"
          , lat: 35.11
          , lon: -89.97
          , pastLocation:  "Memphis/USA"
      });



      players.push( {
          imgURL: "http://thepulse-radio.com/wp-content/uploads/2013/11/IFWT_Nick_young-40x40.jpg"
          , name: "Nick Young"
          , lat: 34.0
          , lon: -118.28
          , pastLocation:  "USC/USA"
      });


      // Actually plot some icons:
      for (var ii = 0 ; ii < players.length; ii++) {
          var player = players[ii];
          plotIcon(player, player.imgURL , latBounds, player.lat, player.lon);
      };


      // makeIntoClickableElement("fourth", beachMarker4);
    }

    google.maps.event.addDomListener(window, 'load', initialize);


