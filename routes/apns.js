"use strict";

var express = require('express');
var router = express.Router();
var apn = require('apn');

var options = {
	token: {
		cert: "certificates/hakim_maji_apns/170126b_hakim_apns_dev_cert_and_privatekeyb.pem",
		key: "certificates/hakim_maji_apns/170126b_hakim_apns_dev_cert_and_privatekeyb.pem",
		keyId: "TOKENKEYID",
		teamId: "TEAMID"
	},
	production: false
};

var apnProvider = new apn.Provider(options);

router.get('/hello', function(req, res) {
	// http://localhost:3000/apns/hello
	res.send( {msg: 'hello'});
});

router.get('/send', function(req, res){
	var deviceToken = "5e2d89c5276de7bd9205a3926991733e12f1482185be4849752a5c6d3b78a788";
	var note = new apn.Notification();

	note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	note.badge = 3;
	note.sound = "ping.aiff";
	note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
	note.payload = {'messageFrom': 'John Appleseed'};
	note.topic = "com.crazybach.ios.casinodeluxe";
	
	apnProvider.send(note, deviceToken).then( (result) => {
		  // see documentation for an explanation of result
	});
	res.send( { msg: 'hello' } );
});

/*
 * GET userlist.
 */
/*router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});*/

/*
 * POST to adduser.
 */
/*router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});*/

/*
 * DELETE to deleteuser.
 */
/* router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
}); */

module.exports = router;