import * as zod from "zod";

export const createProfileSchema = zod.object({
  name: zod.string().min(1),
  birthDate: zod.string(),
  gender: zod.string(),
  zodiac: zod.string(),
  horoscope: zod.string(),
  imageUrl: zod.string(),
  weight: zod.number(),
  height: zod.number(),
  interests: zod.array(zod.string()),
});
