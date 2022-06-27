import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

import targets from 'browserslist-config-google';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-tictactoe/',
  plugins: [react(), legacy({ targets })],
});
