// Inject the interceptor into the main page context
const script = document.createElement('script');
script.src = chrome.runtime.getURL('interceptor.js');
script.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(script);

// Create the UI overlay
const overlay = document.createElement('div');
overlay.id = 'tinder-data-overlay';
overlay.innerHTML = `
    <div id="tinder-data-header" style="display: flex; align-items: center; gap: 8px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>
        </svg>
        lowkeystalker
    </div>
    <div style="padding: 10px; border-bottom: 1px solid #334155; background: #1e293b;">
        <label style="font-size: 12px; color: #94a3b8; display: block; margin-bottom: 4px;">Download Folder Name:</label>
        <input type="text" id="tinder-path-input" value="Tinder Data" style="width: 100%; padding: 6px; background: #0f172a; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px; box-sizing: border-box; font-size: 13px;">
    </div>
    <div id="tinder-data-content">Waiting for profiles...</div>
`;
document.documentElement.appendChild(overlay);

// Track processed users so we don't spam the background script for the same profiles
const processedUsers = new Set();

// Listen for intercepted data
document.addEventListener('TinderDataIntercepted', function(e) {
    const data = e.detail.data;
    const url = e.detail.url;
    
    // Parse recs/core (the main feed)
    if (url.includes('/v2/recs/core') && data && data.data && data.data.results) {
        const results = data.data.results;
        
        let htmlContent = '';
        
        results.forEach(result => {
            const user = result.user;
            if (user) {
                if (processedUsers.has(user._id)) return; // Skip already downloaded profiles
                processedUsers.add(user._id);

                const name = user.name || 'Unknown';
                const bio = user.bio || 'No bio';
                const distance = result.distance_mi ? `${result.distance_mi} mi away` : 'Distance unknown';
                const jobs = user.jobs && user.jobs.length > 0 ? user.jobs.map(j => j.title ? j.title.name : (j.company ? j.company.name : '')).filter(Boolean).join(', ') : '';
                const city = user.city && user.city.name ? user.city.name : '';
                
                // Extract descriptors (Basics, Lifestyle, Looking for, etc.)
                const descriptors = user.selected_descriptors ? user.selected_descriptors.map(d => `${d.name}: ${d.choice_selections.map(c => c.name).join(', ')}`).join('<br>') : '';
                
                // Extract photos
                const photos = user.photos ? user.photos.map(p => p.url) : [];
                const photoThumb = photos.length > 0 ? `<img src="${photos[0]}" style="width: 50px; height: 50px; border-radius: 25px; object-fit: cover; margin-right: 10px;">` : '';

                htmlContent += `
                    <div class="tinder-profile-card">
                        <div class="tinder-name">${photoThumb}${name}</div>
                        <div class="tinder-detail"><strong>Location:</strong> ${city} (${distance})</div>
                        ${jobs ? `<div class="tinder-detail"><strong>Work:</strong> ${jobs}</div>` : ''}
                        <div class="tinder-bio">${bio}</div>
                        ${descriptors ? `<div class="tinder-detail" style="margin-top: 8px;"><strong>Details:</strong><br>${descriptors}</div>` : ''}
                        <div class="tinder-detail" style="margin-top: 8px;"><strong>Photos:</strong> ${photos.length}</div>
                    </div>
                `;

                // Get custom path from the input field
                let downloadPath = 'Tinder Data';
                const pathInput = document.getElementById('tinder-path-input');
                if (pathInput && pathInput.value.trim() !== '') {
                    // Strip dangerous characters like dots or starting slashes
                    downloadPath = pathInput.value.trim().replace(/\.\./g, '').replace(/^[\/\\]+/, '');
                }

                // Send data to background script for downloading
                try {
                    chrome.runtime.sendMessage({
                        action: 'downloadData',
                        data: user,
                        path: downloadPath
                    });
                } catch (e) {
                    console.error('[Tinder Profile Extractor] Error sending download message:', e);
                }
            }
        });
        
        const contentDiv = document.getElementById('tinder-data-content');
        if (contentDiv) {
            // Revert back to replacing the content so it stays clean (as previous)
            contentDiv.innerHTML = htmlContent;
        }
    }
});
