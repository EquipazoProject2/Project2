window.onload = () => {
  function startMap() {
    const bar = {
      lat: 40.420148,
      lng: -3.705933
    };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12.3,
      center: bar,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }]
        }
      ]
    })
    const barMarker = new google.maps.Marker({
      position: {
        lat: 40.420148,
        lng: -3.705933
      },
      map: map,
      title: "I'm here",
      draggable: false,
      animation: google.maps.Animation.BOUNCE,
    })

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }

    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(user_location);
        const display = document.querySelector('label');
        const click = document.querySelectorAll('option')
        let desplegable = document.querySelector('.nav-bar-info div')
        display.addEventListener('click', function () {
          desplegable.style = 'height: 200px;'
        })

        for (var i = 0; i < click.length; i++) {
          click[i].addEventListener('click', function () {
            selectedMode = this.getAttribute('value')
            console.log(desplegable)

            displayRoute(user_location, selectedMode)
            setTimeout(function () {
              desplegable.setAttribute("style", "height:0")
            }, 200)

          })
        }
        const userMarker = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng
          },
          map: map,
          title: "You are here."
        });

      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }


    function displayRoute(user_location, selectedMode) {
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer;
      console.log(selectedMode)
      const directionRequest = {
        origin: { lat: user_location.lat, lng: user_location.lng },
        destination: { lat: 40.420148, lng: -3.705933 },
        travelMode: google.maps.TravelMode[selectedMode]
      };

      directionsService.route(
        directionRequest,
        function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);

          } else {
            window.alert('Directions request failed due to ' + status);
          }
        }
      );
      directionsDisplay.setMap(map);
    }


  }
  startMap();




}



