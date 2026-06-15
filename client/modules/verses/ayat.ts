import { Locale, type LocaleType } from "@/i18n/config";

type Localized = Record<LocaleType, string>;

export type Ayah = {
  // The Qur'anic text is locale-independent; meaning + citation localize.
  arabic: string;
  meaning: Localized;
  citation: Localized;
};

// The rotating collection shown on the home space — short ayat on knowledge
// and resolve. Add records here to grow the rotation.
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
    // Mūsā's resolve to reach the meeting of the two seas in search of
    // knowledge — perseverance until arrival.
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
