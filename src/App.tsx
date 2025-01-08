import { ThemeProvider } from './hooks/useTheme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Portfolio from './components/Portfolio';
import CV from './components/CV';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navigation />
          <Routes>
            <Route path="/" element={<CV />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;