(function(){
	'use strict';
	var app = {
		config: {},
		customers: null,
		newCustomer: {},
		editedCustomer: {},
		init: function(){
			this.config = window.appConfig;
			this.get('/crm.json', this.displaySelect.bind(this));
			this.listeners();
		},
		listeners: function(){
			$('#selectCustomer').on('click', this.displayCustomer.bind(this));
			$('#createCustomer').on('click', this.createCustomer.bind(this));
			$('#reloadClients').on('click', function(){
				this.get('/crm.json', this.displaySelect.bind(this));
			}.bind(this));
			$('form').on('click', function(event){
				event.preventDefault();
				return false;
			});
			$('#editCustomer').on('click', function(){
				this.get('/crm.json', this.displayEdition.bind(this));
			}.bind(this));
			$('#saveChanges').on('click', this.saveEdition.bind(this));
		},
		get: function(path, callback){
			$.ajax({
				url: this.config.url + path,
				type: 'GET',
				success: callback.bind(this),
			});
		},
		displaySelect: function(data){
			$('#clients').empty();
			this.customers = data.customers;
			for (var i = 0 ; i < this.customers.length ; i++) {
				$('#clients').append('<option value="' + data.customers[i].id + '">' + data.customers[i].first_name + ' ' + data.customers[i].last_name + '</option>');
			}
		},
		displayCustomer: function(){
			var choosenCustomer = this.customers[$('option:selected').val() - 1];
			var template = '<ul><li>First Name : {{first_name}}</li><li>Last Name : {{last_name}}</li><li>Role : {{role}}</li><li>Company : {{company}}</li><li>Phone : {{phone}}</li><li>Email : {{email}}</li><li>Description : {{description}}</li></ul>';
			var selectedCustomer = Mustache.to_html(template, choosenCustomer);
			$('#selectedCustomer').html(selectedCustomer);
		},
		createCustomer: function(){
			this.newCustomer = {
				id: this.customers.length + 1,
				first_name: $('#new_first_name').val(),
				last_name: $('#new_last_name').val(),
				company: $('#new_company').val(),
				role: $('#new_role').val(),
				phone: $('#new_phone').val(),
				email: $('#new_email').val(),
				description: $('#new_description').val()
			};
			this.post('/newCustomer', this.newCustomer);
		},
		post: function(path, customer){
			$.ajax({
				url: this.config.url + path,
				type: 'POST',
				data: customer,
				success: function(){
					console.log('Data sent to server !');
				}
			});
		},
		displayEdition: function(data){
			var choosenCustomer = this.customers[$('option:selected').val() - 1];
			for(var key in choosenCustomer){
				$('#edit_' + key).val(choosenCustomer[key]);
			}
		},
		saveEdition: function(){
			this.editedCustomer = {
				id: $('#edit_id').val(),
				first_name: $('#edit_first_name').val(),
				last_name: $('#edit_last_name').val(),
				company: $('#edit_company').val(),
				role: $('#edit_role').val(),
				phone: $('#edit_phone').val(),
				email: $('#edit_email').val(),
				description: $('#edit_description').val()
			};
			this.post('/editCustomer', this.editedCustomer);
		}
	};

	$(document).ready(function(){
		app.init();
	});
})();