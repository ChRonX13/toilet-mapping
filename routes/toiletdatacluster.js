
/*
 * GET Public Toilet Data
 */

exports.toiletdatacluster = function(req, res){
  res.render('toiletdatacluster', { title: 'National Public Toilet Data Marker Cluster' });
};

///*
// * GET Public Toilet Data
// */
//var pg = require('pg');
//exports.toiletdatacluster = function(req, res) {
//    var connString = 'tcp://spatial:spatial@localhost:5432/SpatialDatabase';
//
//    pg.connect(connString, function(err, client) {
//
//        var sql = 'select latitude, longitude, address from toiletdata;';
//
//        client.query(sql, function(err, result) {
//            result.rows.map(function(row) {
//                return row;
//            });
//            console.log(JSON.stringify(result.rows))
//            render(JSON.stringify(result.rows));
//        });
//    });
//
//    function render(results) {
//        res.render('toiletdatacluster', {
//            title : 'National Public Toilet Data Marker Cluster',
//            result : results
//        });
//    };
//};