import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import gambar from '../img/DSC_0834ii71x1.jpg';

export default function Header() {
  return (
    <header
      id="profile"
      className="pt-24 pb-16 bg-white dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-blue-500 dark:ring-blue-400">
            <img
              src={gambar}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {personalInfo.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Computer Engineering Student
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Mail size={20} className="mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  {personalInfo.email}
                </span>
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Phone size={20} className="mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  {personalInfo.phone}
                </span>
              </a>
            </div>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href={personalInfo.github}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github
                  size={24}
                  className="text-gray-600 dark:text-gray-300"
                />
              </a>
              <a
                href={personalInfo.linkedin}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin
                  size={24}
                  className="text-gray-600 dark:text-gray-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
