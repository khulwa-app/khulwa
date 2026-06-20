export type SoundDef = {
  id: string;
  label: string;
  src: string;
  loop: boolean;
  html5: boolean;
};

export const SOUNDS: SoundDef[] = [
  { id: "rain", label: "Rain", src: "/sounds/rain.ogg", loop: true, html5: false },
  { id: "rain-birds", label: "Rain & Birds", src: "/sounds/rainy-birds.ogg", loop: true, html5: false },
  { id: "fire", label: "Fireplace", src: "/sounds/fire.ogg", loop: true, html5: false },
  { id: "cafe", label: "Café", src: "/sounds/restaurant.ogg", loop: true, html5: false },
  { id: "theta", label: "Theta", src: "/sounds/theta.ogg", loop: true, html5: false },
  { id: "typing", label: "Keyboard", src: "/sounds/typing.ogg", loop: true, html5: false },
];
