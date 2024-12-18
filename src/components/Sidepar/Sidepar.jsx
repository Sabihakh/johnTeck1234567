import React, { useState, useEffect, useRef, startTransition } from "react";
import Logo from "../../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Sidepar.css";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // استيراد المكون
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"; // استيراد الأيقونات
import NameLogo from "../../Assets/names.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showInput, setShowInput] = useState(false); // لإظهار/إخفاء حقل البحث
  const [nameProducts, setNamePro] = useState(""); // لتخزين اسم المنتج في حقل البحث
  const navigate = useNavigate();
  const searchRef = useRef(null); // reference للبحث
  const sidebarRef = useRef(null); // reference للشريط الجانبي

  // دالة لإغلاق الشريط الجانبي إذا تم النقر خارج الشريط
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar();
    }
  };

  // إضافة حدث للنقر عند فتح الشريط الجانبي
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // دالة لتبديل حالة حقل البحث عند النقر على أيقونة البحث
  const handleSearchClick = () => {
    setShowInput(!showInput);
  };

  // دالة لإجراء البحث
  const submitsearch = async (e) => {
    e.preventDefault();
    const query = nameProducts ? `/Products/${nameProducts}` : "/Products";
    navigate(query);
  };

  // إغلاق حقل البحث عند النقر خارج الحقل
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { t, i18n } = useTranslation("sidepar");

  // حفظ وتغيير اللغة عند التبديل بين اللغات
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    const lang = i18n.language === "ar" ? "ar" : i18n.language === "en" ? "en" : "tr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [i18n.language]);

  const ChangeOption = (event) => {
    const languageCode = event.target.value;
    localStorage.setItem("selectedLanguage", languageCode); // حفظ اللغة في localStorage
    startTransition(() => {
      i18n.changeLanguage(languageCode);
    });
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`} ref={sidebarRef}>
      <button onClick={toggleSidebar} className="close-btn">
        <FontAwesomeIcon icon={faChevronLeft} size="sm" id="Left" />{" "}
      </button>
      <div className="">
        <img src={Logo} alt="Logo" className="logo1" />
        <img src={NameLogo} alt="NameLogo" className="logo1" />
      </div>

      <Link to="/" className="linksss">
        {t("L1")}
      </Link>
      <Link to="/Products" className="linksss">
        {t("L2")}
      </Link>
      <Link to="/AboutUs" className="linksss">
        {t("L3")}
      </Link>
      <Link to="/Terms" className="linksss">
        {t("L4")}
      </Link>
      <Link to="/PrivacyPolicy" className="linksss">
        {t("L5")}
      </Link>
      <Link to="/ContactUs" className="linksss">
        {t("L6")}
      </Link>
      <Link to="/Certificates" className="linksss">
        {t("L7")}
      </Link>
      <form action="name the aplication" method="0" className="linksss">
        <select
          onChange={ChangeOption}
          name="language"
          className="selectlinksss"
          value={i18n.language}
        >
          <option value="en">{t("lang1")}</option>
          <option value="ar">{t("lang2")}</option>
          <option value="tr">{t("lang3")}</option>
        </select>
      </form>

      {/* زر البحث */}
      <i className="fas fa-search linksss" onClick={handleSearchClick}></i>
      {showInput && (
        <form onSubmit={submitsearch} className="searchside" ref={searchRef}>
          <div className="forsearch">
            <button
              type="submit"
              className={i18n.language === "ar" ? "okside aroks" : "okside enoks"}
            >
              {t("searchButton")}
            </button>
            <input
              type="text"
              placeholder="Search..."
              className={i18n.language === "ar" ? "inputnamesid arins" : "inputnamesid enins"}
              value={nameProducts}
              onChange={(event) => setNamePro(event.target.value)}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Sidebar;
