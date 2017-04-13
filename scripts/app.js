'use strict';

/*********************
	Lightbox Function
**********************/
var modal = $('#modal');

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
		modalHtml += '<p id="publisher"><span>Publisher:</span> ';
		modalHtml += book.publishers[0].name;
		modalHtml += '</p>';
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

function addGalleryImage(image, idName) {
	var galleryHtml = '<img id="';
	galleryHtml +=  idName;
	galleryHtml += '" src="';
	galleryHtml += image;
	galleryHtml += '">';
	$('div#gallery').append(galleryHtml);
}


/***********************************
	AJAX request to Open Library
************************************/

$.getJSON('https://openlibrary.org/api/books?bibkeys=ISBN:0596517742,ISBN:9781449342883,ISBN:0132701251,ISBN:0471236403,ISBN:0470017198,ISBN:9780133407150,ISBN:0071508546,ISBN:3822830100,ISBN:9781118026687,ISBN:0321272250,ISBN:1575213117,ISBN:0596005253&format=javascript&jscmd=data&callback=?', function(data) {
	console.log(data);
	/*********************************************
		Returned Book Objects from Open Library
	**********************************************/

	var book1 = data['ISBN:0596517742'];
	var book2 = data['ISBN:9781449342883'];
	var book3 = data['ISBN:0132701251'];
	var book4 = data['ISBN:0471236403'];
	var book5 = data['ISBN:0470017198'];
	var book6 = data['ISBN:9780133407150'];
	var book7 = data['ISBN:0071508546'];
	var book8 = data['ISBN:3822830100'];
	var book9 = data['ISBN:9781118026687'];
	var book10 = data['ISBN:0321272250'];
	var book11 = data['ISBN:1575213117'];
	var book12 = data['ISBN:0596005253'];
	
	/*********************
		Book Covers
	**********************/
	var cover1 = book1.cover.medium;
	var cover2 = book2.cover.medium;
	var cover3 = book3.cover.medium;
	var cover4 = book4.cover.medium;
	var cover5 = book5.cover.medium;
	var cover6 = book6.cover.medium;
	var cover7 = book7.cover.medium;
	var cover8 = book8.cover.medium;
	var cover9 = book9.cover.medium;
	var cover10 = book10.cover.medium;
	var cover11 = book11.cover.medium;
	var cover12 = book12.cover.medium;

	/*********************
		Add thumbnails
	**********************/
	
	addGalleryImage(cover1, 'image1');
	addGalleryImage(cover2, 'image2');
	addGalleryImage(cover3, 'image3');
	addGalleryImage(cover4, 'image4');
	addGalleryImage(cover5, 'image5');
	addGalleryImage(cover6, 'image6');
	addGalleryImage(cover7, 'image7');
	addGalleryImage(cover8, 'image8');
	addGalleryImage(cover9, 'image9');
	addGalleryImage(cover10, 'image10');
	addGalleryImage(cover11, 'image11');
	addGalleryImage(cover12, 'image12');

	/*********************
	 Thumbnail Image Divs
	**********************/

	var img1 = $('#image1');
	var img2 = $('#image2');
	var img3 = $('#image3');
	var img4 = $('#image4');
	var img5 = $('#image5');
	var img6 = $('#image6');
	var img7 = $('#image7');
	var img8 = $('#image8');
	var img9 = $('#image9');
	var img10 = $('#image10');
	var img11 = $('#image11');
	var img12 = $('#image12');

	/*********************
		Close Lightbox
	**********************/
	
	var close = $('#close');

	close.click(function() {
		closeModal();
	}); // Close lightbox click

	/*********************
		Image Click Events
	**********************/

	img1.click(function() {
		displayModal(book1);
	}); // book1 click 

	img2.click(function() {
		displayModal(book2);
	}); // book2 click

	img3.click(function() {
		displayModal(book3);
	}); // book3 click

	img4.click(function() {
		displayModal(book4);
	}); // book4 click

	img5.click(function() {
		displayModal(book5);
	}); // book5 click

	img6.click(function() {
		displayModal(book6);
	}); // book6 click

	img7.click(function() {
		displayModal(book7);
	}); // book7 click

	img8.click(function() {
		displayModal(book8);
	}); // book8 click

	img9.click(function() {
		displayModal(book9);
	}); // book9 click

	img10.click(function() {
		displayModal(book10);
	}); // book10 click

	img11.click(function() {
		displayModal(book11);
	}); // book11 click

	img12.click(function() {
		displayModal(book12);
	}); // book12 click

}); // end first getJSON