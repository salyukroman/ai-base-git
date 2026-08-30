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
    title: "AI-агент звітності по продажах: моніторинг стану угод CRM",
    industry: "E-commerce / Онлайн-ритейл (Інтернет-магазин)",
    result: "45+ хв/день → 0 хв ручного моніторингу угод",
    description: "Автоматична діагностика угод, виявлення ризиків та Telegram-звітність. Клієнт: інтернет-магазин із власним відділом продажів на базі Zoho CRM. В компанії щодня виникають десятки угод у різних стадіях воронки: нові замовлення, доставка, прибуття у відділення, зворотний зв'язок. Менеджер щоранку вручну переглядав CRM — шукав «завислі» угоди, перевіряв трекінги, читав фідбек клієнтів і вирішував, кому зателефонувати першочергово. Жодної автоматики — лише ручний огляд по одній угоді.",
    challenge: [
      "Щоранку 45+ хвилин витрачалось на ручний перегляд угод у CRM.",
      "«Завислі» угоди виявлялись із затримкою — клієнти чекали зворотного зв'язку по 3–5 днів.",
      "Відсутній пріоритет: urgent і low угоди виглядали однаково в списку.",
      "Жодних автоматичних сповіщень про прострочені доставки, низькі оцінки чи ескалації.",
      "Менеджер не отримував структурованого звіту — діяв на інтуїції."
    ],
    solution: "Побудовано AI-агент на базі n8n, який щоранку о 9:10 автоматично витягує всі угоди з Zoho CRM, фільтрує їх і передає AI Agent (GPT-5-mini), який діагностує кожну угоду та присвоює рівень пріоритету. Результат надсилається у Telegram.",
    process: [
      { title: "Промпт-дизайн (Prompt Design)", desc: "Системний промпт описує 4 рівні пріоритету: URGENT, HIGH, MEDIUM, LOW/OK. Агент діагностує зависання та потребу втручання." },
      { title: "Інтеграція API", desc: "Zoho CRM API для угод, OpenAI API (GPT-5-mini) для діагностики, Structured Output Parser для валідації JSON, Telegram Bot API для доставки звіту." },
      { title: "Архітектура воркфлоу", desc: "Schedule Trigger (09:10) -> Get many deals -> Code JS фільтрація -> AI Agent (GPT + Tool) -> Structured Output Parser -> Code JS HTML formatter -> Send Telegram." }
    ],
    metrics: [
      { value: "45 хв → 0 хв", label: "Щоденний ручний огляд CRM" },
      { value: "4 рівні", label: "Пріоритету (Urgent, High, Medium, Low)" },
      { value: "09:10", label: "Автоматичний звіт щодня" },
      { value: "< 1 хв", label: "Виявлення «завислих» угод" }
    ],
    tech: ["n8n", "OpenAI GPT-5-mini", "Zoho CRM API", "Telegram Bot API", "Schedule Trigger", "Code (JavaScript)"],
    loomVideo: "https://www.loom.com/embed/5e412d9f3c7b4365b1559adadc399171",
    images: [
      "/images/cases/case3_1.png",
      "/images/cases/case3_2.png",
      "/images/cases/case3_3.png",
      "/images/cases/case3_4.png",
      "/images/cases/case3_5.png"
    ]
  },
  {
    id: "ticket-routing",
    title: "AI-агент маршрутизації звернень + SLA-контроль + ескалація",
    industry: "Сфера послуг / Догляд та б'юті-сервіс (Барбершоп «Шалені Вуса»)",
    result: "0 хв затримки + 100% гарантована ескалація P1/P2",
    description: "Розумна маршрутизація звернень, класифікація, авто-відповіді та ескалація. У поштову скриньку підтримки щодня надходять різнотипні звернення від клієнтів: запити на бронь, прохання перенести запис, скарги, питання щодо прайсу. Адміністратори змушені вручну читати кожен лист, формулювати відповіді та визначати терміновість.",
    challenge: [
      "Ручна обробка та затримки: Адміністратори витрачають час на відповіді на стандартні запити, сповільнюючи критичні.",
      "Ризик пропустити критичну скаргу: Серйозні інциденти чекали в загальній черзі.",
      "Людський фактор: Не було чіткого регламенту щодо тону спілкування та залучення людини в конфліктах."
    ],
    solution: "Побудовано двотракову автоматизовану систему на n8n з використанням Google Gemini API, яка полінгує нові листи з Gmail, класифікує їх (priority, category, sentiment), логує у Google Sheets, і створює чернетки для P1/P2 запитів, або відповідає автоматично на типові P3 запити.",
    process: [
      { title: "Промпт-дизайн", desc: "Системний промпт класифікує листи за категоріями та 4 пріоритетами (P1-P4). Визначається, чи потрібна людина (requires_human)." },
      { title: "Архітектура воркфлоу", desc: "Gmail Trigger -> IF Node (фільтр) -> Gemini API (Message a model) -> Code Node (Парсер) -> Switch Node (Маршрутизатор) -> Gmail (Draft/Reply) & Google Sheets." },
      { title: "Калібрування промпту", desc: "Після тестів промпт було вдосконалено: додано медичні маркери (порізи, опіки) для P1, та заборонено авто-відповіді для скарг." }
    ],
    metrics: [
      { value: "0 хв", label: "Затримки на типові запити" },
      { value: "100%", label: "P1/P2 ескалація" },
      { value: "100%", label: "Логування в Google Sheets" },
      { value: "100%", label: "Відповідність тону" }
    ],
    tech: ["n8n", "Google Gemini API", "Gmail API", "Google Sheets API", "JavaScript", "JSON Output Parsing"],
    loomVideo: "https://www.loom.com/embed/548c998dfc394b0ab62a06c80daafe3d",
    images: [
      "/images/cases/case4_1.png",
      "/images/cases/case4_2.png",
      "/images/cases/case4_3.png",
      "/images/cases/case4_4.png"
    ]
  }
];

export function getCaseById(id) {
  return casesData.find(c => c.id === id);
}
