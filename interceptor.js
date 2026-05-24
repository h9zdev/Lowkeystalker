(function() {
    const originalFetch = window.fetch;
    let autoFetchInterval = null;
    let savedUrl = null;
    let savedHeaders = null;

    // Helper to extract headers robustly
    function extractHeaders(request, options) {
        let headers = {};
        if (request instanceof Request && request.headers) {
            for (let [key, value] of request.headers.entries()) {
                headers[key] = value;
            }
        } else if (options && options.headers) {
            if (options.headers instanceof Headers) {
                for (let [key, value] of options.headers.entries()) {
                    headers[key] = value;
                }
            } else {
                headers = { ...options.headers };
            }
        }
        return headers;
    }

    window.fetch = async function(...args) {
        const url = args[0] instanceof Request ? args[0].url : args[0];
        const options = args[1] || {};

        // Capture headers and start the 1-minute loop
        if (url && url.includes('/v2/recs/core') && !autoFetchInterval) {
            savedUrl = url;
            savedHeaders = extractHeaders(args[0], options);
            
            console.log('[Tinder Extractor] Captured API headers. Starting auto-fetch every 1 minute.');
            
            autoFetchInterval = setInterval(async () => {
                console.log('[Tinder Extractor] Auto-fetching new profiles...');
                try {
                    const res = await originalFetch(savedUrl, {
                        method: 'GET',
                        headers: savedHeaders
                    });
                    const data = await res.json();
                    
                    const event = new CustomEvent('TinderDataIntercepted', {
                        detail: {
                            url: savedUrl,
                            data: data
                        }
                    });
                    document.dispatchEvent(event);
                } catch (e) {
                    console.error('[Tinder Extractor] Auto-fetch error:', e);
                }
            }, 60000); // 1 minute
        }

        const response = await originalFetch.apply(this, args);

        try {
            // Check if the URL is a Tinder core recommendations or user profile endpoint
            if (url && (url.includes('/v2/recs/core') || url.includes('/user/'))) {
                const clonedResponse = response.clone();
                clonedResponse.json().then(data => {
                    const event = new CustomEvent('TinderDataIntercepted', {
                        detail: {
                            url: url,
                            data: data
                        }
                    });
                    document.dispatchEvent(event);
                }).catch(err => {
                    // Ignore JSON parsing errors for non-JSON responses
                });
            }
        } catch (error) {
            console.error('[Tinder Profile Extractor] Error in fetch interceptor:', error);
        }

        return response;
    };
    
    console.log('[Tinder Profile Extractor] Interceptor injected successfully.');
})();
