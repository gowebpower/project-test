/**
 * Modal
 * 
 * @desc Generates html for a modal
 *
 *
 */
 
window.app = window.app || {};

window.app.Modal = (function($, window, document){	

	var $modal = $(
		[
			'<div class="modal-wrap">',
				'<div class="modal-screen"></div>',
				'<div class="modal">',
					'<div class="modal-inner">',
						'<div class="modal-top">',
							'<div class="modal-title"></div>',
							'<div class="modal-cont"></div>',
						'</div>',
						'<div class="modal-bot">',
							'<a class="modal-submit modal-button" href="#" data-goto="modalHide">',
								'<span></span>',
							'</a>',
						'</div>',
						'<a class="modal-close" href="#" data-goto="modalHide"></a>',
					'</div>',
				'</div>',
			'</div>'
		].join('\n')
	);

	var widgetize = function(opts) {
		var $modal_title = $modal.find('.modal-title');
		var $modal_cont = $modal.find('.modal-cont');
		var $modal_button = $modal.find('.modal-button');
		var $modal_close = $modal.find('.modal-close');
		return {
			$el: $modal,
			$title: $modal_title,
			$cont: $modal_cont,
			$button: $modal_button,
			$close: $modal_close
		};
	};

	return {
		widgetize: widgetize		
	};

}(jQuery, window, window.document));
				
