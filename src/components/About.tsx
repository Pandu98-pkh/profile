import { personalInfo } from '../data/personalInfo';

export default function About() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">Profil</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 transition-colors">
          {personalInfo.profile}
        </p>
      </div>
    </section>
  );
}