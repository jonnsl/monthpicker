
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import MonthPicker, { YearMonth } from '../src/MonthPicker'


export default function App() {
  const [value, setValue] = useState<YearMonth | null>(null)
  return (
    <MonthPicker value={value} onChange={setValue}/>
  )
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
