module.exports = {
    init: function() {
        $(document).on('click', '.expedia-accordion .expedia-accordion-item .expedia-accordion-link', function(e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }

            var $element = $(this).closest('.expedia-accordion-header');
            var $expediaAccordion = $element.closest('.expedia-accordion');
            var $expediaAccordionItem = $element.closest('.expedia-accordion-item');
            var $panel = $element.next('.expedia-accordion-panel');

            if(!$panel.is(':visible')) {
                $expediaAccordion.find('.expedia-accordion-item > .expedia-accordion-panel').slideUp(300).removeClass('active');
                $expediaAccordion.find('.expedia-accordion-item').removeClass('active');
            }
            $panel.slideToggle(300);
            $expediaAccordionItem.toggleClass('active');
        });
    }
}
