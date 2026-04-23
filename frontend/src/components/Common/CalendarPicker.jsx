import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const CalendarPicker = ({ value, onChange, minDate, placeholder = 'Pick a date', label }) => {
  const today = new Date();
  today.setHours(0,0,0,0);

  const parseDate = (str) => {
    if (!str) return null;
    const [y,m,d] = str.split('-').map(Number);
    return new Date(y, m-1, d);
  };

  const selected = parseDate(value);
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(selected ? selected.getFullYear() : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected ? selected.getMonth() : today.getMonth());
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(v => v-1); }
    else setViewMonth(m => m-1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(v => v+1); }
    else setViewMonth(m => m+1);
  };

  const getDays = () => {
    const first = new Date(viewYear, viewMonth, 1).getDay();
    const total = new Date(viewYear, viewMonth+1, 0).getDate();
    const cells = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    return cells;
  };

  const handleSelect = (day) => {
    if (!day) return;
    const d = new Date(viewYear, viewMonth, day);
    if (minDate) {
      const min = parseDate(minDate);
      if (d < min) return;
    }
    if (d < today) return;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const dd = String(d.getDate()).padStart(2,'0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setOpen(false);
  };

  const isSelected = (day) => {
    if (!day || !selected) return false;
    return selected.getFullYear() === viewYear && selected.getMonth() === viewMonth && selected.getDate() === day;
  };

  const isToday = (day) => {
    if (!day) return false;
    return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
  };

  const isPast = (day) => {
    if (!day) return false;
    const d = new Date(viewYear, viewMonth, day);
    if (minDate) {
      const min = parseDate(minDate);
      return d < min;
    }
    return d < today;
  };

  const formatDisplay = (str) => {
    if (!str) return '';
    const d = parseDate(str);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="relative" ref={ref}>
      {label && <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-1 block">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-gray-50 border rounded-xl text-sm transition-all focus:outline-none ${open ? 'border-blue-400 ring-2 ring-blue-500/20' : 'border-gray-100 hover:border-gray-300'}`}
      >
        <span className={value ? 'text-gray-900 font-semibold' : 'text-gray-400'}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <Calendar size={16} className={value ? 'text-blue-500' : 'text-gray-400'} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-72 left-0 top-full">
          {/* Month/Year Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-600 transition-all">
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-black text-gray-900">{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-600 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-black text-gray-400 uppercase py-1">{d}</div>
            ))}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {getDays().map((day, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(day)}
                disabled={!day || isPast(day)}
                className={`
                  w-8 h-8 mx-auto flex items-center justify-center rounded-xl text-xs font-bold transition-all
                  ${!day ? 'invisible' : ''}
                  ${isSelected(day) ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : ''}
                  ${isToday(day) && !isSelected(day) ? 'border-2 border-blue-400 text-blue-600' : ''}
                  ${isPast(day) ? 'text-gray-200 cursor-not-allowed' : ''}
                  ${!isSelected(day) && !isPast(day) && !isToday(day) ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer' : ''}
                `}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Today shortcut */}
          <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
            <button type="button" onClick={() => { const t=today; const y=t.getFullYear(),m=String(t.getMonth()+1).padStart(2,'0'),d=String(t.getDate()).padStart(2,'0'); onChange(`${y}-${m}-${d}`); setOpen(false); }} className="text-xs font-bold text-blue-600 hover:underline">Today</button>
            {value && <button type="button" onClick={() => { onChange(''); setOpen(false); }} className="text-xs font-bold text-red-400 hover:underline">Clear</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
