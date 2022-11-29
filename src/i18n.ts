class I18N {
  public lang: string = "en";

  public setLang(l: string) {
    this.lang = l;
  }
}

const i18n = new I18N();
export default i18n;
