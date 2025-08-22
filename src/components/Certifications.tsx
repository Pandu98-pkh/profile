import { useState, useEffect } from 'react';
import { certifications } from '../data/certifications';
import { Award, X, FileText } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import PDFPreview from './PDFPreview';

interface CertificationModal {
  isOpen: boolean;
  imageUrl: string;
  isPdf: boolean;
}

export default function Certifications() {
  const [modal, setModal] = useState<CertificationModal>({
    isOpen: false,
    imageUrl: '',
    isPdf: false
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
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const titleAnimation = useScrollAnimation();

  const openModal = (imageUrl: string) => {
    const isPdf = imageUrl.endsWith('.pdf');
    setModal({ isOpen: true, imageUrl, isPdf });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModal({ isOpen: false, imageUrl: '', isPdf: false });
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section id="certifications" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 
            ref={titleAnimation.ref}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
            style={{ 
              opacity: 0, 
              animation: titleAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none' 
            }}
          >
            Lisensi dan Sertifikasi
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => {
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
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg transition-transform duration-300 hover:scale-110">
                      <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
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
                        {cert.title}
                      </h3>
                      <p 
                        className="text-gray-600 dark:text-gray-300 mb-2"
                        style={{ 
                          opacity: 0, 
                          animation: cardAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                          animationDelay: cardAnimation.isVisible ? `${400}ms` : '0ms'
                        }}
                      >
                        {cert.issuer}
                      </p>
                      <p 
                        className="text-sm text-gray-500 dark:text-gray-400"
                        style={{ 
                          opacity: 0, 
                          animation: cardAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                          animationDelay: cardAnimation.isVisible ? `${500}ms` : '0ms'
                        }}
                      >
                        Issued: {cert.issued} • Expires: {cert.expires}
                      </p>
                      <p 
                        className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4"
                        style={{ 
                          opacity: 0, 
                          animation: cardAnimation.isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                          animationDelay: cardAnimation.isVisible ? `${600}ms` : '0ms'
                        }}
                      >
                        ID: {cert.credentialId}
                      </p>
                      <div 
                        className="cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => openModal(cert.imageUrl)}
                        style={{ 
                          opacity: 0, 
                          animation: cardAnimation.isVisible ? 'scaleIn 0.5s ease-out forwards' : 'none',
                          animationDelay: cardAnimation.isVisible ? `${700}ms` : '0ms'
                        }}
                      >
                        {cert.imageUrl.endsWith('.pdf') ? (
                          <PDFPreview
                            pdfUrl={cert.imageUrl}
                            alt={cert.title}
                            className="hover:shadow-lg transition-shadow duration-300"
                          />
                        ) : (
                          <img 
                            src={cert.imageUrl}
                            alt={cert.title}
                            className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        )}
                      </div>
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
            {modal.isPdf ? (
              <iframe
                src={modal.imageUrl}
                className="w-full h-[80vh] rounded-lg bg-white"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={modal.imageUrl}
                alt="Certificate"
                className="w-full rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}