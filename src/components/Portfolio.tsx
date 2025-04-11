import { useEffect } from 'react';
import Header from './Header';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import Footer from './Footer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Portfolio() {
  // Add keyframes to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes popIn {
        0% { opacity: 0; transform: scale(0.8); }
        70% { opacity: 1; transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const titleAnimation = useScrollAnimation();

  // We'll wrap ProjectCard in a component that adds animations
  const AnimatedProjectCard = ({ project, index }: { project: any, index: number }) => {
    const cardAnimation = useScrollAnimation();
    
    return (
      <div 
        ref={cardAnimation.ref}
        style={{ 
          opacity: 0, 
          animation: cardAnimation.isVisible ? 'popIn 0.6s ease-out forwards' : 'none',
          animationDelay: cardAnimation.isVisible ? `${index * 150}ms` : '0ms'
        }}
      >
        <ProjectCard {...project} />
      </div>
    );
  };

  return (
    <>
      <Header />
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <h1 
            ref={titleAnimation.ref}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center transition-colors"
            style={{ 
              opacity: 0, 
              animation: titleAnimation.isVisible ? 'slideUp 0.8s ease-out forwards' : 'none'
            }}
          >
            My Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedProjectCard 
                key={index} 
                project={project} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}