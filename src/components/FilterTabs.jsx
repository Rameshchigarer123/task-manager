export default function FilterTabs({ filter, onChange }) {
  return (
    <div className="tabs">
      <button onClick={() => onChange('all')} aria-pressed={filter === 'all'}>
        All
      </button>
      <button onClick={() => onChange('active')} aria-pressed={filter === 'active'}>
        Active
      </button>
      <button onClick={() => onChange('completed')} aria-pressed={filter === 'completed'}>
        Completed
      </button>
    </div>
  );
}