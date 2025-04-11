// src/components/Skills.tsx
import { useEffect } from 'react';
import { skills } from '../data/skills';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Skills() {
  // Add keyframes to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const titleAnimation = useScrollAnimation();

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleAnimation.ref}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors"
          style={{ 
            opacity: 0, 
            animation: titleAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none' 
          }}
        >
          Kemampuan
        </h2>
        <div className="space-y-8">
          {Object.entries(skills).map(([category, items], categoryIndex) => {
            const categoryAnimation = useScrollAnimation();
            return (
              <div 
                key={category}
                ref={categoryAnimation.ref}
                style={{ 
                  opacity: 0, 
                  animation: categoryAnimation.isVisible ? 'slideUp 0.5s ease-out forwards' : 'none',
                  animationDelay: categoryAnimation.isVisible ? `${150}ms` : '0ms'
                }}
              >
                <h3 
                  className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 capitalize transition-colors"
                  style={{ 
                    opacity: 0, 
                    animation: categoryAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                    animationDelay: categoryAnimation.isVisible ? `${300}ms` : '0ms'
                  }}
                >
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {items.map((skill, skillIndex) => (
                    <div 
                      key={skill} 
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center transition-all hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transform hover:-translate-y-1 duration-300"
                      style={{ 
                        opacity: 0, 
                        animation: categoryAnimation.isVisible ? 'scaleIn 0.4s ease-out forwards' : 'none',
                        animationDelay: categoryAnimation.isVisible ? `${skillIndex * 50 + 400}ms` : '0ms'
                      }}
                    >
                      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}