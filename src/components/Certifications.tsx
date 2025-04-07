import { useState } from 'react';
import { certifications } from '../data/certifications';
import { Award, File, X } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  issued: string;
  expires: string;
  credentialId: string;
  imageUrl: string;
}

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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Lisensi dan Sertifikasi
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Issued: {cert.issued} • Expires: {cert.expires}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
                      ID: {cert.credentialId}
                    </p>
                    <div 
                      className="cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => openModal(cert.imageUrl)}
                    >
                      {cert.imageUrl.endsWith('.pdf') ? (
                        <div className="w-full h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <File className="w-16 h-16 text-gray-500 dark:text-gray-400" />
                        </div>
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
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal.isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
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