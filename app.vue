<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  scroll-behavior: smooth;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

body {
  @apply bg-background-primary text-text-primary font-sans antialiased selection:bg-accent-purple/30;
}

/* Light Mode Overrides - Support both html.light and html[data-theme="light"] */
html.light body,
html[data-theme="light"] body {
  background: #fafafa;
  color: #1a1a1a;
}

html.light .bg-background-primary,
html[data-theme="light"] .bg-background-primary {
  background-color: #fafafa !important;
}

html.light .bg-background-secondary,
html.light .bg-\[\#1a1625\],
html.light .bg-\[\#100D15\],
html.light .bg-\[\#15121A\],
html[data-theme="light"] .bg-background-secondary,
html[data-theme="light"] .bg-\[\#1a1625\],
html[data-theme="light"] .bg-\[\#100D15\],
html[data-theme="light"] .bg-\[\#15121A\] {
  background-color: #ffffff !important;
}

html.light .text-text-primary,
html.light .text-white,
html[data-theme="light"] .text-text-primary,
html[data-theme="light"] .text-white {
  color: #1a1a1a !important;
}

html.light .text-text-secondary,
html[data-theme="light"] .text-text-secondary {
  color: rgba(0, 0, 0, 0.6) !important;
}

html.light .text-text-muted,
html[data-theme="light"] .text-text-muted {
  color: rgba(0, 0, 0, 0.4) !important;
}

html.light .border-\[\#2a2435\],
html.light .border-border,
html[data-theme="light"] .border-\[\#2a2435\],
html[data-theme="light"] .border-border {
  border-color: rgba(0, 0, 0, 0.1) !important;
}

html.light .border-\[\#3a3445\],
html[data-theme="light"] .border-\[\#3a3445\] {
  border-color: rgba(0, 0, 0, 0.15) !important;
}

html.light .bg-white\/5,
html[data-theme="light"] .bg-white\/5 {
  background-color: rgba(0, 0, 0, 0.05) !important;
}

html.light .bg-white\/10,
html[data-theme="light"] .bg-white\/10 {
  background-color: rgba(0, 0, 0, 0.08) !important;
}

html.light .bg-white\/20,
html[data-theme="light"] .bg-white\/20 {
  background-color: rgba(0, 0, 0, 0.12) !important;
}

html.light .border-white\/10,
html[data-theme="light"] .border-white\/10 {
  border-color: rgba(0, 0, 0, 0.1) !important;
}

html.light header,
html[data-theme="light"] header {
  background: rgba(250, 250, 250, 0.7) !important;
}

html.light .prose :deep(h1),
html.light .prose :deep(h2),
html.light .prose :deep(h3),
html.light .prose :deep(h4),
html[data-theme="light"] .prose :deep(h1),
html[data-theme="light"] .prose :deep(h2),
html[data-theme="light"] .prose :deep(h3),
html[data-theme="light"] .prose :deep(h4) {
  color: #1a1a1a !important;
}

html.light .prose :deep(p),
html[data-theme="light"] .prose :deep(p) {
  color: rgba(0, 0, 0, 0.7) !important;
}

html.light .prose :deep(code),
html[data-theme="light"] .prose :deep(code) {
  background-color: #f0f0f0 !important;
  color: #6F45E3 !important;
}

html.light .prose :deep(pre),
html[data-theme="light"] .prose :deep(pre) {
  background-color: #f5f5f5 !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
}

html.light ::-webkit-scrollbar-thumb,
html[data-theme="light"] ::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}

html.light ::-webkit-scrollbar-thumb:hover,
html[data-theme="light"] ::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Light Mode - Button Hover Effects - 修复灰色悬浮问题 */
html.light button:hover,
html.light a:hover,
html[data-theme="light"] button:hover,
html[data-theme="light"] a:hover {
  background-color: rgba(111, 69, 227, 0.1) !important;
  border-color: rgba(111, 69, 227, 0.3) !important;
}

/* 修复：主按钮（紫色背景）悬浮时不应该变灰 */
html.light button.bg-accent-purple:hover,
html.light a.bg-accent-purple:hover,
html[data-theme="light"] button.bg-accent-purple:hover,
html[data-theme="light"] a.bg-accent-purple:hover {
  background-color: #5a35c0 !important;
  border-color: transparent !important;
}

html.light button:hover .text-text-secondary,
html.light a:hover .text-text-secondary,
html[data-theme="light"] button:hover .text-text-secondary,
html[data-theme="light"] a:hover .text-text-secondary {
  color: #6F45E3 !important;
}

/* Light Mode - Icon colors in cards */
html.light .bg-\[\#2a2435\],
html[data-theme="light"] .bg-\[\#2a2435\] {
  background-color: rgba(111, 69, 227, 0.1) !important;
}

html.light .bg-\[\#2a2435\] svg,
html[data-theme="light"] .bg-\[\#2a2435\] svg {
  color: #6F45E3 !important;
}

/* Light Mode - Card hover */
html.light .hover\:bg-\[\#2a2435\]:hover,
html.light .hover\:bg-\[\#1a1625\]:hover,
html[data-theme="light"] .hover\:bg-\[\#2a2435\]:hover,
html[data-theme="light"] .hover\:bg-\[\#1a1625\]:hover {
  background-color: rgba(111, 69, 227, 0.05) !important;
}

/* Light Mode - Navigation items */
html.light nav a:hover,
html.light .hover\:text-white:hover,
html[data-theme="light"] nav a:hover,
html[data-theme="light"] .hover\:text-white:hover {
  color: #6F45E3 !important;
  background-color: rgba(111, 69, 227, 0.1) !important;
}

/* Light Mode - Active navigation */
html.light nav a.bg-\[\#2a2435\],
html[data-theme="light"] nav a.bg-\[\#2a2435\] {
  background-color: rgba(111, 69, 227, 0.15) !important;
  color: #6F45E3 !important;
}

/* Light Mode - Table row hover */
html.light tr:hover,
html[data-theme="light"] tr:hover {
  background-color: rgba(111, 69, 227, 0.05) !important;
}

/* Light Mode - Status badges */
html.light .bg-green-500\/20,
html[data-theme="light"] .bg-green-500\/20 {
  background-color: rgba(34, 197, 94, 0.15) !important;
}

html.light .bg-yellow-500\/20,
html[data-theme="light"] .bg-yellow-500\/20 {
  background-color: rgba(234, 179, 8, 0.15) !important;
}

html.light .bg-blue-500\/20,
html[data-theme="light"] .bg-blue-500\/20 {
  background-color: rgba(59, 130, 246, 0.15) !important;
}

/* Light Mode - ProjectCard icon container */
html.light .bg-\[\#2a2435\].rounded-xl,
html[data-theme="light"] .bg-\[\#2a2435\].rounded-xl {
  background-color: rgba(111, 69, 227, 0.1) !important;
}

html.light .group:hover .bg-\[\#2a2435\].rounded-xl,
html[data-theme="light"] .group:hover .bg-\[\#2a2435\].rounded-xl {
  background-color: rgba(111, 69, 227, 0.2) !important;
}

/* Light Mode - Links and buttons specific */
html.light a.group:hover,
html[data-theme="light"] a.group:hover {
  border-color: rgba(111, 69, 227, 0.5) !important;
  box-shadow: 0 4px 20px rgba(111, 69, 227, 0.1);
}

html.light a.group:hover h3,
html[data-theme="light"] a.group:hover h3 {
  color: #6F45E3 !important;
}

/* Light Mode - Primary buttons */
html.light button.bg-accent-purple:hover,
html.light a.bg-accent-purple:hover,
html[data-theme="light"] button.bg-accent-purple:hover,
html[data-theme="light"] a.bg-accent-purple:hover {
  background-color: #5a35c0 !important;
  border-color: transparent !important;
}

/* Light Mode - Ghost buttons */
html.light button:not(.bg-accent-purple):hover,
html.light a:not(.bg-accent-purple):hover,
html[data-theme="light"] button:not(.bg-accent-purple):hover,
html[data-theme="light"] a:not(.bg-accent-purple):hover {
  color: #6F45E3 !important;
}

/* Light Mode - Input focus */
html.light input:focus,
html.light select:focus,
html.light textarea:focus,
html[data-theme="light"] input:focus,
html[data-theme="light"] select:focus,
html[data-theme="light"] textarea:focus {
  border-color: #6F45E3 !important;
  box-shadow: 0 0 0 3px rgba(111, 69, 227, 0.1);
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(10px);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  @apply bg-white/20 rounded-full;
}
::-webkit-scrollbar-thumb:hover {
  @apply bg-white/30;
}
</style>
