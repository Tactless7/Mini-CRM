(function(){
	'use strict';
	var app = {
		config: {},
		init: function(){
			this.config = window.appConfig;
			this.listeners();
			this.get('data/crm.json', this.displaySelect.bind(this));
		},
		listeners: function(){
			$('select').on('click', 'option', this.displayCustomer.bind(this));
		},
		get: function(path, callback){
			$.ajax({
				url: this.config.url + path,
				type: 'GET',
				success: callback.bind(this)
			});
		},
		displaySelect: function(){

		},
		displayCustomer: function(){

		}
	}

	$(document).ready(function(){
		app.init();
	});
})();