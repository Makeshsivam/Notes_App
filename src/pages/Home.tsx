import React from 'react';
import NoteForm from '@/components/NoteForm';
import NotesList from '@/components/Notelist';

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center py-12 px-4 bg-gray-50">
      <div className="flex gap-8 bg-white w-full max-w-5xl rounded-xl shadow-lg p-8">
        {/* Form on the Left */}
        <div className="w-1/2 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Notes App</h1>
            <p className="text-gray-600">Write and manage your thoughts easily.</p>
          </div>
          <NoteForm />
        </div>

        {/* Notes List on the Right */}
        <div className="w-1/2 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-inner overflow-y-auto max-h-[500px]">
          <NotesList />
        </div>
      </div>
    </div>
  );
};

export default Home;
