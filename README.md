## ![image](https://xeon.fun/logo/mini.svg) О проекте

BlurStyle — проект, нацеленный на улучшение взаимодействия с игрой "Танки Онлайн", обеспечивающий регулярные обновления пользовательского интерфейса и функционала игры

**Видеообзор**: [жмать сюда](https://youtu.be/eIjW4-D2_sw)

## ![image](https://xeon.fun/logo/team.svg) Участвовали в разработке

- Логистика, стилизация интерфейса: [xeon](https://vk.com/trallinator)
- Дизайн, моделлинг: [xxnn](https://vk.com/wassupw)
- Помощь в выгрузке необходимых скинов, тестирование проекта: [squirtatrise](https://vk.com/squirtatrise)

## ![image](https://xeon.fun/logo/download.svg) Установка для браузера

1. Установите/обновите расширение Tampermonkey: [жмать сюда](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Установите/обновите скрипт с темой BlurStyle: [жмать сюда](https://xeon.fun/blurstyle.user.js)
3. Перезагрузите вкладку с игрой, если она открыта

## ![image](https://xeon.fun/logo/download.svg) Установка для клиента

1. Установите/обновите официальный клиент Танков Онлайн: [жмать сюда](https://tankionline.com/desktop/TankiOnlineSetup.exe)
2. Скачайте/обновите файл с темой app.asar: [жмать сюда](https://xeon.fun/app.asar)
3. После установки клиента и скачивания файла app.asar найдите ярлык с клиентом на рабочем столе, кликните правой кнопкой мыши, перейдите по расположению файла и по папке "resources"
4. Перенесите с заменой файл app.asar и перезапустите клиент, если он открыт

## ![image](https://xeon.fun/logo/hotkeys.svg) Горячие клавиши

- <code>\\</code> - Отключение/включение фильтра насыщенности и контрастности
- <code>=</code> - Включение/отключение другой вариации таба с показом резистов
- <code>]</code> - Отключение/включение анимированного фона в разделах игры
- <code>insert</code> - Отключение/включение анимированного звездного фона в загрузочных экранах
- <code>F12</code> - Активация девтулс на клиенте

*(Важное примечание: настройки горячих клавиш сохраняются после перезагрузки)*

## ![image](https://xeon.fun/logo/plan.svg) В планах реализовать/в разработке

- Многофункциональное меню темы, содержащее различные пресеты настроек, крутилки, переключалки для большей модульности и лучшей интеракции с игровым интерфейсом
- Скинчейнджер, включающий не только все существующие игровые скины, но и кастомные модели из ТХ
- Конструктор лобби, чтобы каждый мог настроить лобби на свой вкус и цвет
- Погодные циклы, эффекты, новое освещение и ретекстур карт/существующих скинов в игре
- Функция с просчетом фейковых значений FPS
- Функция для скрытия/редактирования припасов в гараже/битве
- Реализовать тему в формате расширения для браузера
- Разбить тему на модули, использовав webpack/rspack для упрощения дальнейшей разработки

## ![image](https://xeon.fun/logo/warning.svg) Список багов, про которые уже известно

- Отсутствие ховер анимации на кнопке премиума в лобби
- Рваная трансформация карточек при наведении курсора
- Проблемы с залипанием ховера в списке битв *(проблемы не с моей стороны)*
- Баг с дублированием бордера после покупки слота под резист в гараже, если аккаунт новый

## ![image](https://xeon.fun/logo/changelog.svg) Список изменений

**changelog version 4.1.6 === 4.1.7:**
- Была изменена вариация текущего меню паузы в битве под старый всеми привычный вариант
- Пофикшен баг с отображением внутриигровых ивентов
- Пофикшен баг с покраской сетевого статуса при скролле участников клана
- Мелкие правки стилей

**changelog version 4.1.5 === 4.1.6:**
- Убраны всплывающие спецпредложения
- Правки в анимацию логотипа
- Различные фиксы стилей
- Правки в акцентные цвета темы

**changelog version 4.1 === 4.1.5:**
- Различные фиксы и правки в стили
- Наконец-то добрался до глобальной покраски цветов вместо блевотно-зеленого по умолчанию на оранжевый практически во всех разделах игры
- Убраны экспериментальные правки с затенением в лобби
- Добавлена новая горячая клавиша на отключение анимированного звездного фона в загрузочном экране на кнопку <code>insert</code> *(на слабых пк ускорит загрузку в битву)*

**changelog version 4.0.6 === 4.1:**
- Тема минифицирована и полностью перемещена на собственный хост, что в теории должно ускорить загрузку самой темы и обеспечить моментальную заливку актуальной версии
- Добавлена новая LGBT анимация для GearScore *(в гараже, финальной стате и в битве)*
- Добавлено новое космическое небо в режиме космос *(только для браузерной версии)*
- Перекрашен худ припасов в битве *(только для браузерной версии)*
- Обновлена ховер анимация на всех элементах *(добавлен новый эффект впадания элемента при наведении курсора)*
- Залита новая иконка для кнопки с логами чата в битве и помещена внутрь самого контейнера с чатом
- Изменено содержимое билборда в битве на лого блюрстайл *(только для браузерной версии)*
- Исправлен баг с пустым скроллом в настройках и перекрывание элементов скроллбаром в последних версиях хрома
- Исправлен баг со стилями в различных разделах после очередной "полезной" обновы со стороны танков
- Исправлен баг с кривыми отступами GearScore в ммной стате, так и не дождался фикса со стороны танков
- Исправлен баг с синим бэкграундом при заходе/выходе из битвы и перемещении между разделами
- Исправлен баг с бэкграундом на странице ТСТО
- Исправлен баг с впаданием кнопок в разделе битв из-за новой "полезной" обновы со стороны танков
- Исправлен баг с заходом текста поверх иконки-кнопки логов в битве

**changelog version 4.0.5 === 4.0.6:**
- Добавлено лого BlurStyle на иконку вкладки
- Разблокирован devtools на клиенте и почищен от хлама main.js в самом app.asar
- Правка логики подмены картинок в юри формат
- По многочисленным просьбам ридми теперь расписан и для EN локали
- Правки бг таймеров в миссиях

**changelog version 4.0 release === 4.0.5:**
- Добавлено лого BlurStyle на все загрузочные экраны
- Мелкие доработки

**changelog version 4.0 pre-release === 4.0 release:**
- Добавлено автообновление темы для браузерной версии, больше не нужно вручную обновлять скрипт на гите
- Фикс отображения анимированного фона на разных браузерах
- Фикс адаптива элементов в шапке
- Фикс некликабильности кнопок с включенным фоном в ивентовом блоке
- Фикс доп вариации таба с резистами
- Мелкие доработки в стилях

**changelog version 3.9.6 === 4.0 pre-release:**
- Проведен полный рефакторинг темы
- Тема была полностью переписана с нуля с абсолютно новой и удобной структурой кода
- Множество исправлений и оптимизаций проекта
- Множество нововведений
- Всего стилизовано элементов в игре: 471

**changelog version 3.9.5 === 3.9.6:**
- Небольшие исправления
- Добавлен эффект глубины на множество элементов
- Добавлена горячая клавиша на отключение анимированного фона (анимация оказалась ресурсоёмкой для маломощных ПК)

**changelog version 3.9 === 3.9.5:**
- Масштабный фикс темы с исправлением очень многих утечек производительности и визуального оформления
- Исправлены и добавлены новые анимации карточек для создания 3д эффекта
- Стилизовано новое меню с контейнерами
- Фиксы канвас анимаций в кнопке играть и загрузочном экране

**changelog version 3.8.5 === 3.9 beta:**
- Добавлен, проработан и адаптирован новый анимированный фон для каждого меню, включая сайт с рейтингом
- Адаптация множества элементов под новый анимированный фон
- Очередные правки в разделе заданий
- Очередные правки анимаций в игре
- Фиксы регистрационного меню
- Фиксы карточек во всех меню игры

**changelog version 3.8.1 === 3.8.5:**
- Глобальная переработка и адаптация темы под все разрешения экрана/любой масштаб страницы
- Исправлена стилизация элементов в разделе заданий
- Мелкие правки анимаций
- Исправлена и улучшена функция fakeFPS
- Исправлена и улучшена функция со скрытием нары в битве
- Улучшение производительности
- Очередные правки в разделе заданий

**changelog version 3.8 === 3.8.1:**
- Исправлена стилизация элементов в гараже
- Мелкие правки анимаций

**changelog version 3.7.2 === 3.8:**
- Доработано меню настроек
- Пофикшено большое количество багов/недочетов
- Доработаны абсолютно все диалоговые окна в игре и не только
- Доработаны практически все элементы в игре
- Доработаны все анимации
- Исправлен баг с резистами в ммных катках
- Оптимизированы канвас анимации на кнопке играть и в загрузочном экране
- Исправлена анимация на промежуточном экране загрузки

**changelog version 3.7.1 === 3.7.2:**
- Добавлены новые анимации
- Исправлены мелкие недочеты
- Добавлена новая анимация для загрузочного экрана

**changelog version 3.7 === 3.7.1:**
- Мелкие исправления
- Добавлена новая анимация при наведении на кнопку играть в главном меню

**changelog version 3.6 === 3.7:**
- Более масштабная проработка анимаций в игре, включая анимации всплывающих окон, подсказок, инфо-блоков, отдельных анимаций для разделов
- Багфикс кривого отображения стилизации в разных разделах
- Улучшение функции скрытия нары
- Пофикшены баги с разделом регистрации аккаунта
- Добавлены отступы для всех списков в игре
- Очередные улучшения производительности

**changelog version 3.5 === 3.6:**
- Полностью переработаны, исправлены и добавлены новые анимации
- Внесены некоторые коррективы в логику наложения стилей и анимаций
- Исправлены чекбоксы в настройках
- Доработан раздел магазина
- Доработаны диалоговые окна
- Доработаны контекстные меню и всплывающие подсказки

**changelog version 3.4 === 3.5:**
- Исправлена утечка производительности
- Редизайн нового меню званий
- Небольшое обновление анимаций
- Небольшой багфикс интерфейса
- Добавлено аним лого
- Добавлена интерактивная плашка скрытия нары
- Добавлена дополнительная вариация таба в битве
- Мини-фикс некоторых стилей и функций

**changelog version 3.3 === 3.4:**
- Были внесены мелкие правки в диалоговые окна
- Исправлено некорректное отображение некоторых элементов
- Исправлены поломанные кнопки после очередной обновы танков
- Улучшения производительности

**changelog version 3.2 === 3.3:**
- Очередной багфикс, лень расписывать

**changelog version 3.1 === 3.2:**
- Переработана логика применения стилей
- Полная оптимизация всех стилей и функций(тема меньше кушать будет, не должно лагать даже на картофано-подобных пк)
- Полностью доработаны/переработаны все разделы в игре включая подменю и контекстные меню
- Полностью исправлены проблемы с отображением текста, размытия и прозрачности множества элементов
- Мелкие фиксы на сайтах ratings и tsto
- Фиксы применения контрасности и насыщенности в самой теме
- Переработка инфо-блоков в игре и инфо-диа окон в самой битве
- Исправлены проблемы с вылетами
- Исправлено отображение различных элементов на более низких разрешениях экрана
- Исправлены баги с применением анимаций и их плавностью/продолжительностью
- Исправлены баги со стилизацией некоторых кнопок
- Исправлены баги с отображением званий в списках друзей

**changelog version 3.0 === 3.1:**
- Багфикс критических и мелких багов в связи с апдейтами

**changelog version 1.0 === 3.0:**
- Полностью переработан сайт с рейтингами
- Полностью переработан сайт ТСТО
- Полностью переработан начальный экран
- Полностью переработан раздел друзей
- Полностью переработан раздел клана
- Полностью переработан раздел новостей
- Полностью переработан раздел глобального чата
- Полностью переработаны диалоговые окна в игре
- Полностью переработан раздел гаража
- Полностью переработан раздел магазина
- Полностью переработан раздел с миссиями
- Полностью переработан раздел с контейнерами
- Полностью переработан внутриигровой TAB и меню паузы с сопутствующими элементами уже в самой битве
- Полностью переработаны интерактивные карточные меню
- Полностью переработаны контекстные меню
- Полностью переработаны туториал окна
- Полностью переработаны все кнопочки в игре
- Полностью переработан список битв
- Полностью переработан список игроков
- Абсолютно новые анимации для множества элементов с плавными переходами

## ![image](https://xeon.fun/logo/mini.svg) About project

BlurStyle — is a project aimed at improving interaction with the game "Tanki Online", providing regular updates to the user interface and functionality of the game

**Videoreview**: [click here](https://youtu.be/eIjW4-D2_sw)

## ![image](https://xeon.fun/logo/team.svg) Participated in development

- Logistics, interface styling: [xeon](https://vk.com/trallinator)
- Design, modeling: [xxnn](https://vk.com/wassupw)
- Help in uploading necessary skins, testing the project: [squirtatrise](https://vk.com/squirtatrise)

## ![image](https://xeon.fun/logo/download.svg) Browser installation

1. Install/update Tampermonkey extension: [click here](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Install/update the BlurStyle theme script: [click here](https://xeon.fun/blurstyle.user.js)
3. Reload the game tab if it is open

## ![image](https://xeon.fun/logo/download.svg) Client Installation

1. Install/update the official Tanks Online client: [click here](https://tankionline.com/desktop/TankiOnlineSetup.exe)
2. Download/update the theme file app.asar: [click here](https://xeon.fun/app.asar)
3. After installing the client and downloading the app.asar file, find the shortcut with the client on your desktop, right click, navigate to the file location and the "resources" folder
4. Transfer the app.asar file with replacement and restart the client if it is open

## ![image](https://xeon.fun/logo/hotkeys.svg) Hotkeys

- <code>\\</code> - Disable/enable saturation and contrast filter
- <code>=</code> - Enable/disable another variation of the tab with resists shown
- <code>]</code> - Disable/enable animated backgrounds
- <code>insert</code> - Disable/enable animated stars background in loading screens
- <code>F12</code> - Activate devtools on the client

*(Important note: hotkey settings are retained after reboot)*

## ![image](https://xeon.fun/logo/plan.svg) Planned/in development

- Multifunctional theme menu, containing various settings presets, twiddles, toggles for more modularity and better interaction with the game interface
- Skinchanger, including not only all existing game skins, but also custom models from TX
- Lobby builder so that everyone can customize the lobby to their own taste and color
- Weather cycles, effects, new lighting and retexture of maps/existing skins in game
- False FPS calculation feature
- Function for hiding/editing supplies in garage/battle
- Implement theme in browser extension format
- Break the theme into modules, using webpack/rspack to simplify further development

## ![image](https://xeon.fun/logo/warning.svg) List of bugs that are already known about

- No hover animation on the premium button in the lobby
- Ripped transformation of cards on mouseover
- Problems with hover sticking in the battle list *(problems aren't on my side)*
- Bug with duplication of Borderer after buying a slot for resist in the garage, if the account is new

## ![image](https://xeon.fun/logo/changelog.svg) List of changes

**changelog version 4.1.6 === 4.1.7:**
- Changed the variation of the current battle pause menu to the old familiar variant.
- Fixed a bug with the display of in-game events
- Fixed bug with network status coloring when scrolling clan members.
- Minor style edits

**changelog version 4.1.5 === 4.1.6:**
- Removed pop-up special offers
- Edits to logo animation
- Various style fixes
- Edits to theme accent colors

**changelog version 4.1 === 4.1.5:**
- Various fixes and styling tweaks
- Finally got to global coloring of colors instead of the default puke green to orange in almost all sections of the game
- Removed experimental edits with shading in lobbies
- Added a new hotkey to disable the animated stars background in the loading screen on the <code>insert</code> button *(on weak PCs will speed up loading into battle)*

**changelog version 4.0.6 === 4.1:**
- Theme is minified and completely moved to its own host, which in theory should speed up loading of the theme itself and provide an instant upload of the current version
- Added new LGBT animation for GearScore *(in garage, final stat and battle)*
- Added new space sky in space mode *(only for browser version)*
- Repainted the artwork of supplies in battle *(only for browser version)*
- Updated hover animation on all items *(added a new effect of falling into an item when hovering the cursor)*
- New icon for the button with chat logs in the battle and placed inside the container with the chat
- Changed the content of the billboard in the battle to a bluerstyle logo *(only for browser version)*
- Fixed bug with empty scrollbar in settings and overlapping of items with scrollbar in recent versions of chrome
- Fixed a bug with styles in different sections after another "useful" update from the tanks dev
- Fixed a bug with crooked GearScore indents in MM stat, never waited for a fix from the tanks dev
- Fixed a bug with blue background when entering/exiting a battle and moving between sections
- Fixed a bug with the background on the page TSTO
- Fixed a bug with buttons falling in the battles section due to a new "useful" update from the tanks dev
- Fixed a bug with text going on top of the log button icon in battle

**changelog version 4.0.5 === 4.0.6:**
- Added BlurStyle logo to the tab icon
- Unlocked devtools on client and cleaned up main.js junk in app.asar itself
- Edit the logic of swapping images to the legal format
- By numerous requests, the readme is now written for EN locale as well
- Edits bg timers in missions

**changelog version 4.0 release === 4.0.5:**
- Added BlurStyle logo to all loading screens.
- Minor tweaks

**changelog version 4.0 pre-release === 4.0 release:**
- Added theme auto-update for browser version, no need to manually update git script anymore
- Fix animated background display on different browsers
- Fix adaptive elements in the header
- Fix button unclickability with enabled background in the event block
- Fix additional tab variation with resistors
- Minor tweaks in styles

**changelog version 3.9.6 === 4.0 pre-release:**
- Full refactoring of the theme
- The theme was completely rewritten from scratch with a completely new and user-friendly code structure.
- Many fixes and optimizations of the project
- Many innovations
- Total styled elements in the game: 471

**changelog version 3.9.5 === 3.9.6:**
- Small fixes
- Added depth effect to many elements
- Added hotkey to disable animated background (animation turned out to be resource-intensive for low-powered PCs)

**changelog version 3.9 === 3.9.5:**
- Major theme fix with fixes for many performance and visual design leaks
- Fixed and added new card animations to create a 3d effect
- Styled new menu with containers
- Fixes canvas animations in play button and boot screen

**changelog version 3.8.1 === 3.8.5:**
- Global rework and adaptation of the theme for all screen resolutions/any page scale
- Fixed styling of elements in the tasks section
- Minor edits to animations
- Fixed and improved fakeFPS feature
- Fixed and improved function with hiding nara in battle
- Performance Improvements
- More edits in the quest section

**changelog version 3.8 === 3.8.1:**
- Fixed stylization of items in the garage
- Minor edits to animations

**changelog version 3.7.2 === 3.8:**
- Finalized settings menu
- Fixed a large number of bugs/flaws
- Completed absolutely all dialog boxes in the game and not only.
- Completed almost all elements in the game
- Fixed all animations
- Fixed bug with resistances in mm rolls
- Optimized kanvas animations on the play button and in the loading screen
- Fixed animation on intermediate loading screen

**changelog version 3.7.1 === 3.7.2:**
- Added new animations
- Fixed minor bugs
- Added new animation for boot screen

**changelog version 3.7 === 3.7.1:**
- Minor bug fixes
- Added new animation when hovering over the play button in the main menu

**changelog version 3.6 === 3.7:**
- More extensive development of animations in the game, including animations of popups, tooltips, info-blocks, separate animations for sections
- Bugfix for crooked display of stylization in different sections
- Improved nara hiding function
- Fixed bugs with account registration section
- Added indentation for all lists in the game
- More performance improvements

**changelog version 3.5 === 3.6:**
- Completely reworked, fixed and added new animations
- Made some adjustments to the overlay logic for styles and animations
- Fixed checkboxes in settings
- Improved store section
- Improved dialog boxes
- Context menus and tooltips improved.

**changelog version 3.4 === 3.5:**
- Fixed performance leak
- Redesigned new ranks menu
- Small animation update
- Small interface bugfix
- Added logo anim
- Added interactive nara hiding bar
- Added additional taba variation in battle
- Mini-fix of some styles and functions

**changelog version 3.3 === 3.4:**
- Minor edits were made to dialog boxes
- Fixed incorrect display of some items
- Fixed broken buttons after another tank update
- Performance improvements

**changelog version 3.2 === 3.3:**
- Another bugfix

**changelog version 3.1 === 3.2:**
- Reworked the logic of applying styles
- Full optimization of all styles and functions (the theme will eat less, should not lag even on potato-like pc)
- Fully finalized/reworked all sections in the game including submenus and context menus
- Completely fixed problems with text display, blurring and transparency of many elements
- Minor fixes on ratings and tsto sites
- Fixes for applying contrast and saturation in the theme itself
- Rework of info-blocks in the game and info-dia windows in the battle itself
- Fixes for problems with crashes
- Fixed display of various elements on lower screen resolutions
- Fixed bugs with animations and their smoothness/duration
- Fixed bugs with styling of some buttons
- Fixed bugs with displaying ranks in friend lists

**changelog version 3.0 === 3.1:**
- Bugfixes of critical and minor bugs due to updates

**changelog version 1.0 === 3.0:**
- Completely redesigned ratings site
- Completely redesigned TSTO site
- Completely redesigned start screen
- Completely redesigned friends section
- Completely redesigned clan section
- Completely redesigned news section
- Completely redesigned global chat section
- Completely redesigned in-game dialog boxes
- Completely redesigned garage section
- Completely redesigned store section
- Completely redesigned missions section
- Completely redesigned container section
- Completely redesigned in-game TAB and pause menu with related items already in the battle itself
- Completely redesigned interactive card menus
- Completely redesigned context menus
- Completely redesigned tutorial windows
- Completely redesigned all the buttons in the game
- Completely redesigned battle list
- Completely redesigned player list
- Completely new animations for many elements with smooth transitions
