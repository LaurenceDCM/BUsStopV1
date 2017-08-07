(function () {
    angular.module('app.home')
        .controller('home_controller', home_controller);

    home_controller.$inject = ['$q', 'home_factory'];

    function home_controller($q, home_factory) {
        var vm = this;
        vm.stops = [];
        vm.loading = true;
        vm.selectedStop = {};
        vm.getSchedule = getSchedule;
        vm.departures = [];

        activate();

        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 51.509865, lng: -0.118092 },
            zoom: 10,
            disableDefaultUI: true
        });

        var markers = [];

        function getSchedule() {
            if (markers.length != 0) {
                markers[0].setMap(null);
                markers = [];
            }

            vm.departures = [];

            var stop = angular.copy(vm.selectedStop);

            var marker = new google.maps.Marker({
                position: { lat: stop.latitude, lng: stop.longitude },
                map: map,
                title: stop.name
            });

            markers.push(marker);

            map.setZoom(15);
            map.setCenter(marker.getPosition());

            marker.addListener('click', function () {
                vm.selectedStop = angular.copy(stop);
                getSchedule();
            });

            home_factory.getDeparture(stop.atcocode).then(function (resp) {
                angular.forEach(resp.data.departures, function (val, key) {
                    val.forEach(function (e) {
                        vm.departures.push(e);
                    });                    
                });
            });
        }

        function activate() {
            home_factory.getStops(-0.350005, 51.365085, 0.131648, 51.616129, 1).then(function(resp) {
                vm.stops = resp.data.stops;

                vm.loading = false;

                var tasks = [];

                var total = Math.ceil(resp.data.total / 25);

                for (var i = 2; i <= total; i++) {
                    tasks.push(home_factory.getStops(-0.350005, 51.365085, 0.131648, 51.616129, i));
                }

                /* Retrieve pending stops since API has max page size of 25 */                
                $q.all(tasks).then(function (taskResp) {
                    angular.forEach(taskResp, function (val) {
                        val.data.stops.forEach(function (e) {
                            vm.stops.push(e);
                        });
                    });
                });                               
            });
        }
    }
})();