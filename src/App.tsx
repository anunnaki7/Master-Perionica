import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Centrifuge Preloader Component
const CentrifugePreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'spinning' | 'expanding'>('spinning');

  useEffect(() => {
    // Progress counter: 0 to 100 in ~2 seconds
    const duration = 2000;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Start expanding phase
        setPhase('expanding');
        setTimeout(onComplete, 500);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: phase === 'expanding' ? 0 : 1,
        scale: phase === 'expanding' ? 1.2 : 1
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-200/30"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main centrifuge drum */}
      <div className="relative mb-8">
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: 160,
            height: 160,
            marginLeft: -16,
            marginTop: -16,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Spinning drum container */}
        <motion.div
          className="relative w-32 h-32 rounded-full border-4 border-blue-200 bg-white shadow-2xl shadow-blue-500/30 flex items-center justify-center overflow-hidden"
          animate={{
            rotate: phase === 'expanding' ? 720 : 360,
            scale: phase === 'expanding' ? 2 : 1,
          }}
          transition={{
            rotate: {
              duration: phase === 'expanding' ? 0.5 : 0.5,
              repeat: phase === 'expanding' ? 0 : Infinity,
              ease: phase === 'expanding' ? 'easeOut' : 'linear',
            },
            scale: {
              duration: 0.5,
              ease: 'easeOut',
            },
          }}
        >
          {/* Inner drum pattern */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-dashed border-blue-300"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Center drum holes pattern */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-blue-400/60"
                  animate={{
                    scale: [1, 0.8, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Water/fabric effect inside drum */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-400/40 to-transparent rounded-b-full"
            animate={{
              scaleY: [1, 0.8, 1.1, 0.9, 1],
              rotate: [0, 5, -5, 3, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Speed lines around drum */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-6 bg-gradient-to-t from-blue-400 to-transparent rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: 'center 80px',
              rotate: `${i * 45}deg`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Logo text */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
          Master
        </h1>
        <p className="text-sm text-gray-500 mt-1">Profesionalna perionica</p>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-1.5 bg-blue-100 rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Progress percentage */}
      <motion.p
        className="text-blue-600 font-semibold text-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {progress}%
      </motion.p>
    </motion.div>
  );
};

// Scroll Progress Bar Component
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white border-2 border-blue-500 rounded-full shadow-lg shadow-blue-500/20 flex items-center justify-center hover:bg-blue-500 hover:text-white text-blue-600 transition-all duration-300 group"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Back to top"
    >
      <svg 
        className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
};

// Fluid Steam Background Animation Component
const FluidBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fluid layer 1 */}
      <div className="fluid-blob fluid-blob-1" />
      {/* Fluid layer 2 */}
      <div className="fluid-blob fluid-blob-2" />
      {/* Fluid layer 3 */}
      <div className="fluid-blob fluid-blob-3" />
      {/* Steam particles */}
      <div className="steam-container">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`steam steam-${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

// Navigation component - Ultra minimal 2026 style
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 w-full max-w-full ${
        scrolled 
          ? 'py-2' 
          : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? 'bg-white/60 backdrop-blur-2xl shadow-lg shadow-blue-900/5 rounded-full px-6 py-3 border border-white/50' 
            : 'bg-transparent px-2 py-2'
        }`}>
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-xl md:text-2xl">M</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              Master
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-1">
            {['O nama', 'Klijenti', 'Radno vreme', 'Kontakt'].map((item, i) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(['about', 'clients', 'hours', 'contact'][i])}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium text-sm transition-all duration-300 rounded-full hover:bg-blue-50/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item}
              </motion.button>
            ))}
            <motion.a
              href="tel:+381636640418"
              className="ml-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              063 640 418
            </motion.a>
          </div>

          <button 
            className="md:hidden p-2 rounded-full hover:bg-blue-50/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ 
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden mx-4 mt-2"
      >
        <div className="bg-white/80 backdrop-blur-2xl rounded-2xl px-4 py-4 space-y-1 border border-white/50 shadow-xl">
          {['O nama', 'Klijenti', 'Radno vreme', 'Kontakt'].map((item, i) => (
            <button
              key={item}
              onClick={() => scrollToSection(['about', 'clients', 'hours', 'contact'][i])}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-xl hover:bg-blue-50/50 transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

// Hero Section with Fluid Animation - ORIGINAL DESIGN (DO NOT MODIFY)
const HeroSection = ({ isLoaded }: { isLoaded: boolean }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section 
      className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white w-full max-w-full"
    >
      <FluidBackground />

      {/* Main content - centered with flex-grow and extra bottom padding */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex-grow flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-36"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-blue-100/50 text-blue-700 font-medium text-sm mb-10 shadow-lg shadow-blue-900/5"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          25 godina tradicije izvrsnosti
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8"
        >
          <span className="block">Master</span>
          <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
            Besprekorna čistoća
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl mt-4 text-gray-700 font-semibold">
            za lidere ugostiteljstva
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-12"
        >
          Premium B2B usluga pranja i peglanja za restorane, hotele i vrtiće.
          <span className="block mt-2 text-blue-600 font-medium">Miljakovac 2, Beograd</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="tel:+381636640418"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all inline-flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            063 640 418
          </motion.a>
          <motion.button
            onClick={() => document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/70 backdrop-blur-xl border-2 border-blue-100 text-blue-700 rounded-full font-semibold text-lg hover:bg-white transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Naši klijenti →
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - positioned at very bottom with maximum separation */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-[8px] text-gray-400/60 font-medium uppercase tracking-widest">Skroluj</span>
              <div className="w-4 h-7 rounded-full border border-gray-300/30 flex items-start justify-center pt-1 bg-white/10">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-0.5 h-1.5 bg-blue-400/40 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Premium Client Grid - Wall of Fame (Enhanced Desktop View)
const ClientGrid = () => {
  const clients = [
    'Auto Makiš', 'Bella Napoli', 'Beograd na Vatri', 'Dak', 'Durmitor', 'Dream',
    'Gallo Nero', 'Garden Vista', 'Infinity', 'Milina Kafanica', 'Kod Kapetan\'a',
    'Kovač', 'Kuća Boema', 'Kesten', 'Mama\'s Bistro', 'Marinada', 'Milagro', 
    'Moon.ze', 'Nišava', 'Pane E Vino', 'Panta Rei', 'Pietra Terrazza', 'Potpis',
    'Sakura', 'Salaš Vinarije Zvonko Bogdan', 'Stara Trojka', 'Srpska trpeza', 'Sushi Dream', 
    'Šaran', 'Vasiljević Kijevo', 'Veliko Srce', 'Kafanica', 'Voz'
  ];

  return (
    <section 
      id="clients" 
      className="py-32 md:py-44 bg-gradient-to-b from-white via-blue-50/20 to-white relative overflow-hidden w-full max-w-full"
    >
      {/* Subtle background decoration - constrained to prevent overflow */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full bg-blue-100/80 text-blue-700 font-medium text-sm mb-6"
          >
            Naši klijenti
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Elita Beograda nam veruje
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Više od 30 najuglednijih restorana poverava nam svakodnevnu brigu o stolnacima, salvetama i posteljini
            <span className="block mt-2 text-blue-600 font-medium">10+ apartmana peremo</span>
          </p>
        </motion.div>

        {/* Premium Client Grid - Clean 3/4 column layout on desktop, 2 on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 w-full"
        >
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.02 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div 
                className="relative bg-white/70 backdrop-blur-xl rounded-xl p-4 md:p-5 lg:p-6 border border-gray-100 shadow-sm transition-all duration-300 ease-out cursor-pointer
                           hover:shadow-lg hover:shadow-blue-500/15 hover:border-blue-200 hover:bg-white"
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.25, ease: "easeOut" }
                }}
              >
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50" />
                </div>
                
                {/* Content - centered elegant typography */}
                <div className="relative z-10 text-center">
                  <span className="text-gray-700 font-semibold text-sm md:text-base tracking-wide group-hover:text-blue-600 transition-colors duration-300">
                    {client}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="tel:+38163640418"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
          >
            <span className="text-blue-100">Pridružite se liderima —</span>
            <span className="text-lg font-bold">Pozovite nas</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// About/Owner Section
const AboutSection = () => {
  return (
    <section id="about" className="py-32 md:py-44 bg-white relative overflow-hidden w-full max-w-full">
      <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-80 md:h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-8">
              Osnivač & Direktor
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Nikola Palčić
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Sa više od 25 godina iskustva u profesionalnoj nezi tekstila, Nikola Palčić je 
              izgradio Master u sinonim za besprekoran kvalitet. Svaki klijent dobija 
              <strong className="text-gray-800"> ličnu pažnju</strong>, 
              <strong className="text-gray-800"> tačnost u isporuci</strong> i 
              <strong className="text-gray-800"> konzistentan kvalitet</strong> — 
              bez izuzetka.
            </p>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-10 italic border-l-4 border-blue-500 pl-6">
              "Svaki stolnjak, svaka salveta, svaki komad posteljine mora biti savršen. 
              To je naš standard od prvog dana."
            </p>
            
            <motion.a
              href="https://www.instagram.com/nikola.palcic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @nikola.palcic
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl md:text-5xl font-bold mb-2">25+</div>
                    <div className="text-blue-100 text-sm">Godina iskustva</div>
                  </div>
                  <div className="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl md:text-5xl font-bold mb-2">30+</div>
                    <div className="text-blue-100 text-sm">Elite klijenata</div>
                  </div>
                  <div className="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl md:text-5xl font-bold mb-2">16h</div>
                    <div className="text-blue-100 text-sm">Dnevno dostupni</div>
                  </div>
                  <div className="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl md:text-5xl font-bold mb-2">365</div>
                    <div className="text-blue-100 text-sm">Dana godišnje</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Operating Hours Section
const HoursSection = () => {
  return (
    <section id="hours" className="py-32 md:py-44 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Radno vreme u dve smene
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Organizovani smo da budemo dostupni kada vama odgovara — radimo svakog dana u godini
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl shadow-blue-900/5 border border-blue-100/50 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                  <path strokeWidth="2" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Prva smena</h3>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-4">
                06:00 - 14:00
              </div>
              <p className="text-gray-600 text-lg">
                Jutarnja smena za rane dostave
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl shadow-blue-900/5 border border-blue-100/50 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Druga smena</h3>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-4">
                14:00 - 22:00
              </div>
              <p className="text-gray-600 text-lg">
                Popodnevna smena za fleksibilnost
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 text-green-700 rounded-full font-semibold">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            Radimo svakog dana, uključujući vikende i praznike
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Map & Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-32 md:py-44 bg-white overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kontaktirajte nas
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            Posetite nas na Miljakovcu ili nas pozovite za više informacija
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Address Card - Downsized */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-5 border border-blue-100/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Adresa</h3>
                  <p className="text-gray-600 text-sm">Vukasovićeva 69, Miljakovac 2, Beograd</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <motion.a
              href="tel:+381636640418"
              className="block bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 text-white group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-blue-100 mb-0.5">Telefon</h3>
                  <p className="text-lg font-bold">063 640 418</p>
                </div>
              </div>
            </motion.a>

            {/* Instagram Card - Downsized */}
            <motion.a
              href="https://www.instagram.com/master_veseraj"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl p-5 text-white group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-white/80 mb-0.5">Instagram</h3>
                  <p className="text-base font-bold">@master_veseraj</p>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-900/10 border border-blue-100"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d708.4038151549696!2d20.460420269587942!3d44.74786555066032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a71a0751b0e57%3A0x57a527bbd3489ba7!2z0JLRg9C60LDRgdC-0LLQuNGb0LXQstCwIDY5LCDQodGC0LDRgNCwINCg0LDQutC-0LLQuNGG0LA!5e0!3m2!1ssr!2srs!4v1771443107007!5m2!1ssr!2srs"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokacija Master Vešeraj na mapi - Vukasovićeva 69, Miljakovac 2, Beograd"
              aria-label="Google mapa sa lokacijom Master Vešeraj"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer - Downsized & Elegant
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-12 md:py-16 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-white">Master</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Profesionalna perionica i peglanje za najzahtevnije klijente u Beogradu. 
              25 godina tradicije.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-300">Kontakt</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-xs">📍</span>
                <span>Vukasovićeva 69, Miljakovac 2</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xs">📞</span>
                <span>063 640 418</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xs">⏰</span>
                <span>06:00 - 22:00, svaki dan</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-300">Pratite nas</h4>
            <a
              href="https://www.instagram.com/master_veseraj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span>@master_veseraj</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="text-center mb-6">
            <a
              href="tel:+381636640418"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Pozovite: 063 640 418
            </a>
          </div>
          <div className="text-center text-gray-500 text-xs">
            <p>© {new Date().getFullYear()} Master Vešeraj. Sva prava zadržana.</p>
            <p className="mt-1">Vlasnik: Nikola Palčić</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Enable scrolling after preloader
    document.body.style.overflow = 'auto';
  };

  // Lock scrolling during preloader
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    }
  }, [isLoading]);

  return (
    <div className="font-['Inter',sans-serif] antialiased overflow-x-hidden w-full max-w-full">
      {/* Centrifuge Preloader */}
      <AnimatePresence>
        {isLoading && (
          <CentrifugePreloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Main Content - Fades in after preloader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <ScrollProgressBar />
        <BackToTopButton />
        <Navigation />
        <HeroSection isLoaded={!isLoading} />
        <ClientGrid />
        <AboutSection />
        <HoursSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </div>
  );
}
