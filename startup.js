(function ($, window, undefined) {

	var $document = $(window.document),
		headingTemplate = null,
		menuTemplate = null,
		postitTemplate = null,
		postitEditTemplate = null;



	function savePostits () {
		var postitContent = [];

		$('.postit').each(function () {
			postitContent.push($(this).data('content'));
		});

		localStorage.setItem('postit-content', JSON.stringify(postitContent));
	}



	function loadPostits () {
		var postitContent = JSON.parse(localStorage.getItem('postit-content')),
			i,
			$currentPostit,
			$postitContainer = $('#postit-container');

		for (i = 0; i < postitContent.length; i += 1) {
			$currentPostit = $(postitTemplate({content : postitContent[i]}));
			$currentPostit.click(function () {
				startEditing($(this));
			});
			$postitContainer.append($currentPostit);
		}
	}



	function endEditingAndSave ($element) {
		var $newPostit,
			newContent;

		newContent = $element.find('textarea').val();
		$newPostit = $(postitTemplate({content : newContent}));
		$newPostit.data('content', newContent);
		$newPostit.addClass('selected');
		$newPostit.click(function () {
			startEditing($(this));
		});

		$element.replaceWith($newPostit);
	}


	function endEditingAndCancel ($element) {
		var $newPostit,
			oldContent;

		oldContent = $element.data('content');
		$newPostit = $(postitTemplate({content : oldContent}));
		$newPostit.data('content', oldContent);
		$newPostit.addClass('selected');
		$newPostit.click(function () {
			startEditing($(this));
		});

		$element.replaceWith($newPostit);
	}


	function startEditing ($element) {
		var $editHtml,
			editStartContent;

		editStartContent = $element.data('content');
		$editHtml = $(postitEditTemplate({
			content : editStartContent,
			label_save : "Speichern",
			label_cancel : "abbrechen"
		}));
		$editHtml.data('content', editStartContent);
		$editHtml.addClass('selected');

		$editHtml.find('#postit-edit-save').click(function () {
			endEditingAndSave($(this).parents('.span3'));
		});

		$editHtml.find('#postit-edit-cancel').click(function () {
			endEditingAndCancel($(this).parents('.span3'));
		});

		$element.replaceWith($editHtml);
	}


	function buildUI () {
		var $headingHtml,
			$menuHtml;

		if (headingTemplate !== null && menuTemplate !== null
			&& postitTemplate !== null && postitEditTemplate !== null) {


			$headingHtml = $(headingTemplate({title : "Postit Inferno - in english"}));
			$menuHtml = $(menuTemplate({
				label_new : "New",
				label_delete : "Delete",
				label_save : "Save",
				label_load : 'Load'
			}));

			$menuHtml.find('#new').click(function (event) {
				var postitCount = $('#postit-container').children().size(),
					$postitHtml = $(postitTemplate({content : ''}));

				$postitHtml.data('content', '');
				$postitHtml.click(function(event) {
					$('.selected').removeClass('selected');
					$(this).addClass('selected');

					startEditing($(this));
				});

				$('#postit-container').append($postitHtml);
			});


			$menuHtml.find('#delete').click(function(event) {
				$('.selected').remove();
			});

			$menuHtml.find('#save').click(function (event) {
				savePostits();
			});


			$menuHtml.find('#load').click(function (event) {
				loadPostits();
			});

			$('#heading').append($headingHtml);
			$('#menu').append($menuHtml);
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

		$.get('templates/postitEdit.handlebars', function (data) {
			postitEditTemplate = Handlebars.compile(data);
			buildUI();
		});
	});


}(jQuery, window));