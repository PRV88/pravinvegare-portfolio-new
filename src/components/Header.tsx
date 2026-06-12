import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { appConfig } from '../data';
import { soundSynth } from '../utils/audio';

export const Header: React.FC = () => {
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isMuted, setIsMuted] = useState(soundSynth.isMuted);

  useEffect(() => {
    const unsubscribe = soundSynth.subscribe(() => {
      setIsMuted(soundSynth.isMuted);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.widget-section');
      let currentDark = false;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if the top of the header sits within this section
        if (rect.top <= 20 && rect.bottom > 20) {
           const theme = section.getAttribute('data-theme');
           if (theme === 'dark') {
             currentDark = true;
           }
        }
      });
      setIsDarkBg(currentDark);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColorClass = isDarkBg ? 'text-white' : 'text-black';
  const decorationColorClass = isDarkBg ? 'decoration-white/80' : 'decoration-black/80';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4 flex items-center justify-between transition-colors duration-1000 pointer-events-none">
      <div className={`text-xl font-bold font-sans tracking-tight transition-colors duration-1000 pointer-events-auto ${textColorClass}`}>
        {appConfig.header.title}
      </div>
      <nav className="flex items-center gap-6 pointer-events-auto">
        {appConfig.header.links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            onMouseEnter={() => soundSynth.playHover()}
            onClick={() => soundSynth.playClick()}
            className={`font-medium text-sm transition-all duration-1000 hover:opacity-70 underline decoration-wavy underline-offset-4 ${textColorClass} ${decorationColorClass}`}
          >
            {link.label}
          </a>
        ))}
       
        <button 
          onClick={() => soundSynth.toggleMute()}
          onMouseEnter={() => soundSynth.playHover()}
          className={`p-1 ml-2 transition-all duration-1000 hover:opacity-70 flex items-center justify-center ${textColorClass}`}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          title={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </nav>
    </header>
  );
};
