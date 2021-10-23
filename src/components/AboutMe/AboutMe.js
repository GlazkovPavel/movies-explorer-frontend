import './AboutMe.css';
import my_photo from '../../images/my_foto.jpg'

export function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__heading section__heading">Студент</h2>
      <div className="about-me__description">
        <div className="about-me__description-text">
          <h3 className="about-me__description-title">Павел</h3>
          <p className="about-me__description-subtitle">Фронтенд-разработчик, 31 год</p>
          <p className="about-me__description-paragraph">Я родился и живу в Ярославле.
            Закончил МИИТ и 8 лет трудился в РЖД.
            С 2021 года работаю в компании Solit-Clouds Тестировщиком ПО
            и в тоже время начал учиться на фронтенд разработчика.
            Хочу дальнейшую жизнь связать с разработкой.
          </p>
          <div className="about-me__description-links">
            <a href="https://t.me/glazkov_pavel" target="_blank" rel="noreferrer" className="about-me__description-link">Telegram</a>
            <a href="https://github.com/GlazkovPavel" target="_blank" rel="noreferrer" className="about-me__description-link">Github</a>
          </div>
        </div>
        <img src={my_photo}  alt="Павел" className="about-me__description-photo"/>
      </div>
    </section>
  )
}
