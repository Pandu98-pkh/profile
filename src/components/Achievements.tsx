import { useState } from 'react';
import { achievements } from '../data/achievements';
import { Trophy, X } from 'lucide-react';

interface AchievementModal {
  isOpen: boolean;
  imageUrl: string;
}

export default function Achievements() {
  const [modal, setModal] = useState<AchievementModal>({
    isOpen: false,
    imageUrl: ''
  });

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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Prestasi dan Penghargaan
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {achievement.event}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {achievement.organization}
                    </p>
                    
                    {/* If you have images for achievements, use this block */}
                    {achievement.imageUrl && (
                      <div 
                        className="cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => openModal(achievement.imageUrl || '')}
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