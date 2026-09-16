/* =========================================================
   MZAJ RIFI - GLOBAL LOADING SCREEN
   يظهر في كل صفحات المتجر عند كل تحميل صفحة
   ========================================================= */
;(function () {

    if (window.__MZAJ_RIFI_GLOBAL_LOADER__) return;
    window.__MZAJ_RIFI_GLOBAL_LOADER__ = true;

    function createMzLoader() {

        const oldGlobalLoader = document.getElementById('mz-store-loader');
        if (oldGlobalLoader) oldGlobalLoader.remove();

        const oldHomeLoader = document.getElementById('mz-first-home-loader');
        if (oldHomeLoader) oldHomeLoader.remove();

        document.documentElement.classList.remove('mz-loader-active');

        const loader = document.createElement('div');
        loader.id = 'mz-store-loader';
        loader.setAttribute('role', 'status');
        loader.setAttribute('aria-label', 'جاري تحميل المتجر');

        const storeLogo =
            document.querySelector('.header-logo img.image-logo.d-block.d-lg-none') ||
            document.querySelector('.header-logo img.image-logo.d-none.d-lg-block') ||
            document.querySelector('.header-logo img') ||
            document.querySelector('img.image-logo');

        const logo = document.createElement('img');
        logo.className = 'mz-loader-logo';
        logo.alt = 'مزاج ريفي';

        if (storeLogo) {
            logo.src = storeLogo.currentSrc || storeLogo.src;
        }

        const textBox = document.createElement('div');
        textBox.className = 'mz-loader-text';

        const brandName = document.createElement('div');
        brandName.className = 'mz-loader-brand';
        brandName.textContent = 'مزاج ريفي';

        const tagline = document.createElement('div');
        tagline.className = 'mz-loader-tagline';
        tagline.textContent = 'الطريق الأنيق لإرسال مشاعرك';

        const loadingLine = document.createElement('div');
        loadingLine.className = 'mz-loader-line';

        textBox.appendChild(brandName);
        textBox.appendChild(tagline);

        if (logo.src) loader.appendChild(logo);
        loader.appendChild(textBox);
        loader.appendChild(loadingLine);

        document.body.appendChild(loader);

        const startedAt = Date.now();
        const minimumVisibleTime = 850;
        let loaderClosed = false;

        function hideLoader() {
            if (loaderClosed) return;
            loaderClosed = true;

            const elapsed = Date.now() - startedAt;
            const remaining = Math.max(0, minimumVisibleTime - elapsed);

            window.setTimeout(function () {
                loader.classList.add('mz-loader-hide');

                window.setTimeout(function () {
                    if (loader.parentNode) loader.remove();
                }, 700);
            }, remaining);
        }

        if (document.readyState === 'complete') {
            window.setTimeout(hideLoader, 250);
        } else {
            window.addEventListener(
                'load',
                function () {
                    window.setTimeout(hideLoader, 250);
                },
                { once: true }
            );
        }

        /* حماية حتى لا يبقى اللودينج عالقاً مهما حصل */
        window.setTimeout(hideLoader, 4500);
    }

    function startGlobalLoader() {
        if (!document.body) {
            window.setTimeout(startGlobalLoader, 20);
            return;
        }
        createMzLoader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startGlobalLoader, { once: true });
    } else {
        startGlobalLoader();
    }

})();

/* =========================================================
   MZAJ RIFI - CART BUTTONS
   إرسال + إتمام الطلب
   Cart page only
   ========================================================= */
;(function () {
    const path = window.location.pathname || '';
    if (path !== '/cart' && !path.startsWith('/cart/')) return;

    function applyCartButtons() {
        document.querySelectorAll('button, a').forEach(function (element) {
            const text = (element.textContent || '').replace(/\s+/g, ' ').trim();
            if (text === 'إرسال') element.classList.add('mz-cart-action-animated', 'mz-cart-send-btn');
            if (text.includes('إتمام الطلب')) element.classList.add('mz-cart-action-animated', 'mz-cart-checkout-btn');
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyCartButtons, { once: true });
    else applyCartButtons();

    setTimeout(applyCartButtons, 300);
    setTimeout(applyCartButtons, 800);
    setTimeout(applyCartButtons, 1500);

    const observer = new MutationObserver(applyCartButtons);
    observer.observe(document.body, { childList: true, subtree: true });
})();
