import { useState, useEffect } from 'react'; // 1. Import useEffect
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';

export default function App() {
  // 2. Initialize state by checking LocalStorage first
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [search, setSearch] = useState('');

  // 3. Every time 'projects' changes, save it to LocalStorage
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (title, desc) => {
    const newProject = {
      id: Date.now(),
      title,
      desc
    };
    setProjects([newProject, ...projects]);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center">My Project Catalog</h1>

        <ProjectForm onAdd={addProject} />

        <div className="bg-white border border-black rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-Black">
            <input
              type="text"
              placeholder="Search Project"
              className="w-full px-3 py-2 border rounded-md "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ProjectList projects={filteredProjects} onDelete={deleteProject} />
        </div>
      </div>
    </div>
  );
}