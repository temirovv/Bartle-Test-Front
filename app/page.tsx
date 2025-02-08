'use client';

import { useState, useEffect } from 'react'; // Import useEffect
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log("Home page useEffect: Clearing localStorage"); // Debugging log
    localStorage.clear(); // Clear all items from localStorage
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !age) {
      setError('Please enter both your name and age.');
      return;
    }

    setError('');

    localStorage.setItem('bartleTestUserName', name);
    localStorage.setItem('bartleTestUserAge', age);

    console.log('Name and age stored in local storage.');
    router.push('/welcome');
  };

  return (
    <div className="bg-purple-100 min-h-screen flex justify-center items-center">
      <main className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">BartleTest Mars</h1>
        <p className="mb-4 text-center text-gray-600">Please enter your name and age to begin.</p>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full">
            Start test
          </button>
          <div className="text-center text-gray-500 flex items-center justify-center">
            <hr className="border-t border-gray-300 my-2 flex-grow" />
            <span className="mx-2">or</span>
            <hr className="border-t border-gray-300 my-2 flex-grow" />
          </div>

        </form>
      </main>
    </div>
  );
}