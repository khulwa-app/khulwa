// The background library — the flat themed base (default) + photo wallpapers.
// No gradients: spaces sit on the themed surface like the v3 mockups; photos
// are an optional "Scenes" pack chosen in the picker.
export type BackgroundDef =
  | { id: string; label: string; kind: "flat" }
  | { id: string; label: string; kind: "photo"; src: string };

export const BACKGROUNDS: BackgroundDef[] = [
  // Flat themed base — the default, matching the design system.
  { id: "flat", label: "None", kind: "flat" },

  // Photo wallpapers (the cozy scenes pack).
  { id: "door2", label: "Rainy Door", kind: "photo", src: "/spaces/door-2.webp" },
  { id: "door1", label: "Doorway", kind: "photo", src: "/spaces/door-1.webp" },
  { id: "door3", label: "Threshold", kind: "photo", src: "/spaces/door-3.webp" },
  { id: "lofiRoom", label: "Lofi Room", kind: "photo", src: "/spaces/lofi-room.webp" },
  { id: "rainyNight", label: "Rainy Night", kind: "photo", src: "/spaces/rainy-night.webp" },
  { id: "pixelSunset", label: "Pixel Sunset", kind: "photo", src: "/spaces/pixel-sunset.webp" },
];

export const DEFAULT_BACKGROUND = "flat";

export const backgroundById = (id: string): BackgroundDef =>
  BACKGROUNDS.find((b) => b.id === id) ?? BACKGROUNDS[0];
