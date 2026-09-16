/* MZAJ RIFI - FIXED PUBLIC JAVASCRIPT BUILD v1.1.0 */
;(function () {
    if (window.__MZAJ_RIFI_FIXED_BUILD_LOADED__) return;
    window.__MZAJ_RIFI_FIXED_BUILD_LOADED__ = true;

    const base = 'https://cdn.jsdelivr.net/gh/Dawoad-taha/mzaj-rifi-store@main/';
    const version = '1.1.0';

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
