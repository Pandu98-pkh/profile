// src/components/Education.tsx
import { useEffect } from 'react';
import { education } from '../data/education';
import { GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Education() {
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
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const titleAnimation = useScrollAnimation();

  return (
    <section id="education" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 
          ref={titleAnimation.ref}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
          style={{ 
            opacity: 0, 
            animation: titleAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none' 
          }}
        >
          Riwayat Pendidikan
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, index) => {
            const itemAnimation = useScrollAnimation();
            return (
              <div
                key={index}
                ref={itemAnimation.ref}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ 
                  opacity: 0, 
                  animation: itemAnimation.isVisible ? 'slideUp 0.5s ease-out forwards' : 'none',
                  animationDelay: itemAnimation.isVisible ? `${150}ms` : '0ms'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg transition-transform duration-300 hover:scale-110"
                    style={{ 
                      animation: itemAnimation.isVisible ? 'pulse 2s infinite ease-in-out' : 'none', 
                      animationDelay: itemAnimation.isVisible ? `${0.5}s` : '0s'
                    }}
                  >
                    <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                      style={{ 
                        opacity: 0, 
                        animation: itemAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                        animationDelay: itemAnimation.isVisible ? `${300}ms` : '0ms'
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <p 
                      className="text-gray-600 dark:text-gray-300 mb-2"
                      style={{ 
                        opacity: 0, 
                        animation: itemAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                        animationDelay: itemAnimation.isVisible ? `${400}ms` : '0ms'
                      }}
                    >
                      {edu.institution}
                    </p>
                    <p 
                      className="text-sm text-gray-500 dark:text-gray-400"
                      style={{ 
                        opacity: 0, 
                        animation: itemAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                        animationDelay: itemAnimation.isVisible ? `${500}ms` : '0ms'
                      }}
                    >
                      {edu.period}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}