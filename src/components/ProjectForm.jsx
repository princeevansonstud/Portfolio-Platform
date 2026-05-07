import { useState } from 'react';

export default function ProjectForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !desc.trim()) return;
        onAdd(title, desc);
        setTitle('');
        setDesc('');
    };

    return (
        <form onSubmit={handleSubmit} className=" border white border-black-800 rounded-lg p-6 space-y-4 ">
            <h2 className="text-xl font-semibold">What Are We working On?</h2>

            <div>
                <label className="block text-sm font-medium mb-1 ">Project Name</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 bg-white border rounded-md"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Project Description</label>
                <textarea
                    className="w-full px-3 py-2 bg-white border rounded-md h-24 resize-none"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="px-6 py-2 bg-white border border-black rounded-md hover:bg-green-800 transition-colors font-medium"
            >
                Add Project
            </button>
        </form>
    );
}