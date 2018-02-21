(function () {

    angular.module('RoutEasy')
    .directive('googleplace', function () {
        return {
            require: 'ngModel',
            link:  (scope, element, attrs, model) => {
                scope.googlePlace = new google.maps.places.Autocomplete(element[0]);
                google.maps.event.addListener(scope.googlePlace, 'place_changed', function () {

                    let place = scope.googlePlace.getPlace();
                    let { location } = place.geometry;

                    scope.form.value.longitude = location.lng()
                    scope.form.value.latitude = location.lat()

                    scope.$apply( () => {
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    });


    let init = [-46.513, -23.457];


    var origin = new google.maps.LatLng(-46.512719300000015, -23.457271);
    var destiny = new google.maps.LatLng(-46.70035789999997, -23.542355);

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destiny],
        travelMode: 'DRIVING',
        drivingOptions: {
            departureTime: new Date(Date.now())  // for the time N milliseconds from now.
        },
        avoidHighways: false,
        avoidTolls: false,
    }, callback);

    function callback(response, status) {

        console.log(response);
        // See Parsing the Results for
        // the basics of a callback function.
    }

})();
