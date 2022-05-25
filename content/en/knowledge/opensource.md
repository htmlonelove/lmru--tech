---
title: "Как подготовить код к&nbsp;open source?"
description: "Мы активно используем продукты open source. А ещё хотим контрибутить, чтобы поддерживать сообщество и участвовать в разработке. Поэтому сделали эту инструкцию — здесь описано, как заопенсорсить код.
"
simple_list: true
weight: 40
menu:
  main:
    parent: "Знания"
type: docs
---

{{% blocks/inner-section %}}
## Шаг 1. Проверяем указание авторства и оригинальность кода

Необходимо зафиксировать список участников проекта. Для каждого участника определить:

* Имя и фамилию – Pavel Griboedov
* Компанию — LLC «Leroy Merlin Vostok»
* Контактную почту – pavel.griboedov\@leroymerlin.ru

### Указание правильной информации в git 
{{% blocks/inner-block class="inner-page__block--sm" %}}

Обязательно отправлять корректную мета-информацию с каждым коммитом.  
По этой информации определяется авторство кода.

{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
{{% blocks/block-bordered %}}

```
git config --global user.name "Pavel Griboedov"
git config --global user.email "pavel.griboedov@leroymerlin.ru"
```

{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}

{{% blocks/inner-block  class="inner-page__block--xs" %}}
Нельзя привлекать временных работников или практикантов к разработке собственных продуктов, которые мы будем выкладывать в open source, а также к работе над внешними open source-проектами.
{{% /blocks/inner-block %}}

{{% blocks/inner-block %}}
Если для нас пишет код внешняя компания, нужно составить контракт с отчуждением прав, а также дополнительно указывать принадлежность кода в исходниках и в документации.
{{% /blocks/inner-block %}}

{{% blocks/inner-block %}}
### Проверка оригинальности

Оригинальность — это важный юридический термин. Мы обладаем юридическими правами, только если код оригинальный. На практике оригинальность кода можно определить, выделив design decision.

{{% /blocks/inner-block %}}

{{% blocks/inner-block %}}
{{% blocks/block-bordered class="block-bordered--success" title-h3="Design Decision" %}}
<p class="block-bordered__text">Персональная интеллектуальная контрибуция разработчика — доказывает, что другой разработчик решил бы похожую проблему иначе.</p>
<img src="/images/design_decision.jpg" alt="Это Design Decision" width="500" height="203">
{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}

{{% blocks/block-bordered class="block-bordered--danger" title-h3="Не Design Decision" %}}
<p class="block-bordered__text">Автоматически сгенерированный код или код, который можно написать единственным образом.</p>
<img src="/images/not_design_decision.jpg" alt="Это не Design Decision" width="500" height="236">
{{% /blocks/block-bordered %}} 
{{% /blocks/inner-section %}}

---

{{% blocks/inner-section %}}
## Шаг 2. Выбираем лицензию

### Лицензии copyleft

{{% blocks/inner-block  class="inner-page__block--xs" %}}
Допустим, ты пишешь код и используешь для этого чужой, который защищен Copyleft лицензией. Тогда, чтобы распространять свой, тебе придётся выбрать лицензию похожего типа. Это значит, что если ты захочешь использовать библиотеку с copyleft-лицензией, то распространять ПО нужно тоже по свободной copyleft-лицензии.
{{% /blocks/inner-block %}}

{{% blocks/inner-block %}}
Самая популярная лицензия этого типа — GNU GPLv3. Даёт возможность делать с проектом всё что угодно, за исключением дистрибуции с закрытым кодом.
{{% /blocks/inner-block %}}

### Лицензии copyright

{{% blocks/inner-block  class="inner-page__block--sm" %}}
Этот тип лицензий разрешает всем использовать и распространять продукты, которые содержат твой код. Даже в закрытых проприетарных решениях.
{{% /blocks/inner-block %}}

{{% blocks/inner-block %}}
* BSD — есть две основные редакции.
[Оригинальная](https://opensource.org/licenses/BSD-3-Clause) версия обязывает добавлять рекламу библиотеки во всех продуктах, где есть твой код, например такую: «Продукт использует программу, разработанную в компании Рога и копыта».
[Изменённая и укороченная](https://opensource.org/licenses/bsd-license.php) версия не включает это обязательство. Обе версии называются одинаково, поэтому мы советуем не использовать их совсем, чтобы не запутаться. А ещё эта лицензия полностью игнорирует патентные права, о которых чуть дальше.

* [MIT](https://opensource.org/licenses/MIT) — короткая лицензия в несколько параграфов. Нравится разработчикам за свою простоту и отлично подходит небольшим проектам. Единственное но — её изобрели раньше, чем патентные права стали часто применяться. Как следствие — лицензия никак не покрывает эту тему.
{{% /blocks/inner-block %}}

### Разница между правами копирайта и патентными правами

{{% blocks/inner-block class="inner-page__block--xs" %}}
Копирайт защищает идеи и вступает в силу автоматически после написания кода. В этом случае копировать или изменять код можно только автору, другим — с разрешения автора по лицензии.
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
Патент защищает изобретения. Если кто-то создаст похожее ПО, владелец патента сможет запретить использовать его или предложит купить патент. У владельца копирайта таких прав нет: если ты и другой разработчик напишете похожий код, каждый из них будет охраняться копирайтом.
{{% /blocks/inner-block %}}

{{% blocks/inner-block %}}
* [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt) —
популярная open source лицензия, которую используют в *[CNCF](https://www.cncf.io/)* и&nbsp;[Apache Foundation](https://www.apache.org/licenses/).
Длиннее чем MIT, но покрывает ещё и вопрос с патентами.
{{% /blocks/inner-block %}}

### Рекомендованный выбор лицензии для большинства случаев
{{% blocks/inner-block class="inner-page__block--sm" %}}
По умолчанию мы предлагаем использовать сopyright open source лицензию — [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt)
{{% /blocks/inner-block %}}

{{% blocks/inner-block %}}
#### Apache License 2.0

Основное требование — сохранение информации о копирайте и лицензии. Разрешает  патентное использование. Лицензированный код, модификации и работы на его основе могут распространяться под другой, даже закрытой лицензией и не включать исходный код.

![Лицензия Apache](/images/apache_license.jpg)
{{% /blocks/inner-block %}}

### Указание лицензии в проекте
{{% blocks/inner-block class="inner-page__block--sm" %}}
В каждом файле с кодом в шапке должна быть указана лицензия. 
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
{{% blocks/block-bordered class="block-bordered--light block-bordered--lg-text" %}}
```
/*
 * Copyright 2020 LLC Leroy Merlin Vostok.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```

package ru.leroymerlin.delivery.tariff.convert;

README.md должен упоминать лицензию.  
\## License

This repository is released under version 2.0 of the  
\[Apache License]\(https://www.apache.org/licenses/LICENSE-2.0).

{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}

LICENSE-файл в корне должен иметь полный текст лицензии.
{{% /blocks/inner-section %}}

---

{{% blocks/inner-section %}}

## Шаг 3. Проверяем совместимость сторонних зависимостей
{{% blocks/inner-block %}}
Лицензии сторонних компонентов могут требовать использование определённой лицензии в твоём проекте. Это значит, что нужно проверять совместимости между сторонними компонентами, а также между компонентами&nbsp;и лицензией проекта.
{{% /blocks/inner-block %}}

{{% blocks/table-col-3 %}}
| Тип лицензии зависимости | Пример | Требуемые действия 
| --- | --- | --- 
| Разрешающие | <span class="code code--default">Apache</span> <span class="code code--default">BSD</span> <span class="code code--default">MIT</span> | None 
| Copyleft | <span class="code code--default">GPL</span> <span class="code code--default">LGPL</span> <span class="code code--default">AGPL</span> | None
| Без лицензии | | Проверить совместимость 
| Проприетарные | <span class="code code--default">Commercial</span> | Удалить или заменить компонент 
| Требующая принятие стороннего соглашения вместе с open source лицензией | <span class="code code--default">CLA</span> <span class="code code--default">CAA</span> | Принять соглашение, удалить или&nbsp;заменить компонент 
{{% /blocks/table-col-3 %}}
{{% /blocks/inner-section %}}

---

## Все шаги пройдены
{{% blocks/inner-block class="inner-page__block--xs" %}}
Можно выкладывать проект в open source. Для этого нужно анонсировать предложение в CI/CD канале в Слаке — дальше репозиторий добавят в список исключений в специальном боте, который закрывает открытые по ошибке репозитории.
{{% /blocks/inner-block %}}

После этого можно смело идти в настройки репозитория и выставить его видимость в public.

---

{{< blocks/button-improvement href="#" text="Предложить улучшения">}}
