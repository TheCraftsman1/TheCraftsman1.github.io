# 🎵 Vikify — Complete Project Knowledge Base & Asset Vault

> **"Play anything instantly, keep control, and make it yours."**  
> Vikify is a modern, premium, offline-first music streaming and local player built natively for Android using Jetpack Compose and AndroidX Media3 ExoPlayer.

---

## 🧭 Executive Summary

Vikify bridges the gap between commercial streaming aesthetics (like Spotify) and pure user ownership, lightning-fast performance, and offline reliability. Originally inspired by and forked from InnerTune/OuterTune, Vikify reimagines the listening experience with an obsession over speed, typography, dynamic theming, and an anti-algorithm, user-first philosophy.

---

## ⚡ Core Value Pillars

| Pillar | Principle | Implementation |
|---|---|---|
| **Speed as a Feature** | Instant playback start, zero UI blocking | Multi-tiered streaming cache (Cobalt API -> Piped/Invidious -> yt-dlp fallback) |
| **Offline-First Reliability** | Flaky connections never stop music | Full offline downloads, local Room DB caching, smart queue persistence |
| **Unified Hybrid Library** | One place for all audio | YouTube Music catalog + Spotify playlist import bridge + local audio files |
| **Living Synchronized Lyrics** | Karaoke focus & ambient typography | LrcLib + Kugou dual-source providers with fallback and line-by-line sync |
| **Quiet Computing UI** | Restraint, emotional resonance, breathing motion | Jetpack Compose + Material 3 dynamic color extraction + glassmorphism |
| **Social Jam Mode** | Shared real-time listening | Firebase Realtime DB & Firestore synchronization |

---

## 🎨 Design Philosophy: "Quiet Computing"

Vikify adheres to the **Quiet Computing** visual doctrine defined in its design canon:

1. **Contextual Density Modes**:
   - **Ambient Mode**: Maximum negative space, subtle controls, designed for late-night listening and deep work.
   - **Active Mode**: Discover, explore, manage playlists, and navigate search results.
   - **Minimal Mode**: Ultra-compact HUD for multitasking.
2. **Physical Object Feel**:
   - Dragging the expanded player provides tactile resistance curves.
   - Album art features subtle inertia and rotational dynamics.
   - Visual breathing: ambient glow pulses at resting human breath rate (12–14 cycles/min).
3. **Queue as a Horizontal River**:
   - Current song centered and elevated.
   - Previous songs drift left and fade to grayscale.
   - Upcoming songs queue to the right in full vibrant color.
4. **Time & Color Aware**:
   - Color memory extracts album artwork palettes and gently blends them over time.
   - Silence state: when paused or stopped, transitions to a resting deep warm gray.

---

## 🛠️ Architecture & Tech Stack

```
Vikify Project Structure
├── app/                       # Android client application (Jetpack Compose, Hilt, MVVM)
├── innertube/                 # YouTube Music API extraction & reverse-engineered client
├── lrclib/                    # LrcLib synchronized lyrics provider
├── kugou/                     # Kugou lyrics provider & fallback engine
├── taglib/                    # High-performance C++ NDK audio metadata reader/writer
├── ffMetadataEx/              # FFmpeg-based audio stream metadata extraction
├── material-color-utilities/  # Dynamic Material 3 color extraction algorithm
├── marketing_assets/          # High-resolution 3D renders, mockups, and brand assets
├── screenshots/               # Full-fidelity Android app UI screenshots
└── docs/                      # Original design philosophy, playback guides, architecture specs
```

### Key Technologies
- **Language**: Kotlin 2.x
- **UI Toolkit**: Jetpack Compose with Material 3 (Material You dynamic theming)
- **Dependency Injection**: Google Dagger Hilt
- **Media Engine**: AndroidX Media3 ExoPlayer with custom audio normalization & silence skipper
- **Local Persistence**: Room SQLite DB + DataStore Preferences
- **Stream Resolver**: Cobalt.tools multi-instance backend cascade with fallback racing
- **Audio Metadata**: C++ TagLib via JNI + FFmpeg
- **Cloud/Social**: Firebase Authentication, Cloud Firestore, Realtime Database (Jam Mode)

---

## 🖼️ Curated Asset Inventory

All high-resolution visual assets have been organized in this directory for use throughout the portfolio website:

### 1. Marketing Assets (`marketing_assets/`)

| File Name | Description | Best Portfolio Use Case |
|---|---|---|
| `Main_Brand_Logo.png` | Official Vikify typography & logo mark | Project header, navigation badge, favicon/hero icon |
| `vikify_showcase_render.png` | 3D perspective device mockup of Vikify | Hero section featured showcase, 3D card render |
| `Immersive_UI.png` | Showcase of the glassmorphic player & lyrics UI | UI/UX case study banner, gallery modal |
| `Hybrid_Library.png` | Visual depiction of YouTube + Local + Spotify hybrid library | Feature spotlight card |
| `Spotify_Import_Bridge.png` | Spotify-to-Vikify migration diagram / render | Integration feature card / technical highlight |
| `Spotify_Phone_Import.png` | Mobile interface demonstrating playlist migration | Mobile UI comparison card |
| `Spotify_Transformation.png` | Visual metamorphosis from Spotify into Vikify | Architecture & feature comparison visual |
| `Jam_Mode.png` | Real-time social listening showcase | Collaborative / multiplayer feature spotlight |
| `Offline_Freedom.png` | Offline listening & download manager visual | Offline-first architecture showcase |
| `background_fluid.png` | Fluid ambient gradient background | Card or backdrop texture |
| `background_waveform.png` | Audio waveform ambient visual | Media player banner / section background |
| `app_icon.png` | Official ultra-high-resolution Vikify app icon | Technology chip or app launcher thumbnail |

### 2. App Screenshots (`screenshots/`)

| File Name | Screen | Highlights |
|---|---|---|
| `hero.png` | Multi-device banner | Comprehensive overview banner |
| `home.png` / `Home1.png` | Home Feed | Dynamic greeting, quick picks, recent albums |
| `search.png` / `Search1.png` | Search Screen | Instant search, artist explorer, mood categories |
| `library.png` / `Library1.png` | Library Screen | Playlists, downloads, local folders, artists |
| `Settings1.png` | Settings | Customization, audio EQ, stream cache preferences |
| `UI.png` | Player Surface | Now playing card with lyrics and playback controls |
| `background.png` | Dark Canvas | Ambient background canvas |

---

## 📚 Documentation Reference

Original architectural documentation and design canons are preserved in [`docs/`](./docs/):
- [`VIKIFY_DESIGN_PHILOSOPHY.md`](./docs/VIKIFY_DESIGN_PHILOSOPHY.md): The foundational design canon for Vikify.
- [`VISION.md`](./docs/VISION.md): The product positioning, audience, and 2025/2026 roadmap.
- [`COBALT_ARCHITECTURE.md`](./docs/COBALT_ARCHITECTURE.md): Multi-instance Cobalt streaming backend specs.
- [`NATIVE_PLAYBACK_GUIDE.md`](./docs/NATIVE_PLAYBACK_GUIDE.md): Unidirectional ExoPlayer Media3 playback implementation guide.
- [`OUTERTUNE_ARCHITECTURE.json`](./docs/OUTERTUNE_ARCHITECTURE.json): Upstream architecture map and module breakdown.
- [`UPSTREAM_README.md`](./docs/UPSTREAM_README.md): Original repository README with build instructions.
