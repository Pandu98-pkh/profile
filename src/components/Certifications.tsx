import { useState } from 'react';
import { certifications } from '../data/certifications';
import { Award, File, X, Download } from 'lucide-react';

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

  const openModal = (imageUrl: string): void => {
    const isPdf = imageUrl.endsWith('.pdf');
    
    // Untuk PDF lokal, pastikan path sudah benar
    let fullUrl = imageUrl;
    
    // Jika path relatif, ubah ke absolut (penting untuk deployment)
    if (isPdf && imageUrl.startsWith('/')) {
      // Hilangkan '/src/' dari path jika ada karena dalam build, '/src/' tidak diakses langsung
      fullUrl = imageUrl.replace('/src/', '/');
      
      // Pastikan URL absolut
      if (!fullUrl.startsWith('http')) {
        fullUrl = new URL(fullUrl, window.location.origin).href;
      }
    }
    
    setModal({ isOpen: true, imageUrl: fullUrl, isPdf });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (): void => {
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
            {certifications.map((cert: Certification, index: number) => (
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
                        <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg relative group">
                          {/* Icon untuk PDF */}
                          <File className="w-16 h-16 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
                          
                          {/* Label PDF */}
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            {cert.title.length > 25 ? cert.title.substring(0, 25) + '...' : cert.title}
                          </p>
                          
                          {/* Overlay saat hover */}
                          <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                            <span className="text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Lihat Sertifikat
                            </span>
                          </div>
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
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>
            {modal.isPdf ? (
              <div 
                className="w-full h-[80vh] bg-white rounded-lg overflow-hidden relative"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              >
                {/* Menggunakan object tag untuk PDF yang lebih kompatibel */}
                <object
                  data={modal.imageUrl}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-8">
                    <p className="text-red-500 text-lg mb-4">
                      PDF tidak dapat ditampilkan langsung.
                    </p>
                    <p className="text-gray-600 mb-8 text-center">
                      Coba gunakan tombol download di bawah atau pastikan sertifikat PDF berada di folder yang benar.
                    </p>
                    
                    <a 
                      href={modal.imageUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md flex items-center"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Sertifikat
                    </a>
                  </div>
                </object>
                
                {/* Tombol download sebagai alternatif */}
                <div className="absolute bottom-4 right-4">
                  <a 
                    href={modal.imageUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </div>
              </div>
            ) : (
              <img
                src={modal.imageUrl}
                alt="Certificate"
                className="w-full rounded-lg"
                onClick={(e: React.MouseEvent<HTMLImageElement>) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}