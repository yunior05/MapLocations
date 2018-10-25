//model of map
var mapObj = function(data){
    this.name = data.name;
    this.accessToken = data.accessToken;
    this.style = data.style;
    this.zoom = data.zoom;
    this.container = data.container;
    this.center = data.center;
};
//List of maps
var mapList = [
    {
        name: 'Map of Santiago, Gurabo',
        accessToken: 'pk.eyJ1IjoieXVuMDUiLCJhIjoiY2pub21wZ2YxMDBiYTNwcXQ5NzljbnZtdyJ9.Z7V79CRFI4GXOAmPx3VQgQ',
        container: 'map',
        center: [-70.681566, 19.471073],
        zoom: 17.79,
        style: 'mapbox://styles/mapbox/streets-v10'
    }
]

var ViewModel = function() {
    var self = this;
    //select firt map from map list
    self.mapModel = ko.observable(new mapObj(mapList[0]));
    //create a new map with firt map data
    mapboxgl.accessToken = self.mapModel().accessToken;
    self.map = new mapboxgl.Map({
        container: self.mapModel().container,
        center: self.mapModel().center,
        zoom: self.mapModel().zoom,
        style: self.mapModel().style
    });
    //add marker when user click
    self.map.on('click', function(e){
        var marker = new mapboxgl.Marker({
            draggable: true
        });
        marker.setLngLat(e.lngLat).addTo(self.map)
        marker.addEventListener('click', function(){
            marker.remove();
        })
    })
    //add search
    self.map.addControl(new MapboxGeocoder({
        accessToken: self.mapModel().accessToken
    }));
    //add controls
    self.map.addControl(new mapboxgl.NavigationControl());
}

ko.applyBindings( new ViewModel);