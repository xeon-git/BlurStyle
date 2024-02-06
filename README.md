## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439589624873020/miniLogo.svg) О проекте

BlurStyle — проект, нацеленный на улучшение взаимодействия с игрой "Танки Онлайн", обеспечивающий регулярные обновления пользовательского интерфейса и функционала игры

**Видеообзор**: [жмать сюда](https://youtu.be/eIjW4-D2_sw)

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439633925115924/team.svg) Участвовали в разработке

- Логистика, стилизация интерфейса: [xeon](https://vk.com/trallinator)
- Дизайн, моделлинг: [xxnn](https://vk.com/wassupw)
- Помощь в выгрузке необходимых скинов, тестирование проекта: [squirtatrise](https://vk.com/squirtatrise)

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439615700729899/download.svg) Установка для браузера

1. Установите/обновите расширение Tampermonkey: [жмать сюда](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Установите/обновите скрипт с темой BlurStyle: [жмать сюда](https://github.com/xeon-git/BlurStyle/raw/main/BlurStyle.user.js)
3. Перезагрузите вкладку с игрой, если она открыта

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439615700729899/download.svg) Установка для клиента

1. Установите/обновите официальный клиент Танков Онлайн: [жмать сюда](https://tankionline.com/desktop/TankiOnlineSetup.exe)
2. Скачайте/обновите файл с темой app.asar: [жмать сюда](https://github.com/xeon-git/BlurStyle/raw/main/app.asar)
3. После установки клиента и скачивания файла app.asar найдите ярлык с клиентом на рабочем столе, кликните правой кнопкой мыши, перейдите по расположению файла и по папке "resources"
4. Перенесите с заменой файл app.asar и перезапустите клиент, если он открыт

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204442169587273758/hotkeys.svg) Горячие клавиши

- **\\** - Отключение/включение фильтра насыщенности и контрастности
- **=** - Включение/отключение другой вариации таба с показом резистов
- **]** - Отключение/включение анимированного фона

*(Важное примечание: настройки горячих клавиш сохраняются после перезагрузки)*

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204441457696706641/plan.svg) В планах реализовать/в разработке

- Многофункциональное меню темы, содержащее различные пресеты настроек, крутилки, переключалки для большей модульности и лучшей интеракции с игровым интерфейсом
- Скинчейнджер, включающий не только все существующие игровые скины, но и кастомные модели из ТХ
- Конструктор лобби, чтобы каждый мог настроить лобби на свой вкус и цвет
- Погодные циклы, эффекты, новое освещение и ретекстур карт/существующих скинов в игре
- Функция с просчетом фейковых значений FPS
- Функция для скрытия/редактирования припасов в гараже/битве
- Реализовать тему в формате расширения для браузера

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439625360347156/warning.svg) Список багов, про которые уже известно

- Отсутствие ховер анимации на кнопке премиума в лобби
- Рваная трансформация карточек при наведении курсора
- Проблемы с залипанием ховера в списке битв
- Баг с дублированием бордера после покупки слота под резист в гараже, если аккаунт новый

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439604590280766/changelog.svg) Список изменений

**changelog version 4.0.5 === 4.0.6:**
- Добавлено лого BlurStyle на иконку вкладки
- Разблокирован devtools на клиенте и почищен от хлама main.js в самом app.asar
- Правка логики подмены картинок в юри формат
- По многочисленным просьбам ридми теперь расписан и для EN локали

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
- Добавлена горячая клавиша на отключение анимированного фона(анимация оказалась ресурсоёмкой для маломощных ПК)

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
- Исправлены поломанные кнопки после очередной обновы танкив
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

## ![image](https://cdn.discordapp.com/attachments/954489038423859241/1204429092552966195/miniOrangeLogo.svg?ex=65d4b300&is=65c23e00&hm=43ca13e6c3e25f752d99714d6cb8bf830bd2c049fc0836710f747a8b68bf8713&) About project

BlurStyle — is a project aimed at improving interaction with the game "Tanki Online", providing regular updates to the user interface and functionality of the game

**Videoreview**: [click here](https://youtu.be/eIjW4-D2_sw)

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439633925115924/team.svg) Participated in development

- Logistics, interface styling: [xeon](https://vk.com/trallinator)
- Design, modeling: [xxnn](https://vk.com/wassupw)
- Help in uploading necessary skins, testing the project: [squirtatrise](https://vk.com/squirtatrise)

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439615700729899/download.svg) Browser installation

1. Install/update Tampermonkey extension: [click here](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Install/update the BlurStyle theme script: [click here](https://github.com/xeon-git/BlurStyle/raw/main/BlurStyle.user.js)
3. Reload the game tab if it is open

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439615700729899/download.svg) Client Installation

1. Install/update the official Tanks Online client: [click here](https://tankionline.com/desktop/TankiOnlineSetup.exe)
2. Download/update the theme file app.asar: [click here](https://github.com/xeon-git/BlurStyle/raw/main/app.asar)
3. After installing the client and downloading the app.asar file, find the shortcut with the client on your desktop, right click, navigate to the file location and the "resources" folder
4. Transfer the app.asar file with replacement and restart the client if it is open

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204442169587273758/hotkeys.svg) Hotkeys

- \ - Disable/enable saturation and contrast filter
- = - Enable/disable another variation of the tab with resists shown
- ] - Disable/enable animated backgrounds

*(Important note: hotkey settings are retained after reboot)*

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204441457696706641/plan.svg) Planned/in development

- Multifunctional theme menu, containing various settings presets, twiddles, toggles for more modularity and better interaction with the game interface
- Skinchanger, including not only all existing game skins, but also custom models from TX
- Lobby builder so that everyone can customize the lobby to their own taste and color
- Weather cycles, effects, new lighting and retexture of maps/existing skins in game
- False FPS calculation feature
- Function for hiding/editing supplies in garage/battle
- Implement theme in browser extension format

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439625360347156/warning.svg) List of bugs that are already known about

- No hover animation on the premium button in the lobby
- Ripped transformation of cards on mouseover
- Problems with hover sticking in the battle list
- Bug with duplication of Borderer after buying a slot for resist in the garage, if the account is new

## ![image](https://cdn.discordapp.com/attachments/1204439508775342190/1204439604590280766/changelog.svg) List of changes

**changelog version 4.0.5 === 4.0.6:**
- Added BlurStyle logo to the tab icon
- Unlocked devtools on client and cleaned up main.js junk in app.asar itself
- Edit the logic of swapping images to the legal format
- By numerous requests, the readme is now written for EN locale as well

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