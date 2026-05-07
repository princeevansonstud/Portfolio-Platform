export default function ProjectList({ projects, onDelete }) {
  
    if (projects.length === 0) {
        return <p className="p-8 text-center text-gray-400">You Have No Projects!</p>;
    }

    return (
        <div className="divide-y divide-gray-100">
            {projects.map((project) => (
                <div key={project.id} className="p-4 flex items-start gap-4 ">
                    <div>
                        <button
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-all font-medium"
                            type="button"
                            onClick={() => onDelete(project.id)} 
                        >
                            ✕
                        </button>
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