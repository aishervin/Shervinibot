// ☬Exclusive SHΞN™ made Ai core telegram bot
// بات تلگرام ساختِ شروین

require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

// اطلاعات بات
const bot = new Telegraf(process.env.BOT_TOKEN);

// متغیرهای سراسری
const adminId = process.env.ADMIN_ID;

// ===== کمانده‌های اصلی =====

// شروع بات
bot.start((ctx) => {
  const welcomeMessage = `
🤖 *خوش آمدید به شروین‌بات!*

من یک بات هوشمند تلگرام‌ام که برای کمک به شما ساخته شده‌ام.

📋 *فرمان‌های دستیار:*
/help - نمایش کمانده‌ها
/about - درباره بات
/ping - بررسی وضعیت بات
/echo - تکرار پیام

👤 *اطلاعات شما:*
ID: \`${ctx.from.id}\`
نام: ${ctx.from.first_name}
  `;
  
  ctx.reply(welcomeMessage, { parse_mode: 'Markdown' });
});

// دستور کمک
bot.command('help', (ctx) => {
  const helpMessage = `
📚 *دستورالعمل‌ها:*

/start - شروع بات
/about - اطلاعات بات
/ping - بررسی وضعیت
/echo - تکرار پیام
/weather - اطلاعات آب‌وهوا (مثال)
/stats - آمار استفاده

💡 *نکات:*
• کلیه داده‌های شما محفوظ است
• 24/7 در دسترس هستم
• برای مشکلات گزارش دهید
  `;
  
  ctx.reply(helpMessage, { parse_mode: 'Markdown' });
});

// درباره بات
bot.command('about', (ctx) => {
  const aboutMessage = `
🌟 *درباره شروین‌بات*

*نام:* Shervinibot ☬
*نسخه:* 1.0.0
*سازنده:* Shervin
*فناوری:* Node.js + Telegraf

🎯 *ویژگی‌ها:*
✅ پاسخ فوری
✅ دستورات مختلف
✅ محفوظیت داده‌ها
✅ راحت و سریع

📱 *تماس:* @ShervinCoder
  `;
  
  ctx.reply(aboutMessage, { parse_mode: 'Markdown' });
});

// بررسی وضعیت
bot.command('ping', (ctx) => {
  ctx.reply('🏓 Pong! بات من عالی‌ام ✅');
});

// تکرار پیام
bot.command('echo', (ctx) => {
  const text = ctx.message.text.replace('/echo', '').trim();
  
  if (!text) {
    ctx.reply('لطفاً متن مورد نظر را بعد از /echo بنویسید');
    return;
  }
  
  ctx.reply(`📢 ${text}`);
});

// آمار استفاده
bot.command('stats', (ctx) => {
  const statsMessage = `
📊 *آمار استفاده:*

👤 ID کاربر: \`${ctx.from.id}\`
📝 نام: ${ctx.from.first_name}
⏰ زمان: ${new Date().toLocaleString('fa-IR')}

*آمار بات:*
• کل پیام‌های دریافت‌شده: (در حال توسعه)
• کاربران فعال: (در حال توسعه)
• وقت فعالیت: (در حال توسعه)
  `;
  
  ctx.reply(statsMessage, { parse_mode: 'Markdown' });
});

// ===== پیام‌های متنی =====

// جواب به هر پیام
bot.on('text', (ctx) => {
  const userMessage = ctx.message.text.toLowerCase();
  
  // سلام‌های مختلف
  if (userMessage.includes('سلام') || userMessage.includes('hello')) {
    ctx.reply(`سلام ${ctx.from.first_name}! 👋\nچطور می‌تونم کمکت کنم؟`);
  }
  // جواب به تشکر
  else if (userMessage.includes('ممنون') || userMessage.includes('thank')) {
    ctx.reply('خوشحالم! 😊');
  }
  // جواب به سؤال درباره بات
  else if (userMessage.includes('تو کی') || userMessage.includes('who are you')) {
    ctx.reply('من شروین‌بات هستم! 🤖\n/about رو بزنید تا بیشتر بدونید');
  }
  // پیام پیش‌فرض
  else {
    ctx.reply('🤔 متوجه نشدم! \nلطفاً /help رو بزنید');
  }
});

// ===== مدیریت خطاها =====

bot.catch((err, ctx) => {
  console.error('❌ خطا:', err);
  ctx.reply('😞 متأسفانه یک خطا رخ داد. لطفاً بعداً دوباره امتحان کنید.');
});

// ===== شروع بات =====

// سه روش راه‌اندازی:

// 1. استفاده از Polling (برای توسعه محلی)
if (process.env.NODE_ENV === 'development') {
  bot.launch();
  console.log('🚀 بات با روش Polling شروع شد...');
} 
// 2. استفاده از Webhook (برای Netlify و سرورهای ابری)
else {
  const express = require('express');
  const app = express();
  
  app.use(express.json());
  
  app.post(`/webhook/${process.env.BOT_TOKEN}`, (req, res) => {
    bot.handleUpdate(req.body, res);
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 بات با روش Webhook در پورت ${PORT} شروع شد...`);
  });
}

// کنترل خروج
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

console.log('✅ بات آماده است!');

module.exports = bot;
