(function ($, window, undefined) {

	var $document = $(window.document),
		headingTemplate = null,
		menuTemplate = null,
		postitTemplate = null;


	function buildUI () {
		var headingHtml,
			menuHtml;

		if (headingTemplate !== null && menuTemplate !== null && postitTemplate !== null) {
			headingHtml = headingTemplate({title : "Postit Inferno - in english"});
			menuHtml = menuTemplate({label_new : "New", label_delete : "Delete"});

			$('#heading').append(headingHtml);
			$('#menu').append(menuHtml);
		}
	}


	$document.ready(function() {

		$.get('templates/heading.handlebars', function(data) {
			headingTemplate = Handlebars.compile(data);
			buildUI();
		});

		$.get('templates/menu.handlebars', function (data) {
			menuTemplate = Handlebars.compile(data);
			buildUI();
		});

		$.get('templates/postit.handlebars', function (data) {
			postitTemplate = Handlebars.compile(data);
			buildUI();
		});
	});


}(jQuery, window));