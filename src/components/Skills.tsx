import { skills } from '../data/skills';

export default function Skills() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">Kemampuan</h2>
        <div className="space-y-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 capitalize transition-colors">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((skill) => (
                  <div key={skill} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center transition-colors">
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}