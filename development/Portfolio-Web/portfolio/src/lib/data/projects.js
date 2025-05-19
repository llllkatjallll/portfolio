export const projects = [
  {
    slug: 'project-1',
    title: 'Project One',
    blocks: [
      /* { type: 'hero', data: { image: '/images/project-1.jpg', title: 'Hero Title' } }, */
      { type: 'hero', data:  { 
          content: 'How to: Spiele zur Kunst',
          img: '/images/projects/project-1/1_0_header_4.png', // Example image path for the hero block
          description: 'In dem Projekt geht es um spielerisches lernen.', // Example description for the hero block
          date: '2025-01-15' // Example date for the hero block
        } },
      { type: 'text', data: { content: 'This is a text block.' } }
     
    ]
  }
  
  // more projects...
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

/* static\images\projects\project-1\1_0_header_4.png */