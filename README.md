
# ☬ Shervinibot - شروین‌بات

> بات هوشمند تلگرام ساختِ شروین

<div dir="rtl">

## 📋 مقدمه

**Shervinibot** یک بات تلگرام هوشمند و قابل‌توسعه است که با Node.js و کتابخانه Telegraf ساخته شده‌است.

## 🎯 ویژگی‌ها

- ✅ **دستورات متنوع** - بیش از 10 دستور مفید
- ✅ **پاسخ فوری** - پردازش فوری پیام‌ها
- ✅ **محفوظیت** - هیچ داده‌ای ذخیره نمی‌شود
- ✅ **توسعه‌پذیر** - کد تمیز و مدولار
- ✅ **دو روش اتصال** - Polling و Webhook

## 🚀 شروع سریع

### الف) نیازمندی‌ها

- **Node.js** v14+
- **npm** یا **yarn**
- **توکن بات تلگرام**

### ب) نصب

```bash
# کلون کردن ریپازیتوری
git clone https://github.com/aishervin/Shervinibot.git
cd Shervinibot

# نصب وابستگی‌ها
npm install

# یا
yarn install
```

### ج) تنظیم متغیرهای محیطی

```bash
# فایل .env را ایجاد کنید
cp .env.example .env

# توکن بات خود را اضافه کنید
# .env را با ویرایشگر باز کنید و BOT_TOKEN را پر کنید
```

### د) راه‌اندازی

**برای توسعه محلی:**
```bash
npm run dev
```

**برای تولید:**
```bash
npm start
```

## 📚 دستورات بات

| دستور | شرح |
|--------|------|
| `/start` | شروع بات و دریافت خوش‌آمدید |
| `/help` | نمایش تمام دستورات |
| `/about` | اطلاعات درباره بات |
| `/ping` | بررسی وضعیت بات |
| `/echo` | تکرار پیام‌ها |
| `/stats` | نمایش آمار استفاده |

## 🔧 ساختار فایل‌ها

```
Shervinibot/
├── bot.js              # کد اصلی بات
├── package.json        # وابستگی‌های پروژه
├── .env.example        # نمونه متغیرهای محیطی
├── .env                # متغیرهای محیطی (فقط محلی)
├── .gitignore          # فایل‌های مستثنی‌شده
├── README.md           # این فایل
└── netlify.toml        # تنظیمات Netlify
```

## 🌐 استقرار روی Netlify

### مرحله 1: آماده کردن Netlify Functions

```bash
npm install netlify-cli -g
```

### مرحله 2: ایجاد دایرکتوری Functions

```bash
mkdir -p netlify/functions
```

### مرحله 3: ایجاد فایل Webhook

**netlify/functions/telegram.js:**
```javascript
const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
  const bot = new Telegraf(process.env.BOT_TOKEN);
  
  if (event.httpMethod === 'POST') {
    await bot.handleUpdate(JSON.parse(event.body));
  }
  
  return {
    statusCode: 200,
    body: 'OK'
  };
};
```

### مرحله 4: تنظیم netlify.toml

```toml
[build]
  command = "npm install"
  functions = "netlify/functions"
  publish = "public"

[dev]
  framework = "#custom"
  command = "npm run dev"
  port = 8080

[[redirects]]
  from = "/webhook/*"
  to = "/.netlify/functions/telegram"
  status = 200
  force = true
```

### مرحله 5: استقرار

```bash
# اتصال به Netlify
netlify link

# استقرار
netlify deploy --prod
```

### مرحله 6: تنظیم Webhook در تلگرام

```bash
# آدرس Webhook را به تلگرام بگویید
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://<YOUR_NETLIFY_SITE>/webhook/<YOUR_BOT_TOKEN>"
```

## 🔐 متغیرهای محیطی

| متغیر | شرح | مثال |
|------|------|-------|
| `BOT_TOKEN` | توکن بات تلگرام | `123456:ABC...` |
| `ADMIN_ID` | آیدی مدیر (اختیاری) | `123456789` |
| `NODE_ENV` | محیط اجرا | `production` |
| `PORT` | شماره پورت | `3000` |

## 📦 وابستگی‌های اصلی

```json
{
  "telegraf": "کتابخانه اصلی تلگرام",
  "dotenv": "مدیریت متغیرهای محیطی",
  "axios": "درخواست‌های HTTP",
  "nodemon": "مانیتورینگ توسعه"
}
```

## 🐛 عیب‌یابی

### خطا: `BOT_TOKEN is not defined`
- ✓ بررسی کنید که فایل `.env` موجود است
- ✓ بررسی کنید که `BOT_TOKEN` در آن موجود است

### خطا: `Cannot find module 'telegraf'`
- ✓ اجرا کنید: `npm install`

### بات پاسخ نمی‌دهد
- ✓ بررسی کنید که توکن درست است
- ✓ بررسی کنید تنظیمات Webhook صحیح است
- ✓ لاگ‌ها را بررسی کنید

## 📝 یادداشت‌ها

### Polling vs Webhook

**Polling:** بات به‌طور مداوم از تلگرام سؤال می‌کند
- ✓ ساده‌تر برای توسعه
- ✗ مصرف بیشتری دارد

**Webhook:** تلگرام به‌طور مستقیم پیام‌ها را می‌فرستد
- ✓ بهتر برای تولید
- ✓ مصرف کم‌تر
- ✗ نیاز به سرور عمومی دارد

## 🤝 مشارکت

برای بهبود بات‌ها:

1. Fork کنید
2. شاخه جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات را Commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید

## 📄 مجوز

این پروژه تحت مجوز MIT است.

## 👤 سازنده

**Shervin** - [@ShervinCoder](https://github.com/aishervin)

---

<p align="center">
  
  ⭐️ اگر پروژه را دوست داشتید، ستاره دهید!
  
</p>

</div>
