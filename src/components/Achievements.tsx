import { useState, useEffect } from 'react';
import { achievements } from '../data/achievements';
import { Trophy, X } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AchievementModal {
  isOpen: boolean;
  imageUrl: string;
}

export default function Achievements() {
  const [modal, setModal] = useState<AchievementModal>({
    isOpen: false,
    imageUrl: ''
  });

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
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      
      @keyframes modalOpen {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      
      @keyframes shine {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const titleAnimation = useScrollAnimation();

  const openModal = (imageUrl: string) => {
    if (imageUrl) {
      setModal({ isOpen: true, imageUrl });
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, imageUrl: '' });
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section id="achievements" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 
            ref={titleAnimation.ref}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
            style={{ 
              opacity: 0, 
              animation: titleAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none' 
            }}
          >
            Prestasi dan Penghargaan
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => {
              const cardAnimation = useScrollAnimation();
              return (
                <div
                  key={index}
                  ref={cardAnimation.ref}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ 
                    opacity: 0, 
                    animation: cardAnimation.isVisible ? 'slideUp 0.5s ease-out forwards' : 'none',
                    animationDelay: cardAnimation.isVisible ? `${150}ms` : '0ms'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg transition-transform duration-300 hover:scale-110"
                      style={{ 
                        animation: cardAnimation.isVisible ? 'shine 3s infinite ease-in-out' : 'none',
                        animationDelay: cardAnimation.isVisible ? '0.5s' : '0s'
                      }}
                    >
                      <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                        style={{ 
                          opacity: 0, 
                          animation: cardAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                          animationDelay: cardAnimation.isVisible ? `${300}ms` : '0ms'
                        }}
                      >
                        {achievement.title}
                      </h3>
                      <p 
                        className="text-gray-600 dark:text-gray-300 mb-2"
                        style={{ 
                          opacity: 0, 
                          animation: cardAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                          animationDelay: cardAnimation.isVisible ? `${400}ms` : '0ms'
                        }}
                      >
                        {achievement.event}
                      </p>
                      <p 
                        className="text-sm text-gray-500 dark:text-gray-400 mb-4"
                        style={{ 
                          opacity: 0, 
                          animation: cardAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                          animationDelay: cardAnimation.isVisible ? `${500}ms` : '0ms'
                        }}
                      >
                        {achievement.organization}
                      </p>
                      
                      {/* If you have images for achievements, use this block */}
                      {achievement.imageUrl && (
                        <div 
                          className="cursor-pointer overflow-hidden rounded-lg"
                          onClick={() => openModal(achievement.imageUrl || '')}
                          style={{ 
                            opacity: 0, 
                            animation: cardAnimation.isVisible ? 'scaleIn 0.5s ease-out forwards' : 'none',
                            animationDelay: cardAnimation.isVisible ? `${600}ms` : '0ms'
                          }}
                        >
                          <img 
                            src={achievement.imageUrl}
                            alt={achievement.title}
                            className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal.isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-4xl w-full"
            style={{
              opacity: 0,
              animation: 'modalOpen 0.3s ease-out forwards'
            }}
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors hover:rotate-90 transform duration-300"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={modal.imageUrl}
              alt="Achievement"
              className="w-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}