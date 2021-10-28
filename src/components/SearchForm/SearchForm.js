import './SearchForm.css';
import search__icon from '../../images/search__icon.svg'

export function SearchForm() {
  return(
    <section className="search">
      <form className="search__form">
        <img src={search__icon} className="search__icon" alt="Icon"/>
        <fieldset className="search__form-fields">
          <input
            className="search__form-input"
            placeholder="Фильм"
            required
          />
        </fieldset>
        <button type="submit" className="search__form-button" />
        <span className="search__form-button_border" />
        <div className="search__toggle">
          <h3 className="search__toggle-text">Короткометражки</h3>
        </div>
      </form>
    </section>
  )
}
