# 💗 OBS Donation Heart

**RU:** Живой донат-виджет для OBS — неоновое сердце, которое наполняется «водой» по мере сбора на **DonationAlerts**. С анимацией биения, свечением и переливом света.

**EN:** A live OBS donation widget — a neon heart that fills up with "water" as your **DonationAlerts** goal progresses. With a heartbeat pulse, glow and a soft light shimmer.

> [Русский](#-по-русски) · [English](#-in-english)

---

## 🇷🇺 По-русски

### Что это
Виджет для OBS: твоя картинка-сердце наполняется водой снизу вверх пропорционально сбору на DonationAlerts. Показывает название цели и сумму. Данные живые. Помощник запускается вместе с OBS и выключается сам после его закрытия — в фоне 24/7 ничего не висит.

### Возможности
- 💧 Заполнение «водой» с волной, пузырьками и блёстками (твоя картинка).
- 📊 Живой прогресс из DonationAlerts (обновление ~раз в 12 сек).
- 💓 Лёгкое биение сердца + вспышка свечения по контуру (внутрь и наружу) + медленный перелив света внутри.
- 📝 Название цели и сумма.
- 🔗 Смена сбора — заменой ссылки в одном текстовом файле, без перезапуска.
- 🪶 Помощник лёгкий (~60 МБ ОЗУ, ~0% ЦП) и работает только во время OBS.

### Требования
- Windows
- OBS Studio
- [Node.js](https://nodejs.org) (LTS) — ставится один раз

### Установка и настройка (один раз)
1. Скачай/клонируй проект в любую папку.
2. Установи **Node.js** (LTS) с https://nodejs.org.
3. Создай файл со ссылкой сбора: скопируй `goal-link.example.txt` → переименуй в **`goal-link.txt`** и вставь туда ссылку своего виджета-цели DonationAlerts
   (вида `https://www.donationalerts.com/widget/goal/ЧИСЛО?token=...`).
4. В OBS: **Инструменты → Скрипты → «+»** → выбери `heart-helper.lua`.
5. В OBS добавь **Браузер-источник**:
   - URL: `http://localhost:8123/heart-obs.html?obs=1`
   - Ширина `360`, Высота `480`
6. Всё. Дальше просто открывай OBS как обычно — помощник поднимается сам.

### Сменить сбор
Открой `goal-link.txt`, вставь новую ссылку, сохрани. Обновится за ~12 сек. Название и сумма подтянутся сами.

### Параметры ссылки (в URL источника)
| Параметр | Что делает |
|---|---|
| `&size=420` | размер сердца в пикселях |
| `&title=0` | спрятать надпись (по умолчанию показана) |
| `&pulse=0` | выключить биение и свечение |
| `&level=50` | тест-уровень 50% (без живых данных, просто посмотреть) |

### Как это работает
Браузер (и OBS) из-за защиты (CORS) не может сам читать API DonationAlerts. Поэтому маленький помощник `server.js` ходит за данными на сервере и отдаёт их виджету на `localhost:8123`. Скрипт `heart-helper.lua` запускает помощника вместе с OBS; сам помощник закрывается через ~15 сек после закрытия OBS.

### Пересборка (если поменял картинку или heart.html)
`heart-obs.html` собирается из `heart.html` + `2.png` (картинка вшивается внутрь):
```
npm run build      # то же самое, что: node embed.js
```

### Альтернатива без помощника
Файл `obs-heart.css` — способ на чистом CSS: вставляется в поле «Пользовательский CSS» браузер-источника поверх штатного виджета DonationAlerts. Ноль программ, но заливка — нарисованная вода, а не твоя картинка.

---

## 🇬🇧 In English

### What it is
An OBS widget: your heart image fills with water from the bottom up, proportional to your DonationAlerts goal. It shows the goal title and amount. Data is live. A small helper starts with OBS and shuts itself down after OBS closes — nothing runs in the background when you are not streaming.

### Features
- 💧 Water fill with waves, bubbles and sparkles (your own image).
- 📊 Live progress from DonationAlerts (polled ~every 12 s).
- 💓 Subtle heartbeat pulse + glow burst along the outline (inward & outward) + slow inner light shimmer.
- 📝 Goal title and amount.
- 🔗 Switch collection by replacing a link in a single text file, no restart.
- 🪶 Lightweight helper (~60 MB RAM, ~0% CPU), runs only while OBS is open.

### Requirements
- Windows
- OBS Studio
- [Node.js](https://nodejs.org) (LTS) — installed once

### Install & setup (once)
1. Download/clone the project into any folder.
2. Install **Node.js** (LTS) from https://nodejs.org.
3. Create the goal-link file: copy `goal-link.example.txt` → rename it to **`goal-link.txt`** and paste the link to your DonationAlerts goal widget
   (like `https://www.donationalerts.com/widget/goal/NUMBER?token=...`).
4. In OBS: **Tools → Scripts → “+”** → pick `heart-helper.lua`.
5. In OBS add a **Browser source**:
   - URL: `http://localhost:8123/heart-obs.html?obs=1`
   - Width `360`, Height `480`
6. Done. Just open OBS normally — the helper starts on its own.

### Change the collection
Open `goal-link.txt`, paste a new link, save. Updates within ~12 s. Title and amount follow automatically.

### URL options (on the source URL)
| Option | Effect |
|---|---|
| `&size=420` | heart size in pixels |
| `&title=0` | hide the caption (shown by default) |
| `&pulse=0` | disable heartbeat and glow |
| `&level=50` | test level 50% (no live data, just a preview) |

### How it works
Browsers (and OBS) cannot read the DonationAlerts API directly due to CORS. So a tiny helper (`server.js`) fetches the data server-side and serves it to the widget on `localhost:8123`. The `heart-helper.lua` script launches the helper together with OBS; the helper exits ~15 s after OBS is closed.

### Rebuild (if you change the image or heart.html)
`heart-obs.html` is built from `heart.html` + `2.png` (the image is embedded):
```
npm run build      # same as: node embed.js
```

### No-helper alternative
`obs-heart.css` is a pure-CSS method: paste it into the “Custom CSS” field of a Browser source on top of the built-in DonationAlerts goal widget. No programs, but the fill is stylised water, not your image.

---

## License
[MIT](LICENSE) © 2026 Archiewarious
