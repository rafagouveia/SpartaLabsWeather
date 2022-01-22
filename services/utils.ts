import moment from "moment";
import "moment/min/locales";
moment.locale("pt-br")

export { moment };


export const convertToFahrenheit = (grau: number): number => {
  if (grau) {
    return Math.floor(grau * 1.8 + 32)
  }
  return 0
}
