# فلوكس كورد — FluxCord

FluxCord تعديل لعميل ديسكورد مبني على [Vencord](https://github.com/Vendicated/Vencord)، يضم **494 إضافة** في ثلاث فئات: `Vencord` و`Equicord` و`FluxPlugin`.

## بماذا يتميّز عن Equicord؟

- **عنقود الخصوصية**: منع تسرّب IP عبر WebRTC، اختيار مزوّد DNS، تشفير AES-256 للمحادثات والملفات، تنبيه مشاركة الشاشة، كشف دخول موظفي ديسكورد، إخفاء علامة التعديل
- **شارات خاصة**: نظام شارات مستقل عبر [Flux-bored](https://github.com/l7oz/Flux-bored) (مالك/إداري/داعم/مختبّر/مستخدم) بدل الخدمات الميتة
- **CustomProfile**: تخصيص البروفايل (الاسم والصورة والبانر والشارات) مع دليل مشاركة خاص
- **محدّث داخلي يعمل**: يفحص GitHub Releases ويتحقق من بصمة `sha256` قبل كتابة أي ملف
- **22+ إضافة منقولة** من TestCord وIllegalCord وArgon وEndcord بعد مراجعة أمنية

## التثبيت

1. من [صفحة الإصدارات](https://github.com/l7oz/FluxCord/releases/latest) نزّل `Flxuilotl.exe` و`desktop.asar`
2. شغّل المثبّت — يسحب الأحدث تلقائيًا
3. للتحديث لاحقًا: زر التحديث داخل الإعدادات، أو أعد تشغيل المثبّت

## للمطوّرين

```shell
git clone https://github.com/l7oz/FluxCord
cd FluxCord
pnpm install
pnpm build        # ينتج dist/desktop.asar
```

- الإضافات الجديدة تُوضع في `src/fluxplugin/` وتُنسَب لصاحبها الأصلي بكائن مضمّن
- `pnpm testTsc` يجب أن يبقى عند خط الأساس (40 خطأ معروف، في تناقص)
- الإصدار: حرّك وسم `v1.0.1` للـ commit المطلوب وادفع — الـ workflow يبني الـ asar ويرفعه تلقائيًا

## الرخصة

GPL-3.0-or-later — راجع [LICENSE](./LICENSE).
