import { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';

// --- FIREBASE CONFIG ---
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAWwUOCXUjKNbjg9wV0E3h9Os4jXz6OEsY",
  authDomain: "projectcataloge.firebaseapp.com",
  projectId: "projectcataloge",
  storageBucket: "projectcataloge.firebasestorage.app",
  messagingSenderId: "482002633764",
  appId: "1:482002633764:web:008baebdb930cf585cc4b1",
  measurementId: "G-8317E0H8HC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function App() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

  // New state for Auth inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setProjects([]);
      return;
    }

    const q = query(
      collection(db, "projects"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribeData = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribeData();
  }, [user]);

  const addProject = async (title, desc) => {
    if (!user) return;
    await addDoc(collection(db, "projects"), {
      title,
      desc,
      userId: user.uid,
      createdAt: Date.now()
    });
  };

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, "projects", id));
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Auth Functions
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => signOut(auth);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-black shadow-sm">
          <h1 className="text-xl font-bold">My Project Catalog</h1>
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{user.email}</span>
              <button onClick={logout} className="text-sm font-bold text-red-600 hover:underline">Logout</button>
            </div>
          )}
        </div>

        {user ? (
          <>
            <ProjectForm onAdd={addProject} />
            <div className="bg-white border border-black rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search your projects..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <ProjectList projects={filteredProjects} onDelete={deleteProject} />
            </div>
          </>
        ) : (
          <div className="bg-white border border-black p-8 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-bold">{isRegistering ? "Create Account" : "Login"}</h2>
            <form onSubmit={handleAuth} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-bold hover:bg-gray-800 transition-colors">
                {isRegistering ? "Sign Up" : "Sign In"}
              </button>
            </form>
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full text-sm text-gray-600 hover:underline"
            >
              {isRegistering ? "Already have an account? Login" : "Need an account? Sign Up"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}