(function(){
	'use strict';
	var app = {
		config: {},
		customers: null,
		init: function(){
			this.config = window.appConfig;
			this.listeners();
			this.get('/crm.json', this.displaySelect.bind(this));
		},
		listeners: function(){
			$('select').on('click', 'option', this.displayCustomer.bind(this));
		},
		get: function(path, callback){
			$.ajax({
				url: this.config.url + path,
				type: 'GET',
				success: callback.bind(this),
			});
		},
		displaySelect: function(data){
			console.log(data);
			this.customers = data.customers;
			console.log(this.customers);
			for (var i = 0 ; i < this.customers.length ; i++) {
				$('#clients').append('<option value="' + data.customers[i].id + '">' + data.customers[i].first_name + ' ' + data.customers[i].last_name + '</option>');
			}
		},
		displayCustomer: function(){

		}
	}

	$(document).ready(function(){
		app.init();
	});
})();