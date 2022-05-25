---
title: "Принципы построения синхронного API"
weight: 10
menu:
  main:
    parent: "Знания"
type: docs
---

## Пример синхронного API

Приложение отправляет запрос получателю и останавливает работу, пока ждёт ответа. Такой подход применяют, если нужно сохранить порядок вызовов систем.

{{% blocks/inner-block %}}
{{< blocks/levels>}}
{{% blocks/legacy-card title="Уровень 0<br />Легаси" %}}
Используем XML, единственный URI и HTTP-метод — обычно POST.
{{% /blocks/legacy-card %}}                       

{{% blocks/legacy-card title="Уровень 1<br />Ресурсы" %}}
Каждому ресурсу отдельный эндпоинт, можно перейти на JSON.
{{% /blocks/legacy-card %}}

{{% blocks/legacy-card  title="Уровень 2<br />HTTP-глаголы" %}}
Используем правильные HTTP-методы и статус-коды, поддерживаем фильтрацию, пагинацию, поиск, сортировку и версионирование.
{{% /blocks/legacy-card %}}
{{< /blocks/levels >}}
{{% /blocks/inner-block %}}

Цель — достичь 2 уровня на всех канонических API.

---

{{% blocks/inner-section %}}
## Построение URI
{{% blocks/uri-scheme %}}

{{% blocks/inner-block %}}
Используем `kebab-case` для URL и `camelCase` для параметров и атрибутов.

* У каждого ресурса свой эндпоинт.
* Название ресурса всегда во множественном числе.
* Если ресурс относится к другому, используем вложенность.<p class="block-bordered block-bordered--sm  block-bordered--success"><code>/customers/{id}/addresses</code> все адреса конкретного кастомера</p>
* Максимальная вложенность — 1.<p class="block-bordered block-bordered--sm  block-bordered--danger"><code>/suppliers/{id}/products/{id}/media/{id}</code> слишком глубоко</p>
* Можно использовать единственное число там, где других таких же предметов быть не может.
* <p class="block-bordered block-bordered--sm  block-bordered--danger"><code>/delivery/v1/products</code> не бывает иных обьектов <code>delivery</code></p>
{{% /blocks/inner-block %}}

{{% blocks/inner-block %}}
{{% blocks/block-bordered class="block-bordered--success" title-h4="Хорошие примеры" %}}
`/customers` все кастомеры  
`/customers/{id}/addresses` все адреса конкретного кастомера  
`/products?supplierId={supplierId}` список продуктов по поставщику  
`/products/{id}` детали определённого продукта  
`/products/{id}/media` список медиа одного продукта
{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}

{{% blocks/inner-block %}}
### Умеренная гранулярность.
Не надо возвращать информацию, которую не спрашивали.
{{% blocks/block-bordered class="block-bordered--danger block-bordered--sm" %}}
<pre>
  <code>/clients/1/address
  {
    “road”: “121 rue Chanzy”,
    “city”: “Hellemmes”,
    “country”: “France”,
    <b><s>“age”: 22</s></b> <span>— возраст здесь лишний</span>
  }</code>
</pre>
{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}

### Используем суррогатные ключи правильно.
{{% blocks/inner-block class="inner-page__block--xs" %}}
Суррогатный ключ — это ключ, искусственно сгенерированный системой. Не&nbsp;путать с&nbsp;первичным ключом базы данных. Ещё бывают натуральные ключи, сформированные из атрибутов, существующих в реальной жизни.

В REST API, вместо первичных ключей базы данных, лучше использовать натуральные ключи — если БД поменяется, у нас могут быть проблемы с интеграцией, да и вообще это не секьюрно.
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--xs" %}}
{{% blocks/block-bordered class="block-bordered--success" title-h4="Хорошие примеры" %}}

`/some-resource?tag=green` натуральный ключ green понятен пользователям  
`/customer/0012345` кастомер ID — суррогатный ключ для этого API
{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}

{{% blocks/block-bordered class="block-bordered--danger" title-h4="Плохие примеры" %}}
`/some-resource?tag=1` вернуть всё с тегом green через его id «1»  
`/customer/23dde7-e89b-12d3-a456-4265` кастомер ID это UUID, сгенерированный БД
{{% /blocks/block-bordered %}}
{{% /blocks/inner-section %}}

---

{{% blocks/inner-section %}}
## HTTP-методы

{{% blocks/inner-block %}}
* <span class="code code--default">GET</span> получить
* <span class="code code--default">POST</span> создать
* <span class="code code--default">PUT</span> перезаписать
* <span class="code code--default">PATCH</span> частично обновить
* <span class="code code--default">DELETE</span> удалить
* <span class="code code--default">OPTIONS</span> вернуть все HTTP-методы, доступные для эндпоинта
{{% /blocks/inner-block %}}

### Когда что-то не подходит, используем
* POST метод
* action-глаголы
* паттерн `/collections/{resource}:{action}`<div class="block-bordered block-bordered--sm  block-bordered--success"><h4>Пример</h4>POST /users/123:subscribe</div>
{{% /blocks/inner-section %}}

---

{{% blocks/inner-section %}}
## URL параметры запросов

{{% blocks/inner-block class="inner-page__block--sm" %}}
### Заголовки
Содержит технические параметры или элементы контекста.
{{% blocks/block-bordered class="block-bordered--light" %}}
```
Content-Type: application/json
ADEO-BU-CODE: 10
```
{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
### Path-параметры
Эти параметры — часть URL. С их помощью можно понять, к какому ресурсу мы обращаемся.
{{% blocks/block-bordered %}}
`/product/{id}/stocks` 
{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}

### Query-параметры
Позволяют фильтровать и сортировать запросы.

{{% blocks/block-bordered class="block-bordered--success" title-h4="Хорошие примеры" %}}
`/products?q=Luke+man` поиск продукта по тексту <br />
`/products?storeId=35` фильтрация продуктов по параметру магазина 35 <br />
`/products?sort=name&desc=age,id` сортировка по возростанию name и убыванию age, а затем id.
{{% /blocks/block-bordered %}}
{{% /blocks/inner-section %}}

---

{{% blocks/inner-section %}}
## Пагинация

* Пагинация по номеру страницы<p class="block-bordered block-bordered--sm  block-bordered--success"><code>?page=2&perPage=100</code></p>
* Пагинация по курсору<div class="block-bordered block-bordered--sm  block-bordered--success"><code>?limit=25&before=ZDMyNz6yORI3OTLo</code><p>Не стоит хранить курсоры: они быстро становятся невалидными из-за вставки или удаления элементов.</p></div>
* Пагинация через оффсет & лимит<p class="block-bordered block-bordered--sm  block-bordered--success"><code>?limit=25&offset=50</code></p>
* Пагинация через временные метки<div class="block-bordered block-bordered--sm  block-bordered--success"><code>?limit=25&since=1364849754</code><p>В качестве ключа для пагинации по временным меткам используем Unix timestamp.</p></div>
{{% /blocks/inner-section %}}

---

{{% blocks/inner-section %}}
## Ответ: Общие правила

* Структура ответа HTTP не должна зависеть от структуры БД
* Все поля должны быть понятны с бизнес-точки зрения
* Все наименования полей должны быть простыми, интуитивными и&nbsp;согласованными
* Лучше не использовать технические термины и специфические термины систем.
{{% /blocks/inner-section %}}

---

{{% blocks/inner-section %}}
## Ответ: Статус коды

{{% blocks/inner-block class="inner-page__block--sm" %}}
### Все методы
* Для всех эндпоинтов необходимо возвращать статус-коды.
* Каждый сервис потенциально должен уметь возвращать 500.
* Каждый сервис, который требует минимум один обязательный параметр на вход, должен уметь возвращать 400 с описанием.
* Каждый секьюрный сервис должен уметь возвращать 401.
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
### GET
* Если данных нет, каждый сервис должен возвращать 404.
* Каждая коллекция должна вернуть 200, если возвращается полностью.
* Каждая коллекция должна вернуть 206, если возвращается частично.
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
### 204 или 404

Есть небольшой спор: какой код возвращать, когда URL корректный, но&nbsp;информация не&nbsp;найдена? Если информация запрашивалась по&nbsp;ключу, мы&nbsp;рекомендуем возвращать 404, если информация не&nbsp;найдена после фильтрации или&nbsp;поиска по&nbsp;параметрам — 204.

{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
### POST
* Возвращаем 201 после создания ресурса.
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
### PUT & PATCH:
* Возвращаем 200 после обновления ресурса.
{{% /blocks/inner-block %}}

### DELETE
* Возвращаем 204 после успешно удалённой информации.
{{% /blocks/inner-section %}}

---

{{% blocks/inner-section %}}
## Ответ: Коды ошибок
{{% blocks/inner-block class="inner-page__block--xs" %}}

Вместе с HTTP кодами ответов в теле необходимо указать код ошибки. Это позволит потребителю понять, что именно пошло не так, и правильно среагировать. Ответ с&nbsp;ошибкой может содержать бизнес код ошибки с&nbsp;описанием причины падения. Все эти коды должны быть описаны в&nbsp;документации API. 
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}

Один из популярных форматов описания ошибок JSON-API:
{{% blocks/block-bordered %}}

```
{
  "errors": [{
    "code": "ERR-01234",
    "title": "OAuth Exception",
    "details": "Session has expired at unix time 1385243766.", 
    "links": {
      "about": "http://example.com/docs/errors/#ERR-01234"
    }
  }]
}  
```
{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}


Кусок кода в формате сваггера с описанием кода ответа и кода ошибок:

{{% blocks/block-bordered %}}
```
{ 
  Responses:
    ”200”:
      description: mySuccessResponse
  Schema:
    type: array
  Items:
    $ref: “#/definitions/Pet”,
    “400”: 
      description: Invalid status value
}
```
<br>
{{% /blocks/block-bordered %}}
{{% /blocks/inner-section %}}

---

{{% blocks/inner-section %}}

## Ответы: Формат данных
{{% blocks/inner-block class="inner-page__block--sm" %}}
### E.164 – Телефонный номер
`[+][код страны][код местности][местный номер]`

* <span class="code code--default">+</span> — знак плюса
* <span class="code code--default">код страны</span> — международный код страны
* <span class="code code--default">код местности</span> — код местности без 0 в начале
* <span class="code code--default">местный номер</span> — местный номер телефона
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
### ISO 639 – Язык

* <span class="code code--default">eng</span> – Английский 
* <span class="code code--default">fra</span> – Французский
* <span class="code code--default">rus</span> – Русский
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
### ISO 3166-1 — Язык

* <span class="code code--default">Russia (Russian Federation) Россия</span> <span class="code code--default">RU</span> <span class="code code--default">RUS 643</span>
* <span class="code code--default">France Франция</span> <span class="code code--default">FR</span> <span class="code code--default">FRA 250</span>
* <span class="code code--default">China Китай</span> <span class="code code--default">CN</span> <span class="code code--default">CHN 156</span>
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
### ISO 8601 – Дата

* <span class="code code--default">YYYY-MM</span> 2020-06
* <span class="code code--default">YYYYMMDD</span> 20200602
* <span class="code code--default">YYYY-MM-DDThh:mm:ss±hh</span> 2020-06-02T15:22:00+00:00
{{% /blocks/inner-block %}}

{{% blocks/inner-block class="inner-page__block--sm" %}}
### ISO 4217 — Деньги

* <span class="code code--default">EUR 978</span> – Евро
* <span class="code code--default">USD 840</span> – Доллар США
* <span class="code code--default">KZT 398</span> – Тенге
* <span class="code code--default">BYN 933</span> – Беларусский Рубль
{{% /blocks/inner-block %}}

### UCUM – Меры измерения

Все меры измерения [в UCUM specification](https://unitsofmeasure.org/).
{{% /blocks/inner-section %}}

---

{{< blocks/button-improvement href="#" text="Предложить улучшения">}}
