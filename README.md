# lowkeystalker

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0-green.svg)
[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-orange.svg)](https://addons.mozilla.org/en-GB/firefox/addon/lowkeystalker/)

**lowkeystalker** is a browser extension that intercepts and displays Tinder profile details directly on the page while you browse. It automatically downloads profile data (JSON) and photos to your local machine.

## Features

- **Automatic Data Capture**: Intercepts profile data from Tinder's API.
- **Overlay UI**: View profile details (Bio, Location, Job, etc.) in a convenient overlay.
- **Auto-Download**: Automatically saves profile JSON and images to your "Downloads" folder.
- **Customizable Path**: Choose the subfolder name for your downloads.
- **Auto-Fetch**: Automatically refreshes recommendations every minute.

## Installation

### Mozilla Firefox (Recommended)

1.  **From Store**: Visit the [Firefox Add-on Store](https://addons.mozilla.org/en-GB/firefox/addon/lowkeystalker/) and click "Add to Firefox".
2.  **Manual Installation**:
    -   Download the source code.
    -   Open Firefox and type `about:debugging#/runtime/this-firefox` in the address bar.
    -   Click "Load Temporary Add-on...".
    -   Select the `manifest.json` file from the project folder.

### Google Chrome

1.  Download the source code and extract it.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** (toggle in the top right corner).
4.  Click **Load unpacked**.
5.  Select the folder containing the extension files.

## How to Use

1.  **Login to Tinder**: Open [tinder.com](https://tinder.com) in your browser and log in.
2.  **Locate the Overlay**: A dark overlay titled "lowkeystalker" will appear at the bottom right of the screen.
3.  **Browse Profiles**: As you swipe or view profiles, the extension will capture the data.
4.  **Check Your Downloads**:
    -   By default, data is saved in your Downloads folder under `Tinder Data/`.
    -   Each profile gets its own folder containing a `.json` file with full details and an `images/` subfolder with all profile photos.
5.  **Custom Path**: You can change the "Download Folder Name" in the overlay input field.

## Disclaimer

This tool is for educational purposes only. Please respect Tinder's Terms of Service and user privacy.

## License

This project is licensed under the [MIT License](LICENSE).
