/* =========================================================
   MZAJ RIFI - MOBILE LOGO ONLY
   ========================================================= */

(function () {

    function handleMobileLogo() {

        const headerBar = document.querySelector(
            '.search-header .search-header-bar'
        );

        const logoLink = document.querySelector(
            '.search-header .header-logo > a'
        );

        if (!headerBar || !logoLink) return;

        if (window.innerWidth < 992) {
            headerBar.classList.add('mz-header-bar');
            logoLink.classList.add('mz-centered-logo');
        } else {
            logoLink.classList.remove('mz-centered-logo');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            handleMobileLogo,
            { once: true }
        );
    } else {
        handleMobileLogo();
    }

    window.addEventListener('resize', handleMobileLogo);

})();

/* =========================================================
   MZAJ RIFI - LOADING SCREEN
   ========================================================= */

;(function () {

    function createMzLoader() {

        const oldLoader = document.getElementById('mz-store-loader');

        if (oldLoader) {
            oldLoader.remove();
        }

        const loader = document.createElement('div');
        loader.id = 'mz-store-loader';

        const storeLogo =
            document.querySelector('.header-logo img.image-logo.d-block.d-lg-none') ||
            document.querySelector('.header-logo img.image-logo.d-none.d-lg-block') ||
            document.querySelector('.header-logo img') ||
            document.querySelector('img.image-logo');

        const logo = document.createElement('img');
        logo.className = 'mz-loader-logo';

        if (storeLogo) {
            logo.src = storeLogo.currentSrc || storeLogo.src;
            logo.alt = 'مزاج ريفي';
        }

        const textBox = document.createElement('div');
        textBox.className = 'mz-loader-text';

        const brandName = document.createElement('div');
        brandName.className = 'mz-loader-brand';
        brandName.textContent = 'مزاج ريفي';

        const tagline = document.createElement('div');
        tagline.className = 'mz-loader-tagline';
        tagline.textContent = 'الطريق الأنيق لإرسال مشاعرك';

        textBox.appendChild(brandName);
        textBox.appendChild(tagline);

        const loadingLine = document.createElement('div');
        loadingLine.className = 'mz-loader-line';

        loader.appendChild(logo);
        loader.appendChild(textBox);
        loader.appendChild(loadingLine);

        document.body.appendChild(loader);

        let loaderClosed = false;

        function hideLoader() {
            if (loaderClosed) return;

            loaderClosed = true;
            loader.classList.add('mz-loader-hide');

            setTimeout(function () {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 700);
        }

        if (document.readyState === 'complete') {
            setTimeout(hideLoader, 1000);
        } else {
            window.addEventListener(
                'load',
                function () {
                    setTimeout(hideLoader, 1000);
                },
                { once: true }
            );
        }

        setTimeout(hideLoader, 4000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            createMzLoader,
            { once: true }
        );
    } else {
        createMzLoader();
    }

})();

/* =========================================================
   MZAJ RIFI - SIDE MENU FINAL
   ========================================================= */

;(function () {

    let menuFixScheduled = false;

    function closeMzSideMenu(event) {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (typeof window.closeSlidingMenu === 'function') {
            window.closeSlidingMenu();
            return;
        }

        const overlay = document.getElementById('sidenav-overlay');

        if (overlay) {
            overlay.click();
            return;
        }

        document.body.classList.remove('sidenav-open');
    }

    function fixMzSideMenu() {

        const menus = document.querySelectorAll(
            '.slide-menu, #slide-menu, [class~="slide-menu"]'
        );

        menus.forEach(function (menu) {

            if (!menu.querySelector('a')) return;

            menu.classList.add('mz-rifi-side-menu');

            menu.style.setProperty('background', '#efd7e7', 'important');
            menu.style.setProperty('background-color', '#efd7e7', 'important');

            menu.querySelectorAll('ul, li').forEach(function (el) {
                el.style.setProperty('background', '#efd7e7', 'important');
                el.style.setProperty('background-color', '#efd7e7', 'important');
            });

            menu.querySelectorAll('li').forEach(function (li) {
                const text = li.textContent.trim();
                const link = li.querySelector('a');

                if (!text && !link) {
                    li.style.setProperty('display', 'none', 'important');
                }
            });

            let title = menu.querySelector('.mz-menu-main-title');

            if (!title) {
                title = document.createElement('div');
                title.className = 'mz-menu-main-title';

                const firstList = menu.querySelector('ul');

                if (firstList && firstList.parentNode) {
                    firstList.parentNode.insertBefore(title, firstList);
                } else {
                    menu.prepend(title);
                }
            }

            let titleText = title.querySelector('.mz-menu-title-text');

            if (!titleText) {

                Array.from(title.childNodes).forEach(function (node) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.remove();
                    }
                });

                titleText = document.createElement('span');
                titleText.className = 'mz-menu-title-text';
                titleText.textContent = 'القائمة الرئيسية';

                title.prepend(titleText);
            }

            title.style.setProperty('position', 'relative', 'important');
            title.style.setProperty('display', 'flex', 'important');
            title.style.setProperty('align-items', 'center', 'important');
            title.style.setProperty('justify-content', 'flex-start', 'important');
            title.style.setProperty('direction', 'rtl', 'important');
            title.style.setProperty('width', '100%', 'important');
            title.style.setProperty('min-height', '56px', 'important');
            title.style.setProperty('margin', '0', 'important');
            title.style.setProperty('padding', '0 15px 0 58px', 'important');
            title.style.setProperty('box-sizing', 'border-box', 'important');
            title.style.setProperty('text-align', 'right', 'important');
            title.style.setProperty('background', '#6f1f49', 'important');
            title.style.setProperty('background-color', '#6f1f49', 'important');

            titleText.style.setProperty('display', 'block', 'important');
            titleText.style.setProperty('flex', '1 1 auto', 'important');
            titleText.style.setProperty('width', 'auto', 'important');
            titleText.style.setProperty('margin', '0', 'important');
            titleText.style.setProperty('padding', '0', 'important');
            titleText.style.setProperty('text-align', 'right', 'important');
            titleText.style.setProperty('direction', 'rtl', 'important');
            titleText.style.setProperty('color', '#ffffff', 'important');
            titleText.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');

            let closeBtn = title.querySelector('.mz-menu-close-btn');

            if (!closeBtn) {
                closeBtn = document.createElement('button');
                closeBtn.type = 'button';
                closeBtn.className = 'mz-menu-close-btn';
                closeBtn.setAttribute('aria-label', 'إغلاق القائمة');
                closeBtn.innerHTML = '&times;';
                closeBtn.addEventListener('click', closeMzSideMenu);

                title.appendChild(closeBtn);
            }

            menu.querySelectorAll('a').forEach(function (link) {
                link.style.setProperty('color', '#6f1f49', 'important');
                link.style.setProperty('-webkit-text-fill-color', '#6f1f49', 'important');
                link.style.setProperty('text-align', 'right', 'important');
                link.style.setProperty('direction', 'rtl', 'important');
            });

        });

    }

    function scheduleMzSideMenuFix() {
        if (menuFixScheduled) return;

        menuFixScheduled = true;

        requestAnimationFrame(function () {
            menuFixScheduled = false;
            fixMzSideMenu();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            scheduleMzSideMenuFix,
            { once: true }
        );
    } else {
        scheduleMzSideMenuFix();
    }

    document.addEventListener('click', function () {
        setTimeout(scheduleMzSideMenuFix, 50);
        setTimeout(scheduleMzSideMenuFix, 200);
    });

    const observer = new MutationObserver(function () {
        scheduleMzSideMenuFix();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();

/* =========================================================
   MZAJ RIFI - CATEGORY SLIDER FINAL ROBUST
   4 DESKTOP / 3 TABLET / 2 MOBILE
   HOME PAGE ONLY
   الروابط طبيعية على اللابتوب - السحب فقط على الشاشات الصغيرة
   ========================================================= */

;(function () {

    const ITEMS = [
        {
            image: 'https://res.cloudinary.com/ikuuccsf/image/upload/v1789485774/Artboard_1.jpg',
            link: 'https://mzajrifi.com/categories/397390/%D8%AA%D8%B3%D9%84%D9%8A%D9%85-%D9%81%D9%88%D8%B1%D9%8A-%D9%8A%D8%A3%D8%AA%D9%8A-%D9%83%D9%85%D8%A7-%D8%A7%D9%84%D8%B5%D9%88%D8%B1%D8%A9'
        },
        {
            image: 'https://res.cloudinary.com/ikuuccsf/image/upload/v1789485859/Artboard_2.jpg',
            link: 'https://mzajrifi.com/categories/395074/bouquetsflowers'
        },
        {
            image: 'https://res.cloudinary.com/ikuuccsf/image/upload/v1789485921/Artboard_3.jpg',
            link: 'https://mzajrifi.com/categories/395076/%D8%AA%D9%82%D8%AF%D9%8A%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D9%87%D8%AF%D8%A7%D9%8A%D8%A7-%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A%D8%A9'
        },
        {
            image: 'https://res.cloudinary.com/ikuuccsf/image/upload/v1789485994/Artboard_4.jpg',
            link: 'https://mzajrifi.com/categories/391216/%D8%A7%D9%84%D9%88%D8%B1%D8%AF-%D9%88-%D8%A7%D9%84%D8%B4%D9%88%D9%83%D9%88%D9%84%D8%A7%D8%AA%D9%87'
        },
        {
            image: 'https://res.cloudinary.com/ikuuccsf/image/upload/v1789486060/Artboard_5.jpg',
            link: 'https://mzajrifi.com/categories/885942/graduation'
        },
        {
            image: 'https://res.cloudinary.com/ikuuccsf/image/upload/v1789486123/Artboard_6.jpg',
            link: 'https://mzajrifi.com/categories'
        }
    ];

    const GAP = 16;

    function isMzHomePage() {
        const path = (window.location.pathname || '/')
            .replace(/\/+$/, '') || '/';

        return (
            path === '/' ||
            path === '/ar' ||
            path === '/ar-sa'
        );
    }

    function removeMzCategorySlider() {
        document
            .querySelectorAll('#mz-category-slider, #mz-category-slider-final')
            .forEach(function (el) {
                el.remove();
            });
    }

    function buildSlider() {

        if (!isMzHomePage()) {
            removeMzCategorySlider();
            return;
        }

        removeMzCategorySlider();

        const section = document.createElement('section');
        section.id = 'mz-category-slider-final';
        section.style.setProperty('position', 'relative', 'important');
        section.style.setProperty('z-index', '50', 'important');
        section.style.setProperty('pointer-events', 'auto', 'important');

        const title = document.createElement('h2');
        title.className = 'mzfinal-title';
        title.textContent = 'اختر ما يناسبك';

        const viewport = document.createElement('div');
        viewport.className = 'mzfinal-viewport';
        viewport.style.setProperty('pointer-events', 'auto', 'important');

        const track = document.createElement('div');
        track.className = 'mzfinal-track';
        track.style.setProperty('pointer-events', 'auto', 'important');

        const CLONES_COUNT = 4;
        const sliderItems = [
            ...ITEMS,
            ...ITEMS.slice(0, CLONES_COUNT)
        ];

        sliderItems.forEach(function (item, i) {

            const card = document.createElement(item.link ? 'a' : 'div');
            card.className = 'mzfinal-card';

            if (item.link) {
                card.href = item.link;
                card.setAttribute('aria-label', 'فتح التصنيف');
                card.style.setProperty('pointer-events', 'auto', 'important');
                card.style.setProperty('cursor', 'pointer', 'important');
                card.style.setProperty('position', 'relative', 'important');
                card.style.setProperty('z-index', '3', 'important');
            } else {
                card.classList.add('mzfinal-card-disabled');
            }

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = 'اختر ما يناسبك';
            img.loading = i < 4 ? 'eager' : 'lazy';
            img.decoding = 'async';
            img.draggable = false;

            img.style.setProperty('display', 'block', 'important');
            img.style.setProperty('width', '100%', 'important');
            img.style.setProperty('height', 'auto', 'important');
            img.style.setProperty('object-fit', 'cover', 'important');
            img.style.setProperty('pointer-events', 'none', 'important');

            card.appendChild(img);
            track.appendChild(card);
        });

        viewport.appendChild(track);

        const pagination = document.createElement('div');
        pagination.className = 'mzfinal-pagination';

        ITEMS.forEach(function (_, i) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'mzfinal-dot';
            dot.dataset.index = i;
            pagination.appendChild(dot);
        });

        section.appendChild(title);
        section.appendChild(viewport);
        section.appendChild(pagination);

        const home = document.querySelector('.home');
        if (!home) return;

        const firstProducts = home.querySelector('.home-products-section');

        if (firstProducts && firstProducts.parentNode) {
            firstProducts.parentNode.insertBefore(section, firstProducts);
        } else {
            home.prepend(section);
        }

        let index = 0;
        let timer = null;
        let dragging = false;
        let moved = false;
        let startX = 0;
        let currentX = 0;
        let startTranslate = 0;

        function getVisibleCount() {
            const width = window.innerWidth || viewport.clientWidth || 0;
            if (width >= 1200) return 4;
            if (width >= 768) return 3;
            return 2;
        }

        function resizeCards() {
            const viewportStyle = getComputedStyle(viewport);
            const padLeft = parseFloat(viewportStyle.paddingLeft) || 0;
            const padRight = parseFloat(viewportStyle.paddingRight) || 0;
            const usableWidth = viewport.clientWidth - padLeft - padRight;
            if (usableWidth < 200) return;

            const visibleCount = getVisibleCount();
            const totalGap = GAP * (visibleCount - 1);
            const cardWidth = (usableWidth - totalGap) / visibleCount;

            track.querySelectorAll('.mzfinal-card').forEach(function (card) {
                card.style.setProperty('flex', '0 0 ' + cardWidth + 'px', 'important');
                card.style.setProperty('width', cardWidth + 'px', 'important');
                card.style.setProperty('min-width', cardWidth + 'px', 'important');
                card.style.setProperty('max-width', cardWidth + 'px', 'important');
            });

            goToCurrent(false);
        }

        function getStep() {
            const card = track.querySelector('.mzfinal-card');
            if (!card) return 0;
            return card.getBoundingClientRect().width + GAP;
        }

        function translateFor(i) {
            return -(i * getStep());
        }

        function goToCurrent(animated) {
            track.style.transition = animated
                ? 'transform .55s cubic-bezier(.22,.65,.3,1)'
                : 'none';
            track.style.transform =
                'translate3d(' + translateFor(index) + 'px,0,0)';
        }

        function updateDots() {
            const real = index % ITEMS.length;
            pagination.querySelectorAll('.mzfinal-dot').forEach(function (dot, i) {
                dot.classList.toggle('active', i === real);
            });
        }

        function nextSlide() {
            index++;
            goToCurrent(true);
            updateDots();
        }

        function previousSlide() {
            if (index === 0) {
                index = ITEMS.length;
                goToCurrent(false);
                requestAnimationFrame(function () {
                    index = ITEMS.length - 1;
                    goToCurrent(true);
                    updateDots();
                });
                return;
            }
            index--;
            goToCurrent(true);
            updateDots();
        }

        track.addEventListener('transitionend', function () {
            if (index >= ITEMS.length) {
                index = 0;
                goToCurrent(false);
                updateDots();
            }
        });

        function stopAuto() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        function startAuto() {
            stopAuto();
            timer = setInterval(nextSlide, 2400);
        }

        /*
         * مهم: في اللابتوب لا نستخدم Pointer Capture نهائياً.
         * هذا يترك روابط الصور تعمل كرابط HTML طبيعي 100%.
         * السحب يبقى فقط للشاشات الأصغر من 992px.
         */
        function dragStart(e) {
            if (window.innerWidth >= 992) return;

            dragging = true;
            moved = false;
            stopAuto();
            startX = e.clientX;
            currentX = e.clientX;
            startTranslate = translateFor(index);
            track.style.transition = 'none';
            viewport.classList.add('is-dragging');
        }

        function dragMove(e) {
            if (!dragging || window.innerWidth >= 992) return;

            currentX = e.clientX;
            const diff = currentX - startX;
            if (Math.abs(diff) > 8) moved = true;

            track.style.transform =
                'translate3d(' + (startTranslate + diff) + 'px,0,0)';
        }

        function dragEnd() {
            if (!dragging) return;

            dragging = false;
            viewport.classList.remove('is-dragging');

            const diff = currentX - startX;
            const threshold = Math.min(70, getStep() * 0.22);

            if (diff < -threshold) {
                nextSlide();
            } else if (diff > threshold) {
                previousSlide();
            } else {
                goToCurrent(true);
            }

            setTimeout(startAuto, 650);
        }

        viewport.addEventListener('pointerdown', dragStart);
        viewport.addEventListener('pointermove', dragMove);
        viewport.addEventListener('pointerup', dragEnd);
        viewport.addEventListener('pointercancel', dragEnd);

        track.addEventListener(
            'click',
            function (event) {
                if (moved) {
                    event.preventDefault();
                    event.stopPropagation();
                    moved = false;
                }
            },
            true
        );

        pagination.addEventListener('click', function (event) {
            const dot = event.target.closest('.mzfinal-dot');
            if (!dot) return;

            stopAuto();
            index = Number(dot.dataset.index);
            goToCurrent(true);
            updateDots();
            setTimeout(startAuto, 800);
        });

        if (typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(resizeCards);
            resizeObserver.observe(viewport);
        }

        window.addEventListener('resize', resizeCards);

        requestAnimationFrame(function () {
            resizeCards();
            index = 0;
            goToCurrent(false);
            updateDots();
            startAuto();
        });

        setTimeout(resizeCards, 250);
        setTimeout(resizeCards, 700);
        setTimeout(resizeCards, 1400);
    }

    function start() {
        if (!isMzHomePage()) {
            removeMzCategorySlider();
            return;
        }

        setTimeout(function () {
            if (!isMzHomePage()) {
                removeMzCategorySlider();
                return;
            }
            buildSlider();
        }, 700);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }

    window.addEventListener('pageshow', function () {
        if (!isMzHomePage()) removeMzCategorySlider();
    });

    window.addEventListener('popstate', function () {
        if (!isMzHomePage()) removeMzCategorySlider();
    });

})();
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

        while (
            node &&
            node.parentElement &&
            node.parentElement !== parent
        ) {
            node = node.parentElement;
        }

        return node;
    }


    function fixProductActions() {

        const clickables = Array.from(
            document.querySelectorAll(
                'button, a, [role="button"]'
            )
        );


        const cartButton = clickables.find(function (el) {

            const text = cleanText(el.textContent);

            return text.includes('اضف الى السلة');

        });


        const buyButton = clickables.find(function (el) {

            const text = cleanText(el.textContent);

            return (
                text.includes('اشتر الان') ||
                text.includes('اشتري الان')
            );

        });


        if (!cartButton || !buyButton) {
            return;
        }


        /* الكلاسات على الأزرار نفسها */
        cartButton.classList.add(
            'mz-product-cart-btn'
        );

        buyButton.classList.add(
            'mz-product-buy-btn'
        );


        /* =========================================
           إيجاد الصف المشترك
           ========================================= */

        let row = cartButton.parentElement;

        while (
            row &&
            row !== document.body &&
            !row.contains(buyButton)
        ) {
            row = row.parentElement;
        }


        if (!row || row === document.body) {
            return;
        }


        /*
         نريد أقرب Flex يحتوي القلب + الزرين،
         وليس حاوية كبيرة من الصفحة.
        */

        while (
            row.parentElement &&
            row.children.length < 2 &&
            row.parentElement.contains(buyButton)
        ) {
            row = row.parentElement;
        }


        row.classList.add(
            'mz-product-actions-row'
        );


        /* =========================================
           معرفة الخانتين المباشرتين
           ========================================= */

        const cartCell =
            getDirectChild(
                cartButton,
                row
            );

        const buyCell =
            getDirectChild(
                buyButton,
                row
            );


        if (!cartCell || !buyCell) {
            return;
        }


        cartCell.classList.add(
            'mz-product-cart-cell'
        );

        buyCell.classList.add(
            'mz-product-buy-cell'
        );


        /* =========================================
           حذف القلب وأي خانة ثالثة نهائياً
           ========================================= */

        Array.from(row.children)
            .forEach(function (child) {

                if (
                    child !== cartCell &&
                    child !== buyCell
                ) {

                    child.style.setProperty(
                        'display',
                        'none',
                        'important'
                    );

                    child.style.setProperty(
                        'width',
                        '0',
                        'important'
                    );

                    child.style.setProperty(
                        'min-width',
                        '0',
                        'important'
                    );

                    child.style.setProperty(
                        'max-width',
                        '0',
                        'important'
                    );

                    child.style.setProperty(
                        'margin',
                        '0',
                        'important'
                    );

                    child.style.setProperty(
                        'padding',
                        '0',
                        'important'
                    );
                }

            });


        /* =========================================
           فرض تمدد الصف نفسه
           ========================================= */

        row.style.setProperty(
            'display',
            'flex',
            'important'
        );

        row.style.setProperty(
            'width',
            '100%',
            'important'
        );

        row.style.setProperty(
            'max-width',
            '100%',
            'important'
        );

        row.style.setProperty(
            'gap',
            '10px',
            'important'
        );

        row.style.setProperty(
            'padding',
            '0',
            'important'
        );


        /* =========================================
           كل زر يأخذ نصف المساحة
           ========================================= */

        [cartCell, buyCell]
            .forEach(function (cell) {

                cell.style.setProperty(
                    'display',
                    'flex',
                    'important'
                );

                cell.style.setProperty(
                    'flex',
                    '1 1 0',
                    'important'
                );

                cell.style.setProperty(
                    'width',
                    '0',
                    'important'
                );

                cell.style.setProperty(
                    'min-width',
                    '0',
                    'important'
                );

                cell.style.setProperty(
                    'max-width',
                    'none',
                    'important'
                );

                cell.style.setProperty(
                    'margin',
                    '0',
                    'important'
                );

                cell.style.setProperty(
                    'padding',
                    '0',
                    'important'
                );

            });


        /* الأزرار نفسها */
        [cartButton, buyButton]
            .forEach(function (btn) {

                btn.style.setProperty(
                    'width',
                    '100%',
                    'important'
                );

                btn.style.setProperty(
                    'max-width',
                    '100%',
                    'important'
                );

                btn.style.setProperty(
                    'min-width',
                    '0',
                    'important'
                );

            });

    }


    fixProductActions();

    setTimeout(fixProductActions, 300);
    setTimeout(fixProductActions, 700);
    setTimeout(fixProductActions, 1200);
    setTimeout(fixProductActions, 2000);


    const observer =
        new MutationObserver(
            fixProductActions
        );


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );

})();

/* =========================================================
   MZAJ RIFI - DESKTOP HEADER NATIVE CLICK VERSION
   نستخدم روابط زد الأصلية وزر الدخول الأصلي نفسه
   Laptop/Desktop only
   ========================================================= */

;(function () {

    const desktopMQ = window.matchMedia('(min-width: 992px)');
    let timer = null;
    let observer = null;

    const WANTED = [
        {
            label: 'جميع المنتجات',
            keywords: ['جميع', 'المنتجات'],
            fallback: 'https://mzajrifi.com/products/'
        },
        {
            label: 'توصيل سريع داخل القصيم',
            keywords: ['توصيل', 'سريع', 'القصيم'],
            fallback: 'https://mzajrifi.com/categories/397390/%D8%AA%D8%B3%D9%84%D9%8A%D9%85-%D9%81%D9%88%D8%B1%D9%8A-%D9%8A%D8%A3%D8%AA%D9%8A-%D9%83%D9%85%D8%A7-%D8%A7%D9%84%D8%B5%D9%88%D8%B1%D8%A9'
        },
        {
            label: 'تقديمات الورد والشوكولاتة',
            keywords: ['تقديمات', 'الورد', 'الشوكولات'],
            fallback: 'https://mzajrifi.com/categories/391216/%D8%A7%D9%84%D9%88%D8%B1%D8%AF-%D9%88-%D8%A7%D9%84%D8%B4%D9%88%D9%83%D9%88%D9%84%D8%A7%D8%AA%D9%87'
        },
        {
            label: 'فازات و باقات الورد الطبيعي',
            keywords: ['فازات', 'باقات', 'الورد', 'الطبيعي'],
            fallback: 'https://mzajrifi.com/categories/395074/bouquetsflowers'
        },
        {
            label: 'جميع التصنيفات',
            keywords: ['جميع', 'التصنيفات'],
            fallback: 'https://mzajrifi.com/categories'
        }
    ];

    function cleanText(text) {
        return (text || '')
            .replace(/\s+/g, ' ')
            .replace(/ـ/g, '')
            .trim();
    }

    function getHeaderBar() {
        return (
            document.querySelector('.search-header .search-header-bar') ||
            document.querySelector('.search-header-bar')
        );
    }

    function getCategorySource() {
        const candidates = Array.from(
            document.querySelectorAll('.dark.d-none.d-lg-block')
        );

        return candidates.find(function (element) {
            return element.querySelectorAll('a[href]').length >= 4;
        }) || null;
    }

    function findSourceLink(source, keywords) {
        if (!source) return null;

        const links = Array.from(source.querySelectorAll('a[href]'));

        return links.find(function (link) {
            const text = cleanText(link.textContent);
            return keywords.every(function (word) {
                return text.includes(word);
            });
        }) || null;
    }

    function ensureDesktopCategories(headerBar) {
        if (!headerBar) return;

        let nav = headerBar.querySelector('.mz-desktop-categories-inline');

        if (!nav) {
            nav = document.createElement('nav');
            nav.className = 'mz-desktop-categories-inline';
            nav.setAttribute('aria-label', 'أقسام المتجر');
            headerBar.appendChild(nav);
        }

        if (nav.dataset.mzNativeReady === '1') return;

        const source = getCategorySource();
        const fragment = document.createDocumentFragment();

        WANTED.forEach(function (item) {
            let link = findSourceLink(source, item.keywords);

            if (link) {
                /*
                 * ننقل رابط زد الأصلي نفسه، وليس نسخة منه.
                 * بهذا نحافظ على سلوك الرابط الأصلي بالكامل.
                 */
                link = link;
            } else {
                link = document.createElement('a');
                link.href = item.fallback;
            }

            link.classList.add('mz-desktop-category-link');
            link.textContent = item.label;
            link.style.setProperty('pointer-events', 'auto', 'important');
            link.style.setProperty('cursor', 'pointer', 'important');
            link.style.setProperty('position', 'relative', 'important');
            link.style.setProperty('z-index', '5', 'important');

            fragment.appendChild(link);
        });

        nav.replaceChildren(fragment);
        nav.dataset.mzNativeReady = '1';
        nav.style.setProperty('pointer-events', 'auto', 'important');
        nav.style.setProperty('z-index', '1000', 'important');

        headerBar.classList.add('mz-desktop-header-bar');

        if (source) {
            source.classList.add('mz-desktop-categories-source');
        }
    }

    function getNativeLoginButton() {
        const candidates = [
            document.querySelector('#login-btn'),
            document.querySelector('.account-btn button'),
            document.querySelector('button[onclick*="account"]'),
            document.querySelector('button[aria-label*="تسجيل"]')
        ];

        return candidates.find(function (element) {
            return element && !element.dataset.mzSyntheticAccount;
        }) || null;
    }

    function prepareNativeLogin(headerBar) {
        if (!headerBar) return null;

        let loginButton = headerBar.querySelector(
            '.mz-account-icon-btn[data-mz-native-account="1"]'
        );

        if (loginButton) return loginButton;

        /* نحذف فقط زر الحساب الصناعي القديم الذي أنشأناه نحن */
        headerBar
            .querySelectorAll('.mz-account-icon-btn:not([data-mz-native-account="1"])')
            .forEach(function (button) {
                if (button.id !== 'login-btn') button.remove();
            });

        loginButton = getNativeLoginButton();
        if (!loginButton) return null;

        /*
         * ننقل حاوية حساب زد الأصلية إن وجدت، وليس الزر وحده.
         * هذا يحافظ على أي event delegation داخل .account-btn.
         */
        const nativeHost =
            loginButton.closest('.account-btn') ||
            loginButton.parentElement ||
            loginButton;

        if (nativeHost !== headerBar) {
            headerBar.appendChild(nativeHost);
        }

        nativeHost.classList.add('mz-native-account-host');
        nativeHost.style.setProperty('display', 'flex', 'important');
        nativeHost.style.setProperty('align-items', 'center', 'important');
        nativeHost.style.setProperty('justify-content', 'center', 'important');
        nativeHost.style.setProperty('width', '42px', 'important');
        nativeHost.style.setProperty('height', '42px', 'important');
        nativeHost.style.setProperty('margin', '0', 'important');
        nativeHost.style.setProperty('padding', '0', 'important');
        nativeHost.style.setProperty('background', 'transparent', 'important');
        nativeHost.style.setProperty('pointer-events', 'auto', 'important');
        nativeHost.style.setProperty('overflow', 'visible', 'important');

        loginButton.classList.remove('mz-hide-original-login');
        loginButton.classList.add('mz-account-icon-btn');
        loginButton.dataset.mzNativeAccount = '1';

        Array.from(loginButton.children).forEach(function (child) {
            child.style.setProperty('display', 'none', 'important');
        });

        let icon = loginButton.querySelector('svg.mz-native-account-svg');

        if (!icon) {
            icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            icon.setAttribute('viewBox', '0 0 24 24');
            icon.setAttribute('aria-hidden', 'true');
            icon.classList.add('mz-native-account-svg');
            icon.innerHTML = '<circle cx="12" cy="7.5" r="4.2"></circle><path d="M4.5 21C4.5 16.8 7.7 14.2 12 14.2C16.3 14.2 19.5 16.8 19.5 21"></path>';
            loginButton.appendChild(icon);
        }

        icon.style.setProperty('display', 'block', 'important');

        loginButton.style.setProperty('width', '42px', 'important');
        loginButton.style.setProperty('height', '42px', 'important');
        loginButton.style.setProperty('display', 'flex', 'important');
        loginButton.style.setProperty('align-items', 'center', 'important');
        loginButton.style.setProperty('justify-content', 'center', 'important');
        loginButton.style.setProperty('margin', '0', 'important');
        loginButton.style.setProperty('padding', '0', 'important');
        loginButton.style.setProperty('background', 'transparent', 'important');
        loginButton.style.setProperty('border', '0', 'important');
        loginButton.style.setProperty('box-shadow', 'none', 'important');
        loginButton.style.setProperty('outline', 'none', 'important');
        loginButton.style.setProperty('font-size', '0', 'important');
        loginButton.style.setProperty('color', 'transparent', 'important');
        loginButton.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
        loginButton.style.setProperty('pointer-events', 'auto', 'important');
        loginButton.style.setProperty('cursor', 'pointer', 'important');
        loginButton.style.setProperty('overflow', 'visible', 'important');

        return loginButton;
    }

    function hideCountryOnly() {
        Array.from(document.querySelectorAll('button, a')).forEach(function (element) {
            if (cleanText(element.textContent) === 'السعودية') {
                element.classList.add('mz-hide-country-btn');
            }
        });
    }

    function findVisibleElement(root, selectors) {
        if (!root) return null;

        for (const selector of selectors) {
            const elements = root.querySelectorAll(selector);

            for (const element of elements) {
                const rect = element.getBoundingClientRect();
                const style = getComputedStyle(element);

                if (
                    rect.width > 4 &&
                    rect.height > 4 &&
                    style.display !== 'none' &&
                    style.visibility !== 'hidden'
                ) {
                    return element;
                }
            }
        }

        return null;
    }

    function getCartClickable(headerBar) {
        const ref = findVisibleElement(headerBar, [
            '.sicon-shopping-bag',
            '.sicon-shopping-cart',
            '.sicon-cart',
            '.icon-cart',
            '.fa-shopping-cart',
            'a[href*="/cart"]',
            'a[href*="cart"]',
            '.header-cart',
            '.cart-icon'
        ]);

        if (!ref) return null;

        return ref.closest('a[href], button, [role="button"]') || ref;
    }

    function getDesktopLogoLink() {
        const link = document.querySelector('.search-header .header-logo > a');
        if (!link) return null;
        link.classList.remove('mz-centered-logo');
        return link;
    }

    function positionHeaderElements(headerBar) {
        if (!headerBar) return;

        const cart = getCartClickable(headerBar);
        const account = prepareNativeLogin(headerBar);
        const logo = getDesktopLogoLink();

        if (!cart || !account) return;

        headerBar.style.setProperty('position', 'relative', 'important');
        headerBar.style.setProperty('z-index', '1000', 'important');
        headerBar.style.setProperty('pointer-events', 'auto', 'important');

        cart.style.setProperty('position', 'relative', 'important');
        cart.style.setProperty('z-index', '1200', 'important');
        cart.style.setProperty('pointer-events', 'auto', 'important');
        cart.style.setProperty('cursor', 'pointer', 'important');

        const headerRect = headerBar.getBoundingClientRect();
        const cartRect = cart.getBoundingClientRect();
        const cartLeft = cartRect.left - headerRect.left;
        const cartRight = cartRect.right - headerRect.left;

        const accountHost =
            account.closest('.mz-native-account-host') ||
            account;

        accountHost.style.setProperty('position', 'absolute', 'important');
        accountHost.style.setProperty('left', Math.round(cartRight + 12) + 'px', 'important');
        accountHost.style.setProperty('right', 'auto', 'important');
        accountHost.style.setProperty('top', '50%', 'important');
        accountHost.style.setProperty('transform', 'translateY(-50%)', 'important');
        accountHost.style.setProperty('width', '42px', 'important');
        accountHost.style.setProperty('height', '42px', 'important');
        accountHost.style.setProperty('margin', '0', 'important');
        accountHost.style.setProperty('padding', '0', 'important');
        accountHost.style.setProperty('z-index', '1300', 'important');
        accountHost.style.setProperty('pointer-events', 'auto', 'important');
        accountHost.style.setProperty('cursor', 'pointer', 'important');
        accountHost.style.setProperty('overflow', 'visible', 'important');

        account.style.setProperty('pointer-events', 'auto', 'important');
        account.style.setProperty('cursor', 'pointer', 'important');
        account.style.setProperty('z-index', '1301', 'important');

        const svg = account.querySelector('svg.mz-native-account-svg');
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

        if (logo) {
            const sideDistance = Math.max(20, Math.round(cartLeft));
            logo.style.setProperty('position', 'absolute', 'important');
            logo.style.setProperty('right', sideDistance + 'px', 'important');
            logo.style.setProperty('left', 'auto', 'important');
            logo.style.setProperty('top', '50%', 'important');
            logo.style.setProperty('transform', 'translateY(-50%)', 'important');
            logo.style.setProperty('margin', '0', 'important');
            logo.style.setProperty('padding', '0', 'important');
            logo.style.setProperty('z-index', '1200', 'important');
            logo.style.setProperty('pointer-events', 'auto', 'important');
            logo.style.setProperty('cursor', 'pointer', 'important');
        }
    }

    function applyDesktopHeader() {
        if (!desktopMQ.matches) return;

        const headerBar = getHeaderBar();
        if (!headerBar) return;

        ensureDesktopCategories(headerBar);
        hideCountryOnly();
        positionHeaderElements(headerBar);
    }

    /*
     * Fallback أخير للروابط المخصصة فقط.
     * لا يتدخل في زر الدخول الأصلي أو سلة زد.
     */
    document.addEventListener('click', function (event) {
        if (!desktopMQ.matches) return;

        const link = event.target.closest(
            '.mz-desktop-category-link[href], #mz-category-slider-final a.mzfinal-card[href]'
        );

        if (!link) return;

        const href = link.href;
        if (!href) return;

        event.preventDefault();
        window.location.assign(href);
    }, false);

    function scheduleApply() {
        clearTimeout(timer);
        timer = setTimeout(applyDesktopHeader, 100);
    }

    function startObserver() {
        if (observer) return;

        observer = new MutationObserver(function () {
            if (!desktopMQ.matches) return;
            scheduleApply();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function start() {
        if (!desktopMQ.matches) return;

        applyDesktopHeader();
        startObserver();
        setTimeout(applyDesktopHeader, 300);
        setTimeout(applyDesktopHeader, 800);
        setTimeout(applyDesktopHeader, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }

    window.addEventListener('resize', function () {
        if (desktopMQ.matches) scheduleApply();
    });

})();
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
        const path = (window.location.pathname || '/')
            .replace(/\/+$/, '');

        return path === '' || path === '/';
    }

    function wasShownThisSession() {
        try {
            return window.sessionStorage.getItem(LOADER_KEY) === '1';
        } catch (error) {
            return false;
        }
    }

    function markAsShown() {
        try {
            window.sessionStorage.setItem(LOADER_KEY, '1');
        } catch (error) {
            /* إذا كان التخزين محظوراً، نكمل بدون تعطيل الصفحة */
        }
    }

    function createLoader() {
        if (document.getElementById(LOADER_ID)) {
            return document.getElementById(LOADER_ID);
        }

        const loader = document.createElement('div');
        loader.id = LOADER_ID;

        loader.innerHTML = `
            <div class="mz-loader-content" aria-hidden="true">
                <div class="mz-loader-butterfly">🦋</div>
                <div class="mz-loader-spinner"></div>
            </div>
        `;

        document.documentElement.classList.add(ACTIVE_CLASS);
        document.body.appendChild(loader);

        return loader;
    }

    function startHomeLoader() {
        /* لا يظهر في السلة أو المنتجات أو الأقسام أو أي صفحة فرعية */
        if (!isHomePage()) return;

        /* لا يظهر أكثر من مرة في نفس جلسة التصفح */
        if (wasShownThisSession()) return;

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
                    if (loader && loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 450);
            }, remaining);
        }

        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader, { once: true });
        }

        /* حماية من بقاء اللودينج إذا تأخر عنصر خارجي */
        window.setTimeout(hideLoader, 3500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startHomeLoader, { once: true });
    } else {
        startHomeLoader();
    }

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

                element.classList.add(
                    'mz-cart-action-animated'
                );

                element.classList.add(
                    'mz-cart-send-btn'
                );
            }

            /* زر إتمام الطلب */
            if (text.includes('إتمام الطلب')) {

                element.classList.add(
                    'mz-cart-action-animated'
                );

                element.classList.add(
                    'mz-cart-checkout-btn'
                );
            }

        });

    }


    if (document.readyState === 'loading') {

        document.addEventListener(
            'DOMContentLoaded',
            applyCartButtons
        );

    } else {

        applyCartButtons();

    }


    setTimeout(applyCartButtons, 300);
    setTimeout(applyCartButtons, 800);
    setTimeout(applyCartButtons, 1500);


    /* في حال أعادت المنصة بناء محتوى السلة */
    const observer = new MutationObserver(
        applyCartButtons
    );

    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );

})();
/* =========================================================
   MZAJ RIFI - CART TOTAL ABOVE ACCOUNT ICON
   Desktop only
   ========================================================= */

(function () {

    const desktopMQ =
        window.matchMedia('(min-width: 992px)');

    function cleanText(text) {

        return (text || '')
            .replace(/\s+/g, ' ')
            .trim();
    }


    function getHeader() {

        return document.querySelector(
            '.search-header .search-header-bar'
        );

    }


    function getAccountButton(header) {

        return header
            ? header.querySelector(
                '.mz-account-icon-btn'
            )
            : null;

    }


    function findCartPrice(header) {

        if (!header) return null;


        const elements = Array.from(
            header.querySelectorAll(
                'span, strong, small, div, p'
            )
        );


        const candidates =
            elements.filter(function (el) {

                const text =
                    cleanText(el.textContent);


                if (!text) return false;


                /*
                 نبحث عن سعر داخل الهيدر
                 يحتوي أرقام + رمز الريال أو SAR
                */
                const hasNumber =
                    /\d/.test(text);


                const hasCurrency =
                    text.includes('ریال') ||
                    text.includes('ر.س') ||
                    /SAR/i.test(text);


                if (
                    !hasNumber ||
                    !hasCurrency
                ) {
                    return false;
                }


                /*
                 نتجنب العناصر الكبيرة التي تحتوي
                 السعر بداخل عنصر أصغر
                */
                const childHasSamePrice =
                    Array.from(
                        el.children
                    ).some(function (child) {

                        const childText =
                            cleanText(
                                child.textContent
                            );

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


        /*
         عادة أقصر نص هو السعر نفسه
        */
        candidates.sort(function (a, b) {

            return (
                cleanText(a.textContent).length -
                cleanText(b.textContent).length
            );

        });


        return candidates[0] || null;

    }


    function applyCartTotal() {

        if (!desktopMQ.matches) {
            return;
        }


        const header =
            getHeader();


        const account =
            getAccountButton(header);


        const priceElement =
            findCartPrice(header);


        if (
            !header ||
            !account ||
            !priceElement
        ) {
            return;
        }


        const priceText =
            cleanText(
                priceElement.textContent
            );


        /*
         نخزن السعر على زر الحساب
         ليظهر من CSS
        */
        account.setAttribute(
            'data-cart-total',
            priceText
        );


        /*
         نخفي السعر القديم فقط
         بدون حذف العنصر
        */
        priceElement.classList.add(
            'mz-original-cart-total-hidden'
        );


        account.classList.add(
            'mz-account-has-cart-total'
        );

    }


    function run() {

        applyCartTotal();

        setTimeout(
            applyCartTotal,
            300
        );

        setTimeout(
            applyCartTotal,
            800
        );

        setTimeout(
            applyCartTotal,
            1500
        );

    }


    if (
        document.readyState === 'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            run
        );

    } else {

        run();

    }


    /*
     تحديث السعر إذا تغيرت السلة
    */
    const observer =
        new MutationObserver(function () {

            if (!desktopMQ.matches) {
                return;
            }


            setTimeout(
                applyCartTotal,
                80
            );

        });


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true,
            characterData: true
        }
    );

})();
/* =========================================================
   MZAJ RIFI - FOOTER SMART SEPARATORS
   Desktop + Mobile
   ========================================================= */

(function () {

    let resizeTimer = null;


    function cleanText(text) {

        return (text || '')
            .replace(/\s+/g, ' ')
            .trim();

    }


    function getFooter() {

        return (
            document.querySelector(
                '.footer-store-section'
            ) ||

            document.querySelector(
                'footer section.footer-theme-bg'
            )
        );

    }


    function getMainRow(footer) {

        if (!footer) return null;


        return (
            footer.querySelector(
                '.container > .row'
            ) ||

            footer.querySelector(
                '.row'
            )
        );

    }


    function removeSeparators(footer) {

        if (!footer) return;


        footer.querySelectorAll(
            '.mz-footer-section-separator,' +
            '.mz-footer-desktop-vseparator'
        ).forEach(function (element) {

            element.remove();

        });

    }


    /* =========================================
       إيجاد العناوين الأساسية
       ========================================= */

    function getSectionHeadings(footer) {

        const allowed = [
            'من نحن',
            'من نحن ؟',
            'من نحن؟',

            'روابط مهمة',

            'موقعنا',

            'تواصل معنا'
        ];


        return Array.from(
            footer.querySelectorAll(
                'h2, h3, h4, .footer-title'
            )
        ).filter(function (heading) {

            const text =
                cleanText(
                    heading.textContent
                );


            return allowed.some(
                function (title) {

                    return (
                        text === title ||
                        text.includes(title)
                    );

                }
            );

        });

    }


    /* =========================================
       MOBILE
       فاصل قبل كل قسم بعد الأول
       ========================================= */

    function buildMobileSeparators(
        footer
    ) {

        const headings =
            getSectionHeadings(
                footer
            );


        if (
            headings.length < 2
        ) {
            return;
        }


        headings.forEach(
            function (
                heading,
                index
            ) {

                if (index === 0) {
                    return;
                }


                const separator =
                    document.createElement(
                        'div'
                    );


                separator.className =
                    'mz-footer-section-separator';


                heading.parentNode.insertBefore(
                    separator,
                    heading
                );

            }
        );

    }


    /* =========================================
       DESKTOP
       فاصل بين كل عمودين
       ========================================= */

    function buildDesktopSeparators(
        footer
    ) {

        const row =
            getMainRow(
                footer
            );


        if (!row) {
            return;
        }


        row.style.setProperty(
            'position',
            'relative',
            'important'
        );


        const columns =
            Array.from(
                row.children
            ).filter(function (element) {

                const rect =
                    element.getBoundingClientRect();


                return (
                    rect.width > 50 &&
                    rect.height > 50
                );

            });


        /*
         ترتيب الأعمدة حسب موقعها الحقيقي
        */
        columns.sort(
            function (a, b) {

                return (
                    a.getBoundingClientRect().left -
                    b.getBoundingClientRect().left
                );

            }
        );


        const rowRect =
            row.getBoundingClientRect();


        for (
            let i = 0;
            i < columns.length - 1;
            i++
        ) {

            const first =
                columns[i]
                    .getBoundingClientRect();


            const second =
                columns[i + 1]
                    .getBoundingClientRect();


            /*
             منتصف الفراغ بين العمودين
            */
            const x =
                (
                    first.right +
                    second.left
                ) / 2 -
                rowRect.left;


            const separator =
                document.createElement(
                    'div'
                );


            separator.className =
                'mz-footer-desktop-vseparator';


            separator.style.left =
                x + 'px';


            row.appendChild(
                separator
            );

        }


        /*
         إذا كان داخل العمود نفسه
         أكثر من قسم مثل:
         موقعنا + تواصل معنا
         نضيف فاصل أفقي بينهما.
        */

        columns.forEach(
            function (column) {

                const headings =
                    getSectionHeadings(
                        column
                    );


                if (
                    headings.length < 2
                ) {
                    return;
                }


                headings.forEach(
                    function (
                        heading,
                        index
                    ) {

                        if (index === 0) {
                            return;
                        }


                        const separator =
                            document.createElement(
                                'div'
                            );


                        separator.className =
                            'mz-footer-section-separator';


                        heading.parentNode.insertBefore(
                            separator,
                            heading
                        );

                    }
                );

            }
        );

    }


    /* =========================================
       MAIN
       ========================================= */

    function buildFooter() {

        const footer =
            getFooter();


        if (!footer) {
            return;
        }


        removeSeparators(
            footer
        );


        if (
            window.innerWidth <= 768
        ) {

            buildMobileSeparators(
                footer
            );

        } else {

            buildDesktopSeparators(
                footer
            );

        }

    }


    function scheduleBuild() {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                buildFooter,
                120
            );

    }


    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            function () {

                setTimeout(
                    buildFooter,
                    300
                );

            }
        );

    } else {

        setTimeout(
            buildFooter,
            300
        );

    }


    setTimeout(
        buildFooter,
        900
    );


    window.addEventListener(
        'resize',
        scheduleBuild
    );

})();
/* =========================================================
   MZAJ RIFI - FOOTER TYPOGRAPHY SCOPED
   JS يحدد أقسام الفوتر بدقة
   ========================================================= */

(function () {

    const FOOTER_TITLES = [
        'من نحن',
        'روابط مهمة',
        'موقعنا',
        'تواصل معنا'
    ];


    function normalizeText(text) {
        return (text || '')
            .replace(/\s+/g, ' ')
            .replace(/[؟?::]/g, '')
            .trim();
    }


    function getFooter() {
        return (
            document.querySelector('.footer-store-section') ||
            document.querySelector('footer section.footer-theme-bg') ||
            document.querySelector('footer')
        );
    }


    function isTargetTitle(element) {

        const text = normalizeText(
            element.textContent
        );

        return FOOTER_TITLES.includes(text);
    }


    function getTargetTitles(footer) {

        const all = Array.from(
            footer.querySelectorAll(
                'h1,h2,h3,h4,h5,h6,div,span,p'
            )
        ).filter(isTargetTitle);


        /*
         لو نفس العنوان موجود داخل div ثم span،
         نأخذ العنصر الأعمق فقط.
        */
        return all.filter(function (element) {

            return !Array.from(element.children)
                .some(function (child) {
                    return isTargetTitle(child);
                });

        });
    }


    function countTitles(container) {

        return getTargetTitles(container)
            .length;
    }


    /*
     إيجاد أصغر Container يمثل القسم نفسه
     بدون ابتلاع القسم التالي.
    */
    function findSectionContainer(
        title,
        footer
    ) {

        let current =
            title.parentElement;

        let candidate =
            current;


        while (
            current &&
            current !== footer
        ) {

            const parent =
                current.parentElement;


            if (
                !parent ||
                parent === footer
            ) {
                break;
            }


            const titlesInside =
                countTitles(parent);


            /*
             لو الـParent يحتوي أكثر من عنوان
             فهذا يعني أنه يجمع أكثر من قسم.
             إذن current هو القسم المطلوب.
            */
            if (titlesInside > 1) {
                break;
            }


            candidate = parent;
            current = parent;
        }


        return candidate;
    }


    /*
     هل العنصر يحتوي نصًا مباشرًا فعليًا؟
     وليس مجرد Wrapper كبير.
    */
    function hasDirectText(element) {

        return Array.from(
            element.childNodes
        ).some(function (node) {

            return (
                node.nodeType === 3 &&
                normalizeText(
                    node.textContent
                ).length > 0
            );

        });
    }


    /*
     عدم لمس صور الدفع أو الأيقونات
    */
    function shouldIgnore(element) {

        return !!element.closest(
            '.mz-footer-section-separator,' +
            '.mz-footer-desktop-vseparator,' +
            '[class*="payment"],' +
            '[class*="payments"],' +
            '[class*="vat"],' +
            '[class*="logo"]'
        );
    }


    function markTextElements(section) {

        const elements =
            section.querySelectorAll(
                'p,a,li,span,small,strong,' +
                'h1,h2,h3,h4,h5,h6,div'
            );


        elements.forEach(function (element) {

            if (
                shouldIgnore(element)
            ) {
                return;
            }


            if (
                element.classList.contains(
                    'mz-footer-typo-title'
                )
            ) {
                return;
            }


            /*
             نكبر فقط العنصر الذي يحمل النص فعليًا،
             وليس الحاويات الكبيرة.
            */
            if (
                hasDirectText(element)
            ) {

                element.classList.add(
                    'mz-footer-typo-text'
                );

            }

        });
    }


    function applyFooterTypography() {

        const footer =
            getFooter();


        if (!footer) {
            return;
        }


        footer.classList.add(
            'mz-footer-typography-ready'
        );


        /*
         تنظيف Classes السابقة قبل إعادة التطبيق
        */
        footer.querySelectorAll(
            '.mz-footer-typo-title,' +
            '.mz-footer-typo-text,' +
            '.mz-footer-typo-section'
        ).forEach(function (element) {

            element.classList.remove(
                'mz-footer-typo-title',
                'mz-footer-typo-text',
                'mz-footer-typo-section'
            );

        });


        const titles =
            getTargetTitles(footer);


        titles.forEach(function (title) {

            title.classList.add(
                'mz-footer-typo-title'
            );


            const section =
                findSectionContainer(
                    title,
                    footer
                );


            if (
                !section ||
                !footer.contains(section)
            ) {
                return;
            }


            section.classList.add(
                'mz-footer-typo-section'
            );


            markTextElements(
                section
            );

        });
    }


    function start() {

        applyFooterTypography();


        /*
         زد أحيانًا يكمل بناء الفوتر بعد التحميل
        */
        setTimeout(
            applyFooterTypography,
            300
        );

        setTimeout(
            applyFooterTypography,
            900
        );

        setTimeout(
            applyFooterTypography,
            1600
        );

    }


    if (
        document.readyState === 'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            start
        );

    } else {

        start();
    }


    /*
     إذا أعاد قالب زد بناء محتوى الفوتر
    */
    const footer =
        getFooter();


    if (footer) {

        let timer = null;


        const observer =
            new MutationObserver(
                function () {

                    clearTimeout(timer);


                    timer = setTimeout(
                        applyFooterTypography,
                        150
                    );

                }
            );


        observer.observe(
            footer,
            {
                childList: true,
                subtree: true
            }
        );

    }

})();
/* =========================================================
   MZAJ RIFI - PRODUCT DESCRIPTION RIGHT ALIGN
   ========================================================= */

(function () {

    function fixProductDescriptionAlignment() {

        const targets = document.querySelectorAll(
            '.product-info-single-image section h3,' +
            '.product-info-single-image h3,' +
            'section.product-info-single-image h3'
        );

        targets.forEach(function (el) {

            el.style.setProperty(
                'text-align',
                'right',
                'important'
            );

            el.style.setProperty(
                'direction',
                'rtl',
                'important'
            );

            el.style.setProperty(
                'width',
                '100%',
                'important'
            );

        });

    }


    if (document.readyState === 'loading') {

        document.addEventListener(
            'DOMContentLoaded',
            fixProductDescriptionAlignment
        );

    } else {

        fixProductDescriptionAlignment();

    }


    setTimeout(
        fixProductDescriptionAlignment,
        300
    );

    setTimeout(
        fixProductDescriptionAlignment,
        900
    );

    setTimeout(
        fixProductDescriptionAlignment,
        1500
    );

})();
