import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
  define: {
    // Sesuaikan dengan kebutuhan aplikasi, disarankan false untuk mode produksi
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
    VueDevTools()
  ],
  resolve: {
    alias: {
      // Menyesuaikan dengan alamat root direktori src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
