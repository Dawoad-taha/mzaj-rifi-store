/* =========================================================
   MZAJ RIFI - آراء العملاء
   ========================================================= */

;(function () {

    function normalizeText(text) {
        return (text || '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function findTestimonialsTitle() {
        const titles = document.querySelectorAll('h1, h2, h3');
        for (const title of titles) {
            const text = normalizeText(title.textContent);
            if (text === 'آراء العملاء' || text === 'اراء العملاء') return title;
        }
        return null;
    }

    function applyTestimonialsStyle() {
        const title = findTestimonialsTitle();
        if (!title) return false;
        if (title.dataset.mzTestimonialsReady === '1') return true;

        title.dataset.mzTestimonialsReady = '1';
        title.style.setProperty('position', 'relative', 'important');
        title.style.setProperty('display', 'flex', 'important');
        title.style.setProperty('align-items', 'center', 'important');
        title.style.setProperty('justify-content', 'center', 'important');
        title.style.setProperty('width', '100%', 'important');
        title.style.setProperty('max-width', '100%', 'important');
        title.style.setProperty('box-sizing', 'border-box', 'important');
        title.style.setProperty('text-align', 'center', 'important');
        title.style.setProperty('direction', 'rtl', 'important');
        title.style.setProperty('margin', '18px auto 20px', 'important');
        title.style.setProperty('padding', '0 15px 13px', 'important');
        title.style.setProperty('background', 'transparent', 'important');
        title.style.setProperty('color', 'transparent', 'important');
        title.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');

        const text = normalizeText(title.textContent);
        title.innerHTML = '';

        const span = document.createElement('span');
        span.textContent = text;
        span.style.setProperty('display', 'inline-block', 'important');
        span.style.setProperty('font-size', '22px', 'important');
        span.style.setProperty('font-weight', '700', 'important');
        span.style.setProperty('line-height', '1.5', 'important');
        span.style.setProperty('text-align', 'center', 'important');
        span.style.setProperty('background-image','linear-gradient(110deg,#601f49 0%,#7d285e 25%,#b85389 42%,#e99fbc 50%,#b85389 58%,#7d285e 75%,#601f49 100%)','important');
        span.style.setProperty('background-size', '300% 100%', 'important');
        span.style.setProperty('-webkit-background-clip', 'text', 'important');
        span.style.setProperty('background-clip', 'text', 'important');
        span.style.setProperty('color', 'transparent', 'important');
        span.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
        title.appendChild(span);

        const line = document.createElement('span');
        line.style.setProperty('position', 'absolute', 'important');
        line.style.setProperty('left', '50%', 'important');
        line.style.setProperty('bottom', '0', 'important');
        line.style.setProperty('transform', 'translateX(-50%)', 'important');
        line.style.setProperty('width', '90px', 'important');
        line.style.setProperty('height', '3px', 'important');
        line.style.setProperty('border-radius', '50px', 'important');
        line.style.setProperty('background-image','linear-gradient(90deg,#f2c5d5,#e99fbc,#601f49,#e99fbc,#f2c5d5)','important');
        line.style.setProperty('background-size', '300% 100%', 'important');
        title.appendChild(line);

        span.animate([
            { backgroundPosition: '0% 50%' },
            { backgroundPosition: '100% 50%' },
            { backgroundPosition: '0% 50%' }
        ], { duration: 4000, iterations: Infinity, easing: 'ease-in-out' });

        line.animate([
            { backgroundPosition: '0% 50%' },
            { backgroundPosition: '300% 50%' }
        ], { duration: 3000, iterations: Infinity, easing: 'linear' });

        return true;
    }

    applyTestimonialsStyle();
    setTimeout(applyTestimonialsStyle, 300);
    setTimeout(applyTestimonialsStyle, 800);
    setTimeout(applyTestimonialsStyle, 1500);
    setTimeout(applyTestimonialsStyle, 2500);

    const observer = new MutationObserver(function () {
        applyTestimonialsStyle();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();

/* =========================================================
   MZAJ RIFI - CATEGORY PAGE CLASS
   ========================================================= */
(function () {
    const path = window.location.pathname;
    if (path.startsWith('/categories/')) {
        document.body.classList.add('mz-category-page');
    }
})();

/* =========================================================
   MZAJ RIFI - PRODUCT ACTIONS FINAL FIX
   حذف القلب نهائياً + تمديد الزرين
   ========================================================= */
;(function () {
    if (!window.location.pathname.startsWith('/products/')) return;

    function cleanText(text) {
        return (text || '')
            .normalize('NFD')
            .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
            .replace(/ـ/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getDirectChild(el, parent) {
        let node = el;
        while (node && node.parentElement && node.parentElement !== parent) {
            node = node.parentElement;
        }
        return node;
    }

    function fixProductActions() {
        const clickables = Array.from(document.querySelectorAll('button, a, [role="button"]'));
        const cartButton = clickables.find(function (el) {
            return cleanText(el.textContent).includes('اضف الى السلة');
        });
        const buyButton = clickables.find(function (el) {
            const text = cleanText(el.textContent);
            return text.includes('اشتر الان') || text.includes('اشتري الان');
        });

        if (!cartButton || !buyButton) return;

        cartButton.classList.add('mz-product-cart-btn');
        buyButton.classList.add('mz-product-buy-btn');

        let row = cartButton.parentElement;
        while (row && row !== document.body && !row.contains(buyButton)) {
            row = row.parentElement;
        }
        if (!row || row === document.body) return;

        while (row.parentElement && row.children.length < 2 && row.parentElement.contains(buyButton)) {
            row = row.parentElement;
        }

        row.classList.add('mz-product-actions-row');

        const cartCell = getDirectChild(cartButton, row);
        const buyCell = getDirectChild(buyButton, row);
        if (!cartCell || !buyCell) return;

        cartCell.classList.add('mz-product-cart-cell');
        buyCell.classList.add('mz-product-buy-cell');

        Array.from(row.children).forEach(function (child) {
            if (child !== cartCell && child !== buyCell) {
                child.style.setProperty('display', 'none', 'important');
                child.style.setProperty('width', '0', 'important');
                child.style.setProperty('min-width', '0', 'important');
                child.style.setProperty('max-width', '0', 'important');
                child.style.setProperty('margin', '0', 'important');
                child.style.setProperty('padding', '0', 'important');
            }
        });

        row.style.setProperty('display', 'flex', 'important');
        row.style.setProperty('width', '100%', 'important');
        row.style.setProperty('max-width', '100%', 'important');
        row.style.setProperty('gap', '10px', 'important');
        row.style.setProperty('padding', '0', 'important');

        [cartCell, buyCell].forEach(function (cell) {
            cell.style.setProperty('display', 'flex', 'important');
            cell.style.setProperty('flex', '1 1 0', 'important');
            cell.style.setProperty('width', '0', 'important');
            cell.style.setProperty('min-width', '0', 'important');
            cell.style.setProperty('max-width', 'none', 'important');
            cell.style.setProperty('margin', '0', 'important');
            cell.style.setProperty('padding', '0', 'important');
        });

        [cartButton, buyButton].forEach(function (btn) {
            btn.style.setProperty('width', '100%', 'important');
            btn.style.setProperty('max-width', '100%', 'important');
            btn.style.setProperty('min-width', '0', 'important');
        });
    }

    fixProductActions();
    setTimeout(fixProductActions, 300);
    setTimeout(fixProductActions, 700);
    setTimeout(fixProductActions, 1200);
    setTimeout(fixProductActions, 2000);

    const observer = new MutationObserver(fixProductActions);
    observer.observe(document.body, { childList: true, subtree: true });
})();
