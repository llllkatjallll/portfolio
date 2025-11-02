 <script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  
  interface Project {
    id: string;
    title: string;
    thumbnail: string;
    tags: string[];
  }
  
  // Sample project data - replace with your actual projects
  let projects: Project[] = [
    {
      id: 'project-1',
      title: 'VR Experience',
      thumbnail: '/images/projects/project-1/1_0_header_4.png',
      tags: ['vr', 'creative coding']
    },
    {
      id: 'project-2',
      title: 'Web Portfolio',
      thumbnail: 'https://picsum.photos/400/300',
      tags: ['web']
    },
    {
      id: 'project-3',
      title: 'AR Art Installation',
      thumbnail: 'https://picsum.photos/400/300',
      tags: ['augmented reality', 'creative coding']
    },
    {
      id: 'project-4',
      title: 'Hackathon Project',
      thumbnail: 'https://picsum.photos/400/300',
      tags: ['hackathon', 'web']
    },
    {
      id: 'project-5',
      title: 'Creative Coding Experiment',
      thumbnail: 'https://picsum.photos/400/300',
      tags: ['creative coding']
    }
    // Add more projects as needed
  ];
  
  const allTags = ['hackathon', 'vr', 'creative coding', 'augmented reality', 'web'];
  let selectedTags: string[] = $state([]);
  let filteredProjects = $state(projects);
  
  function toggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(t => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
    
    filterProjects();
  }
  
  function filterProjects() {
    if (selectedTags.length === 0) {
      filteredProjects = projects;
    } else {
      filteredProjects = projects.filter(project => 
        selectedTags.some(tag => project.tags.includes(tag))
      );
    }
  }
</script>

<svelte:head>
  <title>Projects | Portfolio</title>
</svelte:head>

<h1>Projects</h1>

<div class="filter-tags">
  {#each allTags as tag}
    <button 
      class="tag {selectedTags.includes(tag) ? 'active' : ''}" 
      onclick={() => toggleTag(tag)}
    >
      {tag}
    </button>
  {/each}
</div>

<div class="projects-grid">  {#each filteredProjects as project}
    <a href="{base}/projects/{project.id}" class="project-card">
      <div class="thumbnail">
        <img src="{project.thumbnail}" alt="{project.title}" />
      </div>
      <div class="project-info">
        <h3>{project.title}</h3>
        <div class="project-tags">
          {#each project.tags as tag}
            <span class="project-tag">{tag}</span>
          {/each}
        </div>
      </div>
    </a>
  {/each}
</div>

<style>
  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .tag {
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .tag:hover {
    background-color: #e0e0e0;
  }
  
  .tag.active {
    background-color: #333;
    color: white;
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 30px;
  }
  
  .project-card {
    display: block;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    text-decoration: none;
    color: inherit;
  }
  
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  
  .thumbnail {
    height: 200px;
    overflow: hidden;
  }
  
  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .project-info {
    padding: 1rem;
  }
  
  .project-info h3 {
    margin: 0 0 0.5rem 0;
  }
  
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .project-tag {
    font-size: 0.8rem;
    background-color: #f0f0f0;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
  }
</style>



