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
			$('#selectCustomer').on('click', this.displayCustomer.bind(this));
		},
		get: function(path, callback){
			$.ajax({
				url: this.config.url + path,
				type: 'GET',
				success: callback.bind(this),
			});
		},
		displaySelect: function(data){
			this.customers = data.customers;
			for (var i = 0 ; i < this.customers.length ; i++) {
				$('#clients').append('<option value="' + i + '">' + data.customers[i].first_name + ' ' + data.customers[i].last_name + '</option>');
			}
		},
		displayCustomer: function(){ //A factoriser
			var choosenCustomer = this.customers[$('option:selected').val()];
			$('#first_name').html(choosenCustomer.first_name);
			$('#last_name').html(choosenCustomer.last_name);
			$('#role').html(choosenCustomer.role);
			$('#company').html(choosenCustomer.company);
			$('#phone').html(choosenCustomer.phone);
			$('#email').html(choosenCustomer.email);
			$('#description').html(choosenCustomer.description);
		}
	}

	$(document).ready(function(){
		app.init();
	});
})();