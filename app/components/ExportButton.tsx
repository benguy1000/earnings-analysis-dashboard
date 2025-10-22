'use client';

import { Printer } from 'lucide-react';

export default function ExportButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg print:hidden"
    >
      <Printer size={20} />
      Print Report
    </button>
  );
}
