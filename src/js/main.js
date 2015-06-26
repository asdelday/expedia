$(function() {

    var expediaAccordion = require('./plugins/expedia-accordion');
    var expediaModal = require('./plugins/expedia-modal');

    $.fn.expediaHideModal = expediaModal.hideModal;
    $.fn.expediaShowModal = expediaModal.showModal;

    expediaAccordion.init();
    expediaModal.init();

});
