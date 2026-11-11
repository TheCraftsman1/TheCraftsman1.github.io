import { useState } from 'react';
import {
  AudioLines,
  Database,
  FolderOpen,
  HardDrive,
  Radio,
  ShieldCheck,
  WifiOff,
} from 'lucide-react';
import './VikifySignalFlow.css';

export default function VikifySignalFlow() {
  const [networkDrop, setNetworkDrop] = useState(false);

  return (
    <div className="vs-flow" data-fallback={networkDrop}>
      <div className="vs-flow-toolbar">
        <div className="vs-flow-simulation">
          <Radio size={14} strokeWidth={1.6} aria-hidden="true" /> Interactive
          simulation
        </div>
        <button
          className="vs-flow-toggle"
          type="button"
          aria-pressed={networkDrop}
          onClick={() => setNetworkDrop(!networkDrop)}
        >
          <WifiOff size={15} strokeWidth={1.6} aria-hidden="true" />
          <span>Simulate network drop</span>
          <span className="vs-flow-switch" aria-hidden="true">
            <span />
          </span>
        </button>
      </div>

      <div className="vs-flow-graph">
        <div className="vs-flow-sources">
          <div
            className={`vs-flow-node vs-flow-source${networkDrop ? '' : ' vs-flow-node-active'}`}
          >
            <span className="vs-flow-icon">
              <Radio size={21} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div>
              <strong>InnerTubeX</strong>
              <span>
                {networkDrop ? 'Connection lost' : 'Primary resolver'}
              </span>
            </div>
            <span className="vs-flow-node-dot" aria-hidden="true" />
          </div>
          <div
            className={`vs-flow-node vs-flow-source${networkDrop ? ' vs-flow-node-active' : ''}`}
          >
            <span className="vs-flow-icon">
              <ShieldCheck size={21} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div>
              <strong>NewPipe</strong>
              <span>
                {networkDrop ? 'Fallback active' : 'Ready on standby'}
              </span>
            </div>
            <span className="vs-flow-node-dot" aria-hidden="true" />
          </div>
        </div>

        <div className="vs-flow-bridge" aria-hidden="true">
          <svg
            className="vs-flow-svg-desktop"
            viewBox="0 0 100 272"
            preserveAspectRatio="none"
          >
            <path
              className={`vs-flow-wire${networkDrop ? '' : ' vs-flow-wire-active'}`}
              d="M0 78H25Q40 78 40 94V120Q40 136 56 136H100"
            />
            <path
              className={`vs-flow-wire${networkDrop ? ' vs-flow-wire-active' : ''}`}
              d="M0 194H25Q40 194 40 178V152Q40 136 56 136H100"
            />
          </svg>
          <svg
            className="vs-flow-svg-mobile"
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
          >
            <path
              className={`vs-flow-wire${networkDrop ? '' : ' vs-flow-wire-active'}`}
              d="M25 0V13Q25 25 38 25Q50 25 50 38V50"
            />
            <path
              className={`vs-flow-wire${networkDrop ? ' vs-flow-wire-active' : ''}`}
              d="M75 0V13Q75 25 62 25Q50 25 50 38V50"
            />
          </svg>
        </div>

        <div className="vs-flow-player">
          <div className="vs-flow-player-top">
            <span className="vs-flow-icon">
              <AudioLines size={25} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span className="vs-flow-playing">
              <i /> Playing
            </span>
          </div>
          <strong>ExoPlayer</strong>
          <span>MediaSessionService</span>
          <div className="vs-flow-wave" aria-hidden="true">
            {[12, 22, 16, 30, 20, 36, 26, 18, 28, 14, 22, 16].map(
              (height, index) => (
                <i key={index} style={{ height }} />
              ),
            )}
          </div>
        </div>

        <div className="vs-flow-bridge" aria-hidden="true">
          <svg
            className="vs-flow-svg-desktop"
            viewBox="0 0 100 272"
            preserveAspectRatio="none"
          >
            <path
              className="vs-flow-wire vs-flow-wire-active vs-flow-wire-support"
              d="M0 136H30Q46 136 46 120V56Q46 40 62 40H100"
            />
            <path
              className="vs-flow-wire vs-flow-wire-active vs-flow-wire-support"
              d="M0 136H100"
            />
            <path
              className="vs-flow-wire vs-flow-wire-active vs-flow-wire-support"
              d="M0 136H30Q46 136 46 152V216Q46 232 62 232H100"
            />
          </svg>
          <svg
            className="vs-flow-svg-mobile"
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
          >
            <path
              className="vs-flow-wire vs-flow-wire-active vs-flow-wire-support"
              d="M50 0V12Q50 25 37 25H29Q16.67 25 16.67 38V50"
            />
            <path
              className="vs-flow-wire vs-flow-wire-active vs-flow-wire-support"
              d="M50 0V50"
            />
            <path
              className="vs-flow-wire vs-flow-wire-active vs-flow-wire-support"
              d="M50 0V12Q50 25 63 25H71Q83.33 25 83.33 38V50"
            />
          </svg>
        </div>

        <div className="vs-flow-support">
          <div className="vs-flow-node">
            <span className="vs-flow-icon">
              <HardDrive size={21} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <strong>Read-ahead cache</strong>
          </div>
          <div className="vs-flow-node">
            <span className="vs-flow-icon">
              <FolderOpen size={21} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <strong>Local files</strong>
          </div>
          <div className="vs-flow-node">
            <span className="vs-flow-icon">
              <Database size={21} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <strong>Queue snapshot</strong>
          </div>
        </div>
      </div>

      <div className="vs-flow-status" role="status" aria-live="polite">
        <span className="vs-flow-status-dot" aria-hidden="true" />
        <span>
          {networkDrop
            ? 'Fallback resolver active.'
            : 'Primary resolver active.'}{' '}
          Playback continues.
        </span>
        <span className="vs-flow-status-note">
          Preview of the recovery path
        </span>
      </div>
    </div>
  );
}
