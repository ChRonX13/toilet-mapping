
/*
 * GET Public Toilet Data
 */

exports.toiletdatachoropleth = function(req, res){
  res.render('toiletdatachoropleth', { title: 'National Public Toilet Data Choropleth Map' });
};