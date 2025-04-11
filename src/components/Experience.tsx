// src/components/Experience.tsx
import { useState, useEffect } from 'react';
import { experience } from '../data/experience';
import { Users, X, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ExperienceModal {
  isOpen: boolean;
  experienceIndex: number;
  itemIndex: number;
  isPdf: boolean;
}

export default function Experience() {
  const [modal, setModal] = useState<ExperienceModal>({
    isOpen: false,
    experienceIndex: 0,
    itemIndex: 0,
    isPdf: false
  });
  
  // Controls animation states
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const titleAnimation = useScrollAnimation();

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
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsModalAnimating(true), 10);
    } else {
      document.body.style.overflow = 'auto';
      setIsModalAnimating(false);
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modal.isOpen]);

  const openModal = (experienceIndex: number, itemIndex: number, url: string) => {
    const isPdf = url.endsWith('.pdf');
    setModal({ 
      isOpen: true, 
      experienceIndex, 
      itemIndex,
      isPdf 
    });
  };

  const closeModal = () => {
    setIsModalAnimating(false);
    setTimeout(() => {
      setModal({ 
        isOpen: false, 
        experienceIndex: 0, 
        itemIndex: 0,
        isPdf: false 
      });
    }, 300); // Match the transition duration
  };

  const nextItem = () => {
    const currentExp = experience[modal.experienceIndex];
    if (currentExp.items && currentExp.items.length > 0) {
      setIsModalAnimating(false);
      setTimeout(() => {
        const newIndex = (modal.itemIndex + 1) % currentExp.items.length;
        const isPdf = currentExp.items[newIndex].endsWith('.pdf');
        setModal({
          ...modal,
          itemIndex: newIndex,
          isPdf
        });
        setIsModalAnimating(true);
      }, 200);
    }
  };

  const prevItem = () => {
    const currentExp = experience[modal.experienceIndex];
    if (currentExp.items && currentExp.items.length > 0) {
      setIsModalAnimating(false);
      setTimeout(() => {
        const newIndex = (modal.itemIndex - 1 + currentExp.items.length) % currentExp.items.length;
        const isPdf = currentExp.items[newIndex].endsWith('.pdf');
        setModal({
          ...modal,
          itemIndex: newIndex,
          isPdf
        });
        setIsModalAnimating(true);
      }, 200);
    }
  };

  const getCurrentItemUrl = () => {
    const currentExp = experience[modal.experienceIndex];
    if (currentExp?.items && currentExp.items.length > 0) {
      return currentExp.items[modal.itemIndex];
    }
    return '';
  };

  // Function to get all items (images and PDFs)
  const getItems = (exp: any) => {
    // If there are specific items defined, use those
    if (exp.items && exp.items.length > 0) {
      return exp.items;
    }
    // For backward compatibility with existing data structure
    if (exp.images && exp.images.length > 0) {
      return exp.images;
    }
    return [];
  };

  return (
    <>
      <section id="experience" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 
            ref={titleAnimation.ref}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
            style={{ 
              opacity: 0, 
              animation: titleAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none' 
            }}
          >
            Pengalaman Organisasi
          </h2>
          {/* Vertical layout with space-y for spacing */}
          <div className="space-y-6">
            {experience.map((exp, expIndex) => {
              const itemAnimation = useScrollAnimation();
              return (
                <div
                  key={expIndex}
                  ref={itemAnimation.ref}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ 
                    opacity: 0, 
                    animation: itemAnimation.isVisible ? 'slideUp 0.5s ease-out forwards' : 'none',
                    animationDelay: itemAnimation.isVisible ? `${150}ms` : '0ms'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg transition-transform duration-300 hover:scale-110">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {exp.period}
                      </p>
                      <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300 space-y-1">
                        {exp.responsibilities.map((resp, idx) => (
                          <li 
                            key={idx}
                            style={{ 
                              opacity: 0, 
                              animation: itemAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                              animationDelay: itemAnimation.isVisible ? `${(idx * 100) + 300}ms` : '0ms'
                            }}
                          >
                            {resp}
                          </li>
                        ))}
                      </ul>
                      
                      {/* Images and PDF section */}
                      {getItems(exp).length > 0 && (
                        <div 
                          className="mt-4" 
                          style={{ 
                            opacity: 0, 
                            animation: itemAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                            animationDelay: itemAnimation.isVisible ? `${600}ms` : '0ms' 
                          }}
                        >
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {getItems(exp).map((url: string, idx: number) => (
                              <div 
                                key={idx}
                                className="cursor-pointer overflow-hidden rounded-lg h-32 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                onClick={() => openModal(expIndex, idx, url)}
                                style={{ 
                                  opacity: 0, 
                                  animation: itemAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                                  animationDelay: itemAnimation.isVisible ? `${(idx * 100) + 800}ms` : '0ms'
                                }}
                              >
                                {url.endsWith('.pdf') ? (
                                  <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 group">
                                    <FileText className="w-10 h-10 text-red-500 dark:text-red-400 transition-transform duration-300 group-hover:scale-110" />
                                    <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm font-medium group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300">PDF Document</p>
                                  </div>
                                ) : (
                                  <img 
                                    src={url}
                                    alt={`${exp.title} - Item ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    loading="lazy"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
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

      {/* Modal with Animation */}
      {modal.isOpen && (
        <div 
          className={`fixed inset-0 bg-black z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isModalAnimating ? 'bg-opacity-90' : 'bg-opacity-0'}`}
          onClick={closeModal}
        >
          <div 
            className={`relative max-w-4xl w-full max-h-[90vh] flex flex-col transition-transform duration-300 ${isModalAnimating ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header with controls - fixed at top */}
            <div className="flex justify-between items-center mb-2 text-white">
              <div style={{ opacity: 0, animation: isModalAnimating ? 'fadeIn 0.5s ease-out forwards' : 'none' }}>
                {modal.itemIndex + 1} / {getItems(experience[modal.experienceIndex]).length || 0}
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-300 transition-colors hover:rotate-90 transform duration-300"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            {/* Content container - PDF or Image */}
            <div className="relative overflow-auto rounded-lg bg-white bg-opacity-5 transition-all duration-300 shadow-2xl">
              {modal.isPdf ? (
                <iframe
                  src={getCurrentItemUrl()}
                  className={`w-full h-[80vh] rounded-lg bg-white transition-opacity duration-300 ${isModalAnimating ? 'opacity-100' : 'opacity-0'}`}
                  title="PDF Document"
                />
              ) : (
                <div className="flex justify-center min-h-[200px]">
                  <img
                    src={getCurrentItemUrl()}
                    alt={`${experience[modal.experienceIndex]?.title} - Image`}
                    className={`max-w-full object-contain transition-all duration-300 ${isModalAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  />
                </div>
              )}
              
              {/* Navigation buttons - only show for multiple items */}
              {getItems(experience[modal.experienceIndex]).length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevItem();
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 rounded-full p-2 text-white hover:bg-opacity-50 transition-all duration-300 hover:scale-110 hover:-translate-x-1"
                    aria-label="Previous item"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextItem();
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 rounded-full p-2 text-white hover:bg-opacity-50 transition-all duration-300 hover:scale-110 hover:translate-x-1"
                    aria-label="Next item"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}