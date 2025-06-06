// components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../src/components/ui/dropdown-menu";
import { Button } from "../../src/components/ui/button";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "English" },
  { code: "ha", label: "Hausa" },
  { code: "yo", label: "Yoruba" },
  { code: "ig", label: "Igbo" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-sm">
          <Globe className="w-4 h-4 mr-2" />
          {languages.find((l) => l.code === i18n.language)?.label || "English"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white pt-6">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
