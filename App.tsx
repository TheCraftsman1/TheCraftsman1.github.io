import React, { useState, useEffect } from 'react';
import EditorialPortfolio from './components/EditorialPortfolio';
import ProjectPage from './components/ProjectPage';
import { ThemeProvider } from './context/ThemeContext';
import { getProjectById } from './data/projectsData';

const parseProjectIdFromLocation = (): string | null => {
  if (typeof window === 'undefined') return null;

  // 1. Check query parameter: ?project=vikify
  const params = new URLSearchParams(window.location.search);
  const qProj = params.get('project');
  if (qProj && getProjectById(qProj)) return qProj;

  // 2. Check hash route: #/project/vikify or #project/vikify or #vikify
  const hash = window.location.hash;
  if (hash) {
    const cleanHash = hash.replace(/^#\/?/, ''); // e.g. "project/vikify" or "vikify"
    const match = cleanHash.match(/(?:project\/)?([a-zA-Z0-9_-]+)/);
    if (match && match[1] && getProjectById(match[1])) {
      return match[1];
    }
  }

  // 3. Check pathname: /project/vikify
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const projIdx = pathParts.indexOf('project');
  if (projIdx !== -1 && pathParts[projIdx + 1] && getProjectById(pathParts[projIdx + 1])) {
    return pathParts[projIdx + 1];
  }

  return null;
};

const App: React.FC = () => {
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(parseProjectIdFromLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      const pid = parseProjectIdFromLocation();
      setCurrentProjectId(pid);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToProject = (id: string) => {
    setCurrentProjectId(id);
    window.history.pushState({ projectId: id }, '', `#/project/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentProjectId(null);
    window.history.pushState(null, '', window.location.pathname + '#work');
    // Scroll smoothly to Selected Works section
    setTimeout(() => {
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <ThemeProvider>
      <main className="relative min-h-screen w-full overflow-x-hidden bg-[#FAFAFA] dark:bg-[#070707] text-zinc-900 dark:text-white selection:bg-[#fba01d] selection:text-black transition-colors duration-300">
        {currentProjectId ? (
          <ProjectPage
            projectId={currentProjectId}
            onBack={navigateToHome}
            onNavigateProject={navigateToProject}
          />
        ) : (
          <EditorialPortfolio
            onOpenProject={(project) => navigateToProject(project.id)}
          />
        )}
      </main>
    </ThemeProvider>
  );
};

export default App;
