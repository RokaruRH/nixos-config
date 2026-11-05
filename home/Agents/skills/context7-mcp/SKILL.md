---
name: context7-mcp
description: Use before stating how any library, framework, CLI, game engine or agent tool behaves — API, config keys, flags, defaults, limits, loading order, code examples. Covers e.g. Unreal Engine, Blender Python API, Godot, REAPER, Wine, home-manager, Claude Code, React, Python libraries. Use even when the answer seems known; never answer from memory.
---

Ответ зависит от поведения библиотеки, фреймворка, CLI или агента → документация через Context7 (MCP-сервер `context7`), а не память модели.

## Когда

- Вопрос про настройку, конфиг, флаги, API, лимиты, дефолты
- Код, использующий библиотеку или движок
- Ответ опирается на поведение инструмента, даже если о нём не спросили прямо

## Порядок источников

Context7 — агрегатор чужой документации, а не первичный источник. Порядок:

1. Установленная версия на машине: `--help`, `man`, исходник, запуск — надёжнее любой документации
2. NixOS / nixpkgs / home-manager: search.nixos.org, исходник пакета в nixpkgs, NixOS manual, wiki.nixos.org; Context7 — только как подсказка
3. Context7 — для всего остального
4. Context7 не нашёл библиотеку или выдача пустая/старая → официальный сайт или репозиторий напрямую

## Запрос

1. `resolve-library-id`: `libraryName` — имя библиотеки, `query` — полный вопрос пользователя
2. Выбор ID:
   - точное совпадение имени
   - официальный репозиторий, а не форк или пересказ
   - версия названа или установлена → ID этой версии; установленную версию сначала узнай локально
   - пользователь сам дал ID `/org/project` → шаг 1 пропусти
3. `query-docs`: `libraryId`, `query` — конкретный вопрос; для кода — `language`

## Ответ

- Ссылка на исходную страницу документации из выдачи Context7, не на Context7
- Версия документации ≠ установленной → скажи об этом
- Context7 противоречит локальной проверке → прав локальный результат; покажи оба
- Подтвердить нечем → «не проверено» и почему
