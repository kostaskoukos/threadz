import { Moon, Sun } from "lucide-react";
import { Button } from "@/ui/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setTheme(isDarkMode ? "dark" : "light");
  }, []);

  const toggletheme = () => {
    const isDark = theme === "dark";
    document.documentElement.classList[!isDark ? "add" : "remove"]("dark");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={() => toggletheme()}
      title="toggle theme"
      variant="ghost"
      size="icon"
    >
      {theme === "dark" ? (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
    </Button>
  );
}
