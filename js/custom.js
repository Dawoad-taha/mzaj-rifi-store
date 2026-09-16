/* MZAJ RIFI - FIXED PUBLIC JAVASCRIPT BUILD v1.1.1 */
;(function () {
    if (window.__MZAJ_RIFI_FIXED_BUILD_LOADED__) return;
    window.__MZAJ_RIFI_FIXED_BUILD_LOADED__ = true;

    /* =========================================================
       BOOTSTRAP LOADER
       يظهر فوراً ولا يعتمد على ملف CSS الخارجي
       ========================================================= */
    (function showBootstrapLoader() {
        if (!document.getElementById('mz-bootstrap-loader-style')) {
            const style = document.createElement('style');
            style.id = 'mz-bootstrap-loader-style';
            style.textContent = `
                #mz-store-loader {
                    position: fixed !important;
                    inset: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: #f4dce8 !important;
                    z-index: 2147483647 !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    pointer-events: all !important;
                    transition: opacity .55s ease, visibility .55s ease !important;
                }
                #mz-store-loader.mz-loader-hide {
                    opacity: 0 !important;
                    visibility: hidden !important;
                    pointer-events: none !important;
                }
                #mz-store-loader .mz-loader-logo {
                    width: 115px !important;
                    max-width: 115px !important;
                    max-height: 115px !important;
                    height: auto !important;
                    object-fit: contain !important;
                    margin: 0 0 14px !important;
                    animation: mzBootstrapLogo 1.8s ease-in-out infinite !important;
                }
                #mz-store-loader .mz-loader-text {
                    text-align: center !important;
                    direction: rtl !important;
                }
                #mz-store-loader .mz-loader-brand {
                    color: #6f1f49 !important;
                    -webkit-text-fill-color: #6f1f49 !important;
                    font-size: 22px !important;
                    line-height: 1.4 !important;
                    font-weight: 700 !important;
                    margin: 0 !important;
                }
                #mz-store-loader .mz-loader-tagline {
                    color: #6f1f49 !important;
                    -webkit-text-fill-color: #6f1f49 !important;
                    font-size: 13px !important;
                    line-height: 1.6 !important;
                    font-weight: 500 !important;
                    opacity: .85 !important;
                    margin: 5px 0 0 !important;
                }
                #mz-store-loader .mz-loader-line {
                    position: relative !important;
                    width: 110px !important;
                    height: 3px !important;
                    margin-top: 24px !important;
                    overflow: hidden !important;
                    border-radius: 50px !important;
                    background: rgba(111,31,73,.13) !important;
                }
                #mz-store-loader .mz-loader-line::before {
                    content: "" !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: -55% !important;
                    width: 55% !important;
                    height: 100% !important;
                    border-radius: 50px !important;
                    background: linear-gradient(90deg,transparent,#6f1f49,#b85389,transparent) !important;
                    animation: mzBootstrapLine 1.25s ease-in-out infinite !important;
                }
                @keyframes mzBootstrapLogo {
                    0%,100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.07); opacity: .82; }
                }
                @keyframes mzBootstrapLine {
                    0% { left: -55%; }
                    100% { left: 110%; }
                }
                @media (max-width: 768px) {
                    #mz-store-loader .mz-loader-logo {
                        width: 95px !important;
                        max-width: 95px !important;
                        max-height: 95px !important;
                    }
                    #mz-store-loader .mz-loader-brand {
                        font-size: 20px !important;
                    }
                    #mz-store-loader .mz-loader-tagline {
                        font-size: 12px !important;
                    }
                    #mz-store-loader .mz-loader-line {
                        width: 95px !important;
                        margin-top: 20px !important;
                    }
                }
            `;
            (document.head || document.documentElement).appendChild(style);
        }

        function createBootstrapLoader() {
            if (!document.body || document.getElementById('mz-store-loader')) return;

            const loader = document.createElement('div');
            loader.id = 'mz-store-loader';

            const storeLogo =
                document.querySelector('.header-logo img.image-logo.d-block.d-lg-none') ||
                document.querySelector('.header-logo img.image-logo.d-none.d-lg-block') ||
                document.querySelector('.header-logo img') ||
                document.querySelector('img.image-logo');

            const logoHtml = storeLogo && (storeLogo.currentSrc || storeLogo.src)
                ? '<img class="mz-loader-logo" src="' + (storeLogo.currentSrc || storeLogo.src) + '" alt="مزاج ريفي">'
                : '';

            loader.innerHTML =
                logoHtml +
                '<div class="mz-loader-text">' +
                    '<div class="mz-loader-brand">مزاج ريفي</div>' +
                    '<div class="mz-loader-tagline">الطريق الأنيق لإرسال مشاعرك</div>' +
                '</div>' +
                '<div class="mz-loader-line"></div>';

            document.body.appendChild(loader);
        }

        if (document.body) {
            createBootstrapLoader();
        } else {
            document.addEventListener('DOMContentLoaded', createBootstrapLoader, { once: true });
        }
    })();

    const base = 'https://cdn.jsdelivr.net/gh/Dawoad-taha/mzaj-rifi-store@main/';
    const version = '1.1.1';

    const files = [
        'js/fixed-v1/part-1.js',
        'js/fixed-v1/part-2.js',
        'js/fixed-v1/part-3.js',
        'js/parts/part-3.js',
        'js/fixed-v1/patches.js',
        'js/parts/part-5.js',
        'js/parts/part-6.js',
        'js/parts/part-7.js'
    ];

    function loadScript(path) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement('script');
            script.src = base + path + '?v=' + version;
            script.async = false;
            script.onload = resolve;
            script.onerror = function () {
                console.error('[Mzaj Rifi] Failed to load:', path);
                reject(new Error('Failed to load ' + path));
            };
            document.head.appendChild(script);
        });
    }

    let chain = Promise.resolve();

    files.forEach(function (file) {
        chain = chain.then(function () {
            return loadScript(file);
        });
    });

    chain.catch(function (error) {
        console.error('[Mzaj Rifi] Fixed build load error:', error);
    });
})();
