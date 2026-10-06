# Реестр ссылок из переданного набора TFW

**Проверка:** 2026-10-06. В доступных в локальной папке Temp файлах переданного набора найдено 73 вхождения и 26 уникальных внешних HTTP(S)-адресов. Повторения в локализованных README считаются одним адресом. Дополнительно приведена прямая ссылка на файл лицензии в основном репозитории для проверки значка лицензии. Внутренние относительные ссылки на файлы приложенного набора здесь не перечислены по одной: они ведут к приложенным файлам и разделам.

Наличие ссылки не означает, что её содержимое проверено, актуально или принято CURSEOOP. Материалы снимка включают полную редакцию TFW 3.9.0, облегчённую редакцию TFW, Assisted 1.6, переводы, адаптеры, архив миграций и самостоятельные утилиты; их нельзя трактовать как единый комплект одной версии.

## Источники для черновика курса ООП (проверены 2026-10-06)

Эти ссылки добавлены для T-002. Они служат справочными основаниями для проектирования курса, а не готовыми текстами для копирования или решениями владельца.

| Источник | Для чего использовать | Ограничение / статус |
|---|---|---|
| [Python Tutorial — Classes](https://docs.python.org/3/tutorial/classes.html) | Проверять факты о классах, экземплярах, состоянии, методах и наследовании в Python | Официальная документация языка; объяснения CURSEOOP формулировать своими словами. Просмотрены разделы 9 и 9.5. |
| [Oracle Java Tutorials — Object-Oriented Programming Concepts](https://docs.oracle.com/javase/tutorial/java/concepts/index.html) | Вспомогательный концептуальный ориентир по состоянию и поведению объектов, классам, наследованию и интерфейсам | Материал относится к Java Tutorial / JDK 8; не переносить Java-синтаксис в курс Python и учитывать устаревший контекст. |
| [OpenStax — Introduction to Python Programming, Chapter 11](https://openstax.org/books/introduction-python-programming/pages/11-introduction) | Возможный учебный ориентир по последовательности тем | Просмотрен, но не используется для генерации курса: страница запрещает подачу/использование материалов в ИИ без предварительного разрешения. См. также [11.1 OOP basics](https://openstax.org/books/introduction-python-programming/pages/11-1-object-oriented-programming-basics). Повторно рассматривать после выяснения разрешения и условий использования. |

## Основные ссылки на TFW

| Ссылка | Для чего встречается | Где найдена / статус |
|---|---|---|
| [Trace-First Workflow на GitHub](https://github.com/saubakirov/trace-first-starter) | Основной репозиторий; README, quickstart и конфигурация | Несколько README, `quickstart.md`, `project_config.yaml`; основной внешний источник |
| [Сайт TFW](https://tfw.saubakirov.kz/) | Веб-сайт/документация проекта | Локализованные README; не считать архивом неизменяемой версии |
| [Сайт автора](https://saubakirov.kz/) | Ссылка на автора | Локализованные README; не является инструкцией для CURSEOOP |

### Текущий публичный источник, проверен 2026-10-07

- [Философия Trace и TFW](https://github.com/saubakirov/trace-first-starter/blob/master/.tfw/README.md) — текущие формулировки Trace, человеческих полномочий, продолжения работы и соразмерности проверки.
- [Сравнение редакций TFW](https://github.com/saubakirov/trace-first-starter/blob/master/editions/README.md) — описания Light, Assisted и Full; рекомендация репозитория — выбирать Assisted или Full для новых установок.
- [Assisted 1.6](https://github.com/saubakirov/trace-first-starter/blob/master/editions/02-assisted/README.md) — текущая инструкция и границы этой редакции; её процедуры не считаются процедурами CURSEOOP.
- При проверке ветки `master` последним видимым был коммит [`c58815c`](https://github.com/saubakirov/trace-first-starter/commit/c58815ca995a0925eb99bfd87cf260e8b471b230) от 2026-10-06 09:39 UTC с сообщением о выпуске TFW 3.9.0. Это состояние ветки на момент просмотра, а не гарантия неизменности.
| [NotebookLM — блокнот](https://notebooklm.google.com/notebook/0a4cc544-0c0a-4fb0-b7ae-f075625d0980) | Материал, связанный из локализованных README | Доступ может зависеть от учётной записи; содержание отдельно не проверялось |
| [NotebookLM — материал e274558e](https://notebooklm.google.com/notebook/0a4cc544-0c0a-4fb0-b7ae-f075625d0980?artifactId=e274558e-7d56-45ea-b2e7-efc7f6ccdf46) | Отдельный артефакт того же блокнота | Содержание отдельно не проверялось |
| [NotebookLM — материал f800b95b](https://notebooklm.google.com/notebook/0a4cc544-0c0a-4fb0-b7ae-f075625d0980?artifactId=f800b95b-aefb-4447-a9c9-42adb5455e45) | Отдельный артефакт того же блокнота | Содержание отдельно не проверялось |

## Ссылки из истории выпусков и миграций

Эти документы относятся к переходам между конкретными версиями полной редакции. Использовать их только при обновлении соответствующей версии, а не как рабочую процедуру для CURSEOOP.

- [Миграция полной редакции 3.6.0](https://github.com/saubakirov/trace-first-starter/blob/v3.6.0/.tfw/migrations/3.6.0.md) — ссылка из `CHANGELOG.md`.
- [Миграция полной редакции 3.6.1](https://github.com/saubakirov/trace-first-starter/blob/v3.6.1/.tfw/migrations/3.6.1.md) — ссылка из `CHANGELOG.md`.
- [Миграция полной редакции 3.7.0](https://github.com/saubakirov/trace-first-starter/blob/v3.7.0/.tfw/migrations/3.7.0.md) — ссылка из `CHANGELOG.md`.
- [Миграция полной редакции 3.7.1](https://github.com/saubakirov/trace-first-starter/blob/v3.7.1/.tfw/migrations/3.7.1.md) — ссылка из `CHANGELOG.md`.
- [Миграция полной редакции 3.8.0](https://github.com/saubakirov/trace-first-starter/blob/v3.8.0/.tfw/migrations/3.8.0.md) — ссылка из `CHANGELOG.md`.
- [Миграция полной редакции 3.8.1](https://github.com/saubakirov/trace-first-starter/blob/v3.8.1/.tfw/migrations/3.8.1.md) — ссылка из `CHANGELOG.md`.
- [Миграция полной редакции 3.9.0](https://github.com/saubakirov/trace-first-starter/blob/v3.9.0/.tfw/migrations/3.9.0.md) — ссылка из `CHANGELOG.md`; совпадает с версией приложенного файла `VERSION`.
- [Схема учёта расходов TFW в ветке `main`](https://github.com/saubakirov/trace-first-starter/blob/main/.tfw/economics/record.schema.json) — ссылка из приложенной схемы JSON; ветка изменяемая, это не закреплённая версия.

## Справочные стандарты и источники цен

Эти ссылки обслуживают инструменты миграции, JSON-формат и отдельный модуль учёта стоимости AI-вызовов. Они не нужны для разработки курса, пока такая задача не утверждена.

- [Keep a Changelog — правила оформления журнала изменений](https://keepachangelog.com/) — формат истории изменений (`CHANGELOG.md`).
- [Semantic Versioning — схема версий](https://semver.org/) — правила нумерации в `CHANGELOG.md`.
- [JSON Schema, черновик 2020-12](https://json-schema.org/draft/2020-12/schema) — значение `$schema` в `record.schema.json`.
- [Цены OpenAI API](https://developers.openai.com/api/docs/pricing) — источник тарифов в `rates.json`.
- [Описание модели OpenAI gpt-5.6-sol](https://developers.openai.com/api/docs/models/gpt-5.6-sol) — ссылка на модель в `rates.json`; перед реальным расчётом нужно сверить её точное имя.
- [Цены Anthropic API](https://platform.claude.com/docs/en/about-claude/pricing) — источник тарифов в `rates.json`.
- [Цены Google Gemini API](https://ai.google.dev/gemini-api/docs/pricing) — источник тарифов в `rates.json`.

## Технические и оформительские адреса

Это технические ссылки, а не доказательные источники о TFW или CURSEOOP.

- [Значок лицензии](https://img.shields.io/badge/license-MIT-green) — изображение в README. Для условий использования приведена сама [лицензия в репозитории](https://github.com/saubakirov/trace-first-starter/blob/master/LICENSE), а не значок.
- [Значок версии](https://img.shields.io/github/v/tag/saubakirov/trace-first-starter?label=version&color=blue) — изменяемое изображение версии в README.
- [Таблица стилей шрифтов IBM Plex Sans и Mono](https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400&display=swap) — ссылка из `build_a4.py`.
- [Таблица стилей шрифта IBM Plex Sans](https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap) — ссылка из `презентация.html`.
- [Пространство имён SVG](http://www.w3.org/2000/svg) — техническое обозначение формата в `tfw-mark.svg`, а не обычная ссылка для чтения.

## Важные отсутствующие гарантии

- Приложенный `VERSION` подтверждает версию только этого снимка: 3.9.0. Он не подтверждает текущую версию основного проекта.
- Ссылки на `main`, веб-сайт и значки могут менять содержимое без смены приложенного снимка.
- NotebookLM-ссылки обнаружены, но их доступность и содержание не подтверждались.
- Переданный набор включает больше внутренних относительных ссылок, чем внешних URL. Они разрешаются внутри отдельных README, workflow, manifest и migration-файлов; их смысл зависит от конкретной редакции/снимка.
