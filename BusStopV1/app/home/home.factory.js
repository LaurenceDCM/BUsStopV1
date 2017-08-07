(function () {
    angular.module('app.home')
        .factory('home_factory', home_factory);

    home_factory.$inject = ['$http'];

    function home_factory($http) {
        var service = {
            getStops: getStops,
            getDeparture: getDeparture
        };

        var api_key = 'a3f39b8e8c07f321f5e17ccf61968330',
            app_id = '8aa62f8c';

        return service;

        function getStops(minlon, minlat, maxlon, maxlat) {
            return $http({
                method: "GET",
                contentType: 'application/json',
                url: 'http://transportapi.com/v3/uk/bus/stops/bbox.json',
                responseType: 'json',
                params: {
                    minlon: minlon,
                    minlat: minlat,
                    maxlon: maxlon,
                    maxlat: maxlat,
                    api_key: api_key,
                    app_id: app_id,
                    page: 2
                }
            });
        }

        function getDeparture(atcocode) {
            return $http({
                method: "GET",
                contentType: 'application/json',
                url: 'http://transportapi.com/v3/uk/bus/stop/' + atcocode + '/live.json',
                responseType: 'json',
                params: {
                    group: route,
                    api_key: api_key,
                    app_id: app_id
                }
            });
        }
    }
})();