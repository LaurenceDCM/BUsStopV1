(function () {
    angular.module('app.home')
        .factory('home_factory', home_factory);

    home_factory.$inject = ['$http'];

    function home_factory($http) {
        var service = {
            getStops: getStops,
            getDeparture: getDeparture
        };

        /* Replace this with your App ID and API Key */
        var api_key = '14b5440fad58eebcec0983251e4c5440',
            app_id = 'c1afadf1';

        return service;

        function getStops(minlon, minlat, maxlon, maxlat, page) {
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
                    page: page
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
                    group: 'route',
                    api_key: api_key,
                    app_id: app_id
                }
            });
        }
    }
})();