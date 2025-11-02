export const projects = [
  {
    slug: 'project-1',
    title: 'How to: Spiele zur Kunst',
    tags: ['education', 'game design'],
    blocks: [
      /* { type: 'hero', data: { image: '/images/project-1.jpg', title: 'Hero Title' } }, */
      {
        type: 'hero', data: {
          content: 'How to: Spiele zur Kunst',
          img: '/images/projects/project-1/1_0_header_4.png', // Example image path for the hero block
          description: 'In dem Projekt geht es um spielerisches lernen.', // Example description for the hero block
          date: '2025-01-15' // Example date for the hero block
        }
      },
      { type: 'text', data: { content: 'This is a text block.' } }

    ]
  },

  {
    slug: 'project-2',
    title: 'Kunst liegt im Detail',
    tags: ['vr', 'hackathon' ],
    blocks: [
      /* { type: 'hero', data: { image: '/images/project-1.jpg', title: 'Hero Title' } }, */
      {
        type: 'hero', data: {
          content: 'Kunst liegt im Detail',
          img: '/images/projects/project-2/pattern1.png', // Example image path for the hero block
          description: 'In dem Projekt geht es um spielerisches lernen.', // Example description for the hero block
          date: '2025-01-15' // Example date for the hero block
        }
      },
      { type: 'text', data: { content: 'This is a text block.' } }

    ]
  },
  {
    slug: 'project-3',
    title: 'In Arm\'s Reach',
    tags: ['augmented reality', 'installation', "web"],
    blocks: [
      /* { type: 'hero', data: { image: '/images/project-1.jpg', title: 'Hero Title' } }, */
      {
        type: 'hero', data: {
          content: "In Arm's Reach",
          img: '/images/projects/project-3/heroimage.webp', // Example image path for the hero block
          description: 'MIT Hackathon Winner', // Example description for the hero block
          date: '2025-01-15' // Example date for the hero block
        }
      },
      { type: 'text', data: { content: 'This is a text block.' } }

    ]
  },

  // more projects...
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

/* static\images\projects\project-1\1_0_header_4.png */