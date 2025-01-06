import { personalInfo } from '../data/personalInfo';

export default function Footer() {
  return (
    <footer className="py-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}