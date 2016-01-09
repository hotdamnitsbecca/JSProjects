var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');

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
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: '',
			pass: ''
		}
	});

	var mailOptions = {
		from: 'RAM  <Poop@doublebloop.com>', // sender address
		to: 'rmcginley@illumina.com', // list of receivers
		subject: 'Order Request', // Subject line
		text: 'You have an order! They want.. Sender Name: ' + req.body.sender + ' sender email ' +
		 req.body.email + ' friend name ' + req.body.friend + ' with addres ' + 
		 req.body.Address1 + ' ' + req.body.Address2 + ' ' + req.body.City + ' ' + req.body.State + 
		 ' ' + req.body.Zip + ' with style ' + req.body.styles + ' and color selection Red ' + req.body.Red +
		 + ' Orange ' + req.body.Orange + ' Yellow ' + req.body.Yellow + ' Green ' + req.body.Green +
		 ' Blue ' + req.body.Blue + ' Purple ' + req.body.Purple,
		 // plaintext body
		html: '<p>You have an order! They want.. </p><li>Sender Name: ' + req.body.sender + ' </li><li>Sender email ' +
		 req.body.email + '</li><li>friend name ' + req.body.friend + '</li><li>with addres </li><li>' + 
		 req.body.Address1 + '</li><li> ' + req.body.Address2 + '</li><li> ' + req.body.City + ' ' + req.body.State + 
		 ' ' + req.body.Zip + ' </li><li>with style ' + req.body.styles + ' and color selection </li><li>\Red ' + req.body.Red +
		 + ' Orange ' + req.body.Orange + ' Yellow ' + req.body.Yellow + ' Green ' + req.body.Green +
		 ' Blue ' + req.body.Blue + ' Purple ' + req.body.Purple + '</ul>', // html body
	};

	transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
        res.redirect('/');
    }
    	console.log('Message sent: ' + info.response);
    	res.redirect('/');

});

	
})


module.exports = router;
