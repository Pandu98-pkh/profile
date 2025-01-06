import { experience } from '../data/experience';
import { Calendar } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Pengalaman Organisasi
        </h2>
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {exp.title}
              </h3>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                <Calendar size={16} className="mr-2" />
                <span>{exp.period}</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}