import { certifications } from '../data/certifications';
import { Award } from 'lucide-react';

export default function Certifications() {
  return (
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
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Issued: {cert.issued} • Expires: {cert.expires}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ID: {cert.credentialId}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}