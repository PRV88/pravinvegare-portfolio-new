import React, { useState, useEffect, useRef } from 'react';
import { WidgetData } from '../types';
import { TreePine, X } from 'lucide-react';
import { soundSynth } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

const bgColors: Record<string, string> = {
  yellow: "#FEDA64",
  dark: "#1A1A1A",
  coral: "#FF6B6C",
  white: "#ffffff"
};

const textStyles: Record<string, string> = {
  yellow: "text-black",
  dark: "text-white",
  coral: "text-black",
  white: "text-black"
};

// ==========================================
// INDIVIDUAL WIDGET COMPONENTS
// ==========================================

const HeroWidget = ({ content }: { content: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}
    className="max-w-6xl mx-auto px-6 pt-32 pb-24 md:py-48 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24"
  >
    <div className="flex-1 space-y-6 flex flex-col items-center text-center md:items-start md:text-left cursor-default">
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-bold text-[#483186] text-sm md:text-base tracking-wide uppercase"
      >
        {content.subtitle}
      </motion.h3>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-5xl sm:text-6xl md:text-8xl font-black font-display text-[#483186] leading-[1.1] tracking-tight"
      >
        {content.title}
        <span className="text-black inline-block ml-2 md:ml-4">{content.emoji}</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-base sm:text-lg md:text-2xl text-gray-800 leading-relaxed max-w-xl font-medium"
      >
        {content.description}
      </motion.p>
    </div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex-1 w-full max-w-md"
    >
      <div className="aspect-[4/5] bg-gray-200 overflow-hidden w-full relative">
        <img 
          src={content.image} 
          alt="Profile" 
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
    </motion.div>
  </motion.div>
);

const QuoteWidget = ({ content }: { content: any }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    className="max-w-4xl mx-auto px-6 py-32 md:py-48 flex flex-col items-center text-center"
  >
    <blockquote 
      className="space-y-8 max-w-3xl cursor-pointer group"
      onMouseEnter={() => {
        const plainText = content.text.replace(/<[^>]+>/g, '');
        soundSynth.playSteveJobsVoice(plainText);
      }}
      onMouseLeave={() => soundSynth.stopVoice()}
    >
      <p 
        className="text-2xl md:text-4xl text-gray-200 italic font-light leading-relaxed tracking-wide transition-colors duration-500 group-hover:text-white"
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
      <footer className="text-gray-400 text-lg md:text-2xl pt-4 transition-colors duration-500 group-hover:text-gray-300">
        — {content.author}
      </footer>
    </blockquote>
  </motion.div>
);

const FrameworksWidget = ({ content }: { content: any }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay: 0 }}
    className="max-w-6xl mx-auto px-6 py-32 md:py-48 flex flex-col items-center md:items-start"
  >
    <div className="max-w-3xl text-center md:text-left">
      <motion.h2 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-8xl font-black font-display text-[#3B4BE8] leading-[1.1] tracking-tight mb-12 md:mb-16 inline-block"
      >
        <span className="border-b-[6px] md:border-b-[10px] border-dotted border-[#3B4BE8] pb-2 inline-block leading-tight">
          Frameworks
        </span>
        <br />
        <span className="border-b-[6px] md:border-b-[10px] border-dotted border-[#3B4BE8] pb-2 inline-block leading-tight">
          Behind Our Thinking
        </span>
      </motion.h2>
      <ul className="space-y-6 flex flex-col items-center md:items-start">
        {content.items.map((item: any, idx: number) => (
          <motion.li 
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <a 
              href={item.url}
              onMouseEnter={() => soundSynth.playHover()}
              onClick={() => soundSynth.playClick()}
              className="text-xl md:text-3xl text-gray-900 font-medium hover:text-[#3B4BE8] border-b border-gray-900 hover:border-[#3B4BE8] pb-1 transition-colors"
            >
              {item.label}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const ProjectsWidget = ({ content }: { content: any }) => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0 }}
        className="max-w-7xl mx-auto px-6 py-32 md:py-48 flex flex-col items-center md:items-start text-center md:text-left"
      >
        <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start w-full">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6 }}
            className="font-bold text-gray-400 text-sm md:text-base uppercase tracking-widest mb-4"
          >
            {content.subtitle}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-white"
          >
            {content.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {content.items.map((item: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.15 }}
              className="group block cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4BE8] rounded-xl"
              role="button"
              tabIndex={0}
              onMouseEnter={() => soundSynth.playHover()}
              onClick={() => {
                soundSynth.playClick();
                setSelectedProject(item);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  soundSynth.playClick();
                  setSelectedProject(item);
                }
              }}
            >
              <div className="aspect-[4/3] bg-gray-800 overflow-hidden mb-6 rounded-lg isolate">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-3 group-hover:text-[#3B4BE8] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 font-medium mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {item.tags.map((tag: string, tIdx: number) => (
                  <span key={tIdx} className="text-xs font-bold px-3 py-1 bg-white/10 text-gray-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#1A1A1A] text-white overflow-y-auto"
          >
            <div className="min-h-screen relative">
              <button 
                onClick={() => {
                  soundSynth.playClick();
                  setSelectedProject(null);
                }}
                onMouseEnter={() => soundSynth.playHover()}
                className="absolute top-6 right-6 md:top-12 md:right-12 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                aria-label="Close project details"
              >
                <X size={24} />
              </button>
              
              <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full aspect-[21/9] object-cover rounded-2xl mb-12"
                  />
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {selectedProject.tags.map((tag: string, tIdx: number) => (
                      <span key={tIdx} className="text-sm font-bold px-4 py-2 bg-white/10 text-gray-200 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-display tracking-tight mb-8">
                    {selectedProject.title}
                  </h1>
                  
                  <div className="prose prose-invert prose-lg max-w-none space-y-6 text-gray-300 text-left">
                    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-200">
                      {selectedProject.description}
                    </p>
                    <p>
                      In this detailed view, you can provide an in-depth look at the problem statement, 
                      the approach taken, the challenges faced, and the ultimate technical solution delivered.
                    </p>
                    <p>
                      Consider adding sections to detail the tech stack, link out to full repositories, or showcase
                      further design assets and architecture diagrams.
                    </p>
                  </div>
                  
                  <div className="mt-16 pt-16 border-t border-white/10">
                    <a 
                      href={selectedProject.link}
                      className="inline-block px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-lg hover:bg-gray-200 transition-colors"
                      onMouseEnter={() => soundSynth.playHover()}
                      onClick={() => soundSynth.playClick()}
                    >
                      Visit Live Project
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ContactWidget = ({ content }: { content: any }) => {
  const [mailLink,setMailLink] = useState(`mailto:${content.email}?subject=Portfolio Inquiry`)
  return (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="max-w-4xl mx-auto px-6 py-32 md:py-48 text-center space-y-8 flex flex-col items-center justify-center"
  >
    <h3 className="italic font-medium text-lg md:text-xl text-black">
      {content.title}
    </h3>
    <div className="max-w-md mx-auto space-y-2 mt-4 text-black text-center font-medium italic">
      <p className="inline md:block">{content.description}</p>{' '}
      <a 
        href={mailLink} 
        target="_top"
        className="hover:text-[#3B4BE8] underline"
        onMouseEnter={() => soundSynth.playHover()}
        onClick={(e) => {
          
          soundSynth.playClick();
        }}
      >
        {content.email}
      </a>{' '}
      <span>{content.greeting}</span>
    </div>
  </motion.div>
);
}

const FooterWidget = ({ content }: { content: any }) => (
  <div 
    className="max-w-7xl w-full mx-auto px-6 py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-black"
  >
    <div className="text-xl tracking-tight">{content.name}</div>
    <div className="flex items-center gap-8 text-xs md:text-sm font-medium text-gray-600">
      <a 
        href={`mailto:${content.email}`} 
        target="_top"
        className="hover:text-black transition-colors"
        onMouseEnter={() => soundSynth.playHover()}
        onClick={(e) => {
          soundSynth.playClick();
        }}
      >{content.email}</a>
      <a 
        href={content.socialLink} 
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-black transition-colors"
        onMouseEnter={() => soundSynth.playHover()}
        onClick={() => soundSynth.playClick()}
      >{content.social}</a>
    </div>
  </div>
);

const SustainabilityWidget = ({ content }: { content: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
    transition={{ duration: 0.8, delay: 0 }}
    className="max-w-5xl mx-auto px-6 py-32 md:py-48 flex flex-col items-center text-center justify-center"
  >
    <motion.div 
      initial={{ scale: 0, rotate: -10 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="mb-8 p-4 relative flex justify-center"
    >
      {content.treeImage ? (
        <img src={content.treeImage} alt="Tree" className="w-32 h-32 object-contain" />
      ) : (
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto drop-shadow-md">
          <path d="M50 85V60M50 85C50 85 50 90 50 90C50 90 48 90 48 90M50 85C50 85 50 95 50 95M50 60L40 45M50 60L60 45" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M58 45C68 45 76 37 76 27C76 17 68 9 58 9C55 9 52 10 50 11C48 10 45 9 42 9C32 9 24 17 24 27C24 37 32 45 42 45C42 45 45 53 50 53C55 53 58 45 58 45Z" fill="#88C03D" stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round"/>
          <path d="M58 45C58 45 55 53 50 53C45 53 42 45 42 45L40 45C32 45 24 37 24 27C24 22 26 18 29.5 15C33.5 28 45 35 58 35C66.5 35 73.5 29.5 76 22C76 23.5 76 25 76 27C76 37 68 45 58 45Z" fill="#5E9623"/>
        </svg>
      )}
    </motion.div>
    <motion.h3 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="font-bold text-black text-sm md:text-base italic mb-6"
    >
      {content.subtitle}
    </motion.h3>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black font-display text-[#3B4BE8] italic leading-tight tracking-tight max-w-4xl mx-auto px-4"
    >
      {content.title}
    </motion.h2>
  </motion.div>
);

// ==========================================
// RENDERER
// ==========================================

export const WidgetRenderer: React.FC<{ widgets: WidgetData[] }> = ({ widgets }) => {
  const [activeTheme, setActiveTheme] = useState(widgets[0]?.theme || 'yellow');
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme');
            if (theme) {
              setActiveTheme(theme);
            }
            const widgetType = entry.target.getAttribute('data-type');
            if (widgetType === 'hero') {
              soundSynth.playHeroSound();
            }
          }
        });
      },
      { threshold: 0.4 } // Trigger when at least 40% of the section is visible
    );

    const sections = document.querySelectorAll('.widget-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [widgets]);

  useEffect(() => {
    document.body.style.backgroundColor = bgColors[activeTheme] || '#ffffff';
    document.body.style.transition = 'background-color 1000ms ease-in-out';
  }, [activeTheme]);

  useEffect(() => {
    if (!footerRef.current) return;
    
    setFooterHeight(footerRef.current.offsetHeight);
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.target.clientHeight);
      }
    });
    
    resizeObserver.observe(footerRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);

  const footerWidget = widgets.find(w => w.type === 'footer');
  const nonFooterWidgets = widgets.filter(w => w.type !== 'footer');

  return (
    <>
      <div 
        className="flex flex-col w-full min-h-[100vh] transition-colors duration-1000 ease-in-out relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        style={{ 
          backgroundColor: bgColors[activeTheme] || '#ffffff',
          marginBottom: footerHeight ? `${footerHeight}px` : '100px'
        }}
      >
        {nonFooterWidgets.map((widget) => {
          const textColor = textStyles[widget.theme] || 'text-black';
          
          return (
            <section id={widget.id} key={widget.id} className={`w-full ${textColor} bg-transparent widget-section min-h-screen flex flex-col justify-center relative`} data-theme={widget.theme} data-type={widget.type}>
              {widget.type === 'hero' && <HeroWidget content={widget.content} />}
              {widget.type === 'quote' && <QuoteWidget content={widget.content} />}
              {widget.type === 'frameworks' && <FrameworksWidget content={widget.content} />}
              {widget.type === 'projects' && <ProjectsWidget content={widget.content} />}
              {widget.type === 'contact' && <ContactWidget content={widget.content} />}
              {widget.type === 'sustainability' && <SustainabilityWidget content={widget.content} />}
            </section>
          );
        })}
      </div>
      
      {footerWidget && (
        <footer 
          ref={footerRef}
          className="fixed bottom-0 left-0 w-full z-0 bg-white"
        >
          <FooterWidget content={footerWidget.content} />
        </footer>
      )}
    </>
  );
};
