export const teachingProjects = [
   {
    slug: 'reading-images-with-code',
    title: 'Reading images with code: \nFrom pixel to ML models',
    description: 'Investigating the role of the body in interaction design through hands-on workshops.',
    location: 'Burg Giebichenstein University of Art and Design Halle',
    date: 'September 2025',
    duration: '5 days',
    tags: ['workshop'],
    tools: ['p5.js', 'ml5.js', 'google colab notebook'],
    thumbnail: '/images/teaching/titelbild-herbstsession-2025-katja-rempel-quad.png'
  },
  {
    slug: 'embodied-interaction',
    title: 'Embodied Interaction: \nBody as Interface',
    description: 'Investigating the role of the body in interaction design through hands-on workshops.',
    location: 'Burg Giebichenstein University of Art and Design Halle',
    date: 'März - Juni 2023',
    duration: '3 x 1 week sessions',
    tags: ['course'],
    tools: ['mediapipe', 'p5.js', 'miro'],
    thumbnail: '/images/teaching/4dgrundlagen-embodied-interaction.png'
  }, {
    slug: 'pattern',
    title: 'Patterns, Grids, Fractals: Interactive Geometries with Creative Coding',
    description: 'In the 2.5-day workshop, participants used p5.js to create geometric patterns and explore how coding rules can be modified to generate pattern variations.',
    location: 'Burg Giebichenstein University of Art and Design Halle',
    date: 'September 2024',
    duration: '3 days',
    tags: ['workshop'],
    tools: ['p5.js', 'JavaScript', 'HTML/CSS'],
    thumbnail: '/images/teaching/thumbnail-muster.gif'
  },
  {
    slug: 'pattern',
    title: 'Intro into Creative Coding',
    description: 'In the 2.5-day workshop, participants used p5.js to create geometric patterns and explore how coding rules can be modified to generate pattern variations.',
    location: 'Burg Giebichenstein University of Art and Design Halle',
    date: 'März - Juni 2023',
    duration: '2 weeks',
    tags: ['course'],
    tools: ['p5.js', 'mediapipe',],
    thumbnail: '/images/teaching/mmvr-creative-coding.png'
  },



];

export function getProjectBySlug(slug) {
  return teachingProjects.find((p) => p.slug === slug);
}

