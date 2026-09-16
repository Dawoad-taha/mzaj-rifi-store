/* =========================================================
   MZAJ RIFI - CATEGORY SLIDER FINAL
   4 DESKTOP / 3 TABLET / 2 MOBILE
   HOME PAGE ONLY
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
            link: ''
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

        const title = document.createElement('h2');
        title.className = 'mzfinal-title';
        title.textContent = 'اختر ما يناسبك';

        const viewport = document.createElement('div');
        viewport.className = 'mzfinal-viewport';

        const track = document.createElement('div');
        track.className = 'mzfinal-track';

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
        let currentVisibleCount = 2;

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

            currentVisibleCount = getVisibleCount();
            const totalGap = GAP * (currentVisibleCount - 1);
            const cardWidth = (usableWidth - totalGap) / currentVisibleCount;

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

            track.style.transform = 'translate3d(' + translateFor(index) + 'px,0,0)';
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

        function dragStart(e) {
            dragging = true;
            moved = false;
            stopAuto();
            startX = e.clientX;
            currentX = e.clientX;
            startTranslate = translateFor(index);
            track.style.transition = 'none';
            viewport.classList.add('is-dragging');
            try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
        }

        function dragMove(e) {
            if (!dragging) return;
            currentX = e.clientX;
            const diff = currentX - startX;
            if (Math.abs(diff) > 5) moved = true;
            track.style.transform = 'translate3d(' + (startTranslate + diff) + 'px,0,0)';
        }

        function dragEnd() {
            if (!dragging) return;
            dragging = false;
            viewport.classList.remove('is-dragging');
            const diff = currentX - startX;
            const threshold = Math.min(70, getStep() * 0.22);

            if (diff < -threshold) nextSlide();
            else if (diff > threshold) previousSlide();
            else goToCurrent(true);

            setTimeout(startAuto, 650);
        }

        viewport.addEventListener('pointerdown', dragStart);
        viewport.addEventListener('pointermove', dragMove);
        viewport.addEventListener('pointerup', dragEnd);
        viewport.addEventListener('pointercancel', dragEnd);
        viewport.addEventListener('pointerleave', function () {
            if (dragging) dragEnd();
        });

        track.addEventListener(
            'click',
            function (event) {
                if (moved) {
                    event.preventDefault();
                    event.stopPropagation();
                    moved = false;
                    return;
                }

                /* ضمان عمل روابط "اختر ما يناسبك" حتى لو اعترض القالب النقر */
                const categoryLink = event.target.closest('a.mzfinal-card[href]');
                if (categoryLink) {
                    event.preventDefault();
                    event.stopPropagation();
                    window.location.assign(categoryLink.href);
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
