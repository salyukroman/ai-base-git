export const casesData = [
  {
    id: "call-analysis",
    title: "Агент автоматичного аналізу дзвінків та AI-статистики",
    industry: "Харчова промисловість / Кондитерське виробництво",
    result: "10–15 хв → 0 хв на обробку дзвінка",
    description: "Повна автоматизація без участі людини та інтерактивний AI-агент. Компанія отримувала десятки дзвінків на день від клієнтів. Менеджери вручну прослуховували записи, оцінювали тональність розмов і вносили дані в таблиці. Отримати зведену статистику по дзвінках можна було лише після тривалої ручної обробки.",
    challenge: [
      "Середній час обробки одного дзвінка — 10–15 хвилин вручну.",
      "Суб'єктивна оцінка тональності залежала від менеджера.",
      "Неможливо було швидко отримати статистику за довільний проміжок часу.",
      "Частина дзвінків губилась або оброблялась із затримкою через завантаженість команди."
    ],
    solution: "Побудовано автоматичну систему в n8n, яка: 1. Отримує посилання на аудіозаписи дзвінків із Google Sheets, 2. Транскрибує аудіо через AssemblyAI API, 3. Класифікує дзвінок через LLM (тональність + категорія), 4. Зберігає результати в Google Sheets, 5. Надає AI-агента для отримання статистики через звичайний чат.",
    process: [
      { title: "Проєктування черги (Queue Design)", desc: "Створено Google Sheets з чергою дзвінків: посилання на аудіо і статус обробки. Оброблені дзвінки отримують статус Done." },
      { title: "Транскрипція через AssemblyAI", desc: "Workflow надсилає посилання на аудіо до AssemblyAI API, очікує завершення транскрипції через polling кожні 5 секунд." },
      { title: "Архітектура воркфлоу в n8n", desc: "Schedule Trigger запускає обробку кожні 2 хвилини, Google Sheets Node вибирає необроблені рядки, HTTP Request до AssemblyAI для транскрипції, LLM Chain (OpenRouter) класифікує дзвінок і повертає структурований JSON, результат записується в окрему таблицю, статус оновлюється." },
      { title: "AI-агент для генерації статистики", desc: "Окремий агент з System Message має доступ до інструменту get_call_stats, який приймає startDate і endDate та повертає зведену статистику з Google Sheets." },
      { title: "Обробка помилок (Error Handling)", desc: "Окремий workflow перехоплює будь-які збої і логує їх у лист errors у Google Sheets." }
    ],
    metrics: [
      { value: "10-15 хв → 0 хв", label: "Час обробки дзвінка" },
      { value: "3-5 сек", label: "Статистика через AI-чат" },
      { value: "0 помилок", label: "LLM-класифікація" },
      { value: "24/7", label: "Без збільшення штату" }
    ],
    tech: ["n8n", "AssemblyAI API", "OpenRouter", "Google Sheets API", "Schedule Trigger"],
    loomVideo: "https://www.loom.com/embed/0f60d997fae4447cb6e3fb956b9af21a",
    images: [
      "/images/cases/case1_1.png",
      "/images/cases/case1_2.png",
      "/images/cases/case1_3.png",
      "/images/cases/case1_4.png"
    ]
  },
  {
    id: "lead-qualification",
    title: "AI-кваліфікація лідів + автоматизація email-розсилок Klaviyo",
    industry: "E-commerce / Краса та догляд за волоссям",
    result: "2–3 год/тиж → 0 хв ручної класифікації",
    description: "Повна автоматизація кваліфікації лідів, CRM-синхронізація та запуск email-воронок. Клієнт отримує ліди через форму на сайті Wix. Менеджер вручну переглядав кожну заявку, вирішував (гарячий/холодний) і або писав особисто, або не відповідав вчасно. Жодної сегментації в email-маркетингу.",
    challenge: [
      "Ручна класифікація кожного ліда — 2–3 год/тиждень.",
      "Відсутня сегментація: Hot / Warm / Cold не розрізнялись.",
      "Ліди потрапляли в Zoho CRM хаотично, без статусу.",
      "Email-маркетинг без персоналізації — одна розсилка для всіх.",
      "Менеджер не отримував миттєвих сповіщень про нові заявки."
    ],
    solution: "Побудовано повну автоворонку на базі n8n, яка повністю замінила ручну обробку лідів: Webhook отримує лід з форми на Wix-сайті, Transform-нода нормалізує поля, паралельно зберігає в Google Sheets (backup), створює лід в Zoho CRM, відправляє Telegram-сповіщення менеджеру та здійснює AI-кваліфікацію через OpenRouter (GPT-4o-mini). Switch-вузол маршрутизує ліда в один з трьох Klaviyo Lists.",
    process: [
      { title: "Queue Design", desc: "Webhook-тригер з Wix-форми отримує дані та передає у Transform Form Fields." },
      { title: "Паралельні гілки", desc: "Save lead to Google Sheets (append), Send lead to CRM (Zoho CRM create), Format Telegram message (миттєве сповіщення), Lead Qualifier (AI-гілка)." },
      { title: "AI Кваліфікація", desc: "Basic LLM Chain (OpenRouter GPT-4o-mini) -> Structured Output Parser -> JSON: { state: 'hot|warm|cold' }. Fallback: якщо parsing fails -> state = 'warm'." },
      { title: "Маршрутизація Switch State", desc: "Ліди розкидаються по списках у Klaviyo: hot -> Hot list, warm -> Warm list, cold -> Cold list." },
      { title: "Email-воронки Klaviyo", desc: "Hot Flow: одразу Email і дзвінок. Warm Flow: Delay 1 день -> Email -> Delay 3 дні -> Email. Cold Flow: Delay 7 днів -> nurture email x 3." }
    ],
    metrics: [
      { value: "−100%", label: "Ручна класифікація лідів" },
      { value: "3 Flow", label: "Hot / Warm / Cold email" },
      { value: "0 хв", label: "Ручна робота менеджера" },
      { value: "3/3", label: "Тест-сценарії пройдено" }
    ],
    tech: ["n8n", "OpenRouter (GPT-4o-mini)", "Zoho CRM API", "Klaviyo API", "Google Sheets", "Telegram Bot API", "Webhooks"],
    loomVideo: "https://www.loom.com/embed/e3310cba0a4b4d6cb3bb170d5aaa48f1",
    images: [
      "/images/cases/case2_1.png",
      "/images/cases/case2_2.png",
      "/images/cases/case2_3.png",
      "/images/cases/case2_4.png",
      "/images/cases/case2_5.png"
    ]
  },
  {
    id: "sales-reporting",
    title: "AI звітність по продажах",
    industry: "E-commerce / Онлайн-ритейл",
    result: "45+ хв/день → 0 хв щоденного огляду",
    description: "Автоматизована генерація щоденних аналітичних звітів з інсайтами для керівництва.",
    challenge: [
      "Керівник відділу продажів щодня збирав дані з декількох систем у таблиці, щоб зрозуміти, які товари продаються найкраще і де є просідання."
    ],
    solution: "Щоранку n8n збирає дані з CRM та Google Sheets. OpenAI аналізує ці дані, знаходить тренди (наприклад, падіння продажів певного товару) і формує структурований, зрозумілий звіт, який відправляється прямо у Telegram-чат керівництва.",
    process: [],
    metrics: [],
    tech: ["n8n", "OpenAI API", "Google Sheets API", "Telegram API", "CRON"]
  },
  {
    id: "ticket-routing",
    title: "AI маршрутизація звернень",
    industry: "Сфера послуг / Барбершоп",
    result: "0 хв затримки + 100% захист від пропусків",
    description: "Інтелектуальна система маршрутизації клієнтських звернень (тікетів) за правильними категоріями та пріоритетами.",
    challenge: [
      "Всі повідомлення від клієнтів (запис, скарги, питання) падали в одну купу. Адміністратор не встигав відповідати на термінові звернення вчасно."
    ],
    solution: "Кожне звернення аналізується через Claude API/OpenAI. AI класифікує його за темою, визначає терміновість (SLA-контроль). Скарги миттєво ескалюються керівнику, а типові питання отримують авто-відповідь або направляються адміністратору.",
    process: [],
    metrics: [],
    tech: ["n8n", "Claude API", "Structured Output", "Webhooks"]
  }
];

export function getCaseById(id) {
  return casesData.find(c => c.id === id);
}
