/*jslint node: true */
"use strict";
var headlessWallet = require('../start.js');
var eventBus = require('lcp_lib/event_bus.js');

function onError(err){
	throw Error(err);
}

function createDataFeed(){
	var composer = require('lcp_lib/composer.js');
	var network = require('lcp_lib/network.js');
	var callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
		}
	});
	
	var datafeed = {
		time: new Date().toString(), 
		timestamp: Date.now()
	};
	composer.composeDataFeedJoint("PYQJWUWRMUUUSUHKNJWFHSR5OADZMUYR", datafeed, headlessWallet.signer, callbacks);
}

eventBus.on('headless_wallet_ready', createDataFeed);
