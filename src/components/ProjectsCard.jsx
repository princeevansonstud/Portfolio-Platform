
function ProjectCard({ project }) {
    return (
        <div className="flex items-start space-x-4 py-4 border-b last:border-0">
            <div className="w-16 h-16 border rounded bg-black flex items-center justify-center">
                <span className="text-gray-400">✕</span>
            </div>
            <div>
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-sm text-Black">{project.desc}</p>
            </div>
        </div>
    );
}
