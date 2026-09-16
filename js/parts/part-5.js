/* =========================================================
   MZAJ RIFI - FOOTER SMART SEPARATORS
   Desktop + Mobile
   ========================================================= */
(function () {
    let resizeTimer = null;

    function cleanText(text) {
        return (text || '').replace(/\s+/g, ' ').trim();
    }

    function getFooter() {
        return document.querySelector('.footer-store-section') || document.querySelector('footer section.footer-theme-bg');
    }

    function getMainRow(footer) {
        if (!footer) return null;
        return footer.querySelector('.container > .row') || footer.querySelector('.row');
    }

    function removeSeparators(footer) {
        if (!footer) return;
        footer.querySelectorAll('.mz-footer-section-separator,.mz-footer-desktop-vseparator').forEach(function (element) {
            element.remove();
        });
    }

    function getSectionHeadings(footer) {
        const allowed = ['من نحن','من نحن ؟','من نحن؟','روابط مهمة','موقعنا','تواصل معنا'];
        return Array.from(footer.querySelectorAll('h2, h3, h4, .footer-title')).filter(function (heading) {
            const text = cleanText(heading.textContent);
            return allowed.some(function (title) { return text === title || text.includes(title); });
        });
    }

    function buildMobileSeparators(footer) {
        const headings = getSectionHeadings(footer);
        if (headings.length < 2) return;
        headings.forEach(function (heading, index) {
            if (index === 0) return;
            const separator = document.createElement('div');
            separator.className = 'mz-footer-section-separator';
            heading.parentNode.insertBefore(separator, heading);
        });
    }

    function buildDesktopSeparators(footer) {
        const row = getMainRow(footer);
        if (!row) return;
        row.style.setProperty('position', 'relative', 'important');

        const columns = Array.from(row.children).filter(function (element) {
            const rect = element.getBoundingClientRect();
            return rect.width > 50 && rect.height > 50;
        });

        columns.sort(function (a, b) {
            return a.getBoundingClientRect().left - b.getBoundingClientRect().left;
        });

        const rowRect = row.getBoundingClientRect();
        for (let i = 0; i < columns.length - 1; i++) {
            const first = columns[i].getBoundingClientRect();
            const second = columns[i + 1].getBoundingClientRect();
            const x = (first.right + second.left) / 2 - rowRect.left;
            const separator = document.createElement('div');
            separator.className = 'mz-footer-desktop-vseparator';
            separator.style.left = x + 'px';
            row.appendChild(separator);
        }

        columns.forEach(function (column) {
            const headings = getSectionHeadings(column);
            if (headings.length < 2) return;
            headings.forEach(function (heading, index) {
                if (index === 0) return;
                const separator = document.createElement('div');
                separator.className = 'mz-footer-section-separator';
                heading.parentNode.insertBefore(separator, heading);
            });
        });
    }

    function buildFooter() {
        const footer = getFooter();
        if (!footer) return;
        removeSeparators(footer);
        if (window.innerWidth <= 768) buildMobileSeparators(footer);
        else buildDesktopSeparators(footer);
    }

    function scheduleBuild() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildFooter, 120);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { setTimeout(buildFooter, 300); });
    } else {
        setTimeout(buildFooter, 300);
    }

    setTimeout(buildFooter, 900);
    window.addEventListener('resize', scheduleBuild);
})();
