(function () {
    angular.module('app.home')
        .controller('home_controller', home_controller);

    home_controller.$inject = ['home_factory'];

    function home_controller(home_factory) {
        var vm = this;
        vm.stops = [];

        activate();

        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 51.509865, lng: -0.118092 },
            zoom: 5,
            disableDefaultUI: true
        });

        var marker2 = new google.maps.Marker({
            position: { lat: 51.509865, lng: -0.118092 },
            map: map
        });

        function activate() {
            home_factory.getStops(-3.179090, 50.768036, 0.370759, 52.570385).then(function(resp) {
                vm.stops = resp.data.stops;
                //atcocode = "340003030CNR"

                angular.forEach(vm.stops, function (val) {
                    var stopLatLong = { lat: val.latitude, lng: val.longitude };

                    var marker = new google.maps.Marker({
                        position: stopLatLong,
                        map: map,
                        title: val.stop_name
                    });

                    marker.addListener('click', function () {
                        map.setZoom(15);
                        map.setCenter(marker.getPosition());
                    });
                });               
            });
        }

        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 51.509865, lng: -0.118092 },
            zoom: 12
        });
    }
})();