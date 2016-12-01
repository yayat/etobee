  - UPDATE
  url: http://128.199.72.133:2434/api/update,
  method: 'POST',
  data: {
	        "table": "place",
		"id": [id],
		"data": {
			[name of table] : [value]
		}
        }

===============================================
  - DELETE
  url: http://128.199.72.133:2434/api/delete,
  method: 'POST',

  data: {
	        "table": "place",
		"id": [id]
        }

===============================================
  - GEOLOCATION
  url: http://128.199.72.133:2434/api/map/geoCode,
  method: 'POST',
  data: {
	        "address": "wastukencana, bandung"
        }
===============================================
  - POI
  url: http://128.199.72.133:2434/api/map/poi,
  method: 'POST',
  data: {
          "query": "fast food",
          "language": "en",
          "location": [-6.1643081, 106.8173073],
          "radius": 5000,
          "minprice": 1,
          "maxprice": 4,
          "opennow": true,
          "type": "restaurant"
        }
===============================================
  - DIRECTION
  url: http://128.199.72.133:2434/api/map/direction,
  method: 'POST',
  data: {
	    "origin": "bandung",
	    "destination": "jakarta"
	}
        

```