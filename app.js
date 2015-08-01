
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var toiletdata = require('./routes/toiletdata');
var toiletdatachoropleth = require('./routes/toiletdatachoropleth');
var toiletdatacluster = require('./routes/toiletdatacluster');
var http = require('http');
var path = require('path');
var pg = require('pg');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/toiletdata', toiletdata.toiletdata);
app.get('/toiletdatachoropleth', toiletdatachoropleth.toiletdatachoropleth);
app.get('/toiletdatacluster', toiletdatacluster.toiletdatacluster);

app.post('/RetrieveSuburbs', function(req, res) {
    RetrieveSuburbs(req.body, res);
});

//RetrieveSuburb
function RetrieveSuburbs(bounds, res) {
    var connString = 'tcp://spatial:spatial@localhost:5432/SpatialDatabase';

    pg.connect(connString, function(err, client) {

        var sql = 'select ST_AsGeoJSON(geog) as shape ';
        sql = sql + 'from poa_2011_aust ';
        sql = sql + 'where geog && ST_GeogFromText(\'SRID=4326;POLYGON((' + bounds._southWest.lng + ' '
                + bounds._southWest.lat + ',' + bounds._northEast.lng + ' ' + bounds._southWest.lat + ','
                + bounds._northEast.lng + ' ' + bounds._northEast.lat + ',' + bounds._southWest.lng + ' '
                + bounds._northEast.lat + ',' + bounds._southWest.lng + ' ' + bounds._southWest.lat + '))\') ';
        sql = sql + 'and ST_Intersects(geog, ST_GeogFromText(\'SRID=4326;POLYGON((' + bounds._southWest.lng + ' '
                + bounds._southWest.lat + ',' + bounds._northEast.lng + ' ' + bounds._southWest.lat + ','
                + bounds._northEast.lng + ' ' + bounds._northEast.lat + ',' + bounds._southWest.lng + ' '
                + bounds._northEast.lat + ',' + bounds._southWest.lng + ' ' + bounds._southWest.lat + '))\'));';

        client.query(sql, function(err, result) {

            var featureCollection = new FeatureCollection();

            for (var i = 0; i < result.rows.length; i++) {
                featureCollection.features[i] = JSON.parse(result.rows[i].shape);
            }

            res.send(featureCollection);
        });
    });
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
