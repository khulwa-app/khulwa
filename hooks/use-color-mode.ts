import { ColorMode } from "@/constants/theme";
import { useTheme } from "next-themes";

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const colorMode = resolvedTheme ?? (ColorMode.Light as ColorMode);
  const toggleColorMode = () => setTheme(colorMode === ColorMode.Dark ? ColorMode.Light : ColorMode.Dark);
  return { colorMode, setColorMode: setTheme, toggleColorMode };
}
