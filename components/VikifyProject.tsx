import { useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, Download, Expand, HardDriveDownload } from 'lucide-react';
import './VikifyProject.css';

const downloadUrl = '/downloads/Vikify-2.0.apk';
const sourceUrl = 'https://github.com/TheCraftsman1/vikify/releases/download/v2.0-android-source/Vikify-2.0-source.zip';
const media = '/projects/vikify/showcase';

const logo = `${media}/waveform-white.webp`;
const hero = { title: 'Now Playing', image: `${media}/player.webp` };
const screens = [
  {
    title: 'Now Playing',
    image: `${media}/now-playing.webp`,
    caption: 'Artwork sets the color of the player. The track stays front and center.',
    color: 'plum',
  },
  {
    title: 'Your daily rotation',
    caption: 'Personalized mixes sit alongside the collections you make yourself.',
    image: `${media}/home.png`,
    color: 'green',
  },
  {
    title: 'DJ Studio',
    caption: 'Start with a mix of recent favorites or send the DJ a request.',
    image: `${media}/dj-studio.webp`,
    color: 'blue',
  },
  {
    title: 'Synced lyrics',
    caption: 'Follow the words as they light up in time with the track.',
    image: `${media}/lyrics.webp`,
    color: 'plum',
  },
  {
    title: 'Explore',
    caption: 'Browse by mood, moment, or genre when you want something different.',
    image: `${media}/explore.webp`,
    color: 'green',
  },
  {
    title: 'Your library',
    caption: 'Find downloads, local music, playlists, and listening highlights in one place.',
    image: `${media}/library.webp`,
    color: 'green',
  },
  {
    title: 'Artist pages',
    caption: 'Jump from an artist’s latest release to their top songs.',
    image: `${media}/artist.webp`,
    color: 'plum',
  },
  {
    title: 'First launch',
    caption: 'Give Vikify a name to call you and get straight to the app.',
    image: `${media}/welcome.webp`,
    color: 'blue',
  },
] as const;

function DownloadLink() {
  return <a className="vk-download" href={downloadUrl} download><Download size={18} aria-hidden="true" /> Download Android APK</a>;
}

export default function VikifyProject({ onBack }: { onBack: () => void }) {
  const [selectedScreen, setSelectedScreen] = useState(hero);
  const dialog = useRef<HTMLDialogElement>(null);
  const gallery = useRef<HTMLElement>(null);

  function openScreen(screen: { title: string; image: string }) {
    setSelectedScreen(screen);
    dialog.current?.showModal();
  }

  return (
    <div className="vk-project">
      <header className="vk-nav">
        <div className="vk-nav-inner vk-shell">
          <button type="button" onClick={onBack}><ArrowLeft size={17} aria-hidden="true" /> All projects</button>
          <span className="vk-nav-brand"><span className="vk-nav-mark"><img src={logo} alt="" width="32" height="32" /></span> VIKIFY</span>
          <a href={downloadUrl} download><Download size={16} aria-hidden="true" /> <span>Get Vikify</span></a>
        </div>
      </header>

      <section className="vk-hero vk-shell" aria-labelledby="vk-title">
        <div className="vk-hero-copy">
          <p className="vk-release"><span /> Android release · 2.0</p>
          <h1 id="vk-title">Vikify<span>.</span></h1>
          <p className="vk-hero-line">Turn it up.</p>
          <p className="vk-intro">A native Android music player with an artwork-led player, synced lyrics, and a library that travels with you offline.</p>
          <div className="vk-actions">
            <DownloadLink />
            <button className="vk-preview-link" type="button" onClick={() => gallery.current?.scrollIntoView()}><ArrowDown size={17} aria-hidden="true" /> See the app</button>
          </div>
          <div className="vk-meta"><span>Android 8.0+ · 54.8 MB</span><a className="vk-glass-link" href={sourceUrl}>Source code <ArrowUpRight size={13} aria-hidden="true" /></a></div>
        </div>
        <div className="vk-stage">
          <div className="vk-record" aria-hidden="true" />
          <div className="vk-stage-type" aria-hidden="true">ON<br />REPEAT</div>
          <button type="button" className="vk-hero-screen" aria-label="Enlarge Now Playing screenshot" onClick={() => openScreen(hero)}>
            <img src={hero.image} alt="São Paulo playing in Vikify on a tilted Android phone" fetchPriority="high" />
          </button>
          <div className="vk-stage-caption"><span>Vikify for Android</span><span>Now Playing</span></div>
        </div>
      </section>

      <section className="vk-gallery vk-shell" ref={gallery} aria-labelledby="vk-gallery-title">
        <div className="vk-gallery-head">
          <h2 id="vk-gallery-title">Inside Vikify.</h2>
          <p>Open any screen for a closer look.</p>
        </div>
        <div className="vk-grid">
          {screens.map((screen, index) => (
            <article className={`vk-screen vk-screen-${screen.color}`} key={screen.title}>
              <button type="button" aria-label={`Enlarge ${screen.title} screenshot`} onClick={() => openScreen(screen)}>
                <span className="vk-screen-expand"><Expand size={14} aria-hidden="true" /> <span>Inspect</span></span>
                <img src={screen.image} alt={`Vikify ${screen.title} interface`} loading="lazy" decoding="async" />
              </button>
              <div className="vk-screen-copy">
                <span className="vk-screen-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{screen.title}</h3>
                <p>{screen.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="vk-engine vk-shell" aria-labelledby="vk-engine-title">
        <h2 id="vk-engine-title">Built to keep playing.</h2>
        <dl>
          <div>
            <dt><span className="vk-spec-visual vk-spec-wave" aria-hidden="true">
              <svg viewBox="0 0 180 40" fill="none"><path d="M0 20h20l5-8 6 16 7-25 7 34 7-26 6 9h34l5-8 6 16 7-25 7 34 7-26 6 9h50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>Gapless playback</dt>
            <dd>AndroidX Media3 runs playback through a dedicated Android media service.</dd>
          </div>
          <div>
            <dt><span className="vk-spec-visual vk-spec-lyrics" aria-hidden="true"><span>Follow the words</span><span>Right on the beat</span><span>Into the next line</span></span>Synced lyrics</dt>
            <dd>Follow the track line by line from the Now Playing screen.</dd>
          </div>
          <div>
            <dt><span className="vk-spec-visual" aria-hidden="true"><span className="vk-storage"><HardDriveDownload size={18} /> Saved locally <span /></span></span>Offline listening</dt>
            <dd>Keep downloaded tracks and local files close when the connection drops.</dd>
          </div>
        </dl>
      </section>

      <footer className="vk-footer vk-shell">
        <div className="vk-monolith">
          <img src={logo} alt="" width="116" height="116" loading="lazy" />
          <h2>Take Vikify with you.</h2>
          <div className="vk-actions"><DownloadLink /><a className="vk-preview-link" href={sourceUrl}>Source code <ArrowUpRight size={16} aria-hidden="true" /></a></div>
          <p className="vk-meta">Android 8.0+ · 54.8 MB · Release 2.0</p>
        </div>
      </footer>

      <dialog className="vk-dialog" ref={dialog} aria-labelledby="vk-dialog-title" onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <div>
          <header><h2 id="vk-dialog-title">{selectedScreen.title}</h2><form method="dialog"><button type="submit" autoFocus>Close</button></form></header>
          <img src={selectedScreen.image} alt={`Full-size Vikify ${selectedScreen.title} screenshot`} />
        </div>
      </dialog>
    </div>
  );
}
