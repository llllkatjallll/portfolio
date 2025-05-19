export const projects = [
  {
    slug: 'project-1',
    title: 'Project One',
    blocks: [
      /* { type: 'hero', data: { image: '/images/project-1.jpg', title: 'Hero Title' } }, */
      { type: 'hero', data: { content: 'This is a hero block.' } },
      { type: 'text', data: { content: 'This is a text block.' } }
     
    ]
  },
  {
    slug: 'project-2',
    title: 'Project Two',
    blocks: [
      /* { type: 'hero', data: { image: '/images/project-1.jpg', title: 'Hero Title' } }, */
      { type: 'hero', data: { content: 'This is a second hero block.' } },
      { type: 'text', data: { content: 'This is a secondtext block.' } }
     
    ]
  }
  
  // more projects...
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}