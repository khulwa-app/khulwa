import { Locale, type LocaleType } from "@/i18n/config";

type Localized = Record<LocaleType, string>;

export type Ayah = {
  arabic: string;
  meaning: Localized;
  citation: Localized;
};

export const ayat: Ayah[] = [
  {
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    meaning: {
      [Locale.EN]: "My Lord, increase me in knowledge",
      [Locale.AR]: "دعاءٌ للمعرفة",
    },
    citation: {
      [Locale.EN]: "Ṭāhā 20:114",
      [Locale.AR]: "سورة طه · ١١٤",
    },
  },
  {
    arabic: "لَآ أَبْرَحُ حَتَّىٰ أَبْلُغَ",
    meaning: {
      [Locale.EN]: "I will not give up until I reach my goal",
      [Locale.AR]: "عزيمةٌ لا تلين حتى الوصول",
    },
    citation: {
      [Locale.EN]: "Al-Kahf 18:60",
      [Locale.AR]: "سورة الكهف · ٦٠",
    },
  },
];
