/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors"

export function useThemeColor(
   props: { dark?: string; light?: string },
   colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
   const theme = "light"
   const colorFromProps = props[theme]

   if (colorFromProps) {
      return colorFromProps
   } else {
      return Colors[theme][colorName]
   }
}
