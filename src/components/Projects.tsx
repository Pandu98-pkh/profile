import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform built with React and Node.js',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    projectUrl: '#'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    projectUrl: '#'
  },
  {
    title: 'Analytics Dashboard',
    description: 'A data visualization dashboard with interactive charts',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    projectUrl: '#'
  }
];

export default function Projects() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}