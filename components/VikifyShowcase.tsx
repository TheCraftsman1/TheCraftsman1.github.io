import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Download,
  Play,
  Pause,
  AudioLines,
  HardDriveDownload,
  Palette,
  ListMusic,
  Sparkles,
  MousePointer2,
  MessageCircle,
  Send,
  Expand,
  LibraryBig,
  FileAudio,
  Disc3,
  Radio,
  Mic2,
  Compass,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ProjectItem } from '../types';
import VikifySignalFlow from './VikifySignalFlow';
import './VikifyShowcase.css';

export interface VikifyShowcaseProps {
  project: ProjectItem;
  onBack: () => void;
  onNavigateProject: (id: string) => void;
  prevProject?: ProjectItem;
  nextProject?: ProjectItem;
}

export interface ScreenAsset {
  id: string;
  title: string;
  chapterLabel: string;
  subtitle: string;
  image: string;
  badge: string;
  description: string;
  keyFeatures: string[];
  specs: string;
}

export const VIKIFY_SCREENS: ScreenAsset[] = [
  {
    id: 'now-playing',
    title: 'Now Playing',
    chapterLabel: 'Now Playing',
    subtitle: 'Am I Dreaming',
    image: '/projects/vikify/screens/now-playing-am-i-dreaming.png',
    badge: 'Core Player',
    description:
      'Album artwork, transport controls, and a shortcut to DJ Studio.',
    keyFeatures: ['Artwork palette', 'Media3 playback', 'DJ Studio shortcut'],
    specs: '478 × 1024',
  },
  {
    id: 'lyrics',
    title: 'Synced lyrics',
    chapterLabel: 'Synced lyrics',
    subtitle: 'Words in motion',
    image: '/projects/vikify/screens/lyrics-am-i-dreaming.png',
    badge: 'Lyrics',
    description: 'Highlighted lines and a focused reading view.',
    keyFeatures: ['Line highlights', 'Lyric navigation', 'Artwork ambiance'],
    specs: '478 × 1024',
  },
  {
    id: 'dj-ai',
    title: 'DJ Studio',
    chapterLabel: 'DJ Studio',
    subtitle: 'Your next set',
    image: '/projects/vikify/screens/dj-ai-studio.png',
    badge: 'DJ Studio',
    description: 'A music companion with voice and text requests.',
    keyFeatures: ['Voice and text', 'Mix requests', 'Queue planning'],
    specs: '478 × 1024',
  },
  {
    id: 'artist-rotation',
    title: 'Artist hub',
    chapterLabel: 'Artist hub',
    subtitle: 'The Weeknd',
    image: '/projects/vikify/screens/artist-weeknd-rotation.png',
    badge: 'Artists',
    description: 'Albums, top tracks, and a persistent mini-player.',
    keyFeatures: ['Discography', 'Top tracks', 'Mini-player'],
    specs: '478 × 1024',
  },
  {
    id: 'explore',
    title: 'Explore',
    chapterLabel: 'Explore',
    subtitle: 'Moods and moments',
    image: '/projects/vikify/screens/explore-moods.png',
    badge: 'Discovery',
    description: 'Browse visual stations by mood or moment.',
    keyFeatures: ['Mood stations', 'Genre discovery', 'Quick access'],
    specs: '478 × 1024',
  },
  {
    id: 'library',
    title: 'Your library',
    chapterLabel: 'Your library',
    subtitle: 'Cloud and local',
    image: '/projects/vikify/screens/library-dashboard.png',
    badge: 'Library',
    description:
      'Downloads, local music, Spotify playlists, and listening highlights.',
    keyFeatures: ['Downloads', 'Local music', 'Spotify playlists'],
    specs: '478 × 1024',
  },
  {
    id: 'first-launch',
    title: 'First launch',
    chapterLabel: 'First launch',
    subtitle: 'A simple beginning',
    image: '/projects/vikify/screens/first-launch-welcome.png',
    badge: 'Welcome',
    description: 'Choose a name and start listening.',
    keyFeatures: [
      'Personal greeting',
      'Optional connections',
      'Start listening',
    ],
    specs: '478 × 1024',
  },
];

const APK_URL = '/downloads/Vikify-2.0.2.apk';
const SOURCE_URL =
  'https://github.com/TheCraftsman1/vikify/releases/download/v2.0.2-android-source/Vikify-2.0.2-source.zip';
const LOGO_URL = '/projects/vikify/showcase/waveform-white.webp';
const scenes = ['palette', 'lyrics', 'dj'] as const;
type Scene = (typeof scenes)[number];
const sceneScreen = { palette: 0, lyrics: 1, dj: 2 };
const sceneLabels = {
  palette: 'Artwork palette',
  lyrics: 'Synced lyrics',
  dj: 'DJ Studio',
};
const paletteColors = [
  { name: 'Magenta', value: '#f500b7' },
  { name: 'Cyan', value: '#1fdac5' },
  { name: 'Burgundy', value: '#87315f' },
];
const lyricLines = [
  { text: "I don't feel I've lost", time: '0:28' },
  { text: 'Am I dreaming?', time: '0:34' },
  { text: 'Is there more like us?', time: '0:40' },
];
const prompts = [
  {
    label: 'Late-night synthwave',
    bpm: '118–124',
    queue: ['Hip-hop', 'Synthwave', 'Night drive'],
  },
  {
    label: 'Turn up the energy',
    bpm: '135–145',
    queue: ['Warm-up', 'Build', 'Peak'],
  },
  {
    label: 'Deep focus & chill',
    bpm: '78–86',
    queue: ['Downtempo', 'Lofi', 'Ambient'],
  },
];
const chapters = [
  { id: 'hero', label: 'Hero' },
  { id: 'palette', label: 'M3 engine' },
  { id: 'lyrics', label: 'Lyrics' },
  { id: 'dj-ai', label: 'AI DJ' },
  { id: 'engineering', label: 'Architecture' },
];
const moods = [
  { name: 'Coffee breaks', x: '-18%', y: '-177%' },
  { name: 'Night drives', x: '-125%', y: '-177%' },
  { name: 'Diwali', x: '-18%', y: '-291%' },
  { name: 'Energy up', x: '-125%', y: '-291%' },
  { name: 'Lofi focus', x: '-125%', y: '-405%' },
];

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="vs-icon-tile">
      <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
    </span>
  );
}

function Equalizer() {
  return (
    <span className="vs-equalizer" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function ApkDownload({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={APK_URL}
      download
      className={`vs-download${compact ? ' vs-download-compact' : ''}`}
    >
      <Download size={compact ? 16 : 19} strokeWidth={1.6} aria-hidden="true" />
      <span>{compact ? 'Get APK' : 'Download now'}</span>
      {!compact && <span className="vs-apk-label">APK</span>}
    </a>
  );
}

export const VikifyShowcase: React.FC<VikifyShowcaseProps> = ({
  onBack,
  onNavigateProject,
  nextProject,
}) => {
  const [scene, setScene] = useState<Scene>('palette');
  const [activeChapter, setActiveChapter] = useState('hero');
  const [palette, setPalette] = useState(0);
  const [activeLyric, setActiveLyric] = useState(1);
  const [prompt, setPrompt] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [inspectedIndex, setInspectedIndex] = useState<number | null>(null);
  const inspector = useRef<HTMLDialogElement>(null);
  const story = useRef<HTMLDivElement>(null);
  const motionOff = paused || reduceMotion;
  const screen = VIKIFY_SCREENS[sceneScreen[scene]];
  const selectedPrompt = prompts[prompt];

  useEffect(() => {
    [1, 2].forEach((index) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = VIKIFY_SCREENS[index].image;
    });
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const target =
        window.innerHeight * (window.innerWidth < 900 ? 0.72 : 0.48);
      const sections = chapters.map((chapter) => ({
        ...chapter,
        bounds: document.getElementById(chapter.id)?.getBoundingClientRect(),
      }));
      const current = sections
        .filter((section) => section.bounds && section.bounds.top <= target)
        .at(-1);
      if (current) setActiveChapter(current.id);
      const bounds = story.current?.getBoundingClientRect();
      if (bounds && bounds.top < target && bounds.bottom > target) {
        const nearest = scenes
          .map((value) => {
            const element = document.getElementById(
              value === 'dj' ? 'dj-ai' : value,
            );
            const distance = element
              ? Math.abs(
                  element.getBoundingClientRect().top +
                    element.clientHeight * 0.3 -
                    target,
                )
              : Infinity;
            return { value, distance };
          })
          .sort((a, b) => a.distance - b.distance)[0];
        setScene(nearest.value);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (motionOff || scene !== 'lyrics') return;
    const interval = window.setInterval(
      () => setActiveLyric((value) => (value + 1) % lyricLines.length),
      2500,
    );
    return () => window.clearInterval(interval);
  }, [motionOff, scene]);

  useEffect(() => {
    if (inspectedIndex === null) {
      inspector.current?.close();
      return;
    }
    inspector.current?.showModal();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        setInspectedIndex((value) =>
          value === null
            ? null
            : (value + direction + VIKIFY_SCREENS.length) %
              VIKIFY_SCREENS.length,
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [inspectedIndex]);

  function jump(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: motionOff ? 'instant' : 'smooth',
        block: 'start',
      });
  }

  function inspect(index: number) {
    setInspectedIndex(index);
  }

  const colors = {
    '--scene-primary':
      scene === 'palette'
        ? paletteColors[palette].value
        : scene === 'lyrics'
          ? '#a855f7'
          : '#4974f6',
    '--scene-secondary':
      scene === 'palette'
        ? '#1fdac5'
        : scene === 'lyrics'
          ? '#c65291'
          : '#6655db',
  } as React.CSSProperties;
  const inspected =
    inspectedIndex === null ? null : VIKIFY_SCREENS[inspectedIndex];

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`vikify-showcase${motionOff ? ' vs-motion-paused' : ''}`}
        data-scene={scene}
        style={colors}
      >
        <div className="vs-page-glow" aria-hidden="true" />
        <header className="vs-nav">
          <div className="vs-nav-inner vs-shell">
            <button className="vs-back" type="button" onClick={onBack}>
              <ArrowLeft size={17} strokeWidth={1.6} />
              <span>All projects</span>
            </button>
            <span className="vs-brand">
              <img src={LOGO_URL} alt="" width="32" height="32" />
              VIKIFY
            </span>
            <nav className="vs-nav-links" aria-label="Vikify sections">
              <button type="button" onClick={() => jump('experience')}>
                The experience
              </button>
              <button type="button" onClick={() => jump('mosaic')}>
                Discover
              </button>
              <button type="button" onClick={() => jump('engineering')}>
                Under the hood
              </button>
            </nav>
            <div className="vs-nav-actions">
              <button
                className="vs-motion-button"
                type="button"
                aria-label={paused ? 'Resume motion' : 'Pause motion'}
                aria-pressed={paused}
                disabled={reduceMotion}
                onClick={() => setPaused(!paused)}
              >
                {motionOff ? (
                  <Play size={16} strokeWidth={1.6} />
                ) : (
                  <Pause size={16} strokeWidth={1.6} />
                )}
              </button>
              <ApkDownload compact />
            </div>
          </div>
        </header>

        <nav className="vs-chapters" aria-label="Chapter scrubber">
          {chapters.map((chapter, index) => (
            <button
              type="button"
              key={chapter.id}
              aria-current={activeChapter === chapter.id ? 'step' : undefined}
              onClick={() => jump(chapter.id)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {chapter.label}
            </button>
          ))}
        </nav>

        <main>
          <section
            className="vs-hero vs-shell"
            id="hero"
            aria-labelledby="vs-title"
          >
            <div className="vs-hero-copy">
              <p className="vs-release">
                <span /> Vikify · Android · 2.0.2
              </p>
              <h1 id="vs-title">
                Sound becomes
                <br />
                <span>space.</span>
              </h1>
              <p className="vs-lead">
                Your artwork. Your lyrics.
                <br />
                Your next favorite track.
              </p>
              <div className="vs-hero-actions">
                <ApkDownload />
                <button
                  className="vs-text-link"
                  type="button"
                  onClick={() => jump('experience')}
                >
                  Explore the player <ArrowDown size={16} strokeWidth={1.6} />
                </button>
              </div>
              <div className="vs-build">
                Android 8.0+ · 54.9 MB{' '}
                <a href={SOURCE_URL}>
                  Source code <ArrowUpRight size={13} />
                </a>
              </div>
              <div className="vs-hero-details" aria-label="App features">
                <span>
                  <AudioLines size={16} strokeWidth={1.6} /> Artwork-led color
                </span>
                <span>
                  <HardDriveDownload size={16} strokeWidth={1.6} /> Offline
                  listening
                </span>
              </div>
            </div>
            <div className="vs-hero-art">
              <div className="vs-hero-orbit" aria-hidden="true" />
              <button
                type="button"
                className="vs-hero-phone"
                aria-label="Inspect Now Playing"
                onClick={() => inspect(0)}
              >
                <img
                  src={VIKIFY_SCREENS[0].image}
                  alt="Am I Dreaming playing in Vikify"
                  fetchPriority="high"
                />
              </button>
              <div className="vs-floating-player" aria-hidden="true">
                <img src={VIKIFY_SCREENS[0].image} alt="" />
                <span>
                  <strong>Am I Dreaming</strong>
                  <small>Metro Boomin</small>
                </span>
                <Equalizer />
              </div>
              <span className="vs-hero-caption">
                <Equalizer /> Now Playing
              </span>
            </div>
          </section>

          <section
            className="vs-experience vs-shell"
            id="experience"
            aria-labelledby="vs-experience-title"
          >
            <div className="vs-section-intro">
              <h2 id="vs-experience-title">
                One player.
                <br />
                Different worlds.
              </h2>
              <p>
                Scroll through the experience.
                <br />
                The player follows your lead.
              </p>
            </div>
            <div className="vs-story-grid" ref={story}>
              <div className="vs-story-chapters">
                <section
                  className="vs-story-step"
                  id="palette"
                  data-active={scene === 'palette'}
                >
                  <IconTile icon={Palette} />
                  <h3>
                    The room changes
                    <br />
                    with the song.
                  </h3>
                  <p>
                    Album colors spill into the player. Choose a shade from the
                    artwork.
                  </p>
                  <div
                    className="vs-palette-controls"
                    role="group"
                    aria-label="Artwork colors"
                  >
                    {paletteColors.map((color, index) => (
                      <button
                        key={color.name}
                        type="button"
                        aria-pressed={palette === index}
                        onClick={() => {
                          setPalette(index);
                          setScene('palette');
                        }}
                      >
                        <span
                          className="vs-swatch"
                          style={
                            { '--swatch': color.value } as React.CSSProperties
                          }
                        />
                        {color.name}
                      </button>
                    ))}
                  </div>
                  <div className="vs-palette-samples" aria-hidden="true">
                    {paletteColors.map((color) => (
                      <i key={color.name} style={{ background: color.value }} />
                    ))}
                  </div>
                  <span className="vs-demo-label">
                    <MousePointer2 size={14} strokeWidth={1.6} /> Interactive
                    palette preview
                  </span>
                </section>
                <section
                  className="vs-story-step"
                  id="lyrics"
                  data-active={scene === 'lyrics'}
                >
                  <IconTile icon={ListMusic} />
                  <h3>
                    The words find
                    <br />
                    their moment.
                  </h3>
                  <div className="vs-lyric-controls">
                    <span>Am I Dreaming</span>
                    <button
                      className="vs-motion-button"
                      type="button"
                      aria-label={
                        paused ? 'Resume lyric preview' : 'Pause lyric preview'
                      }
                      aria-pressed={paused}
                      disabled={reduceMotion}
                      onClick={() => setPaused(!paused)}
                    >
                      {motionOff ? <Play size={16} /> : <Pause size={16} />}
                    </button>
                  </div>
                  <div
                    className="vs-lyric-lines"
                    role="group"
                    aria-label="Lyric preview"
                  >
                    {lyricLines.map((line, index) => (
                      <button
                        type="button"
                        key={line.time}
                        aria-pressed={activeLyric === index}
                        onClick={() => {
                          setActiveLyric(index);
                          setScene('lyrics');
                          setPaused(true);
                        }}
                      >
                        <span>{line.text}</span>
                        <time>{line.time}</time>
                      </button>
                    ))}
                  </div>
                  <span className="vs-demo-label">
                    Tap a line. Watch it land in the player.
                  </span>
                </section>
                <section
                  className="vs-story-step"
                  id="dj-ai"
                  data-active={scene === 'dj'}
                >
                  <IconTile icon={Sparkles} />
                  <h3>
                    Give the next set
                    <br />a direction.
                  </h3>
                  <div
                    className="vs-prompt-options"
                    role="group"
                    aria-label="Example DJ requests"
                  >
                    {prompts.map((item, index) => (
                      <button
                        key={item.label}
                        type="button"
                        aria-pressed={prompt === index}
                        onClick={() => {
                          setPrompt(index);
                          setScene('dj');
                        }}
                      >
                        <MessageCircle size={16} strokeWidth={1.6} />
                        {item.label}
                        <ArrowUpRight size={14} />
                      </button>
                    ))}
                  </div>
                  <div className="vs-dj-result">
                    <div>
                      <span>Example mix</span>
                      <strong>
                        {selectedPrompt.bpm} <small>BPM</small>
                      </strong>
                    </div>
                    <div className="vs-queue-arc">
                      {selectedPrompt.queue.map((name, index) => (
                        <React.Fragment key={name}>
                          {index > 0 && <ArrowRight size={13} />}
                          <span>
                            <i />
                            {name}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <span className="vs-demo-label">
                    Interaction preview · Request your set in the Android app.
                  </span>
                </section>
              </div>
              <div className="vs-persistent-stage">
                <div className="vs-device-glow" aria-hidden="true" />
                <button
                  className="vs-device-trigger"
                  type="button"
                  aria-label={`Inspect ${sceneLabels[scene]}`}
                  onClick={() => inspect(sceneScreen[scene])}
                >
                  <AnimatePresence initial={false}>
                    <motion.img
                      className="vs-phone-image"
                      key={screen.image}
                      src={screen.image}
                      alt={screen.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: motionOff ? 0 : 0.45 }}
                    />
                  </AnimatePresence>
                  {scene === 'lyrics' && (
                    <span
                      className="vs-phone-overlay vs-phone-lyric"
                      key={activeLyric}
                    >
                      <small>{lyricLines[activeLyric].time}</small>
                      <strong>{lyricLines[activeLyric].text}</strong>
                      <span className="vs-preview-progress" />
                    </span>
                  )}
                  {scene === 'dj' && (
                    <span
                      className="vs-phone-overlay vs-phone-request"
                      key={prompt}
                    >
                      <MessageCircle size={16} strokeWidth={1.6} />
                      <span>{selectedPrompt.label}</span>
                      <Send size={15} strokeWidth={1.6} />
                    </span>
                  )}
                </button>
                <div className="vs-stage-status">
                  <span>
                    <Equalizer />
                    {sceneLabels[scene]}
                  </span>
                  <span>
                    <Expand size={14} strokeWidth={1.6} /> Inspect
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section
            className="vs-discovery vs-shell"
            id="mosaic"
            aria-labelledby="vs-discovery-title"
          >
            <div className="vs-section-intro">
              <h2 id="vs-discovery-title">
                Find your
                <br />
                next obsession.
              </h2>
              <p>
                Moods, artists, and favorites.
                <br />
                All within reach.
              </p>
            </div>
            <div className="vs-bento">
              <article className="vs-bento-library">
                <IconTile icon={LibraryBig} />
                <h3>Your music, together.</h3>
                <p>Saved tracks. Local files. Spotify playlists.</p>
                <div className="vs-source-pills">
                  <span>
                    <FileAudio size={16} />
                    Local audio
                  </span>
                  <span>
                    <Disc3 size={16} />
                    Spotify import
                  </span>
                  <span>
                    <Radio size={16} />
                    InnerTubeX
                  </span>
                </div>
                <button
                  type="button"
                  className="vs-card-inspect vs-library-image"
                  aria-label="Inspect library"
                  onClick={() => inspect(5)}
                >
                  <img
                    src={VIKIFY_SCREENS[5].image}
                    alt="Vikify Library with listening highlights"
                    loading="lazy"
                  />
                </button>
              </article>
              <article className="vs-bento-artist">
                <IconTile icon={Mic2} />
                <h3>
                  Get closer
                  <br />
                  to the artist.
                </h3>
                <p>The latest releases. The tracks you keep.</p>
                <button
                  type="button"
                  className="vs-card-inspect vs-artist-image"
                  aria-label="Inspect artist page"
                  onClick={() => inspect(3)}
                >
                  <img
                    src={VIKIFY_SCREENS[3].image}
                    alt="The Weeknd artist page"
                    loading="lazy"
                  />
                </button>
              </article>
              <article className="vs-bento-welcome">
                <button
                  type="button"
                  className="vs-card-inspect"
                  aria-label="Inspect welcome screen"
                  onClick={() => inspect(6)}
                >
                  <img
                    className="vs-welcome-mark"
                    src={LOGO_URL}
                    alt=""
                    loading="lazy"
                  />
                  <h3>A simple beginning.</h3>
                  <p>A name, then your music.</p>
                  <img
                    className="vs-welcome-screen"
                    src={VIKIFY_SCREENS[6].image}
                    alt="Vikify welcome screen"
                    loading="lazy"
                  />
                </button>
              </article>
              <article className="vs-bento-moods">
                <IconTile icon={Compass} />
                <h3>Music for the moment.</h3>
                <p>Follow a feeling.</p>
                <div className="vs-marquee" aria-label="Mood stations">
                  <div className="vs-marquee-track">
                    {moods.map((mood) => (
                      <button
                        type="button"
                        className="vs-mood-tile"
                        key={mood.name}
                        onClick={() => inspect(4)}
                        aria-label={`Inspect Explore, ${mood.name}`}
                      >
                        <span className="vs-mood-crop">
                          <img
                            src={VIKIFY_SCREENS[4].image}
                            alt=""
                            style={{
                              width: '245%',
                              maxWidth: 'none',
                              left: mood.x,
                              top: mood.y,
                            }}
                            loading="lazy"
                          />
                        </span>
                        <strong>{mood.name}</strong>
                      </button>
                    ))}
                    {moods.map((mood) => (
                      <button
                        type="button"
                        className="vs-mood-tile"
                        key={`copy-${mood.name}`}
                        aria-hidden="true"
                        tabIndex={-1}
                        onClick={() => inspect(4)}
                      >
                        <span className="vs-mood-crop">
                          <img
                            src={VIKIFY_SCREENS[4].image}
                            alt=""
                            style={{
                              width: '245%',
                              maxWidth: 'none',
                              left: mood.x,
                              top: mood.y,
                            }}
                            loading="lazy"
                          />
                        </span>
                        <strong>{mood.name}</strong>
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section
            className="vs-architecture vs-shell"
            id="engineering"
            aria-labelledby="vs-architecture-title"
          >
            <div className="vs-section-intro">
              <h2 id="vs-architecture-title">
                Behind
                <br />
                the sound.
              </h2>
              <p>
                Trace the playback path.
                <br />
                Try the fallback simulation.
              </p>
            </div>
            <VikifySignalFlow />
          </section>

          <footer className="vs-finale vs-shell" id="finale">
            <img
              className="vs-finale-mark"
              src={LOGO_URL}
              alt=""
              width="116"
              height="116"
              loading="lazy"
            />
            <h2>
              Take Vikify
              <br />
              with you.
            </h2>
            <div className="vs-hero-actions">
              <ApkDownload />
              <a className="vs-text-link" href={SOURCE_URL}>
                Source code <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="vs-build">Android 8.0+ · 54.9 MB · Release 2.0.2</p>
            {nextProject && (
              <button
                className="vs-next-project"
                type="button"
                onClick={() => onNavigateProject(nextProject.id)}
              >
                Next project <strong>{nextProject.name}</strong>
                <ArrowRight size={18} strokeWidth={1.6} />
              </button>
            )}
          </footer>
        </main>

        <dialog
          className="vs-inspector"
          ref={inspector}
          aria-label="Vikify screenshot inspector"
          onCancel={(event) => {
            event.preventDefault();
            setInspectedIndex(null);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setInspectedIndex(null);
          }}
        >
          {inspected && (
            <div className="vs-inspector-card">
              <header className="vs-inspector-head">
                <h3>{inspected.title}</h3>
                <button
                  type="button"
                  autoFocus
                  aria-label="Close inspector"
                  onClick={() => setInspectedIndex(null)}
                >
                  <X size={21} strokeWidth={1.6} />
                </button>
              </header>
              <div className="vs-inspector-image">
                <img src={inspected.image} alt={inspected.title} />
              </div>
              <footer>
                <p>{inspected.description}</p>
                <div className="vs-inspector-nav">
                  <button
                    type="button"
                    aria-label="Previous screenshot"
                    onClick={() =>
                      setInspectedIndex((index) =>
                        index === null
                          ? null
                          : (index - 1 + VIKIFY_SCREENS.length) %
                            VIKIFY_SCREENS.length,
                      )
                    }
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span>
                    {(inspectedIndex ?? 0) + 1} / {VIKIFY_SCREENS.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next screenshot"
                    onClick={() =>
                      setInspectedIndex((index) =>
                        index === null
                          ? null
                          : (index + 1) % VIKIFY_SCREENS.length,
                      )
                    }
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </footer>
            </div>
          )}
        </dialog>
      </div>
    </MotionConfig>
  );
};

export default VikifyShowcase;
