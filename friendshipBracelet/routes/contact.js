var express = require('express');
var router = express.Router();
var fs = require('fs');
var sendgrid = require('sendgrid')();


var results;

fs.readFile("json/styles.json", 'utf8', function(err,data){
	if(err){
		throw err;
	} else {
		results = JSON.parse(data)
	}
})

router.get('/', function(req, res, next) {
  res.render('contact', { 
  	title: 'Contact',
  	styles: results
  });
});

router.post('/send', function(req,res){
	var colorChoice = ""
	if(req.body.Red==''){colorChoice = colorChoice + ' <br>Red'}
	if(req.body.Orange==''){colorChoice = colorChoice + ' <br>Orange'}
	if(req.body.Yellow==''){colorChoice = colorChoice + ' <br>Yellow'}
	if(req.body.Green==''){colorChoice = colorChoice + ' <br>Green'}
	if(req.body.Blue==''){colorChoice = colorChoice + ' <br>Blue'}
	if(req.body.Purple==''){colorChoice = colorChoice + ' <br>Purple'}
	var email = new sendgrid.Email({
	    to: req.body.email,
		from: 'rebecca.mcginley@gmail.com',
		subject: 'You have an order',
		html: '<p>You have an order! They want.. </p><br>Sender Name: ' + req.body.sender + ' <br>Sender email ' +
			 req.body.email + '<br>Friend name: ' + req.body.friend + '<br>Address is: <br>' + 
			 req.body.Address1 + ' ' + req.body.Address2 + '<br>' + req.body.City + ', ' + req.body.State + 
			 ' ' + req.body.Zip + ' <br>Style: ' + results[req.body.styles]["name"] + '<br>Color selections:' + 
			 colorChoice + '</ul>'
	});

	sendgrid.send(email, function(error,info){
	if(error){
        return console.log(error);
        res.redirect('/');
    }
    	console.log('Message sent: ' + info.response);
    	res.redirect('/');
	});

});

module.exports = router;
