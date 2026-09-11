// Web Speech API and Audio Earcons for Accessibility

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play subtle auditory feedback for screen reader actions
export function playEarcon(type: 'FOCUS' | 'SUCCESS' | 'ALERT' | 'CLICK') {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'FOCUS') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(550, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'SUCCESS') {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'ALERT') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.setValueAtTime(200, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {
    // Ignore audio context errors if blocked by browser policy
  }
}

// Text-to-Speech Engine with Multi-Language Support
export function speakText(
  text: string,
  langOrOnEnd?: string | (() => void),
  onEndCallback?: () => void
) {
  if (!('speechSynthesis' in window)) {
    if (typeof langOrOnEnd === 'function') langOrOnEnd();
    else if (onEndCallback) onEndCallback();
    return;
  }

  let langCode = 'fa-IR';
  let onEnd: (() => void) | undefined = onEndCallback;

  if (typeof langOrOnEnd === 'function') {
    onEnd = langOrOnEnd;
  } else if (typeof langOrOnEnd === 'string' && langOrOnEnd.trim().length > 0) {
    langCode = langOrOnEnd;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Try to find matching voice for language code or fallback
  const voices = window.speechSynthesis.getVoices();
  const langPrefix = langCode.split('-')[0].toLowerCase();
  const matchedVoice = voices.find(
    (v) => v.lang.toLowerCase().includes(langPrefix) || v.lang.toLowerCase() === langCode.toLowerCase()
  );
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
