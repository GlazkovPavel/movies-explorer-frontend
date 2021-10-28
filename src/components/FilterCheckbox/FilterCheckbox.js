import './FilterCheckbox.css';

export function FilterCheckbox() {

  return (
    <label htmlFor="short-films" className="search__toggle-label">
      <input id="short-films" type="checkbox" className="search__toggle" />
      <span className="search__toggle_visible" />
    </label>
  )
}
