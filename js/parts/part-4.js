/* =========================================================
   MZAJ RIFI - FIRST VISIT HOMEPAGE LOADER
   يظهر مرة واحدة فقط في الجلسة وعلى الصفحة الرئيسية فقط
   ========================================================= */
;(function () {
    const LOADER_KEY = 'mzaj_home_loader_seen';
    const LOADER_ID = 'mz-first-home-loader';
    const ACTIVE_CLASS = 'mz-loader-active';
    const HIDE_CLASS = 'mz-loader-hide';

    function isHomePage() {
        const path = (window.location.pathname || '/').replace(/\/+$/, '');
        return path === '' || path === '/';
    }

    function wasShownThisSession() {
        try { return window.sessionStorage.getItem(LOADER_KEY) === '1'; }
        catch (error) { return false; }
    }

    function markAsShown() {
        try { window.sessionStorage.setItem(LOADER_KEY, '1'); }
        catch (error) {}
    }

    function createLoader() {
        if (document.getElementById(LOADER_ID)) return document.getElementById(LOADER_ID);
        const loader = document.createElement('div');
        loader.id = LOADER_ID;
        loader.innerHTML = '<div class="mz-loader-content" aria-hidden="true"><div class="mz-loader-butterfly">🦋</div><div class="mz-loader-spinner"></div></div>';
        document.documentElement.classList.add(ACTIVE_CLASS);
        document.body.appendChild(loader);
        return loader;
    }

    function startHomeLoader() {
        if (!isHomePage() || wasShownThisSession()) return;
        markAsShown();
        const loader = createLoader();
        if (!loader) return;

        const startedAt = Date.now();
        const minimumVisibleTime = 750;
        let hideStarted = false;

        function hideLoader() {
            if (hideStarted) return;
            hideStarted = true;
            const elapsed = Date.now() - startedAt;
            const remaining = Math.max(0, minimumVisibleTime - elapsed);
            window.setTimeout(function () {
                loader.classList.add(HIDE_CLASS);
                document.documentElement.classList.remove(ACTIVE_CLASS);
                window.setTimeout(function () {
                    if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
                }, 450);
            }, remaining);
        }

        if (document.readyState === 'complete') hideLoader();
        else window.addEventListener('load', hideLoader, { once: true });
        window.setTimeout(hideLoader, 3500);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startHomeLoader, { once: true });
    else startHomeLoader();
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
