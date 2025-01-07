import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

export default function ProjectCard({ title, description, imageUrl, projectUrl }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <a 
          href={projectUrl} 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          View Project <ExternalLink size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
}