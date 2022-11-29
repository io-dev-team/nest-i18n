import { Inject, Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { join } from "path";
import i18n from "./i18n";
import { I18nModuleConfigs, I18nModuleOptions } from "./nest-i18n.module";

@Injectable()
export class I18nService<T> {
  private i18nPath: string;

  constructor(@Inject(I18nModuleConfigs) options: I18nModuleOptions) {
    this.i18nPath = options.path;
  }

  private getJsonPath(lang: string): string {
    return join(this.i18nPath, `${lang}.json`);
  }

  private readJsonFile(lang: string): string {
    const path = this.getJsonPath(lang);
    return readFileSync(path, { encoding: "utf-8" });
  }

  private getLangJson(lang: string, values: any[]): T {
    let json = this.readJsonFile(lang);
    for (let i = 0; i < values.length; i++) {
      const search = `{${i + 1}}`;
      while (json.includes(search)) {
        json = json.replace(search, values[i]);
      }
    }
    return JSON.parse(json);
  }

  public GetMessage(values: any = []): T {
    return this.getLangJson(i18n.lang, values);
  }
}
