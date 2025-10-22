'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DataContextType {
  ticker: string;
  quarter: string;
  year: string;
  setTicker: (ticker: string) => void;
  setQuarter: (quarter: string) => void;
  setYear: (year: string) => void;
  getAnalysisFileName: () => string;
  getTranscriptFileName: () => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [ticker, setTicker] = useState('');
  const [quarter, setQuarter] = useState('');
  const [year, setYear] = useState('');
  const [initialized, setInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTicker = localStorage.getItem('selectedTicker');
    const savedQuarter = localStorage.getItem('selectedQuarter');
    const savedYear = localStorage.getItem('selectedYear');

    // Only load if values exist in localStorage
    if (savedTicker && savedTicker !== '') {
      setTicker(savedTicker);
    }
    if (savedQuarter && savedQuarter !== '') {
      setQuarter(savedQuarter);
    }
    if (savedYear && savedYear !== '') {
      setYear(savedYear);
    }
    
    setInitialized(true);
  }, []);

  // Save to localStorage when changed (but only after initialization)
  useEffect(() => {
    if (!initialized) return;
    
    if (ticker) {
      localStorage.setItem('selectedTicker', ticker);
    } else {
      localStorage.removeItem('selectedTicker');
    }
    
    if (quarter) {
      localStorage.setItem('selectedQuarter', quarter);
    } else {
      localStorage.removeItem('selectedQuarter');
    }
    
    if (year) {
      localStorage.setItem('selectedYear', year);
    } else {
      localStorage.removeItem('selectedYear');
    }
  }, [ticker, quarter, year, initialized]);

  const getAnalysisFileName = () => {
    return `${ticker}_${year}${quarter}_analysis.json`;
  };

  const getTranscriptFileName = () => {
    return `${ticker}_${year}${quarter}_transcript.json`;
  };

  return (
    <DataContext.Provider
      value={{
        ticker,
        quarter,
        year,
        setTicker,
        setQuarter,
        setYear,
        getAnalysisFileName,
        getTranscriptFileName,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
}
