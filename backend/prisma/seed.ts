/**
 * Сид базы StreamVibe: жанры, ~30 известных фильмов/сериалов и отзывы.
 * Метаданные (название, год, рейтинг) — общеизвестные факты,
 * описания — собственные краткие аннотации.
 * Постеры не заполняются (posterUrl: null) — фронтенд рисует стильные
 * плейсхолдеры; реальные постеры появятся после импорта из kinopoisk.dev.
 *
 * Запуск: bun run db:seed (из папки backend)
 */
import { MovieType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const GENRES = [
  'боевик',
  'комедия',
  'драма',
  'фантастика',
  'триллер',
  'приключения',
  'фэнтези',
  'детектив',
  'анимация',
  'криминал',
  'мелодрама',
  'биография',
];

type SeedMovie = {
  title: string;
  originalTitle?: string;
  description: string;
  year: number;
  type?: MovieType;
  rating: number;
  votes: number;
  duration?: number;
  ageRating?: number;
  country?: string;
  genres: string[];
  isTrending?: boolean;
  isNewRelease?: boolean;
  isMustWatch?: boolean;
};

const MOVIES: SeedMovie[] = [
  {
    title: 'Побег из Шоушенка', originalTitle: 'The Shawshank Redemption', year: 1994,
    rating: 9.1, votes: 950000, duration: 142, ageRating: 16, country: 'США',
    genres: ['драма', 'криминал'], isMustWatch: true,
    description: 'Банкир, осуждённый за преступление, которого не совершал, годами сохраняет достоинство и надежду в стенах тюрьмы Шоушенк и меняет жизнь всех вокруг.',
  },
  {
    title: 'Зелёная миля', originalTitle: 'The Green Mile', year: 1999,
    rating: 9.0, votes: 900000, duration: 189, ageRating: 16, country: 'США',
    genres: ['драма', 'фэнтези', 'криминал'], isMustWatch: true,
    description: 'Надзиратель блока смертников знакомится с необычным заключённым, чей дар заставляет его усомниться во всём, во что он верил.',
  },
  {
    title: 'Форрест Гамп', originalTitle: 'Forrest Gump', year: 1994,
    rating: 8.9, votes: 880000, duration: 142, ageRating: 12, country: 'США',
    genres: ['драма', 'мелодрама', 'комедия'], isMustWatch: true,
    description: 'История простодушного человека с большим сердцем, который невольно оказывается в центре ключевых событий американской истории.',
  },
  {
    title: '1+1', originalTitle: 'Intouchables', year: 2011,
    rating: 8.8, votes: 850000, duration: 112, ageRating: 16, country: 'Франция',
    genres: ['драма', 'комедия', 'биография'], isMustWatch: true,
    description: 'Парализованный аристократ нанимает помощником парня из предместья — и эта странная дружба переворачивает жизнь обоих.',
  },
  {
    title: 'Начало', originalTitle: 'Inception', year: 2010,
    rating: 8.7, votes: 820000, duration: 148, ageRating: 12, country: 'США',
    genres: ['фантастика', 'боевик', 'триллер'], isMustWatch: true, isTrending: true,
    description: 'Команда специалистов проникает в чужие сны, чтобы внедрить идею в подсознание наследника корпорации. Но сны имеют свои правила.',
  },
  {
    title: 'Интерстеллар', originalTitle: 'Interstellar', year: 2014,
    rating: 8.6, votes: 800000, duration: 169, ageRating: 16, country: 'США',
    genres: ['фантастика', 'драма', 'приключения'], isMustWatch: true, isTrending: true,
    description: 'Когда Земля становится непригодной для жизни, группа исследователей отправляется сквозь червоточину в поисках нового дома для человечества.',
  },
  {
    title: 'Тёмный рыцарь', originalTitle: 'The Dark Knight', year: 2008,
    rating: 8.5, votes: 780000, duration: 152, ageRating: 16, country: 'США',
    genres: ['боевик', 'триллер', 'криминал'], isMustWatch: true,
    description: 'Бэтмен сталкивается с Джокером — преступником без правил и мотивов, который хочет доказать, что любой человек способен на зло.',
  },
  {
    title: 'Гладиатор', originalTitle: 'Gladiator', year: 2000,
    rating: 8.6, votes: 700000, duration: 155, ageRating: 16, country: 'США',
    genres: ['боевик', 'драма', 'приключения'],
    description: 'Преданный римский генерал становится гладиатором и идёт к арене Колизея, чтобы отомстить императору за гибель своей семьи.',
  },
  {
    title: 'Джентльмены', originalTitle: 'The Gentlemen', year: 2019,
    rating: 8.5, votes: 650000, duration: 113, ageRating: 18, country: 'Великобритания',
    genres: ['криминал', 'комедия', 'боевик'], isTrending: true,
    description: 'Американец построил в Лондоне марихуановую империю и хочет выйти из дела — но покупатели, шантажисты и конкуренты имеют свои планы.',
  },
  {
    title: 'Волк с Уолл-стрит', originalTitle: 'The Wolf of Wall Street', year: 2013,
    rating: 8.0, votes: 640000, duration: 180, ageRating: 18, country: 'США',
    genres: ['драма', 'криминал', 'комедия', 'биография'],
    description: 'Взлёт и падение брокера Джордана Белфорта: миллионы из воздуха, безумные вечеринки и неминуемая расплата.',
  },
  {
    title: 'Отступники', originalTitle: 'The Departed', year: 2006,
    rating: 8.5, votes: 500000, duration: 151, ageRating: 18, country: 'США',
    genres: ['триллер', 'драма', 'криминал'],
    description: 'Полицейский под прикрытием внедряется в мафию, а человек мафии — в полицию. Каждый ищет «крота» на другой стороне.',
  },
  {
    title: 'Паразиты', originalTitle: 'Gisaengchung', year: 2019,
    rating: 8.0, votes: 480000, duration: 132, ageRating: 18, country: 'Корея Южная',
    genres: ['драма', 'триллер', 'комедия'], isMustWatch: true,
    description: 'Бедная семья хитростью устраивается на работу в богатый дом — и запускает цепочку событий, которую уже не остановить.',
  },
  {
    title: 'Достать ножи', originalTitle: 'Knives Out', year: 2019,
    rating: 8.0, votes: 460000, duration: 130, ageRating: 16, country: 'США',
    genres: ['детектив', 'комедия', 'криминал'],
    description: 'Знаменитый детектив расследует смерть автора криминальных романов, и у каждого члена его эксцентричной семьи есть мотив.',
  },
  {
    title: 'Однажды в… Голливуде', originalTitle: 'Once Upon a Time in… Hollywood', year: 2019,
    rating: 7.7, votes: 420000, duration: 161, ageRating: 18, country: 'США',
    genres: ['драма', 'комедия'],
    description: 'Стареющий телезвезда и его дублёр пытаются найти себе место в Голливуде конца 60-х, где всё стремительно меняется.',
  },
  {
    title: 'Мстители: Финал', originalTitle: 'Avengers: Endgame', year: 2019,
    rating: 7.8, votes: 750000, duration: 181, ageRating: 16, country: 'США',
    genres: ['боевик', 'фантастика', 'приключения'], isTrending: true,
    description: 'После разрушительного щелчка Таноса оставшиеся герои идут на отчаянный шаг, чтобы вернуть тех, кого потеряли.',
  },
  {
    title: 'Человек-паук: Через вселенные', originalTitle: 'Spider-Man: Into the Spider-Verse', year: 2018,
    rating: 8.2, votes: 400000, duration: 117, ageRating: 6, country: 'США',
    genres: ['анимация', 'фантастика', 'боевик'],
    description: 'Подросток Майлз Моралес обретает способности Человека-паука и встречает своих двойников из параллельных вселенных.',
  },
  {
    title: 'Аватар: Путь воды', originalTitle: 'Avatar: The Way of Water', year: 2022,
    rating: 7.9, votes: 550000, duration: 192, ageRating: 12, country: 'США',
    genres: ['фантастика', 'боевик', 'приключения'], isTrending: true,
    description: 'Джейк Салли и Нейтири защищают свою семью, найдя убежище у морского народа Пандоры, но война приходит и туда.',
  },
  {
    title: 'Топ Ган: Мэверик', originalTitle: 'Top Gun: Maverick', year: 2022,
    rating: 7.9, votes: 500000, duration: 130, ageRating: 12, country: 'США',
    genres: ['боевик', 'драма'],
    description: 'Спустя тридцать лет службы лучший пилот ВМС возвращается в академию, чтобы подготовить новое поколение к смертельно опасной миссии.',
  },
  {
    title: 'Оппенгеймер', originalTitle: 'Oppenheimer', year: 2023,
    rating: 8.1, votes: 480000, duration: 180, ageRating: 16, country: 'США',
    genres: ['драма', 'биография'], isNewRelease: true, isMustWatch: true,
    description: 'История «отца атомной бомбы» Роберта Оппенгеймера: триумф Манхэттенского проекта и цена, которую пришлось заплатить.',
  },
  {
    title: 'Дюна: Часть вторая', originalTitle: 'Dune: Part Two', year: 2024,
    rating: 8.0, votes: 450000, duration: 166, ageRating: 12, country: 'США',
    genres: ['фантастика', 'приключения', 'драма'], isNewRelease: true, isTrending: true,
    description: 'Пол Атрейдес объединяется с фременами, чтобы отомстить за свою семью и не допустить будущего, которое он видит в пророчествах.',
  },
  {
    title: 'Барби', originalTitle: 'Barbie', year: 2023,
    rating: 6.9, votes: 400000, duration: 114, ageRating: 12, country: 'США',
    genres: ['комедия', 'приключения', 'фэнтези'], isNewRelease: true,
    description: 'Идеальная жизнь Барби в Барбиленде даёт трещину, и она отправляется в реальный мир, чтобы понять, кто она на самом деле.',
  },
  {
    title: 'Головоломка 2', originalTitle: 'Inside Out 2', year: 2024,
    rating: 7.6, votes: 350000, duration: 96, ageRating: 6, country: 'США',
    genres: ['анимация', 'комедия', 'приключения'], isNewRelease: true,
    description: 'Райли становится подростком, и в штабе её эмоций появляются новые жильцы — во главе с неугомонной Тревожностью.',
  },
  {
    title: 'Джон Уик 4', originalTitle: 'John Wick: Chapter 4', year: 2023,
    rating: 7.6, votes: 380000, duration: 169, ageRating: 18, country: 'США',
    genres: ['боевик', 'триллер', 'криминал'], isNewRelease: true,
    description: 'Джон Уик находит способ победить Правление: древняя дуэль по всем правилам. Но путь к ней лежит через армию наёмников.',
  },
  // Сериалы
  {
    title: 'Во все тяжкие', originalTitle: 'Breaking Bad', year: 2008, type: MovieType.SERIES,
    rating: 9.0, votes: 850000, ageRating: 18, country: 'США',
    genres: ['драма', 'криминал', 'триллер'], isMustWatch: true,
    description: 'Школьный учитель химии узнаёт о смертельном диагнозе и начинает варить метамфетамин, шаг за шагом превращаясь в криминального гения.',
  },
  {
    title: 'Игра престолов', originalTitle: 'Game of Thrones', year: 2011, type: MovieType.SERIES,
    rating: 9.0, votes: 900000, ageRating: 18, country: 'США',
    genres: ['фэнтези', 'драма', 'боевик'], isMustWatch: true,
    description: 'Знатные дома Вестероса ведут беспощадную борьбу за Железный трон, пока с севера надвигается древняя угроза.',
  },
  {
    title: 'Шерлок', originalTitle: 'Sherlock', year: 2010, type: MovieType.SERIES,
    rating: 8.8, votes: 700000, ageRating: 16, country: 'Великобритания',
    genres: ['детектив', 'драма', 'криминал'], isMustWatch: true,
    description: 'Гениальный детектив-социопат и военный врач в отставке раскрывают самые запутанные преступления современного Лондона.',
  },
  {
    title: 'Игра в кальмара', originalTitle: 'Squid Game', year: 2021, type: MovieType.SERIES,
    rating: 7.6, votes: 600000, ageRating: 18, country: 'Корея Южная',
    genres: ['триллер', 'драма', 'боевик'], isTrending: true,
    description: 'Сотни должников соглашаются сыграть в детские игры на выживание ради гигантского призового фонда. Проигрыш означает смерть.',
  },
  {
    title: 'Уэнсдэй', originalTitle: 'Wednesday', year: 2022, type: MovieType.SERIES,
    rating: 7.9, votes: 550000, ageRating: 16, country: 'США',
    genres: ['фэнтези', 'комедия', 'детектив'], isTrending: true,
    description: 'Уэнсдэй Аддамс поступает в академию «Невермор» и расследует серию загадочных убийств, попутно осваивая свой пророческий дар.',
  },
  {
    title: 'Одни из нас', originalTitle: 'The Last of Us', year: 2023, type: MovieType.SERIES,
    rating: 8.3, votes: 500000, ageRating: 18, country: 'США',
    genres: ['драма', 'фантастика', 'боевик'], isNewRelease: true, isTrending: true,
    description: 'Через двадцать лет после пандемии контрабандист Джоэл должен провести через разрушенную Америку девочку, от которой зависит будущее человечества.',
  },
  {
    title: 'Медведь', originalTitle: 'The Bear', year: 2022, type: MovieType.SERIES,
    rating: 8.0, votes: 300000, ageRating: 18, country: 'США',
    genres: ['драма', 'комедия'], isNewRelease: true,
    description: 'Молодой шеф-повар из мира высокой кухни возвращается домой, чтобы спасти семейную закусочную и собрать заново собственную жизнь.',
  },
  {
    title: 'Слово пацана. Кровь на асфальте', year: 2023, type: MovieType.SERIES,
    rating: 8.2, votes: 400000, ageRating: 18, country: 'Россия',
    genres: ['драма', 'криминал'], isNewRelease: true, isTrending: true,
    description: 'Казань конца 80-х: подросток Андрей попадает в уличную группировку, где действует один закон — пацан отвечает за свои слова.',
  },
];

const REVIEWS: { movieTitle: string; author: string; location?: string; rating: number; text: string }[] = [
  { movieTitle: 'Интерстеллар', author: 'Александр', location: 'Москва, Россия', rating: 10, text: 'Смотрел в кино три раза. Сцена с докингом под музыку Циммера — лучшее, что я видел на большом экране.' },
  { movieTitle: 'Интерстеллар', author: 'Мария', location: 'Санкт-Петербург, Россия', rating: 9, text: 'Редкий случай, когда фантастика одновременно и зрелищная, и трогательная. Концовку обсуждали всей семьёй.' },
  { movieTitle: 'Начало', author: 'Дмитрий', location: 'Казань, Россия', rating: 9, text: 'Каждый пересмотр нахожу новые детали. Идея снов во снах реализована безупречно.' },
  { movieTitle: 'Во все тяжкие', author: 'Игорь', location: 'Новосибирск, Россия', rating: 10, text: 'Лучшая арка персонажа в истории сериалов. От первой до последней серии — ни одной проходной сцены.' },
  { movieTitle: 'Побег из Шоушенка', author: 'Елена', location: 'Екатеринбург, Россия', rating: 10, text: 'Фильм, который хочется советовать каждому. История о надежде, снятая без единой фальшивой ноты.' },
  { movieTitle: 'Слово пацана. Кровь на асфальте', author: 'Тимур', location: 'Казань, Россия', rating: 9, text: 'Атмосфера конца восьмидесятых передана очень точно. Сильные актёрские работы, особенно у молодых.' },
];

async function main() {
  console.log('🌱 Сидируем базу StreamVibe...');

  // Жанры
  for (const name of GENRES) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name, slug: name.toLowerCase().replace(/\s+/g, '-') },
    });
  }

  // Фильмы (идемпотентно: ищем по названию+году)
  for (const m of MOVIES) {
    const { genres, ...movie } = m;
    const exists = await prisma.movie.findFirst({ where: { title: m.title, year: m.year } });
    const data = {
      ...movie,
      type: m.type ?? MovieType.MOVIE,
      genres: { connect: genres.map((name) => ({ name })) },
    };
    if (exists) {
      await prisma.movie.update({ where: { id: exists.id }, data });
    } else {
      await prisma.movie.create({ data });
    }
  }

  // Отзывы
  for (const r of REVIEWS) {
    const movie = await prisma.movie.findFirst({ where: { title: r.movieTitle } });
    if (!movie) continue;
    const exists = await prisma.review.findFirst({
      where: { movieId: movie.id, author: r.author, text: r.text },
    });
    if (!exists) {
      await prisma.review.create({
        data: { author: r.author, location: r.location, rating: r.rating, text: r.text, movieId: movie.id },
      });
    }
  }

  const [movies, genres, reviews] = await Promise.all([
    prisma.movie.count(),
    prisma.genre.count(),
    prisma.review.count(),
  ]);
  console.log(`✅ Готово: фильмов ${movies}, жанров ${genres}, отзывов ${reviews}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
