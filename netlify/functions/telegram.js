// Netlify Function برای Webhook تلگرام
require('dotenv').config();
const { Telegraf } = require('telegraf');

// ایجاد نمونه بات
const bot = new Telegraf(process.env.BOT_TOKEN);

// درست کردن کمانده‌ها (مطابق bot.js)
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

bot.command('help', (ctx) => {
  const helpMessage = `
📚 *دستورالعمل‌ها:*

/start - شروع بات
/about - اطلاعات بات
/ping - بررسی وضعیت
/echo - تکرار پیام

💡 *نکات:*
• کلیه داده‌های شما محفوظ است
• 24/7 در دسترس هستم
  `;
  
  ctx.reply(helpMessage, { parse_mode: 'Markdown' });
});

bot.command('about', (ctx) => {
  const aboutMessage = `
🌟 *درباره شروین‌بات*

*نام:* Shervinibot ☬
*نسخه:* 1.0.0
*سازنده:* Shervin
*محل استقرار:* Netlify

🎯 *ویژگی‌ها:*
✅ پاسخ فوری
✅ دستورات مختلف
✅ محفوظیت داده‌ها
  `;
  
  ctx.reply(aboutMessage, { parse_mode: 'Markdown' });
});

bot.command('ping', (ctx) => {
  ctx.reply('🏓 Pong! بات من عالی‌ام ✅');
});

bot.command('echo', (ctx) => {
  const text = ctx.message.text.replace('/echo', '').trim();
  
  if (!text) {
    ctx.reply('لطفاً متن مورد نظر را بعد از /echo بنویسید');
    return;
  }
  
  ctx.reply(`📢 ${text}`);
});

bot.on('text', (ctx) => {
  const userMessage = ctx.message.text.toLowerCase();
  
  if (userMessage.includes('سلام') || userMessage.includes('hello')) {
    ctx.reply(`سلام ${ctx.from.first_name}! 👋`);
  } else if (userMessage.includes('ممنون') || userMessage.includes('thank')) {
    ctx.reply('خوشحالم! 😊');
  } else {
    ctx.reply('🤔 متوجه نشدم! لطفاً /help رو بزنید');
  }
});

// Netlify Function Handler
exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const update = JSON.parse(event.body);
      await bot.handleUpdate(update);
      
      return {
        statusCode: 200,
        body: 'OK'
      };
    } catch (error) {
      console.error('خطا در پردازش Webhook:', error);
      
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' })
      };
    }
  }
  
  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
};
