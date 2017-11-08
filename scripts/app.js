'use strict';

var modal = $('#modal');
var api = 'https://openlibrary.org/api/books?bibkeys=';
var isbnArray = ['0596517742', '9781449342883', '0132701251', '0471236403', '0470017198', '9780133407150', '0071508546', '3822830100', '9781118026687', '0321272250', '1575213117', '0596005253'];
var closeBtn = $('#close');
var searchBtn = $('#searchBtn');

/******************
Build API Function
******************/

function buildApi(bookArray) {
	for(var i = 0; i < bookArray.length; i++) {
		api += 'ISBN:';
		api += bookArray[i];
		api += ',';
	}
}

/*****************
Lightbox Function
*****************/

function displayModal(book) {

	if(modal.css('display') === 'block') {
		closeModal();
	}

	else {
		var body = $('body');
		var $overlay = $('<div id="overlay"></div>');

		body.append($overlay);
		$('#overlay').css('display', 'block');
		modal.css('display', 'block');
			
		var modalHtml = '<h2 id="title"><span>Title:</span> ';
		modalHtml += book.title;
		modalHtml += '</h2>';
		modalHtml += '<p id="authors"><span>Author:</span> ';
		modalHtml += book.authors[0].name;
		modalHtml += '</p>';
		modalHtml += '<p id="publishDate"><span>Date of Publication:</span> ';
		modalHtml += book.publish_date;
		modalHtml += ' </p>';
		modalHtml += '<a id="url" href="';
		modalHtml += book.url;
		modalHtml += '">Click here for more info</a>';
		modalHtml += '<img id="cover" src="';
		modalHtml += book.cover.medium;
		modalHtml += '"</img>';

		modal.append(modalHtml);
	}
}

/**********************
Close Lightbox Function
***********************/

function closeModal() {
	modal.css('display', 'none');
	$('#title').remove();
	$('#subtitle').remove();
	$('#authors').remove();
	$('#publishDate').remove();
	$('#cover').remove();
	$('#publisher').remove();
	$('#url').remove();
	$('#overlay').remove();
}

/****************************
Add Image Thumbnails Function
*****************************/

function addImage(image, idName, div) {
	var galleryHtml = '<img id="';
	galleryHtml +=  idName;
	galleryHtml += '" src="';
	galleryHtml += image;
	galleryHtml += '">';
	$(div).append(galleryHtml);
}

/***********************************
	AJAX request to Open Library
************************************/

buildApi(isbnArray);

api += '&jscmd=data&format=json&callback=?';

$.getJSON( api, function(data) {

	var gallery = $('#gallery');

	//Loop through data object properties returned by Open Library. Each property is an object for a single book item identified by ISBN#
	
	for(var prop in data) {
		var book = data[prop];
		var cover = book.cover.medium;
		
	   	addImage(cover, prop, 'div#gallery');
	}
	//Binds click event to thumbnail images in gallery
	$(gallery.children()).click(function() {
		var thisBookId = this.getAttribute('id');
		var thisBook = data[thisBookId];

		displayModal(thisBook);
   	});

	/*********************
		Close Lightbox
	**********************/
	
	closeBtn.click(function() {
		closeModal();
	}); 

}); // end getJSON

/*********************
	User Search
	**********************/

	searchBtn.click((e) => {
		var searchApi = 'https://openlibrary.org/api/books?bibkeys=';
		var isbnSearch = document.getElementById('isbnSearch');
		var isbnNumber = isbnSearch.value;
		var search = $('#search');
		var anchor = document.getElementById('Anchor');
	
		while(anchor.nextElementSibling != null) {
			anchor.nextElementSibling.remove();
		}

		searchApi += 'ISBN:';
		searchApi += isbnNumber;
		searchApi += ',';
		searchApi += '&jscmd=data&format=json&callback=?';

		$.getJSON(searchApi, (data) => {
			for(var prop in data) {

				var book = data[prop];
				var cover = book.cover.medium;
			
		   		addImage(cover, prop, 'div#search');
			}

			$(search.children('img')).click(function() {
				var thisBookId = this.getAttribute('id');
				var thisBook = data[thisBookId];
				displayModal(thisBook);
	   		});

	   		closeBtn.click(function() {
				closeModal();
			}); // Close lightbox click

			isbnSearch.value = '';
		});
});
	






