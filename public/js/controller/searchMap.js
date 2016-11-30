/**
 * Created by Yayat on 11/30/16.
 */
$('#map').gmap3({
	map:{
		options: {
			center: center,
			zoom: 5
//				mapTypeId: google.maps.MapTypeId.TERRAIN
		}
	},
	marker: {
		values: macDoList,
		cluster: {
			radius:5,
			// This style will be used for clusters with more than 0 markers
			0: {
				content: '<div class="cluster cluster-1">CLUSTER_COUNT</div>',
				width: 53,
				height: 52
			},
			// This style will be used for clusters with more than 20 markers
			20: {
				content: '<div class="cluster cluster-2">CLUSTER_COUNT</div>',
				width: 56,
				height: 55
			},
			// This style will be used for clusters with more than 50 markers
			50: {
				content: '<div class="cluster cluster-3">CLUSTER_COUNT</div>',
				width: 66,
				height: 65
			},
			events: {
				click: function(cluster) {
					var map = $(this).gmap3("get");
					map.setCenter(cluster.main.getPosition());
					map.setZoom(map.getZoom() + 1);
				}
			}
		},
		options: {
			icon: '../assets/img/icon_resto.png'
		},
		events:{
//				mouseover: function(marker, event, context){
//					$(this).gmap3(
//						{clear:"overlay"},
//						{
//							overlay:{
//								latLng: marker.getPosition(),
//								options:{
//									content:  "<div class='infobulle"+(context.data.drive ? " drive" : "")+"'>" +
//									          "<div class='bg'></div>" +
//									          "<div class='text'>" +
//									          "<img style='width: 70px; height: 60px; float: left; padding-right: 10px; padding-left: -10px !important;' src='"+context.data.image+"'>" +
//									          "<span style='font-weight: bold; font-size: 14px'>" + context.data.username + "</span><br/>" +
//									          "<span>contact: " + context.data.contact_name + " (" + context.data.contact_phone +")</span><br/>" +
//									          "<span>Open: " + context.data.open_time + "-" + context.data.close_time +"</span>" +
//									          "</div>" +
//									          "</div>" +
//									          "<div class='arrow'></div>",
//									offset: {
//										x:-30,
//										y:-73
//									}
//								}
//							}
//						});
//				},
//				mouseout: function(){
//					$(this).gmap3({clear:"overlay"});
//				}
			mouseover: function(marker, event, context){
				var map = $(this).gmap3("get"),
					infowindow = $(this).gmap3({get:{name:"infowindow"}});
				if (infowindow){
					infowindow.open(map, marker);
					infowindow.setContent(context.data.username);
				} else {
					$(this).gmap3({
						infowindow:{
							anchor:marker,
							options:{content: context.data}
						}
					});
				}
			},
			mouseout: function(){
				var infowindow = $(this).gmap3({get:{name:"infowindow"}});
				if (infowindow){
					infowindow.close();
				}
			}
		}
	}
});