(function(undefined){
	
	var geocoder = {};
	var map = {};
	var infowindow = null;
	var latitud = {};
	var longitud = {};

	var priv = {
		initialize : function(identificador,num,_zoom){
			geocoder[num] = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(-33.454217,-70.656881);
			var mapOptions = {
			    zoom: _zoom,
			    center: latlng
			}
			map[num] = new google.maps.Map(document.getElementById(identificador), mapOptions);
		}
	}

	var Lib = (function(){

		var core = {	
			map: function(id){
				
				return{
					search : function(obj){
						
						if(obj.num == null){
							obj.num = 0;
						}

						if(obj.address == null){
							obj.address = "Santiago, Chile";
						}

						if(obj.zoom == null){
							obj.zoom = 14;
						}


						priv.initialize(id,obj.num,obj.zoom);
						geocoder[obj.num].geocode({ 'address': obj.address}, function(results, status) {
						    if (status == google.maps.GeocoderStatus.OK) {
						      	map[obj.num].setCenter(results[0].geometry.location);
						      	var marker = new google.maps.Marker({
						          	map: map[obj.num],
						          	position: results[0].geometry.location
						      	});

						      	/*results[0].geometry.location.k;
						      	results[0].geometry.location.A;*/
						      		
						      	if(obj.info){
						      		var infowindow = new google.maps.InfoWindow({
								      content: obj.html
									});

							      	google.maps.event.addListener(marker, 'click', function() {
									    infowindow.open(map[obj.num],marker);
									});
						      	}

						      	if(obj.circle){

						      		if(obj.color == null){
						      			obj.color = "#AA0000";
						      		}

						      		if(obj.radius == null){
						      			obj.radius = 300;
						      		}

							      	var circle = new google.maps.Circle({
									  map: map[obj.num],
									  radius: obj.radius, 
									  fillColor: obj.color
									});
									circle.bindTo('center', marker, 'position');
								}

						    } else {
						      console.log('Geocode was not successful for the following reason: ' + status);
						    }
					  	});
					},
					autocomplete : function(){
						var input = document.getElementById(id);
						new google.maps.places.Autocomplete(input);
					},
					ajax : function(obj){
						
						if(obj.num == null){
							obj.num = 0;
						}

						if(obj.zoom == null){
							obj.zoom = 14;
						}


						priv.initialize(id,obj.num,obj.zoom);
						infowindow = new google.maps.InfoWindow({
					        content: "loading...",
					        maxWidth: 500
					    });
							
				      	for (var i = 0; i < obj.data.length; i++) {
							
					        var json = obj.data[i];
					        var siteLatLng = new google.maps.LatLng(json.lat, json.lon);

					        if(json.id == null){
					        	json.id = Math.random();
					        }

					        if(json.html == null){
					        	json.html = "";
					        }
					        console.log("test"+obj.num);
					        var marker = new google.maps.Marker({
					            position: siteLatLng,
					            map: map[obj.num],
					            zIndex: json.id,
					            html: json.html
					        });

					        if(json.circle){
					      		
					      		if(json.color == null){
					      			json.color = "#AA0000";
					      		}

					      		if(json.radius == null){
					      			json.radius = 300;
					      		}

						      	var circle = new google.maps.Circle({
								  map: map[obj.num],
								  radius: json.radius, 
								  fillColor: json.color
								});
								circle.bindTo('center', marker, 'position');
							}

							if(json.click != null && json.click === true){
								google.maps.event.addListener(marker, "click", function () {
						            infowindow.setContent(this.html);
						            infowindow.open(map[obj.num], this);
						        });
							}
					        

					    }

					}
				}
			}
		}
		
		return core;
	})();

	window.DvMap = Lib;
})(window);

