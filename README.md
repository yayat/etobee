#HOW TO USE API
A. url: ```http://128.199.72.133:2434/```

B. method: ```POST```

C. route: 

  - web ```http://128.199.72.133:2434/public```
  
  - api static ```http://128.199.72.133:2434/static/[read/create/update/delete]```
  
  - api map ```http://128.199.72.133:2434/map/[direction/poi/geoCode]```
  
  
D. example:

```
  - GEOLOCATION
  url: http://128.199.72.133:2434/map/geoCode,
  method: 'POST',
  data: {
	        "address": "wastukencana, bandung"
        }
===============================================
  - POI
  url: http://128.199.72.133:2434/map/poi,
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
        

```

  
  
  
