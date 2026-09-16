/* =========================================================
   MZAJ RIFI - FOOTER TYPOGRAPHY SCOPED
   JS يحدد أقسام الفوتر بدقة
   ========================================================= */
(function () {
    const FOOTER_TITLES = ['من نحن','روابط مهمة','موقعنا','تواصل معنا'];

    function normalizeText(text) {
        return (text || '').replace(/\s+/g, ' ').replace(/[؟?::]/g, '').trim();
    }

    function getFooter() {
        return document.querySelector('.footer-store-section') || document.querySelector('footer section.footer-theme-bg') || document.querySelector('footer');
    }

    function isTargetTitle(element) {
        return FOOTER_TITLES.includes(normalizeText(element.textContent));
    }

    function getTargetTitles(footer) {
        const all = Array.from(footer.querySelectorAll('h1,h2,h3,h4,h5,h6,div,span,p')).filter(isTargetTitle);
        return all.filter(function (element) {
            return !Array.from(element.children).some(function (child) { return isTargetTitle(child); });
        });
    }

    function countTitles(container) {
        return getTargetTitles(container).length;
    }

    function findSectionContainer(title, footer) {
        let current = title.parentElement;
        let candidate = current;
        while (current && current !== footer) {
            const parent = current.parentElement;
            if (!parent || parent === footer) break;
            if (countTitles(parent) > 1) break;
            candidate = parent;
            current = parent;
        }
        return candidate;
    }

    function hasDirectText(element) {
        return Array.from(element.childNodes).some(function (node) {
            return node.nodeType === 3 && normalizeText(node.textContent).length > 0;
        });
    }

    function shouldIgnore(element) {
        return !!element.closest('.mz-footer-section-separator,.mz-footer-desktop-vseparator,[class*="payment"],[class*="payments"],[class*="vat"],[class*="logo"]');
    }

    function markTextElements(section) {
        section.querySelectorAll('p,a,li,span,small,strong,h1,h2,h3,h4,h5,h6,div').forEach(function (element) {
            if (shouldIgnore(element)) return;
            if (element.classList.contains('mz-footer-typo-title')) return;
            if (hasDirectText(element)) element.classList.add('mz-footer-typo-text');
        });
    }

    function applyFooterTypography() {
        const footer = getFooter();
        if (!footer) return;
        footer.classList.add('mz-footer-typography-ready');
        footer.querySelectorAll('.mz-footer-typo-title,.mz-footer-typo-text,.mz-footer-typo-section').forEach(function (element) {
            element.classList.remove('mz-footer-typo-title','mz-footer-typo-text','mz-footer-typo-section');
        });

        getTargetTitles(footer).forEach(function (title) {
            title.classList.add('mz-footer-typo-title');
            const section = findSectionContainer(title, footer);
            if (!section || !footer.contains(section)) return;
            section.classList.add('mz-footer-typo-section');
            markTextElements(section);
        });
    }

    function start() {
        applyFooterTypography();
        setTimeout(applyFooterTypography, 300);
        setTimeout(applyFooterTypography, 900);
        setTimeout(applyFooterTypography, 1600);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();

    const footer = getFooter();
    if (footer) {
        let timer = null;
        const observer = new MutationObserver(function () {
            clearTimeout(timer);
            timer = setTimeout(applyFooterTypography, 150);
        });
        observer.observe(footer, { childList: true, subtree: true });
    }
})();
