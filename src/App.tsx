import { ThemeProvider } from './hooks/useTheme';
import ThemeToggle from './components/ThemeToggle';
import Navigation from './components/Navigation';
import Portfolio from './components/Portfolio';
import CV from './components/CV';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('cv');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <ThemeToggle />
        {currentPage === 'cv' ? <CV /> : <Portfolio />}
      </div>
    </ThemeProvider>
  );
}

export default App;