/* MZAJ RIFI - PUBLIC JAVASCRIPT BUNDLE LOADER v1.0.1 */
;(function () {
    if (window.__MZAJ_RIFI_BUNDLE_LOADED__) return;
    window.__MZAJ_RIFI_BUNDLE_LOADED__ = true;

    const base = 'https://cdn.jsdelivr.net/gh/Dawoad-taha/mzaj-rifi-store@main/';
    const version = '1.0.1';
    const files = [
        'docs/js/part-1.js',
        'js/parts/part-2a.js',
        'js/parts/part-2b.js',
        'js/parts/part-3.js',
        'js/parts/part-4.js',
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
        chain = chain.then(function () { return loadScript(file); });
    });

    chain.catch(function (error) {
        console.error('[Mzaj Rifi] Bundle load error:', error);
    });
})();
