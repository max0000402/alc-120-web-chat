# Направление WEB

[[_TOC_]]

## Разработка многопользовательского чата с использованием технологии веб-сокетов

**Число участников**: 1-4 человека  

**Цель:** Создать веб-приложение, представляющее собой многопользовательский чат, поддерживающий реальное время и приватные сообщения, с использованием технологии веб-сокетов.  

**Кейс:** Разработка веб-приложения, которое позволяет пользователям регистрироваться, входить в систему, присоединяться к общим чат-комнатам, отправлять и получать сообщения в реальном времени, а также отправлять приватные сообщения другим пользователям. 

**Технологии:**
- Frontend: HTML, CSS, JavaScript/Typescript (ES2022)
- Фреймворк: React
- Backend: Node.js, Express.js
- База данных: MongoDB или другая на выбор

**Библиотеки и инструменты:**
- Для работы с long-polling запросами: socket.io 
- Для работы с базами данных: Mongoose (MongoDB), Sequelize (SQL базы данных), и т. д.
- Оптимизация: Compression, Caching (Redis)

**Задачи:**  
1. Разработать простой интерфейс чата с использованием HTML и CSS. Интерфейс должен содержать список сообщений и форму отправки сообщений.
2. Реализовать сервер на Node.js, который обрабатывает запросы аутентификации, присоединения к чату и отправки сообщений.
3. Использовать socket.io для обеспечения коммуникации в реальном времени между клиентами и сервером.
Реализовать сохранение и загрузку истории сообщений из базы данных.
4. Обеспечить безопасность приложения, включая безопасное хранение паролей и обработку ошибок.
5. Подготовить выступление, в котором показать результаты проделанной работы - раскрыть и объяснить представленное решение или его часть.

**Критерии оценки:**  
1. Качество и простота интерфейса чата.
2. Работоспособность long-polling запроса и корректность обновления сообщений в реальном времени.
3. Чистота и структура кода на стороне сервера и клиента.
4. Работоспособность сохранения и загрузки сообщений из базы данных.
5. Эффективность оптимизации long-polling запроса с учетом нагрузки на сервер и скорости обновления данных.
Гибкость и масштабируемость архитектуры приложения.
Применение современных подходов и инструментов разработки, например, использование библиотеки socket.io, применение паттернов проектирования, тестирование кода.

**Дополнительные материалы:** 
- [Основы long-polling запросов и их применение](https://habr.com/ru/articles/335106/)
- [Введение в long-polling на примере PHP и JavaScript (на русском)](https://habr.com/ru/articles/128535/).
- [Основы работы с промисами в JavaScript](https://learn.javascript.ru/promise).
- [Библиотека Request для работы с запросами в Node.js](https://www.npmjs.com/package/request)
- [Request-Promise для работы с промисами и запросами в Node.js](https://www.npmjs.com/package/request-promise)
- [Пример реализации long-polling запросов на Node.js](https://github.com/AnatolyUss/long-polling-sample)  

## Разработка и оптимизация программного компонента для динамической отрисовки большой таблицы данных в Web-интерфейсе

**Число участников:** 1-3 человека  

**Цель:** Создание простого приложения для динамической отрисовки и оптимизации работы с большой таблицей данных.  

**Кейс:** Разработка веб-приложения для просмотра и фильтрации большого объема данных получаемых с внешнего сервера в виде csv-файла, который обновляется каждые 10 секунд. Endpoint - 185.31.160.57:8055/api/files  

**Технологии:**
- Frontend: HTML, CSS, JavaScript/Typescript (ES2022)
- Фреймворк: React
- Backend: Node.js, Express.js
- База данных: MongoDB или другая на выбор студентов

**Библиотеки и инструменты:**
- Для динамической отрисовки таблицы: react-virtualized или аналоги
- Для работы с базами данных: Mongoose (MongoDB), Sequelize (SQL базы данных), etc.
- Оптимизация: Debounce/Throttle, Caching (Redis)  

**Задачи:**
1. Разработать простой интерфейс для отображения большой таблицы данных с использованием HTML и CSS. Интерфейс должен включать таблицу, панель фильтрации и пагинацию.
2. Реализовать динамическую отрисовку таблицы для оптимизации работы с большим объемом данных. Таблица должна отображать актуальные данные согласно обновлению ресурса по указанному внешнему endpoint’у.
3. Разработать сервер на Node.js с использованием Express.js для обработки запросов от клиента и предоставления данных для таблицы.
4. Реализовать сохранение и загрузку данных из базы данных.
5. Реализовать фильтрацию, сортировку и пагинацию данных в таблице.
6. Подготовить выступление, в котором показать результаты проделанной работы - раскрыть и объяснить представленное решение или его часть.

**Критерии оценки:**
1. Качество и простота интерфейса приложения.
Работоспособность и оптимизация динамической отрисовки таблицы данных.
2. Чистота и структура кода на стороне сервера и клиента.
Работоспособность сохранения и загрузки данных из базы данных.
3. Эффективность реализации фильтрации, сортировки и пагинации данных.
4. Гибкость и масштабируемость архитектуры приложения.
5. Применение современных подходов и инструментов разработки, таких как использование специализированных библиотек для динамической отрисовки таблиц и оптимизации.  

**Дополнительные материалы:**
- [Оптимизация работы с большими таблицами на React (на русском).](https://habr.com/ru/post/490618/)
- [React-Virtualized, библиотека для оптимизации работы с большими таблицами в React.](https://github.com/bvaughn/react-virtualized)
- [Пример использования React Query для управления серверными данными, включая примеры с виртуализацией таблиц.](https://github.com/tannerlinsley/react-query-essentials)

## Разработка веб-приложения для решения и визуализации задачи о рюкзаке

**Число участников:** 1-4 человека  

**Цель:** Создать веб-приложение, которое позволяет пользователям вводить данные для задачи о рюкзаке, решать её и визуализировать процесс решения.

**Кейс:** Пользователи могут ввести набор предметов с указанными весами и стоимостями, а также общий вес рюкзака. Приложение должно решать задачу о рюкзаке и визуализировать процесс решения.

**Технологии:**
- Frontend: HTML, CSS, JavaScript/Typescript
- Фреймворк: React
- Backend: Node.js, Express.js

**Задачи:**
1. Разработать пользовательский интерфейс для ввода данных задачи о рюкзаке.
2. Реализовать алгоритм решения задачи о рюкзаке на стороне сервера или клиента.
3. Реализовать визуализацию процесса решения задачи, используя, например, D3.js.
4. Реализовать возможность сравнения эффективности различных алгоритмов решения задачи о рюкзаке.
5. Подготовить выступление, в котором показать результаты проделанной работы - раскрыть и объяснить представленное решение или его часть.

**Критерии оценки:**
1. Качество и простота пользовательского интерфейса.
2. Корректность реализации алгоритма решения задачи о рюкзаке.
3. Качество визуализации процесса решения.
4. Работоспособность сравнения различных алгоритмов решения задачи.
5. Качество кода и архитектурных решений.

**Дополнительные материалы:**
- [Задача о рюкзаке (Knapsack problem) простыми словами](https://habr.com/ru/articles/561120/)
- [D3.js. Визуализация графов](https://habr.com/ru/articles/302968/)
- [Примеры решений задачи о рюкзаке](https://github.com/ZhengyiLuo/KnapsackProblem)

