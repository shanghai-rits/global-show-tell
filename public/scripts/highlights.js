// Shared by About and Events: one image catalogue and one rotating gallery.
(() => {
  const images = [
                    { src: '/events/images/04.jpg', title: 'Opening Ceremony and Launch Events (Shanghai)', subtitle: 'Apr 13, 2025', location: 'NYU Shanghai Qiantan Campus' },
                    { src: '/events/images/06.jpg', title: 'Opening Ceremony and Launch Events (Shanghai)', subtitle: 'Apr 13, 2025', location: 'NYU Shanghai Qiantan Campus' },
                    { src: '/events/images/08.jpg', title: 'Opening Project: Live-Diffusion', subtitle: 'Apr 9 - 13, 2025', location: 'Shanghai / New York / Abu Dhabi' },
                    { src: '/events/images/FutureLab01.jpg', title: 'Art & Design Education: FutureLab 2025', subtitle: 'Oct 31 - Nov 2, 2025', location: 'West Bund Art Center, Shanghai' },
                    { src: '/events/images/FutureLab02.jpg', title: 'Art & Design Education: FutureLab 2025', subtitle: 'Oct 31 - Nov 2, 2025', location: 'West Bund Art Center, Shanghai' },
                    { src: '/events/images/FutureLab03.jpg', title: 'Art & Design Education: FutureLab 2025', subtitle: 'Oct 31 - Nov 2, 2025', location: 'West Bund Art Center, Shanghai' },
                    { src: '/events/images/FutureLab04.jpg', title: 'Art & Design Education: FutureLab 2025', subtitle: 'Oct 31 - Nov 2, 2025', location: 'West Bund Art Center, Shanghai' },
                    { src: '/events/images/FutureLab05.jpg', title: 'Art & Design Education: FutureLab 2025', subtitle: 'Oct 31 - Nov 2, 2025', location: 'West Bund Art Center, Shanghai' },
                    { src: '/events/images/FutureLab06.jpg', title: 'Art & Design Education: FutureLab 2025', subtitle: 'Oct 31 - Nov 2, 2025', location: 'West Bund Art Center, Shanghai' },
                    { src: '/events/images/FutureLab07.jpg', title: 'Art & Design Education: FutureLab 2025', subtitle: 'Oct 31 - Nov 2, 2025', location: 'West Bund Art Center, Shanghai' },
                    { src: '/events/images/IMA Gallery Exhibition01.jpg', title: 'Exploring Creativity in the Age of AI (Shanghai)', subtitle: 'Oct 9 - 26, 2025', location: 'IMA Studio' },
                    { src: '/events/images/IMA Gallery Exhibition02.jpg', title: 'Exploring Creativity in the Age of AI (Shanghai)', subtitle: 'Oct 9 - 26, 2025', location: 'IMA Studio' },
                    { src: '/events/images/IMA Gallery Exhibition03.jpg', title: 'Exploring Creativity in the Age of AI (Shanghai)', subtitle: 'Oct 9 - 26, 2025', location: 'IMA Studio' },
                    { src: '/events/images/IMA Gallery Exhibition04.jpg', title: 'Exploring Creativity in the Age of AI (Shanghai)', subtitle: 'Oct 9 - 26, 2025', location: 'IMA Studio' },
                    { src: '/events/images/IMA Gallery Exhibition05.jpg', title: 'Exploring Creativity in the Age of AI (Shanghai)', subtitle: 'Oct 9 - 26, 2025', location: 'IMA Studio' },
                    { src: '/events/images/IMA Gallery Exhibition06.jpg', title: 'Exploring Creativity in the Age of AI (Shanghai)', subtitle: 'Oct 9 - 26, 2025', location: 'IMA Studio' },
                    { src: '/events/images/IMA Gallery Exhibition07.jpg', title: 'Exploring Creativity in the Age of AI (Shanghai)', subtitle: 'Oct 9 - 26, 2025', location: 'IMA Studio' },
                    { src: '/events/images/IMA Gallery Exhibition08.jpg', title: 'Exploring Creativity in the Age of AI (Shanghai)', subtitle: 'Oct 9 - 26, 2025', location: 'IMA Studio' },
                    { src: '/events/images/IMA Gallery Exhibition09.jpg', title: 'Exploring Creativity in the Age of AI (Shanghai)', subtitle: 'Oct 9 - 26, 2025', location: 'IMA Studio' },
                    { src: '/events/images/IMA Gallery Exhibition10.jpg', title: 'Exploring Creativity in the Age of AI (Shanghai)', subtitle: 'Oct 9 - 26, 2025', location: 'IMA Studio' },
                    { src: '/events/images/New York Opening01.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening02.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening03.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening04.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening05.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening06.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening07.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening08.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening09.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening10.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening11.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening12.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening13.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening14.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening15.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                    { src: '/events/images/New York Opening16.jpg', title: 'Exploring Creativity in the Age of AI (New York)', subtitle: 'Oct 10, 2025', location: 'ITP/IMA floor' },
                ];
  window.NYUHighlights = {
    props: { count: { type: Number, default: 9 } },
    setup(props) {
      const { ref, onMounted, onUnmounted, nextTick } = Vue;
      const displayedImages = ref([]), nextImages = ref([]), crossFading = ref(false);
      const preview = ref(null), dialog = ref(null);
      let timer, fadeTimer, frame, opener;
      let disposed = false;
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      function pick() {
        const pool = [...images];
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        return pool.slice(0, props.count);
      }
      async function rotate() {
        if (document.hidden || motion.matches || preview.value || crossFading.value) return;
        const next = pick();
        await Promise.all(next.map(img => new Promise(resolve => {
          const preload = new Image();
          preload.onload = preload.onerror = resolve;
          preload.src = img.src;
        })));
        if (disposed) return;
        nextImages.value = next;
        await nextTick();
        frame = requestAnimationFrame(() => {
          crossFading.value = true;
          fadeTimer = setTimeout(() => {
            displayedImages.value = next;
            crossFading.value = false;
            nextImages.value = [];
          }, 800);
        });
      }
      async function openPreview(img, event) {
        opener = event.currentTarget;
        preview.value = img;
        await nextTick();
        dialog.value.showModal();
      }
      function closePreview() { dialog.value.close(); }
      function onClose() { preview.value = null; opener?.focus(); }
      onMounted(() => {
        displayedImages.value = pick();
        timer = setInterval(rotate, 5000);
      });
      onUnmounted(() => {
        disposed = true;
        clearInterval(timer); clearTimeout(fadeTimer); cancelAnimationFrame(frame);
      });
      return { displayedImages, nextImages, crossFading, preview, dialog, openPreview, closePreview, onClose };
    },
    template: `
      <section class="shared-highlights" aria-label="Highlights gallery">
        <div class="photo-box">
          <button v-for="(img, index) in displayedImages" :key="index" type="button" class="photo-item"
            :aria-label="'Enlarge: ' + img.title" @click="openPreview(img, $event)">
            <div class="img-layer img-back" aria-hidden="true"><img :src="nextImages[index] ? nextImages[index].src : img.src" alt="" /></div>
            <div class="img-layer img-front" :class="{ 'cross-fade': crossFading }"><img :src="img.src" :alt="img.title" /></div>
            <div class="photo-title"><div class="main-title">{{ img.title }}</div>
              <div class="sub-title">{{ img.subtitle }}<div class="location">{{ img.location }}</div></div>
            </div>
          </button>
        </div>
        <dialog ref="dialog" class="highlights-preview" tabindex="-1" aria-label="Highlight image preview; click image or press Escape to close" @close="onClose"
          @click="$event.target === $event.currentTarget && closePreview()">
          <img v-if="preview" :src="preview.src" :alt="preview.title" @click.left="closePreview" />
        </dialog>
      </section>`
  };
})();
