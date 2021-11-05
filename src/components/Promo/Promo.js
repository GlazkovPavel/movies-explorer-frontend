import promo from '../../images/promo.svg';
import './Promo.css';

export function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__container-text">
          <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img alt="Мир Веба" className="promo__image" src={promo}/>
      </div>
      <div className="promo__button-container">
        <button className="promo__button">Узнать больше</button>
      </div>
    </section>
  )
}
