# Homepage maintenance

The canonical homepage is the React `/` route inside `SiteLayout`. The old
`/homepage/` and `/homepage/index.html` entry points redirect to `/`, retaining
query parameters and fragments. Keep `public/homepage/index.html` as the small
compatibility entry; it is copied by Vite, not compiled as a second homepage.

- `src/pages/Home.jsx`: section order and public introduction text.
- `src/data/homepage.js`: presenters and highlight slides.
- `src/data/navigation.js`: links shared by the header and homepage.
- `src/pages/Home.css`: scoped responsive layout.
- `src/components/Home/HomeHero.css`: scoped original desktop intro animation.
- `src/components/Home/homepageSketch.js`: original artwork in p5 instance mode.
- `public/homepage/assets/`: existing images and video; URLs remain compatible.

There is one introduction, presenter list, video and carousel for all screen
sizes. The campus strip identifies the three campuses; navigation belongs to
`SiteHeader`. CSS changes composition at 640px without changing page content.
Do not set the document root font size or attach global p5 setup/draw functions.

The p5 runtime loads only on desktop with motion enabled. Its instance is removed
on route exit, mobile breakpoint changes or reduced-motion changes, and pauses
outside the viewport or when the document is hidden. The static artwork is the
fallback. Video playback is user initiated, inline, and paused on leaving the
viewport or hiding the tab. It has one lazy source and native controls.

Highlights move only through Previous/Next buttons using a translated track.
There is no nested scroll container, swipe handling, or automatic rotation;
vertical gestures over the carousel continue to scroll the whole page.
Transitions respect reduced motion.

Validate with `npm run build`, `npm run test:navigation`, and browser checks at
390px, 640px, 768px and desktop sizes. Check legacy query/hash redirects with
`npm run preview`, and verify home → showcase → home navigation does not leave
extra canvases or video elements behind. Menu redesign (MOQ-85) and the next
Hero/motion design iteration (MOQ-86) remain separate work.
