<div align="center">

<br/>

```
██╗      ██████╗ ██╗    ██╗██╗  ██╗███████╗██╗   ██╗
██║     ██╔═══██╗██║    ██║██║ ██╔╝██╔════╝╚██╗ ██╔╝
██║     ██║   ██║██║ █╗ ██║█████╔╝ █████╗   ╚████╔╝ 
██║     ██║   ██║██║███╗██║██╔═██╗ ██╔══╝    ╚██╔╝  
███████╗╚██████╔╝╚███╔███╔╝██║  ██╗███████╗   ██║   
╚══════╝ ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝   ╚═╝  
              ██████╗ ████████╗ █████╗ ██╗     ██╗  ██╗███████╗██████╗ 
              ██╔════╝╚══██╔══╝██╔══██╗██║     ██║ ██╔╝██╔════╝██╔══██╗
              ╚█████╗    ██║   ███████║██║     █████╔╝ █████╗  ██████╔╝
               ╚═══██╗   ██║   ██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
              ██████╔╝   ██║   ██║  ██║███████╗██║  ██╗███████╗██║  ██║
              ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
```

<br/>

*intercept · capture · archive*

<br/>

[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-FF6611?style=for-the-badge&logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/en-GB/firefox/addon/lowkeystalker/)
![Version](https://img.shields.io/badge/version-1.0-crimson?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-444?style=for-the-badge)

</div>

---

<br/>

> **lowkeystalker** is a browser extension that silently intercepts Tinder's internal API traffic, surfaces full profile data in a sleek overlay, and auto-archives everything — JSON and photos — straight to your local machine.

<br/>

---

## ◈ &nbsp;Features

<br/>

| | Capability | Details |
|---|---|---|
| 🕸️ | **API Interception** | Hooks directly into Tinder's recommendation endpoint — zero scraping, zero clicking |
| 🪟 | **Live Overlay** | Non-intrusive panel renders Bio, Location, Job, Age, and more — right on the page |
| 💾 | **Auto-Download** | Profile JSON + full-res images saved automatically to your `Downloads` folder |
| 📁 | **Custom Paths** | Set your own subfolder name from the overlay — no config files needed |
| 🔁 | **Auto-Fetch** | Re-polls recommendations every 60 seconds so you never miss a profile |

<br/>

---

## ◈ &nbsp;Installation

<br/>

### &nbsp;&nbsp;🦊 &nbsp;Firefox &nbsp;*(Recommended)*

**From the Add-on Store**

```
https://addons.mozilla.org/en-GB/firefox/addon/lowkeystalker/
```

Click **Add to Firefox** — done.

<br/>

**Manual / Developer Install**

```
1.  Download or clone this repository
2.  Navigate to:  about:debugging#/runtime/this-firefox
3.  Click         "Load Temporary Add-on..."
4.  Select        manifest.json  from the project root
```

<br/>

### &nbsp;&nbsp;🟡 &nbsp;Chrome

```
1.  Download and extract the source
2.  Navigate to:  chrome://extensions/
3.  Enable        Developer Mode  (top-right toggle)
4.  Click         "Load Unpacked"
5.  Select        the extracted project folder
```

<br/>

---

## ◈ &nbsp;How It Works

<br/>

```
  tinder.com                      lowkeystalker
  ──────────                      ─────────────
  [ API call ] ──── intercept ──▶ [ parse payload ]
                                         │
                              ┌──────────┴──────────┐
                              ▼                     ▼
                       [ overlay UI ]        [ auto-download ]
                         name · bio           profile.json
                         job · location       images/ ──▶ *.jpg
                         age · school
```

<br/>

---

## ◈ &nbsp;Usage

<br/>

**1 — Log in to Tinder**
> Open [tinder.com](https://tinder.com) and sign in as usual.

**2 — Find the Overlay**
> A dark panel labelled **lowkeystalker** appears at the bottom-right corner of your screen.

**3 — Browse Normally**
> Swipe or scroll profiles. The extension captures data passively — no interaction required.

**4 — Check Your Downloads**
> Files land in:
> ```
> ~/Downloads/
> └── Tinder Data/
>     └── <profile_id>/
>         ├── profile.json
>         └── images/
>             ├── 01.jpg
>             ├── 02.jpg
>             └── ...
> ```

**5 — Customize the Folder**
> Type a new folder name in the overlay's input field — takes effect immediately.

<br/>

---

## ◈ &nbsp;Project Structure

<br/>

```
lowkeystalker/
├── manifest.json          # Extension manifest (MV2)
├── background.js          # API interception & download logic
├── content.js             # Overlay injection & UI rendering
├── popup.html / popup.js  # Extension popup (if applicable)
└── icons/
    └── ...
```

<br/>

---

## ◈ &nbsp;Disclaimer

<br/>

> [!WARNING]
> This project is provided **for educational purposes only**.
> Usage may violate [Tinder's Terms of Service](https://policies.tinder.com/terms/intl/en/).
> You are solely responsible for how you use this tool.
> **Always respect user privacy.**

<br/>

---

## ◈ &nbsp;License

<br/>

Released under the **[MIT License](LICENSE)** — use it, fork it, study it.

<br/>

---

<div align="center">

<br/>

*built quiet. runs quiet.*

</div>
