import { useEffect } from 'react';
import { personalInfo } from '../data/personalInfo';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
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
      
      @keyframes textReveal {
        from { 
          opacity: 0; 
          transform: translateY(10px);
          filter: blur(3px);
        }
        to { 
          opacity: 1; 
          transform: translateY(0);
          filter: blur(0);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const titleAnimation = useScrollAnimation();
  const profileTextAnimation = useScrollAnimation();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleAnimation.ref}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors"
          style={{ 
            opacity: 0, 
            animation: titleAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none' 
          }}
        >
          Profil
        </h2>
        <p 
          ref={profileTextAnimation.ref}
          className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 transition-colors"
          style={{ 
            opacity: 0, 
            animation: profileTextAnimation.isVisible ? 'textReveal 0.8s ease-out forwards' : 'none',
            animationDelay: profileTextAnimation.isVisible ? '0.2s' : '0s'
          }}
        >
          {personalInfo.profile}
        </p>
      </div>
    </section>
  );
}