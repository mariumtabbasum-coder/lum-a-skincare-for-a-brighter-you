import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
  const isUserOrOrganizationSite = repositoryName.endsWith('.github.io');
  const base = process.env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserOrOrganizationSite
    ? `/${repositoryName}/`
    : '/';
  const rewriteGithubPagesAssets = {
    name: 'rewrite-github-pages-public-asset-paths',
    enforce: 'pre' as const,
    transform(source: string, id: string) {
      const normalizedId = id.replaceAll('\\', '/');
      if (base === '/' || !normalizedId.includes('/src/')) return null;
      return source.replace(/(["'])\/assets\//g, (_match, quote: string) => `${quote}${base}assets/`);
    },
  };

  return {
    base,
    plugins: [rewriteGithubPagesAssets, react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio when DISABLE_HMR is set to true.
      // Configured securely with wss and clientPort 443 to eliminate Cloud Run websocket connection errors.
      hmr: process.env.DISABLE_HMR === 'true' ? false : {
        protocol: 'wss',
        clientPort: 443,
      },
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
