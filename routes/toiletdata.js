
/*
 * GET Public Toilet Data
 */

exports.toiletdata = function(req, res){
  res.render('toiletdata', { title: 'National Public Toilet Map' });
};