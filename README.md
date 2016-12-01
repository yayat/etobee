#HOW TO USE API
A. url: ```http://128.199.72.133:2434/```

B. method: ```POST```

C. route:

  - web ```http://128.199.72.133:2434/public```

  - api static ```http://128.199.72.133:2434/api/[read/create/update/delete]```

  - api map ```http://128.199.72.133:2434/api/map/[direction/poi/geoCode]```


D. example:

```
  - READ
  url: http://128.199.72.133:2434/api/read,
  method: 'POST',
  data: {
	        "table": "place"
        }
or if want detail
  data: {
	        "table": "place",
	        "data": {
	        	[field of table]: [value]
	        }
        }
===============================================
  - CREATE
  url: http://128.199.72.133:2434/api/create,
  method: 'POST',
  data: {
	        "table": "place",
	        "data": {
	        	[field of table]: [value]
	        }
        }
===============================================
  - UPDATE
  url: http://128.199.72.133:2434/api/update,
  method: 'POST',
    data: {
  	        "table": "place",
  	        "id": [id]
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




