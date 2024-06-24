import { loader } from "@monaco-editor/react";

// const monacoThemes = {
//   active4d: "Active4D",
//   "all-hallows-eve": "All Hallows Eve",
//   amy: "Amy",
//   "birds-of-paradise": "Birds of Paradise",
//   blackboard: "Blackboard",
//   "brilliance-black": "Brilliance Black",
//   "brilliance-dull": "Brilliance Dull",
//   "chrome-devtools": "Chrome DevTools",
//   "clouds-midnight": "Clouds Midnight",
//   clouds: "Clouds",
//   cobalt: "Cobalt",
//   dawn: "Dawn",
//   dreamweaver: "Dreamweaver",
//   eiffel: "Eiffel",
//   "espresso-libre": "Espresso Libre",
//   github: "GitHub",
//   idle: "IDLE",
//   katzenmilch: "Katzenmilch",
//   "kuroir-theme": "Kuroir Theme",
//   lazy: "LAZY",
//   "magicwb--amiga-": "MagicWB (Amiga)",
//   "merbivore-soft": "Merbivore Soft",
//   merbivore: "Merbivore",
//   "monokai-bright": "Monokai Bright",
//   monokai: "Monokai",
//   "night-owl": "Night Owl",
//   "oceanic-next": "Oceanic Next",
//   "pastels-on-dark": "Pastels on Dark",
//   "slush-and-poppies": "Slush and Poppies",
//   "solarized-dark": "Solarized-dark",
//   "solarized-light": "Solarized-light",
//   spacecadet: "SpaceCadet",
//   sunburst: "Sunburst",
//   "textmate--mac-classic-": "Textmate (Mac Classic)",
//   "tomorrow-night-blue": "Tomorrow-Night-Blue",
//   "tomorrow-night-bright": "Tomorrow-Night-Bright",
//   "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
//   "tomorrow-night": "Tomorrow-Night",
//   tomorrow: "Tomorrow",
//   twilight: "Twilight",
//   "upstream-sunburst": "Upstream Sunburst",
//   "vibrant-ink": "Vibrant Ink",
//   "xcode-default": "Xcode_default",
//   zenburnesque: "Zenburnesque",
//   iplastic: "iPlastic",
//   idlefingers: "idleFingers",
//   krtheme: "krTheme",
//   monoindustrial: "monoindustrial",
// };

const defineTheme = (theme) => {
  switch (theme) {
    case "active4d":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Active4D.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "all-hallows-eve":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/All Hallows Eve.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "amy":
      return new Promise((resolve) => {
        Promise.all([loader.init(), import("monaco-themes/themes/Amy.json")])
          .then(([monaco, themeData]) => {
            monaco.editor.defineTheme(theme, themeData);
            resolve();
          })
          .catch((error) => {
            console.error("Error loading theme:", error);
            resolve();
          });
      });
    case "birds-of-paradise":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Birds of Paradise.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "blackboard":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Blackboard.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "brilliance-black":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Brilliance Black.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "brilliance-dull":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Brilliance Dull.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "chrome-devtools":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Chrome DevTools.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "clouds-midnight":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Clouds Midnight.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "clouds":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Clouds.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "cobalt":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Cobalt.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "dawn":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Dawn.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "dreamweaver":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Dreamweaver.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "eiffel":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Eiffel.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "espresso-libre":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Espresso Libre.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "github":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/GitHub.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "idle":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/IDLE.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "katzenmilch":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Katzenmilch.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "kuroir-theme":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Kuroir Theme.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "lazy":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/LAZY.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "magicwb--amiga-":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/MagicWB (Amiga).json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "github-dark":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/GitHub Dark.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "github-light":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/GitHub Light.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "merbivore-soft":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Merbivore Soft.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "merbivore":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Merbivore.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "monokai-bright":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Monokai Bright.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "monokai":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Monokai.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "night-owl":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Night Owl.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "oceanic-next":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Oceanic Next.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "pastels-on-dark":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Pastels on Dark.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "slush-and-poppies":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Slush and Poppies.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "solarized-dark":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Solarized-dark.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "spacecadet":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/SpaceCadet.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "sunburst":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Sunburst.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "textmate--mac-classic-":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Textmate (Mac Classic).json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "tomorrow-night-blue":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Tomorrow-Night-Blue.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "tomorrow-night-eighties":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Tomorrow-Night-Eighties.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "tomorrow-night":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Tomorrow-Night.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "tomorrow":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Tomorrow.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "twilight":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Twilight.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "upstream-sunburst":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Upstream Sunburst.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "vibrant-ink":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Vibrant Ink.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "xcode-default":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Xcode_default.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "zenburnesque":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/Zenburnesque.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "iplastic":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/iPlastic.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "idlefingers":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/idleFingers.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "krtheme":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/krTheme.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
    case "monoindustrial":
      return new Promise((res) => {
        Promise.all([
          loader.init(),
          import("monaco-themes/themes/monoindustrial.json"),
        ]).then(([monaco, themeData]) => {
          // alert("the theme is done");
          monaco.editor.defineTheme(theme, themeData);
          res();
        });
      });
  }
};

export { defineTheme };
