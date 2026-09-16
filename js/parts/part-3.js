/* =========================================================
   MZAJ RIFI - DESKTOP HEADER FINAL CLEAN VERSION
   5 Categories + Login + Cart alignment + Logo alignment
   Laptop/Desktop only
   ========================================================= */

;(function () {
    const desktopMQ = window.matchMedia('(min-width: 992px)');
    let timer = null;
    let observer = null;

    function cleanText(text) {
        return (text || '').replace(/\s+/g, ' ').replace(/ـ/g, '').trim();
    }

    function getHeaderBar() {
        return document.querySelector('.search-header .search-header-bar') || document.querySelector('.search-header-bar');
    }

    function getCategorySource() {
        const candidates = Array.from(document.querySelectorAll('.dark.d-none.d-lg-block'));
        return candidates.find(function (element) {
            return element.querySelectorAll('a[href]').length >= 4;
        }) || null;
    }

    function findCategoryLink(source, keywords) {
        if (!source) return null;
        const links = Array.from(source.querySelectorAll('a[href]'));
        return links.find(function (link) {
            const text = cleanText(link.textContent);
            return keywords.every(function (word) { return text.includes(word); });
        }) || null;
    }

    function buildDesktopCategories(headerBar) {
        if (!headerBar) return;
        const source = getCategorySource();
        if (!source) return;

        let nav = headerBar.querySelector('.mz-desktop-categories-inline');
        if (!nav) {
            nav = document.createElement('nav');
            nav.className = 'mz-desktop-categories-inline';
            nav.setAttribute('aria-label', 'أقسام المتجر');
            headerBar.appendChild(nav);
        }

        const wanted = [
            { label: 'جميع المنتجات', keywords: ['جميع', 'المنتجات'] },
            { label: 'توصيل سريع داخل القصيم', keywords: ['توصيل', 'سريع', 'القصيم'] },
            { label: 'تقديمات الورد والشوكولاتة', keywords: ['تقديمات', 'الورد', 'الشوكولات'] },
            { label: 'فازات و باقات الورد الطبيعي', keywords: ['فازات', 'باقات', 'الورد', 'الطبيعي'] },
            { label: 'جميع التصنيفات', keywords: ['جميع', 'التصنيفات'] }
        ];

        nav.innerHTML = '';
        wanted.forEach(function (item) {
            const original = findCategoryLink(source, item.keywords);
            if (!original) return;
            const link = document.createElement('a');
            link.className = 'mz-desktop-category-link';
            link.href = original.href;
            link.textContent = item.label;
            nav.appendChild(link);
        });

        headerBar.classList.add('mz-desktop-header-bar');
        source.classList.add('mz-desktop-categories-source');
    }

    function getOriginalLoginButton() {
        return document.querySelector('#login-btn') || document.querySelector('.account-btn button') || document.querySelector('button[onclick*="account"]');
    }

    function getCountryButton() {
        const elements = Array.from(document.querySelectorAll('button, a'));
        return elements.find(function (element) { return cleanText(element.textContent) === 'السعودية'; }) || null;
    }

    function hideOldUtilityRow() {
        const loginButton = getOriginalLoginButton();
        const countryButton = getCountryButton();
        if (loginButton) loginButton.classList.add('mz-hide-original-login');
        if (countryButton) countryButton.classList.add('mz-hide-country-btn');
        if (!loginButton || !countryButton) return;

        let node = loginButton.parentElement;
        while (node && node !== document.body) {
            if (node.contains(countryButton) && !node.classList.contains('search-header-bar')) {
                const rect = node.getBoundingClientRect();
                if (rect.height > 0 && rect.height <= 140) {
                    node.classList.add('mz-hide-desktop-utility-row');
                    break;
                }
            }
            node = node.parentElement;
        }
    }

    function getAccountButton(headerBar) {
        if (!headerBar) return null;
        let button = headerBar.querySelector('.mz-account-icon-btn');
        if (button) return button;

        button = document.createElement('button');
        button.type = 'button';
        button.className = 'mz-account-icon-btn';
        button.setAttribute('aria-label', 'تسجيل الدخول');
        button.setAttribute('title', 'تسجيل الدخول');
        button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="4.2"></circle><path d="M4.5 21C4.5 16.8 7.7 14.2 12 14.2C16.3 14.2 19.5 16.8 19.5 21"></path></svg>';

        button.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const loginButton = getOriginalLoginButton();
            if (loginButton) loginButton.click();
        });

        headerBar.appendChild(button);
        return button;
    }

    function findVisibleElement(root, selectors) {
        if (!root) return null;
        for (const selector of selectors) {
            const elements = root.querySelectorAll(selector);
            for (const element of elements) {
                const rect = element.getBoundingClientRect();
                const style = getComputedStyle(element);
                if (rect.width > 4 && rect.height > 4 && style.display !== 'none' && style.visibility !== 'hidden') return element;
            }
        }
        return null;
    }

    function getCartReference(headerBar) {
        const icon = findVisibleElement(headerBar, [
            '.sicon-shopping-bag','.sicon-shopping-cart','.sicon-cart','.icon-cart','.fa-shopping-cart',
            'a[href*="cart"] svg','a[href*="cart"] i','[class*="cart"] svg','[class*="cart"] i'
        ]);
        if (icon) return icon;
        return findVisibleElement(headerBar, ['a[href*="/cart"]','a[href*="cart"]','.header-cart','.cart-icon','[class*="cart"]']);
    }

    function getDesktopLogoLink() {
        const link = document.querySelector('.search-header .header-logo > a');
        if (!link) return null;
        link.classList.remove('mz-centered-logo');
        return link;
    }

    function positionHeaderElements(headerBar) {
        if (!headerBar) return;
        const cartReference = getCartReference(headerBar);
        const accountButton = getAccountButton(headerBar);
        const logoLink = getDesktopLogoLink();
        if (!cartReference || !accountButton) return;

        headerBar.style.setProperty('position', 'relative', 'important');
        const headerRect = headerBar.getBoundingClientRect();
        const cartRect = cartReference.getBoundingClientRect();
        const cartLeft = cartRect.left - headerRect.left;
        const cartRight = cartRect.right - headerRect.left;
        const accountGap = 12;

        accountButton.style.setProperty('position', 'absolute', 'important');
        accountButton.style.setProperty('left', Math.round(cartRight + accountGap) + 'px', 'important');
        accountButton.style.setProperty('right', 'auto', 'important');
        accountButton.style.setProperty('top', '50%', 'important');
        accountButton.style.setProperty('transform', 'translateY(-50%)', 'important');
        accountButton.style.setProperty('width', '42px', 'important');
        accountButton.style.setProperty('height', '42px', 'important');
        accountButton.style.setProperty('display', 'flex', 'important');
        accountButton.style.setProperty('align-items', 'center', 'important');
        accountButton.style.setProperty('justify-content', 'center', 'important');
        accountButton.style.setProperty('margin', '0', 'important');
        accountButton.style.setProperty('padding', '0', 'important');
        accountButton.style.setProperty('background', 'transparent', 'important');
        accountButton.style.setProperty('border', '0', 'important');
        accountButton.style.setProperty('box-shadow', 'none', 'important');
        accountButton.style.setProperty('outline', 'none', 'important');
        accountButton.style.setProperty('z-index', '100', 'important');

        const svg = accountButton.querySelector('svg');
        if (svg) {
            svg.style.setProperty('width', '35px', 'important');
            svg.style.setProperty('height', '35px', 'important');
            svg.style.setProperty('fill', 'none', 'important');
            svg.style.setProperty('stroke', '#6f1f49', 'important');
            svg.style.setProperty('stroke-width', '1.7', 'important');
            svg.style.setProperty('stroke-linecap', 'round', 'important');
            svg.style.setProperty('stroke-linejoin', 'round', 'important');
            svg.style.setProperty('pointer-events', 'none', 'important');
        }

        if (logoLink) {
            const sideDistance = Math.max(20, Math.round(cartLeft));
            logoLink.style.setProperty('position', 'absolute', 'important');
            logoLink.style.setProperty('right', sideDistance + 'px', 'important');
            logoLink.style.setProperty('left', 'auto', 'important');
            logoLink.style.setProperty('top', '50%', 'important');
            logoLink.style.setProperty('transform', 'translateY(-50%)', 'important');
            logoLink.style.setProperty('margin', '0', 'important');
            logoLink.style.setProperty('padding', '0', 'important');
            logoLink.style.setProperty('z-index', '80', 'important');
        }
    }

    function applyDesktopHeader() {
        if (!desktopMQ.matches) return;
        const headerBar = getHeaderBar();
        if (!headerBar) return;
        buildDesktopCategories(headerBar);
        hideOldUtilityRow();
        positionHeaderElements(headerBar);
    }

    function scheduleApply() {
        clearTimeout(timer);
        timer = setTimeout(applyDesktopHeader, 80);
    }

    function startObserver() {
        if (observer) return;
        observer = new MutationObserver(function () {
            if (!desktopMQ.matches) return;
            scheduleApply();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function start() {
        if (!desktopMQ.matches) return;
        applyDesktopHeader();
        startObserver();
        setTimeout(applyDesktopHeader, 300);
        setTimeout(applyDesktopHeader, 800);
        setTimeout(applyDesktopHeader, 1500);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();

    window.addEventListener('resize', function () {
        if (desktopMQ.matches) scheduleApply();
    });
})();
