'use strict';
const fs = require('fs');

var argv = require('minimist')(process.argv.slice(2));

const apiKey = 'j-3_--r4vS3MiAfwxRr09xoWlvRRDvm4hCGhL4R5pFm_OAq0X3UwveJ1wpKOjpYnk1AvYf7bgJwFSYOvCEVrDwVFe_RweVZ5dEF7me2BbQiYX8kvMu8q2ICZcdO6XnYx';

var location ;
var radius ='' ; // optional
var offset ;  // optional

getInput();

const Yelp = require('./index.js');
let yelp = new Yelp(apiKey);
yelp.search(location, radius, offset)
.then(function(data) {
	data.businesses.map(item => {
		yelp.businessDetails(item.id)
		.then(business =>{
			if(typeof business !=='undefined') {
				console.log(business)
				fs.appendFile('data.json', JSON.stringify(business), function(err) {
					
					if(err) throw err;
					else console.log('Data written to file..');
				})
			}
			
		})
	})
	 })

function getInput() {
	let help = argv.help;
	if(typeof help !='undefined') {
		console.log('-----Help----');
		console.log('Usage: --location=[location](required!) --radius=[radius](optional) --offset=[offset](optional)');
		return;
	}
	 location = argv.location;
	if(typeof location =='undefined') {
		console.log(" -> Please provide location alias, ex: --location=india");
	    return ;
	}
	radius = argv.radius;
	offset = argv.offset;
	if(typeof offset =='undefined') {
		offset = 0;
	}
	
}