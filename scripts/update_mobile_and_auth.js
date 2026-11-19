const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Viewport & Mobile Theme Tags
const oldViewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">';
const newViewport = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <meta name="theme-color" content="#14213D">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`;
html = html.replace(oldViewport, newViewport);

// 2. Mobile CSS Styles in <style>
const oldStyleEnd = '/* View visibility helper */';
const mobileStyles = `/* Mobile Frame & Android Touch Optimizations */
    html {
      scroll-behavior: smooth;
      -webkit-tap-highlight-color: transparent;
    }
    
    .touch-target {
      min-height: 44px;
      min-width: 44px;
    }
    
    .safe-bottom {
      padding-bottom: max(1rem, env(safe-area-inset-bottom));
    }
    
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    /* Native Android momentum scrolling */
    .touch-scroll {
      -webkit-overflow-scrolling: touch;
    }

    /* Active navigation indicator */
    .nav-active-chip {
      background-color: #EEF2FF !important;
      color: #2C3E9E !important;
      font-weight: 700 !important;
      border-color: #C7D2FE !important;
    }

    /* View visibility helper */`;
html = html.replace(oldStyleEnd, mobileStyles);

// 3. Header: Add Hamburger Button and Responsive Top Strip
const oldTopStrip = `<header class="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-ink-200">
    <div class="bg-ink-950 text-paper-200 text-[11px] px-4 py-1 flex items-center justify-between font-mono">
      <div class="flex items-center gap-2 truncate">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="truncate">GOVERNMENT OF INDIA · MINISTRY OF STATISTICS & PROGRAMME IMPLEMENTATION · DATA INFORMATICS & INNOVATION DIVISION</span>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="px-2 py-0.5 bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 font-semibold rounded text-[10px]">
          OFFICIAL SYSTEM · ISO 9001:2015
        </span>
      </div>
    </div>

    <!-- MAIN BRAND & NAVIGATION -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <a href="#landing" class="flex items-center gap-2.5 group">`;

const newTopStrip = `<header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-ink-200 shadow-2xs">
    <div class="bg-ink-950 text-paper-200 text-[10px] sm:text-[11px] px-3 sm:px-4 py-1 flex items-center justify-between font-mono">
      <div class="flex items-center gap-2 truncate">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
        <span class="truncate hidden sm:inline">GOVERNMENT OF INDIA · MINISTRY OF STATISTICS &amp; PROGRAMME IMPLEMENTATION · DIID</span>
        <span class="truncate sm:hidden">GOVT OF INDIA · MoSPI · DIID</span>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <span class="px-1.5 py-0.5 bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 font-semibold rounded text-[9px] sm:text-[10px]">
          OFFICIAL · ISO 9001
        </span>
      </div>
    </div>

    <!-- MAIN BRAND & NAVIGATION -->
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
      <div class="flex items-center gap-1 sm:gap-2">
        <!-- Mobile Drawer Hamburger Toggle Button -->
        <button type="button" onclick="toggleMobileDrawer()" class="md:hidden p-2 rounded-md text-ink-800 hover:text-ink-950 hover:bg-paper-200 transition-colors cursor-pointer touch-target flex items-center justify-center" aria-label="Open Navigation Menu">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
        </button>
        <a href="#dashboard" class="flex items-center gap-2 group">`;
html = html.replace(oldTopStrip, newTopStrip);

// 4. Update Header Brand Link Title & Subtitle to look great on mobile
const oldBrandArea = `<div class="w-9 h-9 rounded-md bg-ink-900 border border-ink-700 flex items-center justify-center text-white shadow-xs group-hover:bg-saffron transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3 20h18M6 20V8M18 20V8M6 10c6-6 6-6 12 0M10 20v-5M14 20v-5" />
          </svg>
        </div>
        <div class="flex flex-col min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="font-serif font-bold text-lg text-ink-950 tracking-tight" id="txt-app-title">Kaushal Setu</span>
            <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">v2.5 PROD</span>
          </div>
          <span class="text-[10px] text-ink-500 truncate" id="txt-app-subtitle">Skill Intelligence for Official Statistics</span>
        </div>
      </a>`;

const newBrandArea = `<div class="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-ink-900 border border-ink-700 flex items-center justify-center text-white shadow-xs group-hover:bg-saffron transition-colors shrink-0">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M3 20h18M6 20V8M18 20V8M6 10c6-6 6-6 12 0M10 20v-5M14 20v-5" />
          </svg>
        </div>
        <div class="flex flex-col min-w-0">
          <div class="flex items-center gap-1 sm:gap-1.5">
            <span class="font-serif font-bold text-base sm:text-lg text-ink-950 tracking-tight" id="txt-app-title">Kaushal Setu</span>
            <span class="text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">MoSPI</span>
          </div>
          <span class="text-[9px] sm:text-[10px] text-ink-500 truncate" id="txt-app-subtitle">Skill Intelligence Platform</span>
        </div>
      </a>
      </div>`;
html = html.replace(oldBrandArea, newBrandArea);

// 5. Insert Mobile Slide-Over Navigation Drawer right after </header>
const oldHeaderEnd = '</header>';
const mobileDrawerHTML = `</header>

  <!-- MOBILE SLIDE-OVER NAVIGATION DRAWER (Android & Mobile First) -->
  <div id="mobile-drawer-overlay" class="hidden fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-xs transition-opacity" onclick="toggleMobileDrawer()"></div>
  <aside id="mobile-drawer" class="fixed top-0 bottom-0 left-0 w-[290px] max-w-[85vw] z-50 bg-white shadow-2xl flex flex-col transform -translate-x-full transition-transform duration-300 ease-in-out border-r border-ink-200">
    <!-- Drawer Header / User Profile -->
    <div class="p-4 bg-ink-900 text-white flex flex-col space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded bg-saffron text-white flex items-center justify-center font-bold text-xs shadow-xs">
            KS
          </div>
          <div class="flex flex-col">
            <span class="font-serif font-bold text-sm tracking-wide">Kaushal Setu</span>
            <span class="text-[9px] font-mono text-paper-300">MoSPI DIID Framework</span>
          </div>
        </div>
        <button type="button" onclick="toggleMobileDrawer()" class="p-1.5 rounded text-paper-200 hover:text-white hover:bg-ink-800 transition-colors cursor-pointer" aria-label="Close Drawer">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- Active User Card in Drawer -->
      <div class="flex items-center gap-2.5 pt-2 border-t border-ink-700">
        <img id="drawer-user-avatar" src="https://ui-avatars.com/api/?name=Sachin+Gosain&background=14213D&color=FAF6EE" class="w-9 h-9 rounded-full border border-paper-300 shrink-0" alt="Avatar">
        <div class="flex-1 min-w-0">
          <div class="font-bold text-xs text-white truncate" id="drawer-user-name">Sachin Gosain</div>
          <div class="text-[10px] text-paper-300 truncate" id="drawer-user-role">SSO / DIID · SSS Cadre</div>
          <div class="text-[9px] font-mono text-emerald-400">● Online · MoSPI Verified</div>
        </div>
      </div>
    </div>

    <!-- Navigation Links Scroll Area -->
    <div class="flex-1 overflow-y-auto p-3 space-y-1 text-xs touch-scroll">
      <div class="text-[10px] font-mono font-bold uppercase text-ink-400 px-2 py-1">Core Learning & Diagnostics</div>
      <a href="#dashboard" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <svg class="w-4 h-4 text-ink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
        <span>Officer Dashboard</span>
      </a>
      <a href="#onboarding" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center justify-between px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          <span>Profile Calibrator</span>
        </div>
        <span class="text-[9px] font-mono px-1 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">AUTO</span>
      </a>
      <a href="#gaps" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <svg class="w-4 h-4 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        <span>Skill-Gap Matrix</span>
      </a>
      <a href="#pathways" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <svg class="w-4 h-4 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 2.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0 0 1.832l8.57 7.908a2 2 0 0 0 1.66 0l8.57-7.908a1 1 0 0 0 .02-.994z"/></svg>
        <span>Learning Pathways</span>
      </a>
      <a href="#assessment" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <svg class="w-4 h-4 text-saffron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        <span>Assessments Player</span>
      </a>

      <div class="text-[10px] font-mono font-bold uppercase text-ink-400 px-2 py-1 pt-3">Interactive Workbenches</div>
      <a href="#trainer" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center justify-between px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4 text-chakra" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 13h4"/><path d="M10 17h4"/></svg>
          <span>Trainer Studio</span>
        </div>
        <span class="text-[9px] font-mono px-1 rounded bg-saffron-100 text-saffron-800 font-bold">NSSTA</span>
      </a>
      <a href="#labs" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
        <span>Virtual Microdata Labs</span>
      </a>
      <a href="#assistant" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <svg class="w-4 h-4 text-chakra" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        <span>Kaushal AI Copilot Studio</span>
      </a>

      <div class="text-[10px] font-mono font-bold uppercase text-ink-400 px-2 py-1 pt-3">Governance &amp; System</div>
      <a href="#admin" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center justify-between px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4 text-ink-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
          <span>Admin Analytics</span>
        </div>
        <span class="text-[9px] font-mono px-1 rounded bg-chakra-100 text-chakra-800 font-bold">MoSPI</span>
      </a>
      <a href="#audit" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <svg class="w-4 h-4 text-ink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
        <span>Compliance Audit Log</span>
      </a>
      <a href="#design-system" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink-800 hover:bg-paper-100 font-medium transition-colors">
        <svg class="w-4 h-4 text-saffron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
        <span>Living Design System</span>
      </a>

      <div class="border-t border-ink-100 pt-2 my-2"></div>
      <a href="#login" onclick="toggleMobileDrawer()" class="drawer-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-chakra hover:bg-chakra-50 font-bold transition-colors">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 16v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/><polyline points="10 12 20 12 17 9 17 15"/></svg>
        <span>Login / Switch Account</span>
      </a>
      <button type="button" onclick="handleSignOut(); toggleMobileDrawer();" class="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-coral-700 hover:bg-coral-50 font-semibold transition-colors cursor-pointer">
        <svg class="w-4 h-4 text-coral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span>Sign Out of Platform</span>
      </button>
    </div>

    <!-- Drawer Footer -->
    <div class="p-3 bg-paper-100 border-t border-ink-200 text-center text-[10px] text-ink-500 font-mono">
      Ministry of Statistics &amp; Programme Implementation<br>
      Data Informatics &amp; Innovation Division (DIID)
    </div>
  </aside>`;
html = html.replace(oldHeaderEnd, mobileDrawerHTML);

// 6. Update <main> padding for mobile bottom bar
const oldMainTag = '<main class="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-24 md:pb-12">';
const newMainTag = '<main class="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-28 md:pb-12">';
html = html.replace(oldMainTag, newMainTag);

// 7. Make #view-login the First Dedicated Separate Page
// Let's replace view-login with an ultra-clean, full-page official authentication gateway
const viewLoginPattern = /<!-- VIEW 2: PRODUCTION GOOGLE \/ GMAIL LOGIN & PARICHAY SSO -->[\s\S]*?<\/section>\s*<!-- VIEW 2.5: ONBOARDING/;

const newViewLoginHTML = `<!-- VIEW 2: DEDICATED FIRST SEPARATE LOGIN & AUTHENTICATION GATEWAY -->
      <section id="view-login" class="app-view space-y-6 max-w-2xl mx-auto pt-2 pb-8">
        
        <!-- Official Government Crest & Gateway Welcome Banner -->
        <div class="text-center space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] sm:text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>भारत सरकार · GOVERNMENT OF INDIA · MoSPI</span>
          </div>
          <h1 class="font-serif font-bold text-2xl sm:text-3xl text-ink-950 tracking-tight">
            Kaushal Setu <span class="text-saffron font-devanagari font-normal">(कौशल सेतु)</span>
          </h1>
          <p class="text-xs sm:text-sm text-ink-600 max-w-md mx-auto leading-relaxed">
            National Statistical System AI Competency Intelligence &amp; Adaptive Learning Framework. Official gateway for 8,500+ ISS &amp; SSS personnel.
          </p>
        </div>

        <!-- Active Authenticated Session Banner (Shown if already logged in) -->
        <div id="login-active-session-banner" class="hidden gov-card p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-white border border-emerald-300 rounded-xl space-y-3 shadow-sm">
          <div class="flex items-center gap-3">
            <img id="login-active-avatar" src="https://ui-avatars.com/api/?name=Sachin+Gosain&background=14213D&color=FAF6EE" class="w-11 h-11 rounded-full border-2 border-emerald-400 shrink-0" alt="Avatar">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span class="text-[10px] font-mono font-bold text-emerald-800 uppercase">Authenticated Session Active</span>
              </div>
              <div class="text-sm font-bold text-ink-950 truncate" id="login-active-name">Sachin Gosain</div>
              <div class="text-[11px] text-ink-600 truncate font-mono" id="login-active-email">gosainsachin7@gmail.com · SSO / DIID</div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <a href="#dashboard" class="w-full sm:flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg text-center transition-colors shadow-xs flex items-center justify-center gap-2">
              <span>Enter Officer Dashboard</span>
              <span>→</span>
            </a>
            <button type="button" onclick="handleSignOut()" class="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-paper-100 text-ink-700 border border-ink-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
              Switch Account
            </button>
          </div>
        </div>

        <!-- Auth Method Selector Tabs -->
        <div class="flex items-center justify-center p-1 bg-paper-200 rounded-xl border border-ink-200">
          <button type="button" onclick="switchLoginTab('google')" id="tab-login-google" class="flex-1 py-2.5 text-xs font-bold rounded-lg bg-white text-ink-950 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer touch-target">
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google / Gmail Sign-In</span>
          </button>
          <button type="button" onclick="switchLoginTab('parichay')" id="tab-login-parichay" class="flex-1 py-2.5 text-xs font-semibold rounded-lg text-ink-600 hover:text-ink-950 flex items-center justify-center gap-2 transition-all cursor-pointer touch-target">
            <svg class="w-4 h-4 text-chakra" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>Jan Parichay SSO</span>
          </button>
        </div>

        <!-- TAB 1: GOOGLE SIGN-IN CARD -->
        <div id="panel-login-google" class="gov-card p-5 sm:p-8 bg-white space-y-6 shadow-md border border-ink-200 rounded-xl">
          <!-- Google Header -->
          <div class="text-center space-y-1 pb-1">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-paper-50 border border-ink-200 shadow-inner mb-1">
              <svg class="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
            <h2 class="font-serif font-bold text-xl sm:text-2xl text-ink-950">Sign in with Google</h2>
            <p class="text-xs text-ink-600">to continue to <strong>Kaushal Setu Official Statistical Portal</strong></p>
          </div>

          <!-- Quick One-Tap Account Picker for Instant Evaluation -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-mono font-bold uppercase text-ink-400">1-Tap Select Cadre Account</span>
              <span class="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Instant Access</span>
            </div>
            <div class="space-y-2">
              <div onclick="quickSelectGoogleAccount('gosainsachin7@gmail.com', 'Sachin Gosain', 'Senior Statistical Officer', 'LEARNER')" class="p-3 rounded-lg border border-ink-200 bg-paper-50 hover:bg-white hover:border-chakra cursor-pointer transition-all flex items-center justify-between group touch-target">
                <div class="flex items-center gap-3 min-w-0">
                  <img src="https://ui-avatars.com/api/?name=Sachin+Gosain&background=14213D&color=FAF6EE" class="w-8 h-8 rounded-full border border-ink-300 shrink-0" alt="Sachin">
                  <div class="min-w-0">
                    <div class="font-bold text-xs text-ink-950 group-hover:text-chakra truncate">Sachin Gosain</div>
                    <div class="text-[11px] text-ink-500 font-mono truncate">gosainsachin7@gmail.com</div>
                  </div>
                </div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-chakra-50 text-chakra-800 font-semibold border border-chakra-200 shrink-0">SSO / DIID</span>
              </div>

              <div onclick="quickSelectGoogleAccount('ragini.nssta@gmail.com', 'Ms. Ragini Kumari', 'Course Director & Faculty', 'TRAINER')" class="p-3 rounded-lg border border-ink-200 bg-paper-50 hover:bg-white hover:border-saffron cursor-pointer transition-all flex items-center justify-between group touch-target">
                <div class="flex items-center gap-3 min-w-0">
                  <img src="https://ui-avatars.com/api/?name=Ragini+Kumari&background=F28C28&color=FFFFFF" class="w-8 h-8 rounded-full border border-ink-300 shrink-0" alt="Ragini">
                  <div class="min-w-0">
                    <div class="font-bold text-xs text-ink-950 group-hover:text-saffron-700 truncate">Ms. Ragini Kumari</div>
                    <div class="text-[11px] text-ink-500 font-mono truncate">ragini.nssta@gmail.com</div>
                  </div>
                </div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-saffron-50 text-saffron-800 font-semibold border border-saffron-200 shrink-0">Faculty / NSSTA</span>
              </div>

              <div onclick="quickSelectGoogleAccount('dg.mospi@nic.in', 'Dr. G. P. Samanta', 'Director General & CSI', 'ADMIN')" class="p-3 rounded-lg border border-ink-200 bg-paper-50 hover:bg-white hover:border-ink-900 cursor-pointer transition-all flex items-center justify-between group touch-target">
                <div class="flex items-center gap-3 min-w-0">
                  <img src="https://ui-avatars.com/api/?name=G+P+Samanta&background=0F8B6D&color=FFFFFF" class="w-8 h-8 rounded-full border border-ink-300 shrink-0" alt="DG">
                  <div class="min-w-0">
                    <div class="font-bold text-xs text-ink-950 group-hover:text-ink-900 truncate">Dr. G. P. Samanta</div>
                    <div class="text-[11px] text-ink-500 font-mono truncate">dg.mospi@nic.in</div>
                  </div>
                </div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 shrink-0">Admin / CSI</span>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="relative flex items-center justify-center my-3">
            <div class="border-t border-ink-200 w-full"></div>
            <span class="bg-white px-3 text-[10px] font-mono text-ink-400 uppercase">Or Sign In with Official Email</span>
          </div>

          <!-- Manual Email & Password Form -->
          <form onsubmit="handleGoogleFormSubmit(event)" class="space-y-4">
            <div class="space-y-1.5">
              <label for="inp-google-email" class="block text-xs font-semibold text-ink-800">Email or Phone</label>
              <input type="email" id="inp-google-email" required value="gosainsachin7@gmail.com" placeholder="name@gmail.com or official email" class="w-full p-3 text-xs rounded-lg border border-ink-300 focus:outline-none focus:border-chakra focus:ring-1 focus:ring-chakra touch-target">
            </div>

            <div class="space-y-1.5">
              <label for="inp-google-pass" class="block text-xs font-semibold text-ink-800">Password</label>
              <input type="password" id="inp-google-pass" value="moSPI@2026Secure" placeholder="Enter password" class="w-full p-3 text-xs rounded-lg border border-ink-300 focus:outline-none focus:border-chakra focus:ring-1 focus:ring-chakra touch-target">
            </div>

            <!-- Login Status Toast -->
            <div id="login-status-box" class="hidden p-3 rounded-lg text-xs font-medium"></div>

            <button type="submit" id="btn-google-submit" class="w-full py-3 bg-ink-900 hover:bg-chakra text-white text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer touch-target">
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span id="txt-google-submit">Continue with Google Account</span>
            </button>
          </form>

          <!-- Guest Mode Instant Preview Access (Zero Friction) -->
          <div class="pt-2 border-t border-ink-100 space-y-1.5">
            <button type="button" onclick="setGuestSession()" class="w-full py-2.5 bg-paper-100 hover:bg-paper-200 text-ink-900 border border-ink-300 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer touch-target">
              <span>✦ Explore Platform as Guest / Reviewer (Skip Login)</span>
              <span class="text-ink-400">→</span>
            </button>
            <p class="text-[10px] text-center text-ink-500 font-mono">
              Direct access mode for evaluators — Test AI Copilot &amp; Virtual Labs without credentials.
            </p>
          </div>

          <!-- Security Footnote -->
          <div class="pt-2 border-t border-ink-100 text-[10px] text-ink-500 text-center leading-relaxed font-mono">
            Protected by Google OAuth 2.0 Federation &amp; DPDP Act 2023 compliance.<br>
            Authorized Indian Statistical Service (ISS) &amp; SSS personnel only.
          </div>
        </div>

        <!-- TAB 2: JAN PARICHAY SSO CARD -->
        <div id="panel-login-parichay" class="gov-card p-5 sm:p-8 bg-white space-y-5 hidden shadow-md border border-ink-200 rounded-xl">
          <div class="text-center space-y-1 border-b border-ink-100 pb-3">
            <span class="text-xs font-mono px-3 py-1 rounded-full bg-paper-100 text-ink-700">Jan Parichay National Single Sign-On</span>
            <h2 class="font-serif font-bold text-xl sm:text-2xl text-ink-950">Official MoSPI Cadre Profiles</h2>
            <p class="text-xs text-ink-600">Directly access pre-configured statistical cadre designations:</p>
          </div>

          <div class="space-y-3">
            <div onclick="switchRole('LEARNER', 'Sachin Gosain (SSO / DIID)')" class="p-4 rounded-lg border border-ink-200 bg-paper-50 hover:bg-white cursor-pointer hover:border-chakra transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 touch-target">
              <div>
                <div class="font-bold text-sm text-ink-950">Sachin Gosain</div>
                <div class="text-xs text-ink-600">Senior Statistical Officer · DIID · SSS Cadre</div>
                <div class="text-[11px] font-mono text-ink-500 mt-0.5">Identified Gaps: Survey Design (L2→L4), National Accounts (L3→L4)</div>
              </div>
              <span class="px-3 py-1.5 bg-chakra text-white text-xs font-semibold rounded self-start sm:self-center">Launch Learner</span>
            </div>

            <div onclick="switchRole('TRAINER', 'Ms. Ragini Kumari (Faculty / NSSTA)')" class="p-4 rounded-lg border border-ink-200 bg-paper-50 hover:bg-white cursor-pointer hover:border-saffron transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 touch-target">
              <div>
                <div class="font-bold text-sm text-ink-950">Ms. Ragini Kumari</div>
                <div class="text-xs text-ink-600">Assistant Professor &amp; Course Director · NSSTA Greater Noida</div>
                <div class="text-[11px] font-mono text-ink-500 mt-0.5">Permissions: Document Upload, AI MCQ Generation, Cohort Publishing</div>
              </div>
              <span class="px-3 py-1.5 bg-saffron text-white text-xs font-semibold rounded self-start sm:self-center">Launch Trainer</span>
            </div>

            <div onclick="switchRole('ADMIN', 'Dr. G. P. Samanta (DG Statistics)')" class="p-4 rounded-lg border border-ink-200 bg-paper-50 hover:bg-white cursor-pointer hover:border-ink-900 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 touch-target">
              <div>
                <div class="font-bold text-sm text-ink-950">Dr. G. P. Samanta</div>
                <div class="text-xs text-ink-600">Director General (Statistics) / Chief Statistician of India · MoSPI HQ</div>
                <div class="text-[11px] font-mono text-ink-500 mt-0.5">Permissions: Heatmaps, Pre/Post Gain Analysis, Forecasting Model</div>
              </div>
              <span class="px-3 py-1.5 bg-ink-900 text-white text-xs font-semibold rounded self-start sm:self-center">Launch Admin</span>
            </div>
          </div>
        </div>

        <!-- KEY PLATFORM HIGHLIGHTS (Easy-to-understand features overview) -->
        <div class="pt-4 space-y-3">
          <div class="text-center">
            <span class="text-[11px] font-mono font-bold uppercase text-ink-400">Core Pillars of Kaushal Setu</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="gov-card p-3.5 bg-white space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-base">📊</span>
                <span class="font-bold text-xs text-ink-950">Skill-Gap Benchmarking</span>
              </div>
              <p class="text-[11px] text-ink-600 leading-snug">
                Evaluates 33 competencies across 4 domains (Statistical, Technical, Governance, Behavioural) mapped to 6 MoSPI divisions.
              </p>
            </div>
            <div class="gov-card p-3.5 bg-white space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-base">✦</span>
                <span class="font-bold text-xs text-chakra">Kaushal AI Copilot</span>
              </div>
              <p class="text-[11px] text-ink-600 leading-snug">
                Converts plain natural language questions into verified SQLite queries for PLFS survey microdata.
              </p>
            </div>
            <div class="gov-card p-3.5 bg-white space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-base">🧪</span>
                <span class="font-bold text-xs text-emerald-700">Virtual Microdata Labs</span>
              </div>
              <p class="text-[11px] text-ink-600 leading-snug">
                Zero-setup analytical sandbox to query anonymized PLFS microdata and simulate cluster sampling variance.
              </p>
            </div>
            <div class="gov-card p-3.5 bg-white space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-base">🎓</span>
                <span class="font-bold text-xs text-saffron-700">Blended Pathways</span>
              </div>
              <p class="text-[11px] text-ink-600 leading-snug">
                Harmonizes iGOT Karmayogi online micro-courses with NSSTA Greater Noida residential masterclasses.
              </p>
            </div>
          </div>
        </div>

      </section>

      <!-- VIEW 2.5: ONBOARDING`;

html = html.replace(viewLoginPattern, newViewLoginHTML);

// 8. Replace Old Mobile Bottom Nav with Android Native Bottom Nav
const oldBottomNavPattern = /<!-- FIXED BOTTOM NAVIGATION ON MOBILE[\s\S]*?<\/nav>/;
const newBottomNavHTML = `<!-- ANDROID / MOBILE NATIVE BOTTOM NAVIGATION BAR (md:hidden) -->
  <nav id="mobile-bottom-nav" class="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-ink-200 md:hidden flex items-center justify-around px-1 py-1 shadow-lg pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-transform">
    <!-- 1. Dashboard -->
    <a href="#dashboard" class="mobile-nav-item flex flex-col items-center justify-center flex-1 py-1 text-center text-ink-600 hover:text-ink-950 transition-colors touch-target" data-view="dashboard">
      <svg class="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
      </svg>
      <span class="text-[10px] font-medium leading-none">Dashboard</span>
    </a>

    <!-- 2. Pathways -->
    <a href="#pathways" class="mobile-nav-item flex flex-col items-center justify-center flex-1 py-1 text-center text-ink-600 hover:text-ink-950 transition-colors touch-target" data-view="pathways">
      <svg class="w-5 h-5 mb-0.5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 2.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0 0 1.832l8.57 7.908a2 2 0 0 0 1.66 0l8.57-7.908a1 1 0 0 0 .02-.994z"/>
      </svg>
      <span class="text-[10px] font-medium leading-none">Pathways</span>
    </a>

    <!-- 3. Elevated AI Copilot Center Button -->
    <a href="#assistant" class="mobile-nav-item flex flex-col items-center justify-center flex-1 py-0.5 text-center transition-all transform -translate-y-2 group" data-view="assistant">
      <div class="w-11 h-11 rounded-full bg-chakra shadow-md flex items-center justify-center text-white border-2 border-white group-active:scale-95 transition-transform">
        <span class="text-base font-bold text-saffron">✦</span>
      </div>
      <span class="text-[10px] font-bold text-chakra leading-none mt-0.5">AI Copilot</span>
    </a>

    <!-- 4. Virtual Labs -->
    <a href="#labs" class="mobile-nav-item flex flex-col items-center justify-center flex-1 py-1 text-center text-ink-600 hover:text-ink-950 transition-colors touch-target" data-view="labs">
      <svg class="w-5 h-5 mb-0.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
      </svg>
      <span class="text-[10px] font-medium leading-none">Labs</span>
    </a>

    <!-- 5. Mobile Drawer Trigger (More) -->
    <button type="button" onclick="toggleMobileDrawer()" class="flex flex-col items-center justify-center flex-1 py-1 text-center text-ink-600 hover:text-ink-950 transition-colors cursor-pointer touch-target" aria-label="Open More Modules">
      <svg class="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
      </svg>
      <span class="text-[10px] font-medium leading-none">More</span>
    </button>
  </nav>`;
html = html.replace(oldBottomNavPattern, newBottomNavHTML);

// 9. Floating AI Copilot repositioning so it sits cleanly above mobile bottom nav
const oldFloatingAiPos = '<div id="floating-ai-copilot" class="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">';
const newFloatingAiPos = '<div id="floating-ai-copilot" class="fixed bottom-20 right-3 md:bottom-6 md:right-6 z-40 flex flex-col items-end pointer-events-auto">';
html = html.replace(oldFloatingAiPos, newFloatingAiPos);

const oldAiDrawerClass = '<div id="ai-drawer" class="hidden w-[350px] sm:w-[400px] h-[520px] bg-white rounded-xl shadow-2xl border border-ink-300 flex flex-col overflow-hidden mb-3.5 transition-all">';
const newAiDrawerClass = '<div id="ai-drawer" class="hidden w-[calc(100vw-24px)] max-w-md h-[72vh] md:w-[400px] md:h-[520px] bg-white rounded-2xl shadow-2xl border border-ink-300 flex flex-col overflow-hidden mb-3 transition-all">';
html = html.replace(oldAiDrawerClass, newAiDrawerClass);

// 10. Router & Javascript Helpers Update
// Replace router logic in <script>
const oldRouterPattern = /\/\/ Router[\s\S]*?window\.addEventListener\('hashchange', navigate\);/;

const newRouterCode = `// Mobile Drawer Toggle
    function toggleMobileDrawer() {
      const drawer = document.getElementById('mobile-drawer');
      const overlay = document.getElementById('mobile-drawer-overlay');
      if (drawer && overlay) {
        const isOpen = !drawer.classList.contains('-translate-x-full');
        if (isOpen) {
          drawer.classList.add('-translate-x-full');
          overlay.classList.add('hidden');
          document.body.style.overflow = '';
        } else {
          drawer.classList.remove('-translate-x-full');
          overlay.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      }
    }

    // Guest Mode Session Setup (Zero Friction Access)
    function setGuestSession() {
      currentUser = {
        id: 'user-guest',
        name: 'Guest Officer (Reviewer)',
        email: 'guest.reviewer@mospi.gov.in',
        cadre: 'SSS',
        designation: 'Reviewer / Statistical Officer',
        division: 'DIID',
        role: 'LEARNER',
        avatar: 'https://ui-avatars.com/api/?name=Guest+Officer&background=2C3E9E&color=FAF6EE'
      };
      localStorage.setItem('kaushal_auth', JSON.stringify(currentUser));
      updateHeaderUserUI();
      window.location.hash = '#dashboard';
      loadData();
    }

    // Active Navigation Synchronization
    function updateNavActiveStates(currentView) {
      // Desktop Sidebar
      document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#' + currentView) {
          link.classList.add('bg-paper-200', 'font-bold', 'text-ink-950');
          link.classList.remove('text-ink-700');
        } else {
          link.classList.remove('bg-paper-200', 'font-bold', 'text-ink-950');
          link.classList.add('text-ink-700');
        }
      });

      // Mobile Bottom Navigation Bar
      document.querySelectorAll('.mobile-nav-item').forEach(item => {
        const view = item.getAttribute('data-view');
        if (view === currentView) {
          item.classList.add('text-chakra', 'font-bold');
          item.classList.remove('text-ink-600');
        } else {
          item.classList.remove('text-chakra', 'font-bold');
          item.classList.add('text-ink-600');
        }
      });

      // Mobile Slide-over Drawer
      document.querySelectorAll('.drawer-nav-link').forEach(item => {
        const href = item.getAttribute('href');
        if (href === '#' + currentView) {
          item.classList.add('bg-paper-200', 'font-bold', 'text-chakra');
          item.classList.remove('text-ink-800');
        } else {
          item.classList.remove('bg-paper-200', 'font-bold', 'text-chakra');
          item.classList.add('text-ink-800');
        }
      });
    }

    // Router - First Separate Page is #login
    function navigate() {
      let raw = window.location.hash;
      const storedAuth = localStorage.getItem('kaushal_auth');

      // If no hash or empty hash, the dedicated first separate page is #login!
      if (!raw || raw === '#' || raw === '') {
        raw = '#login';
      }
      
      const cleanHash = raw.replace(/^#\\/?/, '').split('?')[0] || 'login';
      const viewId = 'view-' + cleanHash;
      
      document.querySelectorAll('.app-view').forEach(el => el.classList.remove('active'));
      let activeEl = document.getElementById(viewId);
      if (!activeEl) {
        activeEl = document.getElementById('view-login');
      }
      if (activeEl) {
        activeEl.classList.add('active');
      }

      // Update Active Navigation States
      updateNavActiveStates(cleanHash);

      // On dedicated #login view, hide sidebar and mobile bottom nav for clean, focused authentication
      const sidebar = document.getElementById('app-sidebar');
      const mobileBottomNav = document.getElementById('mobile-bottom-nav');
      if (cleanHash === 'login' || cleanHash === 'landing') {
        if (sidebar) sidebar.classList.add('hidden');
        if (mobileBottomNav) mobileBottomNav.classList.add('hidden');
      } else {
        if (sidebar) sidebar.classList.remove('hidden');
        if (mobileBottomNav) mobileBottomNav.classList.remove('hidden');
      }

      window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', navigate);`;

html = html.replace(oldRouterPattern, newRouterCode);

// 11. Update updateHeaderUserUI to also refresh active session banner on #login and drawer profile
const oldUpdateUI = `function updateHeaderUserUI() {
      const avatarEl = document.getElementById('header-user-avatar');
      const nameEl = document.getElementById('header-user-name');
      const roleEl = document.getElementById('header-user-role');
      const menuNameEl = document.getElementById('menu-user-name');
      const menuEmailEl = document.getElementById('menu-user-email');

      if (avatarEl) avatarEl.src = currentUser.avatar || \`https://ui-avatars.com/api/?name=\${encodeURIComponent(currentUser.name)}&background=14213D&color=FAF6EE\`;
      if (nameEl) nameEl.innerText = currentUser.name;
      if (roleEl) roleEl.innerText = \`\${currentUser.designation || 'Officer'} · \${currentUser.division || 'DIID'}\`;
      if (menuNameEl) menuNameEl.innerText = currentUser.name;
      if (menuEmailEl) menuEmailEl.innerText = currentUser.email || 'gosainsachin7@gmail.com';
    }`;

const newUpdateUI = `function updateHeaderUserUI() {
      const avatarEl = document.getElementById('header-user-avatar');
      const nameEl = document.getElementById('header-user-name');
      const roleEl = document.getElementById('header-user-role');
      const menuNameEl = document.getElementById('menu-user-name');
      const menuEmailEl = document.getElementById('menu-user-email');
      
      const drawerAvatar = document.getElementById('drawer-user-avatar');
      const drawerName = document.getElementById('drawer-user-name');
      const drawerRole = document.getElementById('drawer-user-role');

      const loginActiveBanner = document.getElementById('login-active-session-banner');
      const loginActiveAvatar = document.getElementById('login-active-avatar');
      const loginActiveName = document.getElementById('login-active-name');
      const loginActiveEmail = document.getElementById('login-active-email');

      const avUrl = currentUser.avatar || \`https://ui-avatars.com/api/?name=\${encodeURIComponent(currentUser.name)}&background=14213D&color=FAF6EE\`;

      if (avatarEl) avatarEl.src = avUrl;
      if (nameEl) nameEl.innerText = currentUser.name;
      if (roleEl) roleEl.innerText = \`\${currentUser.designation || 'Officer'} · \${currentUser.division || 'DIID'}\`;
      if (menuNameEl) menuNameEl.innerText = currentUser.name;
      if (menuEmailEl) menuEmailEl.innerText = currentUser.email || 'gosainsachin7@gmail.com';

      if (drawerAvatar) drawerAvatar.src = avUrl;
      if (drawerName) drawerName.innerText = currentUser.name;
      if (drawerRole) drawerRole.innerText = \`\${currentUser.designation || 'Officer'} · \${currentUser.division || 'DIID'}\`;

      // Check if user has an active authenticated session
      const storedAuth = localStorage.getItem('kaushal_auth');
      if (storedAuth && loginActiveBanner) {
        loginActiveBanner.classList.remove('hidden');
        if (loginActiveAvatar) loginActiveAvatar.src = avUrl;
        if (loginActiveName) loginActiveName.innerText = currentUser.name;
        if (loginActiveEmail) loginActiveEmail.innerText = \`\${currentUser.email} · \${currentUser.designation || 'Officer'}\`;
      } else if (loginActiveBanner) {
        loginActiveBanner.classList.add('hidden');
      }
    }`;

html = html.replace(oldUpdateUI, newUpdateUI);

// 12. Add Feature Explanation / Guide Chips to each core view
// A. View Dashboard
const oldDashHeader = `<section id="view-dashboard" class="app-view space-y-6">`;
const newDashHeader = `<section id="view-dashboard" class="app-view space-y-5">
        <!-- Feature Guide Chip (Easy to understand for mobile officers) -->
        <div class="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-paper-100 to-white border border-ink-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div class="flex items-start gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-chakra-50 border border-chakra-200 text-chakra flex items-center justify-center shrink-0 font-bold text-sm">
              📊
            </div>
            <div>
              <div class="font-bold text-xs sm:text-sm text-ink-950">Official Competency Dashboard</div>
              <p class="text-[11px] sm:text-xs text-ink-600 leading-snug mt-0.5">
                Tracks role benchmarks across 6 MoSPI divisions, monitors your learning streak, and synthesizes personalized skill-deficit trajectories.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
            <a href="#gaps" class="text-[11px] font-bold text-chakra hover:underline flex items-center gap-1">
              <span>Diagnose Gaps →</span>
            </a>
          </div>
        </div>`;
html = html.replace(oldDashHeader, newDashHeader);

// B. View Gaps
const oldGapsHeader = `<section id="view-gaps" class="app-view space-y-6">`;
const newGapsHeader = `<section id="view-gaps" class="app-view space-y-5">
        <!-- Feature Guide Chip -->
        <div class="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-paper-100 to-white border border-ink-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div class="flex items-start gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-coral-50 border border-coral-200 text-coral flex items-center justify-center shrink-0 font-bold text-sm">
              🎯
            </div>
            <div>
              <div class="font-bold text-xs sm:text-sm text-ink-950">MoSPI 4-Domain Skill-Gap Matrix</div>
              <p class="text-[11px] sm:text-xs text-ink-600 leading-snug mt-0.5">
                Compares your evaluated level (L1–L5) against mandatory cadre standards (ISS/SSS). Red indicators highlight high-priority skill deficits.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
            <a href="#pathways" class="text-[11px] font-bold text-sky-700 hover:underline flex items-center gap-1">
              <span>View Pathways →</span>
            </a>
          </div>
        </div>`;
html = html.replace(oldGapsHeader, newGapsHeader);

// C. View Pathways
const oldPathwaysHeader = `<section id="view-pathways" class="app-view space-y-6">`;
const newPathwaysHeader = `<section id="view-pathways" class="app-view space-y-5">
        <!-- Feature Guide Chip -->
        <div class="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-paper-100 to-white border border-ink-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div class="flex items-start gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center shrink-0 font-bold text-sm">
              🗺️
            </div>
            <div>
              <div class="font-bold text-xs sm:text-sm text-ink-950">Blended Learning Pathways (iGOT + NSSTA)</div>
              <p class="text-[11px] sm:text-xs text-ink-600 leading-snug mt-0.5">
                Curated training tracks combining self-paced micro-learning on iGOT Karmayogi with hands-on residential masterclasses at NSSTA Greater Noida.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
            <a href="#labs" class="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1">
              <span>Virtual Labs →</span>
            </a>
          </div>
        </div>`;
html = html.replace(oldPathwaysHeader, newPathwaysHeader);

// D. View Labs
const oldLabsHeader = `<section id="view-labs" class="app-view space-y-6">`;
const newLabsHeader = `<section id="view-labs" class="app-view space-y-5">
        <!-- Feature Guide Chip -->
        <div class="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-paper-100 to-white border border-ink-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div class="flex items-start gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-sm">
              🧪
            </div>
            <div>
              <div class="font-bold text-xs sm:text-sm text-ink-950">Virtual Microdata Laboratories</div>
              <p class="text-[11px] sm:text-xs text-ink-600 leading-snug mt-0.5">
                Run SQL queries directly on real anonymized PLFS and NSS survey microdata, test sampling multiplier formulas, and simulate survey frames.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
            <a href="#assistant" class="text-[11px] font-bold text-chakra hover:underline flex items-center gap-1">
              <span>Ask AI Copilot →</span>
            </a>
          </div>
        </div>`;
html = html.replace(oldLabsHeader, newLabsHeader);

// Save updated HTML
fs.writeFileSync(indexPath, html, 'utf-8');
console.log('Successfully updated public/index.html with mobile optimizations, drawer, bottom navigation, and dedicated separate login page.');
