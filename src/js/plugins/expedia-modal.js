var expediaModal = {
    init: function() {
        $(document).on('click', '[data-modal]', expediaModal.showModal);
    }
};

expediaModal.showModal = function(callback, e) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    var $target;

    $target = ($(this).hasClass('expedia-modal')) ? $(this) : $($(this).attr('href'));

    if ($target && $target.length) {
        $target.show(0, function() { expediaModal.onModalShow($target, callback); });

        var closeModal = $target.find('.expedia-modal-close');
        closeModal.off('click').on('click', expediaModal.hideModal);
    }
};

expediaModal.hideModal = function(e) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    var $target = $($(this).closest('.expedia-modal'));

    if ($target && $target.length) {
        $target.hide(0, expediaModal.onModalHide);
    }
};

expediaModal.onModalShow = function(modal, callback) {
    var $bg = $('<div class="expedia-modal-bg"></div>').css('z-index', modal.css('z-index') - 1);
    $bg.appendTo('body');

    modal.css({
        opacity: 1,
        top: $(window).scrollTop()
    });

    modal.data('bg', $bg);

    if (callback && typeof callback === 'function') {
        callback();
    }
};

expediaModal.onModalHide = function() {
    if ($(this).data('bg')) {
        $(this).data('bg').remove();
    } else {
        $('.expedia-modal-bg').remove();
    }

    $(this).css({
        opacity: 0,
        top: '-100px'
    });
};

module.exports = expediaModal;


