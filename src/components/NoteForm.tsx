import  { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const NoteForm = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!text.trim()) {
      alert("Please enter some text before saving.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'notes'), {
        text,
        createdAt: serverTimestamp(),
      });
      setText('');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3x mx-auto mt-8  bg-white rounded-lg shadow-md space-y-6">
  <Input
    placeholder="Type your note here..."
    value={text}
    onChange={(e) => setText(e.target.value)}
    maxLength={50}
    disabled={loading}
    className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md px-4 py-2 text-base"
  />
  <Button
    onClick={handleSave}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={loading}
  >
    {loading ? 'Saving...' : 'Save Note'}
  </Button>
</div>
  )
}

export default NoteForm;
