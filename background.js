let downloadCounter = 0;

function downloadWithRetry(options, retriesLeft) {
    try {
        chrome.downloads.download(options, (downloadId) => {
            if (chrome.runtime.lastError) {
                console.error('[Tinder Extractor] Download failed for ' + options.filename + ':', chrome.runtime.lastError.message);
                if (retriesLeft > 0) {
                    console.log(`[Tinder Extractor] Retrying ${options.filename}... (${retriesLeft} retries left)`);
                    setTimeout(() => downloadWithRetry(options, retriesLeft - 1), 2000);
                }
            }
        });
    } catch (e) {
        console.error('[Tinder Extractor] Exception triggering download:', e);
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'downloadData') {
        const userData = message.data;
        const basePath = message.path || 'Tinder Data';
        const username = userData.name ? userData.name.replace(/[^a-zA-Z0-9]/g, '_') + '_' + userData._id : userData._id;
        
        // 1. Download JSON data
        setTimeout(() => {
            try {
                const jsonString = JSON.stringify(userData, null, 2);
                const jsonBlob = new Blob([jsonString], { type: 'application/json' });
                const jsonUrl = URL.createObjectURL(jsonBlob);
                
                downloadWithRetry({
                    url: jsonUrl,
                    filename: `${basePath}/${username}/${username}.json`,
                    saveAs: false,
                    conflictAction: 'overwrite'
                }, 2); // 2 retries
            } catch (e) {
                console.error('[Tinder Extractor] Error creating JSON blob:', e);
            }
        }, downloadCounter * 50); // Faster stagger
        downloadCounter++;

        // 2. Download Photos
        if (userData.photos && Array.isArray(userData.photos)) {
            userData.photos.forEach((photo, index) => {
                if (photo.url) {
                    let ext = 'jpg';
                    const match = photo.url.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/);
                    if (match) ext = match[1];

                    setTimeout(() => {
                        downloadWithRetry({
                            url: photo.url,
                            filename: `${basePath}/${username}/images/photo_${index + 1}.${ext}`,
                            saveAs: false,
                            conflictAction: 'overwrite'
                        }, 2); // 2 retries
                    }, downloadCounter * 50); // Faster stagger
                    downloadCounter++;
                }
            });
        }
        
        // Reset counter periodically
        setTimeout(() => { 
            downloadCounter = 0; 
        }, 1500);
    }
});
