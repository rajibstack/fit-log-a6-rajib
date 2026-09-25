'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FitLogContext = createContext();

export function FitLogProvider({ children }) {
  const [planItems, setPlanItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [toastMessage, setToastMessage] = useState('');


  useEffect(() => {
    const storedPlan = localStorage.getItem('fitlog_plan');
    const storedSaved = localStorage.getItem('fitlog_saved');
    if (storedPlan) setPlanItems(JSON.parse(storedPlan));
    if (storedSaved) setSavedItems(JSON.parse(storedSaved));
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };


  const addToPlan = (workout) => {
    const wId = workout.id || workout._id;
    const exists = planItems.some(item => (item.id || item._id) === wId);
    if (!exists) {
      const updated = [...planItems, workout];
      setPlanItems(updated);
      localStorage.setItem('fitlog_plan', JSON.stringify(updated));
      showToast("Added to today's plan");
    } else {
      showToast("Already in today's plan");
    }
  };


  const saveForLater = (workout) => {
    const wId = workout.id || workout._id;
    const exists = savedItems.some(item => (item.id || item._id) === wId);
    if (!exists) {
      const updated = [...savedItems, workout];
      setSavedItems(updated);
      localStorage.setItem('fitlog_saved', JSON.stringify(updated));
      showToast("Saved for later");
    } else {
      showToast("Already saved");
    }
  };


  const removeFromPlan = (id) => {
    const updated = planItems.filter(item => (item.id || item._id) !== id);
    setPlanItems(updated);
    localStorage.setItem('fitlog_plan', JSON.stringify(updated));
    showToast("Removed from plan");
  };


  const removeFromSaved = (id) => {
    const updated = savedItems.filter(item => (item.id || item._id) !== id);
    setSavedItems(updated);
    localStorage.setItem('fitlog_saved', JSON.stringify(updated));
    showToast("Removed from saved");
  };


  const markAsDone = (id) => {
    removeFromPlan(id);
    showToast("Workout completed! Excellent!");
  };

  return (
    <FitLogContext.Provider value={{
      planItems,
      savedItems,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
      planCount: planItems.length,
      savedCount: savedItems.length
    }}>
      {children}


      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#C2F800] text-black px-5 py-3 rounded-xl font-bold shadow-2xl flex items-center gap-2 text-sm border border-black/10 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </FitLogContext.Provider>
  );
}

export const useFitLog = () => useContext(FitLogContext);