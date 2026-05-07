export default function ProjectList({ projects }) {
    if (projects.length === 0) {
        return <p className="p-8 text-center text-gray-400">No projects to display.</p>;
    }

    return (
        <div className="divide-y divide-gray-100">
            {projects.map((project) => (
                <div key={project.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                    <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded flex items-center justify-center shrink-0">
                        <span className="text-gray-400 text-xl">✕</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-tight">{project.title}</h3>
                        <p className="text-gray-600 mt-1">{project.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}