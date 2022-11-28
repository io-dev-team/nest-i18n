import { DynamicModule, Module } from "@nestjs/common";
import { I18nService } from "./nest-i18n.service";

export const I18nModuleConfigs = "I18N-MODULE-CONFIGS";
export type I18nModuleOptions = {
  path: string;
};

@Module({})
export class I18nModule {
  public static forRoot(options: I18nModuleOptions): DynamicModule {
    return {
      module: I18nModule,
      global: true,
      providers: [
        { provide: I18nModuleConfigs, useValue: options },
        I18nService,
      ],
      exports: [I18nService],
    };
  }
}
