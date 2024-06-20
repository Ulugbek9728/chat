// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLocale } from "../utils/locales/getLocale";
import LanguageSwitcherStyle from "./LanguageSwitcherStyle";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const lang = getLocale();

  const [langDropDown, setLangDropDown] = useState(false);
  const showAndHidden = useCallback(() => {
    setLangDropDown(!langDropDown);
  }, [langDropDown]);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng)
  };
  useEffect(() => {
    if (langDropDown) {
      document
        .getElementById("lang__dropdown__menu")
        .addEventListener("mouseleave", showAndHidden);
    } else {
      document
        .getElementById("lang__dropdown__menu")
        .removeEventListener("mouseleave", showAndHidden);
    }
  }, [langDropDown, showAndHidden]);

  return (
    <LanguageSwitcherStyle
      onClick={showAndHidden}
      className={`${langDropDown && "show"}`} >
      <div className={"dropdown__item"}>
        <span className={`dropdown__item__lang__image ${lang}`}/>
        <span className={"dropdown__item__lang__text"}>{lang}</span>
      </div>
      <div className="dropdown__menu" id={"lang__dropdown__menu"}>
        <button
          className={`dropdown__menu__item ${lang === "uz" && "hidden"}`}
          onClick={() => changeLang("uz")}
        >
          <span className={`dropdown__item__lang__image uz`}/>
          <span className={"dropdown__item__lang__text"}>UZ</span>
        </button>
        <button
          className={`dropdown__menu__item ${lang === "ru" && "hidden"}`}
          onClick={() => changeLang("ru")}
        >
          <span className={`dropdown__item__lang__image ru`}/>
          <span className={"dropdown__item__lang__text"}>RU</span>
        </button>
        <button
          className={`dropdown__menu__item ${lang === "en" && "hidden"}`}
          onClick={() => changeLang("en")}
        >
          <span className={`dropdown__item__lang__image en`}/>
          <span className={"dropdown__item__lang__text"}>EN</span>
        </button>
      </div>
    </LanguageSwitcherStyle>
  );
};

export default LanguageSwitcher;
