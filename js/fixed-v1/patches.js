/* =========================================================
   MZAJ RIFI - DESKTOP HEADER LINK SAFETY PATCH
   ========================================================= */
;(function () {
    document.addEventListener('click', function (event) {
        const link = event.target.closest('a.mz-desktop-category-link[href]');
        if (!link) return;

        if (
            event.button !== 0 ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        window.location.assign(link.href);
    }, true);
})();

/* =========================================================
   MZAJ RIFI - CART BUTTONS
   إرسال + إتمام الطلب
   ========================================================= */
(function () {

    function applyCartButtons() {

        /* يعمل في صفحة السلة فقط */
        if (
            window.location.pathname !== '/cart' &&
            !window.location.pathname.startsWith('/cart/')
        ) {
            return;
        }

        const elements = document.querySelectorAll(
            'button, a'
        );

        elements.forEach(function (element) {

            const text = (element.textContent || '')
                .replace(/\s+/g, ' ')
                .trim();

            /* زر إرسال */
            if (text === 'إرسال') {
                element.classList.add('mz-cart-action-animated');
                element.classList.add('mz-cart-send-btn');
            }

            /* زر إتمام الطلب */
            if (text.includes('إتمام الطلب')) {
                element.classList.add('mz-cart-action-animated');
                element.classList.add('mz-cart-checkout-btn');
            }

        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyCartButtons);
    } else {
        applyCartButtons();
    }

    setTimeout(applyCartButtons, 300);
    setTimeout(applyCartButtons, 800);
    setTimeout(applyCartButtons, 1500);

    /* في حال أعادت المنصة بناء محتوى السلة */
    const observer = new MutationObserver(applyCartButtons);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

/* =========================================================
   MZAJ RIFI - CART TOTAL ABOVE ACCOUNT ICON
   Desktop only
   ========================================================= */
(function () {

    const desktopMQ = window.matchMedia('(min-width: 992px)');

    function cleanText(text) {
        return (text || '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getHeader() {
        return document.querySelector('.search-header .search-header-bar');
    }

    function getAccountButton(header) {
        return header ? header.querySelector('.mz-account-icon-btn') : null;
    }

    function findCartPrice(header) {
        if (!header) return null;

        const elements = Array.from(
            header.querySelectorAll('span, strong, small, div, p')
        );

        const candidates = elements.filter(function (el) {
            const text = cleanText(el.textContent);
            if (!text) return false;

            const hasNumber = /\d/.test(text);
            const hasCurrency =
                text.includes('ریال') ||
                text.includes('ر.س') ||
                /SAR/i.test(text);

            if (!hasNumber || !hasCurrency) return false;

            const childHasSamePrice = Array.from(el.children).some(function (child) {
                const childText = cleanText(child.textContent);
                return (
                    /\d/.test(childText) &&
                    (
                        childText.includes('ریال') ||
                        childText.includes('ر.س') ||
                        /SAR/i.test(childText)
                    )
                );
            });

            return !childHasSamePrice;
        });

        candidates.sort(function (a, b) {
            return cleanText(a.textContent).length - cleanText(b.textContent).length;
        });

        return candidates[0] || null;
    }

    function applyCartTotal() {
        if (!desktopMQ.matches) return;

        const header = getHeader();
        const account = getAccountButton(header);
        const priceElement = findCartPrice(header);

        if (!header || !account || !priceElement) return;

        const priceText = cleanText(priceElement.textContent);
        account.setAttribute('data-cart-total', priceText);
        priceElement.classList.add('mz-original-cart-total-hidden');
        account.classList.add('mz-account-has-cart-total');
    }

    function run() {
        applyCartTotal();
        setTimeout(applyCartTotal, 300);
        setTimeout(applyCartTotal, 800);
        setTimeout(applyCartTotal, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    const observer = new MutationObserver(function () {
        if (!desktopMQ.matches) return;
        setTimeout(applyCartTotal, 80);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
})();
