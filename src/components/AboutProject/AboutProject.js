import './AboutProject.css';

export function AboutProject() {
  return (
    <section id="about-project-id" className="about-project">
      <h2 className="about-project__heading section__text">О проекте</h2>
      <div className="about-project__info">
        <div className="about-project__info_card">
          <h3 className="about-project__info-heading">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__info_card">
          <h3 className="about-project__info-heading">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__info-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__steps">
        <p className="about-project__steps-text about-project__text_one-week">1 неделя</p>
        <p className="about-project__steps-text about-project__text_four-week">4 недели</p>
        <p className="about-project__description-text about-project__description-text-back">Back-end</p>
        <p className="about-project__description-text about-project__description-text-front">Front-end</p>
      </div>
    </section>
  )
}
