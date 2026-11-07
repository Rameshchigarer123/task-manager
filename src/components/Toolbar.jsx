export default function Toolbar({ query, onQueryChange, sortBy, onSortChange }) {
  return (
    <div>
      <label htmlFor="search">Search tasks</label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search by title"
      />

      <label htmlFor="sort">Sort by</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="none">Added order</option>
        <option value="dueDate">Due date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}