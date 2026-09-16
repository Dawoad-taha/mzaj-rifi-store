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

            if (
                text === 'آراء العملاء' ||
                text === 'اراء العملاء'
            ) {
                return title;
            }
        }

        return null;
    }

    function applyTestimonialsStyle() {

        const title = findTestimonialsTitle();

        if (!title) {
            return false;
        }

        if (title.dataset.mzTestimonialsReady === '1') {
            return true;
        }

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
        span.style.setProperty(
            'background-image',
            'linear-gradient(110deg,#601f49 0%,#7d285e 25%,#b85389 42%,#e99fbc 50%,#b85389 58%,#7d285e 75%,#601f49 100%)',
            'important'
        );
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
        line.style.setProperty(
            'background-image',
            'linear-gradient(90deg,#f2c5d5,#e99fbc,#601f49,#e99fbc,#f2c5d5)',
            'important'
        );
        line.style.setProperty('background-size', '300% 100%', 'important');

        title.appendChild(line);

        span.animate(
            [
                { backgroundPosition: '0% 50%' },
                { backgroundPosition: '100% 50%' },
                { backgroundPosition: '0% 50%' }
            ],
            {
                duration: 4000,
                iterations: Infinity,
                easing: 'ease-in-out'
            }
        );

        line.animate(
            [
                { backgroundPosition: '0% 50%' },
                { backgroundPosition: '300% 50%' }
            ],
            {
                duration: 3000,
                iterations: Infinity,
                easing: 'linear'
            }
        );

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

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

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
