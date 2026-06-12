class ExternalSoundPlayer {
  private hoverAudio: HTMLAudioElement | null = null;
  private clickAudio: HTMLAudioElement | null = null;
  private enabled: boolean = true;
  public isMuted: boolean = false;
  private listeners: (() => void)[] = [];
  private heroSoundPlayed: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Soft pop for hover
      this.hoverAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/3005/3005-preview.mp3');
      this.hoverAudio.volume = 0.2;
      
      // Crisp click for interaction
      this.clickAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      this.clickAudio.volume = 0.4;
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.isMuted && !this.enabled) {
      this.enable();
    }
    this.listeners.forEach(l => l());
    if (!this.isMuted) {
      this.playClick();
    } else {
      this.stopVoice();
    }
  }

  public enable() {
    if (!this.enabled) {
      this.enabled = true;
      if (this.hoverAudio) {
        this.hoverAudio.play().then(() => {
          this.hoverAudio!.pause();
          this.hoverAudio!.currentTime = 0;
        }).catch(() => {});
      }
      if (this.clickAudio) {
        this.clickAudio.play().then(() => {
          this.clickAudio!.pause();
          this.clickAudio!.currentTime = 0;
        }).catch(() => {});
      }
      
      if ('speechSynthesis' in window) {
         // pre-load voices
         window.speechSynthesis.getVoices();
      }
    }
  }

  playHover() {
    if (!this.enabled || !this.hoverAudio || this.isMuted) return;
    try {
      this.hoverAudio.currentTime = 0;
      this.hoverAudio.play().catch(() => {});
    } catch(e) {}
  }

  playHeroSound() {
    if (!this.enabled || this.isMuted || this.heroSoundPlayed) return;
    this.heroSoundPlayed = true;
    
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();

      const playChord = (time: number, duration: number, freqs: number[]) => {
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        if (panner) panner.pan.value = 0;
        
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, time);
          
          gainNode.gain.setValueAtTime(0, time);
          gainNode.gain.linearRampToValueAtTime(0.15 / freqs.length, time + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);
          
          osc.connect(gainNode);
          if (panner) {
            gainNode.connect(panner);
            panner.connect(ctx.destination);
          } else {
            gainNode.connect(ctx.destination);
          }
          
          osc.start(time);
          osc.stop(time + duration);
        });
      };

      // Ta 
      playChord(ctx.currentTime, 0.4, [73.42, 110.00, 146.83, 174.61]); // D2, A2, D3, F3
      
      // Dum
      playChord(ctx.currentTime + 0.18, 3.0, [36.71, 73.42, 110.00, 146.83, 174.61, 220.00, 293.66]); // D1, D2, A2, D3, F3, A3, D4
      
    } catch (e) {
       // fallback or fail silently
    }
  }

  playClick() {
    if (!this.enabled || !this.clickAudio || this.isMuted) return;
    try {
      this.clickAudio.currentTime = 0;
      this.clickAudio.play().catch(() => {});
    } catch(e) {}
  }

  playSteveJobsVoice(text: string) {
    if (!this.enabled || this.isMuted) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.pitch = 0.8; // slightly deeper pitch to simulate
      utterance.rate = 0.92; // slightly slower cadence
      
      const voices = window.speechSynthesis.getVoices();
      // Try to find a male profile (since standard synthesis is tricky, finding a recognizable male profile like Alex or Google US English)
      const maleVoice = voices.find(v => 
        v.name.includes('Alex') || 
        v.name.includes('Google US English Male') ||
        v.name.includes('Daniel')
      );
      if (maleVoice) {
         utterance.voice = maleVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  }

  stopVoice() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundSynth = new ExternalSoundPlayer();
