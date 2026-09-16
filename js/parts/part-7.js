/* =========================================================
   MZAJ RIFI - PRODUCT DESCRIPTION RIGHT ALIGN
   Correct selector for Zid product page
   ========================================================= */
;(function () {
    if (!window.location.pathname.startsWith('/products/')) return;

    function fixProductDescriptionAlignment() {
        document.querySelectorAll('.col-product-info-single-image > section > h3').forEach(function (el) {
            el.style.setProperty('text-align', 'right', 'important');
            el.style.setProperty('direction', 'rtl', 'important');
            el.style.setProperty('width', '100%', 'important');
            el.style.setProperty('margin', '6px 0', 'important');
            el.style.setProperty('padding', '0', 'important');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixProductDescriptionAlignment, { once: true });
    } else {
        fixProductDescriptionAlignment();
    }

    setTimeout(fixProductDescriptionAlignment, 300);
    setTimeout(fixProductDescriptionAlignment, 900);
    setTimeout(fixProductDescriptionAlignment, 1500);
})();
