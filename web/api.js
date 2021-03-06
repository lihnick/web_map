
//var url = "https://api.iitrtclab.com/indoorLocation/getIndoorLocationJSON?test=true&json=";
var url = "https://api.iitrtclab.com/indoorLocation/getIndoorLocationJSON?";
// var param1 = "[{\"Major\":101,\"Minor\":175,\"Rssi\":-91.0},{\"Major\":101,\"Minor\":175,\"Rssi\":-92.0},{\"Major\":101,\"Minor\":175,\"Rssi\":-93.0},{\"Major\":101,\"Minor\":202,\"Rssi\":-80.0},{\"Major\":101,\"Minor\":202,\"Rssi\":-83.0}]";
var param2 = "[{\"Major\":101,\"Minor\":140,\"Rssi\":-91.0},{\"Major\":101,\"Minor\":140,\"Rssi\":-92.0},{\"Major\":101,\"Minor\":156,\"Rssi\":-80.0},{\"Major\":101,\"Minor\":191,\"Rssi\":-83.0}]"; // room 229

var param3 = "[{\"Major\":101,\"Minor\":140,\"Rssi\":-51.0},{\"Major\":101,\"Minor\":140,\"Rssi\":-52.0},{\"Major\":101,\"Minor\":156,\"Rssi\":-91.0},{\"Major\":101,\"Minor\":191,\"Rssi\":-91.0}]"; // room 229


var json = {"deviation": 6.90362902791986, "y0": 14.143063062636797, "BTs": [{"min": 147, "proximity": 2, "floor": 2, "avg_rssi": -53.892276795284445, "y": 12.526937613537996, "x": 11.15477383840724, "maj": 101}, {"min": 138, "proximity": 2, "floor": 2, "avg_rssi": -59.450359729600315, "y": 15.484317613781835, "x": 18.575287609270795, "maj": 101}, {"min": 140, "proximity": 5, "floor": 2, "avg_rssi": -65.71391254656905, "y": 15.634693066409822, "x": 7.394378665219882, "maj": 101}], "real_y": 14.196893569939407, "real_x": 7.7343211189817245, "real_floor": 2, "x0": 14.637740274126605, "est_floor": 2}

var bts = json["BTs"];

for (var i in bts) {
	console.log(bts[i]);
	map.addPoint("beacon"+i, bts[i].x, bts[i].y, 0.5, 0.5, 1, "blue", 2);
}

/*
Database info/output all in meters

More than 3 parameters are needed for trilateration

-50 is usually the highest/hottest power -> closest (go for -51)

Database is in meters


*/

$.getJSON(url, {
	test: "true",
	json: param3
}).done((data) => {
	console.log(data);
	map.addPoint("API", data['x0'], data['y0'], 1, 2, 0.25, "black", data['Floor']);
});


// testing the draw line
// (x1, y1)= (0,0), (x2, y2)=(24, 8)
map.addLine("Test1", 0, 0, 24, 8, "red", 2, 5);
// (x1, y1)= (0,0), (x2, y2)=(8, 24)
map.addLine("Test2", 0, 0, 8, 24, "blue", 2, 5);

setTimeout(() => {
	map.getLayers().line["Test2"].remove();
}, 5000) // remove test2 line in 5 seconds