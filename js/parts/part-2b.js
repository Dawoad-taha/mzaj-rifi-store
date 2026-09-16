/* =========================================================
   MZAJ RIFI - PRODUCT ACTIONS FINAL FIX
   حذف القلب نهائياً + تمديد الزرين
   ========================================================= */

;(function () {

    if (!window.location.pathname.startsWith('/products/')) {
        return;
    }

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
            const text = cleanText(el.textContent);
            return text.includes('اضف الى السلة');
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
