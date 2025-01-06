import { education } from '../data/education';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Riwayat Pendidikan
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {edu.period}
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