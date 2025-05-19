// src/routes/projects/[slug]/+page.js
import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/data/projects';

export function load({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    throw error(404, 'Project not found');
  }
  return { project };
}