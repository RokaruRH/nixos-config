---
name: find-references
description: Use when the user asks to find visual references, inspiration or how other games/artists solve a model, environment, prop, character, material, level, UI or effect. Searches Sketchfab, ArtStation, Behance, Pinterest, game pages and the web through agent-browser, saves screenshots and an index to references/<scope>/ in the .ai/<nnn>__<slug>/ task workspace. Do not load for screenshots of the user's own app or for recording a demo.
argument-hint: "<что ищем> [игры, авторы или сайты]"
---

# Поиск референсов

Референсы — примеры и вдохновение, не доказательство фактов.

## Вход

Из $ARGUMENTS и чата:

- предмет: модель, окружение, персонаж, материал, уровень, UI, эффект — не назван → спроси
- контекст: стиль, жанр, платформа, движок (Unreal, Blender, Godot) — из README проекта, если не сказано
- названные игры, авторы, сайты — с них начинай

## Подготовка

- `agent-browser doctor` — `Launch test` не `pass` → остановись и скажи
- команды: `agent-browser skills get core`

## Папка

- Рабочая папка по правилам скилла `plan-task`: `<root>/.ai/<nnn>__<slug>/`; задачи нет → предмет и есть задача, создай папку по тем же правилам
- Цель не в git-репозитории → спроси, куда писать
- Референсы: `references/<scope>/` внутри рабочей папки
- `<scope>`: предмет lowercase ASCII snake_case, до трёх слов: `scifi_crate`, `forest_shrine`
- scope с этим предметом есть → продолжай нумерацию; новый предмет → новый scope с `01`

## Сессия

Имя сессии — один раз, из `<root>`:

```bash
agent-browser session id --scope cwd --prefix find-references
```

Окружение Bash между вызовами не сохраняется — в каждом вызове:

```bash
export AGENT_BROWSER_SESSION=<имя из команды выше>
export AGENT_BROWSER_PROFILE=<root>/.ai/.chrome_profile
```

- профиль хранит согласия с cookies, пройденные капчи и логины между запусками
- `set viewport 1440 900`

## Источники

Источник блокирует, требует логин или показывает капчу (заголовок `Just a moment...`, url `chrome-error://`) → отложи, сам не обходи.

После остальных источников перечисли отложенные и предложи решить вручную: `close`, затем `agent-browser --headed open <url>`; пользователь прошёл проверку → снимай в этом окне. Отказ → пропусти и укажи в ответе.

### Арт и 3D

- Sketchfab: `https://sketchfab.com/search?q=<query>&type=models` — headless работает
- ArtStation: `https://www.artstation.com/search?sort_by=relevance&query=<query>` — в headless отдаёт Cloudflare, обычно нужен `--headed`
- Behance: `https://www.behance.net/search/projects?search=<query>` — в headless падал с `chrome-error`, обычно нужен `--headed`
- Pinterest: `https://www.pinterest.com/search/pins/?q=<query>` — часть выдачи за логином
- открой конкретную работу, снимай изображение работы по селектору, не сетку выдачи

### Игры и продукты

- WebSearch: игры и продукты с этим предметом — «<предмет> in games», «<стиль> <предмет> game art», «<игра> <предмет>»
- официальные страницы: Steam, сайт игры, арт-блоги студий; доберись до кадра, где виден предмет
- названные игры — первыми; иначе 3–5 найденных

## Отбор

- по умолчанию 5 референсов; число от пользователя важнее
- смотри шире, оставь самые разные: форма и силуэт, стиль, материалы, композиция
- не два из одной игры или от одного автора и не два похожих; кандидат близок к выбранному → отбрось
- минимум 3 источника

## Съёмка

- закрой баннеры cookies и попапы до снимка
- обрезай по предмету: `screenshot <selector> <path>`; важна вся композиция → viewport; длинная страница → `--full`
- один файл на референс, в состоянии, где идея видна лучше всего
- имя: `<nn>__<source>__<idea>.png`, `<nn>` — две цифры с `01`, `<source>` — домен без TLD
- открой каждый файл после сохранения (Read); не по теме, пустой или перекрыт оверлеем → удали и пересними

## Индекс

`references/<scope>/README.md`:

```markdown
# Sci-fi ящик — референсы

## Паттерны
- скосы на углах вместо острых рёбер — 01, 03, 05

## Силуэт

### Угловые усилители, выступающие за габарит
![](01__sketchfab__corner-guards.png)
- [sketchfab](https://sketchfab.com/…)
- также: трафаретная маркировка на крышке

## Пропущено
- artstation — Cloudflare, ручное прохождение отклонено
```

- `##` — решение, которое нужно принять по предмету; `###` — вариант, который показывает файл, сформулированный как «что взять», а не описание картинки
- одна запись на файл, в группе его главной идеи — той, что в имени файла; прочие идеи → пункты `- также:`
- внутри группы — по номеру файла
- текст ссылки — `<source>` из имени файла
- Паттерны: до 3 идей, общих для двух и более файлов, с номерами всех файлов, включая `также`; нет → раздела нет
- индекс уже есть → добавь записи в группы, новые группы по необходимости, обнови Паттерны и Пропущено
- `plan.md` задачи есть → добавь в него ссылку на этот README

## Ответ

- путь к папке
- Паттерны из индекса
- пропущенные источники и почему
- `agent-browser close`
