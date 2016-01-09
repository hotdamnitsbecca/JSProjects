const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/people',function(req,res){
	var people = [
	{
		first_name: "John",
		last_name:"Doe",
		age: 34,
		gender: "m"
	},
	{	
		first_name: "Tom",
		last_name:"Dude",
		age: 45,
		gender: "m"
	},
	{
		first_name: "Jenny",
		last_name:"Jamm",
		age: 22,
		gender: "f"
	},
	{
		first_name: "Kevin",
		last_name:"McShea",
		age: 30,
		gender: "m"
	}
	]

	res.json(people);
});

app.get('/download', function(req,res){
	res.download(path.join(__dirname,'/downloads/resume.pdf'));
});

app.get('/about', function(req,res){
	res.redirect('/about.html')
});

app.post('/subscribe', function(req,res){
	var UserFirstName = req.body.UserFirstName;
	var UserLastName = req.body.UserLastName;
	var UserEmail = req.body.InputEmail1;
	console.log(UserFirstName + ' ' + UserLastName + ' has subscribed with '+ UserEmail)
});

app.listen(3000, ()=>{
	console.log('Server started on port 3000');
});