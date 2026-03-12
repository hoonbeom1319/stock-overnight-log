export function ThemeScript() {
  const script = `
    (function() {
      try {
        var saved = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (saved === "dark" || (!saved && prefersDark)) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
