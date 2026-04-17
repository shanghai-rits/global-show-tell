export interface EventDetailMetaItem {
  label: string;
  value: string | string[];
}

export interface EventDetailSectionImage {
  src: string;
  alt: string;
}

export interface EventDetailItem {
  id: string;
  title: string;
  subtitle: string;
  meta: EventDetailMetaItem[];
  description: string[];
  highlights: string[];
  impact: string[];
  coverImage: string;
  sectionImages: EventDetailSectionImage[];
}

function createPlaceholderEvent(
  id: string,
  title: string,
  subtitle: string,
  meta: EventDetailMetaItem[],
  coverImage: string,
  images: EventDetailSectionImage[],
): EventDetailItem {
  return {
    id,
    title,
    subtitle,
    meta,
    description: [
      'This part is "description".',
      'A festival curated from the eyes of animation artists, a screening journey to explore poetry and inspiration, with audience together we create a garden for our mind.',
      'This part is "description".',
      'A festival curated from the eyes of animation artists, a screening journey to explore poetry and inspiration, with audience together we create a garden for our mind.',
    ],
    highlights: [
      'This part is "description".',
      'A festival curated from the eyes of animation artists, a screening journey to explore poetry and inspiration, with audience together we create a garden for our mind.',
    ],
    impact: [
      'This part is "description".',
      'A festival curated from the eyes of animation artists, a screening journey to explore poetry and inspiration, with audience together we create a garden for our mind.',
    ],
    coverImage,
    sectionImages: images,
  };
}

export const eventDetails: EventDetailItem[] = [
  createPlaceholderEvent(
    'opening-launch',
    'NYU Global Show & Tell (Opening)',
    'Opening Ceremony and Launch Events',
    [
      { label: 'Venue', value: 'NYU Shanghai Qiantan Campus' },
      { label: 'Location', value: 'Shanghai' },
      { label: 'Date and Time', value: ['Apr 13, 2025', '1:00 - 4:00 PM (China Standard Time)'] },
    ],
    '/events/images/04.jpg',
    [
      { src: '/events/images/04.jpg', alt: 'Opening event image 1' },
      { src: '/events/images/06.jpg', alt: 'Opening event image 2' },
      { src: '/events/images/08.jpg', alt: 'Opening event image 3' },
    ],
  ),
  createPlaceholderEvent(
    'shanghai-show',
    'NYU Global Show & Tell (Shanghai)',
    'Exploring Creativity in the Age of AI',
    [
      { label: 'Venue', value: 'IMA Studio' },
      { label: 'Location', value: 'Shanghai' },
      { label: 'Date and Time', value: 'October 9 - 26, 2025' },
    ],
    '/events/images/IMA Gallery Exhibition03.jpg',
    [
      { src: '/events/images/IMA Gallery Exhibition03.jpg', alt: 'Shanghai event image 1' },
      { src: '/events/images/IMA Gallery Exhibition04.jpg', alt: 'Shanghai event image 2' },
      { src: '/events/images/IMA Gallery Exhibition05.jpg', alt: 'Shanghai event image 3' },
    ],
  ),
  createPlaceholderEvent(
    'new-york-show',
    'NYU Global Show & Tell (New York)',
    'Exploring Creativity in the Age of AI',
    [
      { label: 'Venue', value: 'ITP/IMA Floor' },
      { label: 'Location', value: 'New York' },
      { label: 'Date and Time', value: 'October 10, 2025' },
    ],
    '/events/images/New York Opening15.jpg',
    [
      { src: '/events/images/New York Opening15.jpg', alt: 'New York event image 1' },
      { src: '/events/images/New York Opening02.jpg', alt: 'New York event image 2' },
      { src: '/events/images/New York Opening03.jpg', alt: 'New York event image 3' },
    ],
  ),
  createPlaceholderEvent(
    'future-lab',
    'Future Lab Exhibition',
    'Art & Design Education: FutureLab 2025',
    [
      { label: 'Venue', value: 'West Bund Art Center' },
      { label: 'Location', value: 'Shanghai' },
      { label: 'Date and Time', value: 'October 31 - November 2, 2025' },
    ],
    '/events/images/FutureLab01.jpg',
    [
      { src: '/events/images/FutureLab01.jpg', alt: 'Future Lab image 1' },
      { src: '/events/images/FutureLab02.jpg', alt: 'Future Lab image 2' },
      { src: '/events/images/FutureLab03.jpg', alt: 'Future Lab image 3' },
    ],
  ),
  createPlaceholderEvent(
    'live-diffusion',
    'Opening Project: Live-Diffusion',
    'Project Installation',
    [
      { label: 'Venue', value: 'NYU Global Show & Tell' },
      { label: 'Location', value: ['Shanghai', 'New York', 'Abu Dhabi'] },
      { label: 'Date and Time', value: 'April 9 - April 13, 2025' },
    ],
    '/events/images/08.jpg',
    [
      { src: '/events/images/08.jpg', alt: 'Live Diffusion image 1' },
      { src: '/events/images/04.jpg', alt: 'Live Diffusion image 2' },
      { src: '/events/images/06.jpg', alt: 'Live Diffusion image 3' },
    ],
  ),
  createPlaceholderEvent(
    'video-loop',
    'Projects (video loop)',
    'Works Presentation',
    [
      { label: 'Venue', value: 'NYU Global Show & Tell' },
      { label: 'Location', value: ['Shanghai', 'New York', 'Abu Dhabi'] },
      { label: 'Date and Time', value: 'TBD' },
    ],
    '/events/images/08.jpg',
    [
      { src: '/events/images/08.jpg', alt: 'Video loop image 1' },
      { src: '/events/images/04.jpg', alt: 'Video loop image 2' },
      { src: '/events/images/06.jpg', alt: 'Video loop image 3' },
    ],
  ),
  createPlaceholderEvent(
    'opening-video-october',
    'Opening Video (SH)',
    'Screening',
    [
      { label: 'Venue', value: 'IMA Studio' },
      { label: 'Location', value: 'Shanghai' },
      { label: 'Date and Time', value: 'October 9, 2025' },
    ],
    '/events/images/06.jpg',
    [
      { src: '/events/images/06.jpg', alt: 'Opening Video October image 1' },
      { src: '/events/images/04.jpg', alt: 'Opening Video October image 2' },
      { src: '/events/images/08.jpg', alt: 'Opening Video October image 3' },
    ],
  ),
  createPlaceholderEvent(
    'lightning-talks',
    'Lightning Talks (NY)',
    'Event Session',
    [
      { label: 'Venue', value: 'ITP/IMA Floor' },
      { label: 'Location', value: 'New York' },
      { label: 'Date and Time', value: 'October 10, 2025' },
    ],
    '/events/images/New York Opening02.jpg',
    [
      { src: '/events/images/New York Opening02.jpg', alt: 'Lightning Talks image 1' },
      { src: '/events/images/New York Opening03.jpg', alt: 'Lightning Talks image 2' },
      { src: '/events/images/New York Opening04.jpg', alt: 'Lightning Talks image 3' },
    ],
  ),
  createPlaceholderEvent(
    'moon-interview',
    "Moon and Inmi's interview clip",
    'Works Presentation',
    [
      { label: 'Venue', value: 'IMA Studio' },
      { label: 'Location', value: 'Shanghai' },
      { label: 'Date and Time', value: 'October 9, 2025' },
    ],
    '/events/images/IMA Gallery Exhibition05.jpg',
    [
      { src: '/events/images/IMA Gallery Exhibition05.jpg', alt: 'Interview image 1' },
      { src: '/events/images/IMA Gallery Exhibition06.jpg', alt: 'Interview image 2' },
      { src: '/events/images/IMA Gallery Exhibition07.jpg', alt: 'Interview image 3' },
    ],
  ),
  createPlaceholderEvent(
    'opening-video-april',
    'Opening Video (SH)',
    'Screening',
    [
      { label: 'Venue', value: 'NYU Shanghai Qiantan Campus' },
      { label: 'Location', value: 'Shanghai' },
      { label: 'Date and Time', value: 'Apr 13, 2025' },
    ],
    '/events/images/06.jpg',
    [
      { src: '/events/images/06.jpg', alt: 'Opening Video April image 1' },
      { src: '/events/images/04.jpg', alt: 'Opening Video April image 2' },
      { src: '/events/images/08.jpg', alt: 'Opening Video April image 3' },
    ],
  ),
];

export function getEventDetailById(id?: string) {
  return eventDetails.find((item) => item.id === id);
}
