const sessionOrder = ["lesson1", "practice1", "lesson2", "practice2", "lesson3", "practice3"];
const progressKey = "curseoop.course.progress";
const sessions = {
  practice1: {
    week: "1", kind: "ПРАКТИКА · 60 МИНУТ", title: "Две книги — два отдельных состояния",
    lead: "Создадим класс Book, добавим действие и проверим, что у каждой книги своё состояние.",
    goal: "Создать несколько книг и объяснить, почему изменение одной не меняет другую.",
    guide: "../course/PRACTICE_01.md",
    exercise: "practice1",
    starter: "class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n        self.is_read = False\n\n    def mark_as_read(self):\n        self.is_read = True",
    agenda: ["0–5 мин · вспомнить класс", "5–12 мин · собрать Book", "12–25 мин · создать две книги", "25–38 мин · добавить действие", "38–48 мин · найти ошибки", "48–56 мин · решить задачу", "56–60 мин · подвести итог"],
    blocks: [
      ["Собираем класс", "7 минут", '<p>Book описывает общие данные каждой книги.</p><pre><code>class Book:<br>    def __init__(self, title, author):<br>        self.title = title<br>        self.author = author<br>        self.is_read = False</code></pre>'],
      ["Создаём две книги", "13 минут", '<p>Создай два объекта и предскажи результат до запуска:</p><pre><code>first_book = Book("Дюна", "Фрэнк Герберт")<br>second_book = Book("Матильда", "Роальд Даль")</code></pre><p>Измени first_book.is_read на True и проверь, что статус второй книги остался False.</p>'],
      ["Добавляем действие", "13 минут", '<p>Добавь внутрь класса метод mark_as_read, который присваивает self.is_read значение True. Вызови first_book.mark_as_read() и выведи статусы обеих книг.</p>'],
      ["Ищем ошибку", "10 минут", '<p>Если написать title = title вместо self.title = title, значение не сохранится в книге. Если забыть self в параметрах метода, Python не сможет передать туда текущую книгу. Исправь обе ошибки в полном плане практики.</p>'],
      ["Самостоятельная задача", "8 минут", '<p>Создай третью книгу, отметь её прочитанной, выведи статусы трёх книг и объясни, почему они различаются.</p><details><summary>Подсказка</summary><p>Сохрани книгу в отдельную переменную и вызови метод через её имя.</p></details>']
    ],
    question: "Если вызвать second_book.mark_as_read(), чей статус изменится?",
    choices: ["Только у second_book", "У всех книг", "Ни у одной книги"], correct: 0,
    feedback: "Метод меняет тот объект, у которого его вызвали.", retry: "self внутри метода означает именно книгу, у которой вызвали действие."
  },
  lesson2: {
    week: "2", kind: "ЛЕКЦИЯ · 60 МИНУТ", title: "Книги собираются в список",
    lead: "Научимся хранить много книг и находить среди них нужные.",
    goal: "Понять, почему ReadingList отвечает за коллекцию, а Book — за одну книгу.",
    guide: "../course/LESSON_02.md",
    agenda: ["0–5 мин · вспомнить Book", "5–15 мин · распределить обязанности", "15–30 мин · понять композицию", "30–40 мин · добавить методы", "40–50 мин · предсказать результат", "50–60 мин · вопросы"],
    blocks: [
      ["Кому принадлежит действие?", "10 минут", '<p>Book хранит название, автора и статус одной книги. ReadingList хранит набор книг и ищет непрочитанные. Каждый объект занимается своей задачей.</p>'],
      ["Один объект хранит другие", "15 минут", '<p>Когда ReadingList содержит объекты Book, это называют композицией. Каждый список получает собственную пустую коллекцию.</p><pre><code>class ReadingList:<br>    def __init__(self):<br>        self.books = []</code></pre>'],
      ["Добавляем и ищем", "20 минут", '<pre><code>def add_book(self, book):<br>    self.books.append(book)<br><br>def unread_books(self):<br>    result = []<br>    for book in self.books:<br>        if not book.is_read:<br>            result.append(book)<br>    return result</code></pre><p>Список принимает объект книги, чтобы проверить её статус.</p>'],
      ["Предсказываем результат", "10 минут", '<p>Добавь две книги, отметь одну прочитанной и посчитай: в списке две книги, непрочитанная — одна.</p>']
    ],
    question: "Где хранится статус прочтения одной книги?",
    choices: ["В объекте Book", "Один общий статус списка", "В имени переменной"], correct: 0,
    feedback: "Статус относится к конкретной книге, поэтому хранится в её объекте.", retry: "У списка много книг, и у каждой свой статус."
  },
  practice2: {
    week: "2", kind: "ПРАКТИКА · 60 МИНУТ", title: "Собираем личный список чтения",
    lead: "Создадим ReadingList, добавим книги и научим список возвращать непрочитанные.",
    goal: "Проверить список на пустом случае, нескольких книгах и после изменения статуса.",
    guide: "../course/PRACTICE_02.md",
    exercise: "practice2",
    starter: "class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n        self.is_read = False\n\n    def mark_as_read(self):\n        self.is_read = True\n\nclass ReadingList:\n    def __init__(self):\n        self.books = []\n\n    def add_book(self, book):\n        pass\n\n    def unread_books(self):\n        pass",
    agenda: ["0–5 мин · вспомнить ответственность объектов", "5–15 мин · создать пустой список", "15–25 мин · добавить книги", "25–38 мин · найти непрочитанные", "38–48 мин · проверить крайние случаи", "48–56 мин · добавить подсчёт", "56–60 мин · подвести итог"],
    blocks: [
      ["Создай пустой список", "10 минут", '<p>Добавь в ReadingList атрибут books со значением пустого списка. Создай объект и проверь, что книг пока нет.</p>'],
      ["Добавь книги", "10 минут", '<p>Реализуй add_book(self, book), создай две книги и добавь их. Проверь количество с помощью len(reading_list.books).</p>'],
      ["Найди непрочитанные", "13 минут", '<p>Напиши unread_books(): создай пустой результат, пройди циклом по книгам, добавь непрочитанные и верни результат.</p>'],
      ["Проверь пустой список", "10 минут", '<p>Создай второй ReadingList, ничего не добавляй и вызови unread_books(). Затем сравни два списка и убедись, что они независимы.</p>'],
      ["Добавь подсчёт", "8 минут", '<p>Создай unread_count(), который возвращает длину результата unread_books().</p><details><summary>Подсказка</summary><pre><code>def unread_count(self):<br>    return len(self.unread_books())</code></pre></details>']
    ],
    question: "Что вернёт unread_books() у нового пустого списка?",
    choices: ["Пустой список", "Одну пустую книгу", "Сообщение об ошибке"], correct: 0,
    feedback: "Цикл не найдёт книг, поэтому вернётся пустой список.", retry: "В пустой коллекции нечего перебирать, результат тоже пустой."
  },
  lesson3: {
    week: "3", kind: "ЛЕКЦИЯ · 60 МИНУТ", title: "Книга и аудиокнига говорят на одном языке",
    lead: "Разные виды материалов могут отвечать на один вызов каждый по-своему.",
    goal: "Понять наследование, переопределение и полиморфизм на знакомом примере.",
    guide: "../course/LESSON_03.md",
    agenda: ["0–5 мин · вспомнить ReadingList", "5–15 мин · найти общее", "15–30 мин · понять базовый класс", "30–40 мин · переопределить метод", "40–50 мин · обработать разные объекты", "50–60 мин · сравнить связи"],
    blocks: [
      ["Ищем общее", "10 минут", '<p>У книги и аудиокниги есть название. У книги — автор, у аудиокниги — рассказчик. Общее понятие назовём ReadingMaterial.</p>'],
      ["Создаём базовый класс", "15 минут", '<pre><code>class ReadingMaterial:<br>    def __init__(self, title):<br>        self.title = title<br><br>    def description(self):<br>        return "Материал: " + self.title</code></pre><p>Книга и аудиокнига получат общие данные из этого класса.</p>'],
      ["Каждый вид описывает себя", "10 минут", '<p>AudioBook наследуется от ReadingMaterial, добавляет рассказчика и задаёт свою версию description(). Это называется переопределением.</p><pre><code>def description(self):<br>    return "Аудиокнига: " + self.title + ", читает " + self.narrator</code></pre>'],
      ["Один цикл — разные ответы", "10 минут", '<pre><code>for material in materials:<br>    print(material.description())</code></pre><p>Цикл не проверяет тип. Каждый объект выполняет свою версию метода. Это полиморфизм.</p>'],
      ["Наследование или композиция?", "10 минут", '<p>Книга является материалом — подходит наследование. ReadingList содержит книги — подходит композиция. Наследование должно описывать ясную связь «является видом».</p>']
    ],
    question: "Почему книгу и аудиокнигу можно обработать одним циклом?",
    choices: ["У обоих есть общий вызов description()", "У них один рассказчик", "Цикл сам угадывает тип"], correct: 0,
    feedback: "У объектов общий метод, а нужную версию выполняет сам объект.", retry: "Посмотри, какой метод вызывается для каждого материала."
  },
  practice3: {
    week: "3", kind: "ПРАКТИКА · 60 МИНУТ", title: "Собираем книгу и аудиокнигу",
    lead: "Создадим два вида материалов и выведем их описания одним циклом.",
    goal: "Добавить базовый класс и убедиться, что общий цикл не зависит от конкретного типа.",
    guide: "../course/PRACTICE_03.md",
    exercise: "practice3",
    starter: "class ReadingMaterial:\n    def __init__(self, title):\n        self.title = title\n\n    def description(self):\n        pass\n\nclass Book(ReadingMaterial):\n    def __init__(self, title, author):\n        super().__init__(title)\n        self.author = author\n        self.is_read = False\n\n    def mark_as_read(self):\n        self.is_read = True\n\n    def description(self):\n        pass\n\nclass AudioBook(ReadingMaterial):\n    def __init__(self, title, narrator):\n        super().__init__(title)\n        self.narrator = narrator\n\n    def description(self):\n        pass\n\ndef describe_all(items):\n    pass",
    agenda: ["0–5 мин · повторить виды связей", "5–17 мин · написать ReadingMaterial", "17–30 мин · обновить Book", "30–40 мин · добавить AudioBook", "40–50 мин · написать общий цикл", "50–56 мин · убрать дублирование", "56–60 мин · подвести итог"],
    blocks: [
      ["Создай общее описание", "12 минут", '<p>Напиши ReadingMaterial: он получает title и возвращает общее описание. Это базовый класс для следующих двух видов.</p>'],
      ["Обнови Book", "13 минут", '<p>Пусть Book наследуется от ReadingMaterial. Вызови super().__init__(title), сохрани автора и переопредели description().</p>'],
      ["Добавь AudioBook", "10 минут", '<p>AudioBook тоже наследуется от ReadingMaterial. Он хранит рассказчика и возвращает описание аудиокниги.</p>'],
      ["Обработай оба вида", "10 минут", '<pre><code>materials = [dune, matilda]<br><br>def describe_all(items):<br>    for item in items:<br>        print(item.description())</code></pre><p>Добавь вызов mark_as_read() у книги и проверь, что общий вывод продолжает работать.</p>'],
      ["Убери повторение", "6 минут", '<p>Если AudioBook присваивает self.title самостоятельно, используй super().__init__(title). Домашнее задание: добавь EBook, не меняя describe_all.</p>']
    ],
    question: "Что понадобится изменить в describe_all, чтобы добавить EBook?",
    choices: ["Ничего, если у EBook есть description()", "Добавить проверку для каждого класса", "Удалить другие материалы"], correct: 0,
    feedback: "Общий метод позволяет добавить новый вид без изменения функции.", retry: "Функция вызывает description() у каждого объекта."
  }
};

function readProgress() {
  try { return JSON.parse(localStorage.getItem(progressKey) || "{}"); }
  catch { return {}; }
}
let progress = readProgress();
const sessionId = new URLSearchParams(window.location.search).get("session") || "welcome";

function updateNavigation() {
  document.querySelectorAll("[data-session-link]").forEach((link) => {
    const current = link.dataset.sessionLink === sessionId;
    link.classList.toggle("selected", current);
    if (current) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}
function updateProgress() {
  const count = sessionOrder.filter((id) => progress[id]).length;
  document.getElementById("progress-label").textContent = count + " из 6 встреч";
  document.getElementById("progress-fill").style.width = (count / 6 * 100) + "%";
  document.querySelector(".progress").setAttribute("aria-valuenow", String(count));
}
function renderCompletion() {
  const completed = Boolean(progress[sessionId]);
  const wrapper = document.querySelector(".complete");
  const button = document.getElementById("complete-button");
  const title = document.getElementById("complete-title");
  const copy = document.getElementById("complete-copy");
  if (!wrapper || !button || !title || !copy) return;
  wrapper.classList.toggle("done", completed);
  button.textContent = completed ? "Отметка сохранена　↶" : "Я прошёл встречу　→";
  title.textContent = completed ? "Отличная работа!" : "Встреча закончена?";
  copy.textContent = completed ? "Ты можешь вернуться и повторить материал в любой момент." : "Отметь встречу, когда будешь готов. Прогресс сохранится на этом компьютере.";
  button.addEventListener("click", () => {
    progress[sessionId] = !progress[sessionId];
    try { localStorage.setItem(progressKey, JSON.stringify(progress)); }
    catch { copy.textContent = "Отметка сохранится только до закрытия страницы в этом режиме браузера."; }
    updateProgress();
    renderCompletion();
  }, { once: true });
}
function renderSession(session) {
  document.title = "ООП без спешки — " + session.title;
  const agenda = session.agenda.map((item) => "<li>" + item + "</li>").join("");
  const blocks = session.blocks.map((block, index) =>
    '<section class="lesson"><div class="kicker">' + String(index + 1).padStart(2, "0") + '　 ' + block[0].toUpperCase() + '<span>' + block[1] + '</span></div>' + block[2] + '</section>'
  ).join("");
  const choices = session.choices.map((choice, index) => '<button data-answer="' + index + '">' + choice + '</button>').join("");
  const practiceEditor = session.exercise
    ? '<section class="lesson code-practice"><div class="kicker">ТВОЙ КОД<span>ПИШИ И ПРОВЕРЯЙ</span></div><h2>Попробуй сам</h2><p>Меняй код в поле и нажимай кнопку проверки. Подсказки покажут, какое условие стоит поправить.</p><textarea id="code-input" class="code-editor" spellcheck="false" autocapitalize="off" aria-label="Поле для Python-кода"></textarea><p class="runner-note">Код этой практики выполняется локально на твоём компьютере. Поддерживаются конструкции Python, которые нужны в курсе.</p><button id="check-code" class="check-button" type="button">Проверить решение</button><div id="code-result" class="code-result" aria-live="polite" hidden></div></section>'
    : "";
  document.querySelector("main").innerHTML =
    '<div class="crumb">ТВОЙ КУРС　/　НЕДЕЛЯ ' + session.week + '　/　' + session.kind + '</div>' +
    '<section class="intro"><div class="eyebrow">НЕДЕЛЯ ' + session.week + ' · ' + session.kind + '</div><h1>' + session.title + '</h1><p class="lead">' + session.lead + '</p><div class="goal"><b>◎　После встречи ты сможешь</b><p>' + session.goal + '</p></div>' +
    '<div class="agenda-card"><strong>План на час</strong><ol>' + agenda + '</ol></div></section>' + blocks +
    '<section class="lesson session-check"><div class="kicker">ПРОВЕРЬ СЕБЯ<span>1 минута</span></div><h2>' + session.question + '</h2><div class="choices">' + choices + '</div><div class="feedback" id="session-feedback" aria-live="polite" hidden></div></section>' +
    practiceEditor +
    '<p class="guide-link"><a href="' + session.guide + '">Открыть подробный план встречи ↗</a></p>' +
    '<section class="complete"><div><strong id="complete-title">Встреча закончена?</strong><p id="complete-copy">Отметь встречу, когда будешь готов. Прогресс сохранится на этом компьютере.</p></div><button id="complete-button">Я прошёл встречу　→</button></section><footer>Можно вернуться к этой встрече в любой момент.　·　Шаг за шагом.</footer>';
  const buttons = [...document.querySelectorAll("[data-answer]")];
  const feedback = document.getElementById("session-feedback");
  buttons.forEach((button) => button.addEventListener("click", () => {
    const correct = Number(button.dataset.answer) === session.correct;
    buttons.forEach((option) => { option.disabled = true; if (option === button) option.classList.add(correct ? "correct" : "incorrect"); });
    feedback.textContent = correct ? session.feedback : session.retry;
    feedback.classList.toggle("try", !correct);
    feedback.hidden = false;
  }));
  if (session.exercise) connectCodeExercise(session);
}

function connectCodeExercise(session) {
  const editor = document.getElementById("code-input");
  const button = document.getElementById("check-code");
  const resultBox = document.getElementById("code-result");
  const draftKey = "curseoop.draft." + session.exercise;
  try {
    editor.value = localStorage.getItem(draftKey) || session.starter;
  } catch {
    editor.value = session.starter;
  }
  editor.addEventListener("input", () => {
    try { localStorage.setItem(draftKey, editor.value); } catch {}
  });
  button.addEventListener("click", async () => {
    resultBox.hidden = false;
    resultBox.replaceChildren();
    if (window.location.protocol === "file:") {
      resultBox.textContent = "Для запуска проверок открой курс через файл start_course.bat в папке проекта. Это поднимет проверяющую часть на твоём компьютере.";
      return;
    }
    button.disabled = true;
    button.textContent = "Проверяю…";
    try {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercise: session.exercise, source: editor.value })
      });
      const result = await response.json();
      if (result.error) {
        resultBox.textContent = result.error;
      } else {
        const passed = result.results.filter((item) => item.ok).length;
        const summary = document.createElement("strong");
        summary.textContent = passed + " из " + result.results.length + " условий выполнено";
        resultBox.append(summary);
        const list = document.createElement("ul");
        result.results.forEach((item) => {
          const row = document.createElement("li");
          row.className = item.ok ? "passed" : "needs-work";
          row.textContent = (item.ok ? "✓ " : "↻ ") + item.label + (item.ok ? "" : " — " + item.hint);
          list.append(row);
        });
        resultBox.append(list);
        if (result.output) {
          const output = document.createElement("details");
          const title = document.createElement("summary");
          const text = document.createElement("pre");
          title.textContent = "Показать вывод программы";
          text.textContent = result.output;
          output.append(title, text);
          resultBox.append(output);
        }
      }
    } catch {
      resultBox.textContent = "Не удалось связаться с локальной проверкой. Запусти курс файлом start_course.bat и открой появившуюся страницу.";
    } finally {
      button.disabled = false;
      button.textContent = "Проверить решение";
    }
  });
}
function renderWelcome() {
  document.title = "ООП без спешки — Начало курса";
  document.querySelector("main").innerHTML =
    '<div class="crumb">ДОБРО ПОЖАЛОВАТЬ　/　НАЧАЛО КУРСА</div>' +
    '<section class="intro welcome-intro"><div class="eyebrow">ТРИ НЕДЕЛИ · ШЕСТЬ ВСТРЕЧ · ОДИН НЕБОЛЬШОЙ ПРОЕКТ</div>' +
    '<h1>Сначала поймём<br><em>простыми словами</em></h1>' +
    '<p class="lead">Не будем сразу бросать тебя в код и новые термины. Сначала разберём идею на обычном примере, а потом понемногу переведём её на Python.</p>' +
    '<div class="welcome-card"><span>Представь стопку карточек для домашней библиотеки.</span><p>На каждой карточке есть название книги, автор и отметка «прочитана или нет».</p></div></section>' +
    '<section class="lesson"><div class="kicker">СНАЧАЛА ТРИ ПРОСТЫЕ ИДЕИ</div><div class="term-grid">' +
    '<article><span class="term-number">1</span><h2>Класс — это образец</h2><p>Как пустая карточка с полями: «название», «автор», «прочитана?».</p></article>' +
    '<article><span class="term-number">2</span><h2>Объект — одна вещь</h2><p>Заполненная карточка конкретной книги: например, «Дюна» Фрэнка Герберта.</p></article>' +
    '<article><span class="term-number">3</span><h2>У каждой вещи своё</h2><p>Если отметить одну книгу прочитанной, остальные книги не изменятся сами собой.</p></article>' +
    '</div><p class="soft">Слова вроде self и __init__ появятся позже, когда мы уже будем понимать, зачем они нужны.</p></section>' +
    '<section class="lesson"><div class="kicker">КАК УСТРОЕНО ОБУЧЕНИЕ</div><h2>Шесть встреч, одна понятная история</h2>' +
    '<ol class="route-list"><li><strong>Неделя 1</strong> — создадим книги и научимся менять их состояние.</li><li><strong>Неделя 2</strong> — соберём книги в личный список чтения.</li><li><strong>Неделя 3</strong> — добавим аудиокниги и общий способ работы с разными материалами.</li></ol>' +
    '<p>На каждой неделе есть лекция и практика. На практике ты пишешь код и проверяешь его на примерах. Ошибки — это часть обучения, а не повод останавливаться.</p>' +
    (window.location.protocol === "file:" ? '<div class="runtime-note">Чтобы проверки запускали твой Python-код, открой start_course.bat в папке проекта. Для чтения курса этот шаг не нужен.</div>' : '') +
    '<a class="start-button" href="?session=lesson1">Начать с первой лекции <span aria-hidden="true">→</span></a></section>' +
    '<footer>Идём небольшими шагами. Можно возвращаться к любому объяснению.</footer>';
}
function connectLessonOneChoices(attribute, feedbackId, correctMessage, retryMessage) {
  const buttons = [...document.querySelectorAll("[data-" + attribute + "]")];
  const feedback = document.getElementById(feedbackId);
  buttons.forEach((button) => button.addEventListener("click", () => {
    const correct = button.dataset[attribute] === "correct";
    buttons.forEach((option) => { option.disabled = true; if (option === button) option.classList.add(correct ? "correct" : "incorrect"); });
    feedback.textContent = correct ? correctMessage : retryMessage;
    feedback.classList.toggle("try", !correct);
    feedback.hidden = false;
  }));
}

updateNavigation();
updateProgress();
if (sessionId === "welcome") renderWelcome();
else if (sessionId !== "lesson1" && sessions[sessionId]) renderSession(sessions[sessionId]);
if (sessionId === "lesson1") {
  connectLessonOneChoices("warmup", "warmup-feedback", "Верно. title хранит название, а False — отметку, что книга ещё не прочитана.", "Ничего страшного. title — название, а False означает «нет» для отметки о прочтении.");
  connectLessonOneChoices("quiz", "quiz-feedback", "Именно так. Мы изменили только первую книгу, у второй статус остался False.", "Почти. Каждая книга хранит свой статус: изменение first_book не меняет second_book.");
}
renderCompletion();

function initializeTheme() {
  const button = document.getElementById("theme-toggle");
  let monochrome = false;
  try { monochrome = localStorage.getItem("curseoop.theme") === "mono"; } catch {}
  function applyTheme() {
    document.documentElement.dataset.theme = monochrome ? "mono" : "color";
    button.textContent = monochrome ? "Светлая тема" : "Тёмная тема";
    button.setAttribute("aria-pressed", String(monochrome));
  }
  button.addEventListener("click", () => {
    monochrome = !monochrome;
    try { localStorage.setItem("curseoop.theme", monochrome ? "mono" : "color"); } catch {}
    applyTheme();
  });
  applyTheme();
}

initializeTheme();
const aboutDialog = document.getElementById("about-dialog");
document.getElementById("about-button").addEventListener("click", () => aboutDialog.showModal());
