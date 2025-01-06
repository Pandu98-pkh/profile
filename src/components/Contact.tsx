import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 text-center mb-8">
            I'm always interested in hearing about new projects and opportunities.
            Feel free to reach out if you'd like to connect!
          </p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:john@example.com" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Mail size={20} className="mr-2" />
              Email Me
            </a>
            <a href="https://linkedin.com" className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
              <Linkedin size={20} className="mr-2" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}