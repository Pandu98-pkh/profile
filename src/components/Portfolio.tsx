import Header from './Header';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function Portfolio() {
  return (
    <>
      <Header />
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            My Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}