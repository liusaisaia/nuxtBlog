<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --bg: #f5f6fb;
  --bg-soft: #eef1f8;
  --surface: rgba(255, 255, 255, 0.82);
  --surface-strong: rgba(255, 255, 255, 0.94);
  --text: #141726;
  --text-soft: #4f5875;
  --text-mute: #6f7894;
  --line: rgba(71, 81, 123, 0.18);
  --line-strong: rgba(71, 81, 123, 0.28);
  --brand: #4555d8;
  --brand-soft: rgba(69, 85, 216, 0.12);
  --shadow: 0 14px 40px rgba(28, 34, 69, 0.08);
}

html.dark {
  --bg: #080a13;
  --bg-soft: #0f1322;
  --surface: rgba(17, 22, 39, 0.78);
  --surface-strong: rgba(17, 22, 39, 0.92);
  --text: #f5f7ff;
  --text-soft: #b8c1de;
  --text-mute: #8a95b8;
  --line: rgba(157, 173, 228, 0.2);
  --line-strong: rgba(157, 173, 228, 0.34);
  --brand: #7c89ff;
  --brand-soft: rgba(124, 137, 255, 0.16);
  --shadow: 0 20px 52px rgba(2, 4, 10, 0.55);
}

html {
  scroll-behavior: smooth;
}

html:not(.dark) {
  color-scheme: light;
}

html.dark {
  color-scheme: dark;
}

body {
  background: radial-gradient(circle at 8% 0%, rgba(69, 85, 216, 0.14), transparent 34%),
    radial-gradient(circle at 95% 12%, rgba(33, 191, 173, 0.1), transparent 40%),
    var(--bg);
  color: var(--text);
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
  transition: background-color 240ms ease, color 240ms ease;
  @apply antialiased font-sans;
}

::selection {
  background: var(--brand-soft);
}

.container-page {
  max-width: 1180px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}

.container-wide {
  max-width: 1400px;
}

.layout-shell {
  width: min(1400px, calc(100vw - 3rem));
  margin-inline: auto;
}

@media (min-width: 768px) {
  .container-page {
    padding-inline: 2rem;
  }

  .layout-shell {
    width: min(1400px, calc(100vw - 4rem));
  }
}

.surface {
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  backdrop-filter: blur(12px);
}

.surface-strong {
  background: var(--surface-strong);
  border: 1px solid var(--line-strong);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
}

.text-soft {
  color: var(--text-soft);
}

.text-mute {
  color: var(--text-mute);
}

.brand-chip {
  background: var(--brand-soft);
  color: var(--brand);
}

.border-soft {
  border-color: var(--line);
}

.border-strong {
  border-color: var(--line-strong);
}

.themed-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: var(--surface-strong);
  color: var(--text);
  border: 1px solid var(--line);
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.themed-select:hover {
  border-color: var(--line-strong);
}

.themed-select:focus-visible {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-soft);
}

.themed-select option {
  background: var(--bg-soft);
  color: var(--text);
}

html:not(.dark) .themed-select {
  color-scheme: light;
}

html.dark .themed-select {
  color-scheme: dark;
}

.motion-rise {
  animation: rise 560ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.motion-fade {
  animation: fade-in 520ms ease both;
}

.headline-typewriter {
  display: inline-block;
  width: 0;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
  border-right: 2px solid currentColor;
  animation:
    headline-typing 2s steps(var(--type-steps, 8), end) 0.2s forwards,
    caret-blink 900ms steps(1, end) 3;
}

.headline-art {
  background-image: linear-gradient(110deg, #9ea8ff 0%, #6f7cff 35%, #65e0ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  -webkit-text-stroke: 0;
  text-shadow: none;
}

.reveal-stagger > * {
  opacity: 0;
  transform: translateY(12px);
  animation: rise 560ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.reveal-stagger > *:nth-child(2) {
  animation-delay: 90ms;
}

.reveal-stagger > *:nth-child(3) {
  animation-delay: 180ms;
}

.reveal-stagger > *:nth-child(4) {
  animation-delay: 270ms;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes headline-typing {
  from {
    width: 0;
  }
  to {
    width: calc(var(--type-ch, 8) * 1em);
  }
}

@keyframes caret-blink {
  0%,
  49% {
    border-right-color: currentColor;
  }
  50%,
  100% {
    border-right-color: transparent;
  }
}

.prose {
  color: var(--text-soft);
  line-height: 1.82;
}

.article-prose :where(p, li) {
  text-wrap: pretty;
}

.prose :where(h1, h2, h3, h4) {
  color: var(--text);
  letter-spacing: -0.02em;
}

.article-prose :where(h2, h3) {
  margin-top: 1.9em;
  margin-bottom: 0.65em;
}

.prose :where(:not(pre) > code) {
  background: var(--brand-soft);
  color: var(--brand);
  border-radius: 0.4rem;
  padding: 0.16rem 0.38rem;
}

.prose :where(pre) {
  border: 1px solid var(--line);
  border-radius: 0.85rem;
  background: var(--bg-soft);
  overflow-x: auto;
  padding: 1rem 1.1rem;
}

.prose :where(pre code) {
  background: transparent;
  color: inherit;
  border-radius: 0;
  padding: 0;
}

.prose :where(blockquote) {
  border-left-color: var(--brand);
  color: var(--text-soft);
}

.prose :where(a) {
  color: var(--brand);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  * {
    animation: none !important;
    transition-duration: 0ms !important;
  }

  .headline-typewriter {
    width: auto !important;
    border-right: 0 !important;
  }
}
</style>
