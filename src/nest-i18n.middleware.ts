import { Injectable, NestMiddleware } from "@nestjs/common";
import i18n from "./i18n";

@Injectable()
export class I18nMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: () => any) {
    try {
      const lang = req.headers["x-lang"] as string;
      if (lang) {
        req["lang"] = lang;
      } else {
        req["lang"] = "en";
      }
      i18n.setLang(req["lang"]);
    } catch (error) {
      console.error("[I18nMiddleware Error]:", error);
    } finally {
      next();
    }
  }
}
