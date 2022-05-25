---
title: "Принципы построения асинхронного API"
weight: 30
menu:
  main:
    parent: "Знания"
type: docs
---

## Пример асинхронного API

Приложение отправляет сообщение получателю и продолжает работать, не дожидаясь ответа. Подход применяют, когда результат выполнения не зависит от ответа сторонней системы.

{{% blocks/compare-table %}}

## Общие правила

* У каждого продукта есть свой экземпляр брокера сообщений — за него ответственна система, которая публикует данные.
* Всякая информация, которая ценна для нескольких систем, передаётся через канонические топики или эксчейнджи. Все каноничные топики, эксчейнджи и очереди привязаны к домену через указание канонического домена в&nbsp;названии.
* Запрещается отправлять напрямую в RabbitMQ-очередь: вместо этого используем эксчейндж.

---

{{% blocks/inner-section %}}
## Соглашение о названиях

{{% blocks/inner-block  class="inner-page__block--sm" %}}

Используем `camelCase` для всех полей.

{{% /blocks/inner-block %}}

### Kafka Топик

`[app]-[type]-[int/ext]-[domain]-[object]-[version]`

{{% blocks/inner-block  class="inner-page__block--sm" %}}
* <span class="code code--default">app</span> название публикующего приложения
* <span class="code code--default">type</span>
  * <span class="code code--default">system</span> топик используется только внутри продуктовой команды или приложения
  * <span class="code code--default">init</span> топик для полного извлечения данных, не используется для постоянной интеграции
  * <span class="code code--default">canonical</span> топик для публикации канонической информации
* <span class="code code--default">int/ext int</span> топик используется внутри, ext топик опубликован в интернете
* <span class="code code--default">domain</span> канонический домен
* <span class="code code--default">object</span> данные, которые отправляются через это топик
* <span class="code code--default">version</span> версия топика
{{% /blocks/inner-block %}}

{{% blocks/inner-block  class="inner-page__block--sm" %}}
{{% blocks/block-bordered class="block-bordered--success" title-h4="Пример" %}}
`crm-canonical-int-customers-organization-v9`
{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}

### RabbitMQ Эксчейндж

`[app]-[type]-x-[domain]-[object]-[version]`

{{% blocks/inner-block  class="inner-page__block--sm" %}}
* <span class="code code--default">app</span> название публикующего приложения
* <span class="code code--default">type</span>
  * <span class="code code--default">tx</span> topic exchange
  * <span class="code code--default">fx</span> fanout exchange
  * <span class="code code--default">dx</span> direct exchange
  * <span class="code code--default">hx</span> headers exchange
* <span class="code code--default">x</span> exchange
* <span class="code code--default">domain</span> канонический домен
* <span class="code code--default">object</span> данные, передаваемые через эксчейндж
* <span class="code code--default">version</span> версия эксчейнджа
{{% /blocks/inner-block %}}

{{% blocks/inner-block  class="inner-page__block--sm" %}}
{{% blocks/block-bordered class="block-bordered--success" title-h4="Пример" %}}
`paymentGateway-tx-x-orders-paymentTask-v1`
{{% /blocks/block-bordered %}}
{{% /blocks/inner-block %}}

### RabbitMQ Очередь

`[app]-[type]-q-[domain]-[object]-[filter]-[version]`

{{% blocks/inner-block  class="inner-page__block--sm" %}}
* <span class="code code--default">app</span> название подписавшегося приложения
* <span class="code code--default">type</span>
  * <span class="code code--default">tx</span> topic exchange
  * <span class="code code--default">fx</span> fanout exchange
  * <span class="code code--default">dx</span> direct exchange
  * <span class="code code--default">hx</span> headers exchange
  * <span class="code code--default">q</span> очередь 
* <span class="code code--default">domain</span> канонический домен
* <span class="code code--default">object</span> данные, передаваемые через очередь 
* <span class="code code--default">filter</span> описания фильтров для типов tx, dx и hx
* <span class="code code--default">version</span> версия очереди
{{% /blocks/inner-block %}}

{{% blocks/block-bordered class="block-bordered--success" title-h4="Пример" %}}
`solution-tx-q-orders-paymentTask-created-v2`
{{% /blocks/block-bordered %}}

---

{{< blocks/button-improvement href="#" text="Предложить улучшения">}}
