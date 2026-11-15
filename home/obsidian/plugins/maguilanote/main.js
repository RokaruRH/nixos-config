var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MaguilanotePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian17 = require("obsidian");

// src/board-view.ts
var import_obsidian15 = require("obsidian");

// src/modals.ts
var import_obsidian3 = require("obsidian");

// src/settings-ui.ts
var import_obsidian2 = require("obsidian");

// src/secrets.ts
var import_obsidian = require("obsidian");
async function nodeModules() {
  if (!import_obsidian.Platform.isDesktop) return null;
  const [fs, os, path] = await Promise.all([Promise.resolve().then(() => __toESM(require("fs"), 1)), Promise.resolve().then(() => __toESM(require("os"), 1)), Promise.resolve().then(() => __toESM(require("path"), 1))]);
  return { fs, path, file: path.join(os.homedir(), ".maguilanote", "secrets.json") };
}
async function readSecretsFile() {
  const node = await nodeModules();
  if (!node) return {};
  try {
    return JSON.parse(node.fs.readFileSync(node.file, "utf8"));
  } catch {
    return {};
  }
}
async function writeSecretsFile(data) {
  const node = await nodeModules();
  if (!node) return;
  const { fs, path, file } = node;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
  try {
    fs.chmodSync(file, 384);
  } catch {
  }
}
async function loadOpenAiApiKey() {
  if (!import_obsidian.Platform.isDesktopApp) return "";
  return (await readSecretsFile()).openaiApiKey ?? "";
}
async function saveOpenAiApiKey(key) {
  if (!import_obsidian.Platform.isDesktopApp) return;
  await writeSecretsFile({ ...await readSecretsFile(), openaiApiKey: key });
}

// src/types.ts
var DRAW_GROUP_DISTANCE = 60;
var STROKE_SIZES = [2, 4, 8, 14, 22];
var DEFAULT_STROKE_SIZE = STROKE_SIZES[Math.floor(STROKE_SIZES.length / 2)];
var DEFAULT_STROKE_COLOR = "#33343d";
var TITLE_ELIGIBLE_TYPES = [
  "note",
  "comment",
  "todo",
  "image",
  "swatch",
  "sketch",
  "record",
  "file"
];
var TITLE_LABELS = {
  note: "Note",
  comment: "Comment",
  todo: "To-do",
  image: "Image",
  swatch: "Swatch",
  sketch: "Sketch",
  record: "Recording",
  file: "File"
};
var DEFAULT_BOARD = { version: 1, items: [], edges: [] };
var IMAGE_EXTS = ["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "avif"];
var AUDIO_EXTS = ["mp3", "wav", "ogg", "m4a", "flac", "webm"];
var VIDEO_EXTS = ["mp4", "mov", "mkv", "ogv"];
function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
var CUSTOM_CARD_COLOR_KEYS = [
  "yellow",
  "orange",
  "red",
  "purple",
  "blue",
  "teal",
  "green",
  "gray"
];
var SHARED_CARD_COLOR_DEFAULTS = {
  yellow: "#fff5c0",
  orange: "#ffd9b0",
  red: "#ffc7c2",
  purple: "#e2cbf7",
  blue: "#c4ddff",
  teal: "#bdede0",
  green: "#d3f2c0",
  gray: "#e4e4e8"
};
var DEFAULT_THEME_COLORS = {
  dark: { canvasBg: "#31303b", cardDefaultBg: "#4a4b54", ...SHARED_CARD_COLOR_DEFAULTS },
  light: { canvasBg: "#eceef2", cardDefaultBg: "#ffffff", ...SHARED_CARD_COLOR_DEFAULTS }
};
var CARD_COLOR_NAMES = {
  yellow: "Yellow",
  orange: "Orange",
  red: "Red",
  purple: "Purple",
  blue: "Blue",
  teal: "Teal",
  green: "Green",
  gray: "Gray"
};
var CARD_COLORS = [
  { key: "default", name: "Default", bg: "var(--mgn-card-default-bg)", fg: "var(--mgn-card-default-fg)" },
  ...CUSTOM_CARD_COLOR_KEYS.map((key) => ({
    key,
    name: CARD_COLOR_NAMES[key],
    bg: `var(--mgn-card-color-${key})`,
    fg: "#33343d"
  }))
];
var LEGACY_COLOR_ALIASES = { white: "default", dark: "default" };
function contrastColor(hex) {
  const m2 = hex.replace("#", "");
  if (m2.length < 6) return "#33343d";
  const r2 = parseInt(m2.slice(0, 2), 16), g2 = parseInt(m2.slice(2, 4), 16), b2 = parseInt(m2.slice(4, 6), 16);
  return r2 * 0.299 + g2 * 0.587 + b2 * 0.114 > 150 ? "#33343d" : "#ffffff";
}
function colorOf(key) {
  const k2 = key ? LEGACY_COLOR_ALIASES[key] ?? key : "default";
  const found = CARD_COLORS.find((c2) => c2.key === k2);
  if (found) return found;
  if (/^#[0-9a-f]{6}$/i.test(k2)) return { key: k2, name: "Custom", bg: k2, fg: contrastColor(k2) };
  return CARD_COLORS[0];
}
var SHORTCUT_LABELS = {
  undo: "Undo",
  redo: "Redo",
  duplicate: "Duplicate selection",
  copy: "Copy",
  cut: "Cut",
  paste: "Paste",
  selectAll: "Select all",
  search: "Search this board",
  deleteSelection: "Delete selection",
  drawMode: "Enter draw mode",
  zoomReset: "Reset zoom to 100%"
};
var DEFAULT_KEYBINDINGS = {
  undo: { key: "z", ctrl: true },
  redo: { key: "z", ctrl: true, shift: true },
  duplicate: { key: "d", ctrl: true },
  copy: { key: "c", ctrl: true },
  cut: { key: "x", ctrl: true },
  paste: { key: "v", ctrl: true },
  selectAll: { key: "a", ctrl: true },
  search: { key: "f", ctrl: true },
  deleteSelection: { key: "delete" },
  drawMode: { key: "d" },
  zoomReset: { key: "0", ctrl: true }
};
function keyBindingLabel(b2) {
  if (!b2) return "";
  const parts = [];
  if (b2.ctrl) parts.push("Ctrl");
  if (b2.alt) parts.push("Alt");
  if (b2.shift) parts.push("Shift");
  const key = b2.key === " " ? "Space" : b2.key.length === 1 ? b2.key.toUpperCase() : b2.key;
  parts.push(key);
  return parts.join("+");
}
function matchesBinding(e2, b2) {
  if (!b2) return false;
  if (e2.key.toLowerCase() !== b2.key.toLowerCase()) return false;
  const mod = e2.ctrlKey || e2.metaKey;
  if (!!b2.ctrl !== mod) return false;
  if (!!b2.shift !== e2.shiftKey) return false;
  if (!!b2.alt !== e2.altKey) return false;
  return true;
}
function parseBoard(raw) {
  if (!raw || !raw.trim()) return structuredClone(DEFAULT_BOARD);
  try {
    const d2 = JSON.parse(raw);
    if (!d2 || typeof d2 !== "object" || Array.isArray(d2)) return structuredClone(DEFAULT_BOARD);
    if (!Array.isArray(d2.items)) d2.items = [];
    if (!Array.isArray(d2.edges)) d2.edges = [];
    d2.items = d2.items.filter((it) => !!it && typeof it === "object");
    d2.edges = d2.edges.filter((edge) => !!edge && typeof edge === "object");
    d2.version = d2.version ?? 1;
    return d2;
  } catch {
    return structuredClone(DEFAULT_BOARD);
  }
}

// src/settings-ui.ts
var FONT_CHOICES = [
  ["", "Default (Obsidian font)"],
  ["var(--font-text)", "Obsidian text font"],
  ["var(--font-monospace)", "Monospace"],
  ["Georgia, 'Times New Roman', serif", "Serif"],
  ["Arial, Helvetica, sans-serif", "Sans-serif"]
];
var MOUSE_SHORTCUTS = [
  ["Double-click canvas", "New note"],
  ["Click a card", "Select (then drag to move)"],
  ["Double-click a card", "Edit note / open board / preview file"],
  ["Ctrl+click file/board card", "Open the real file in a new tab"],
  ["Drag a toolbar button", "Create the element where you drop it"],
  ["Alt+drag a card", "Duplicate while dragging"],
  ["Ctrl while dragging", "Invert snap-to-grid"],
  ["Drag the blue dot", "Draw an arrow (drop on empty canvas for a free end)"],
  ["Drag the Line tool", "Add a line, then drag its ends to connect cards"],
  ["Drag a line's middle dot", "Curve it (Free lines only)"],
  ["Double-click an arrow", "Edit its label"],
  ["Right-click an arrow", "Line menu (color, arrowhead, dashed, Free/Smart routing...)"],
  ["Escape", "Cancel selection / close panels"],
  ["Arrow keys (+Shift)", "Nudge selection 1px (10px)"],
  ["Ctrl+scroll", "Zoom"],
  ["Scroll / middle mouse / Space+drag", "Pan"],
  ["Right-click", "Card menu (color, lock, order, replace reference...)"]
];
function renderSettingsUI(containerEl, plugin) {
  containerEl.empty();
  const s2 = plugin.settings;
  const save = async () => {
    await plugin.saveSettings();
    plugin.refreshBoards();
  };
  containerEl.createEl("h3", { text: "Board" });
  new import_obsidian2.Setting(containerEl).setName("Snap to grid").setDesc("Snap cards to an invisible grid while dragging. Hold Ctrl while dragging to temporarily invert this mode.").addToggle(
    (t2) => t2.setValue(s2.gridSnap).onChange(async (v2) => {
      s2.gridSnap = v2;
      await save();
    })
  );
  new import_obsidian2.Setting(containerEl).setName("Grid size").addSlider(
    (sl) => sl.setLimits(8, 64, 4).setValue(s2.gridSize).setDynamicTooltip().onChange(async (v2) => {
      s2.gridSize = v2;
      await save();
    })
  );
  new import_obsidian2.Setting(containerEl).setName("Default note width").addSlider(
    (sl) => sl.setLimits(160, 480, 20).setValue(s2.defaultNoteWidth).setDynamicTooltip().onChange(async (v2) => {
      s2.defaultNoteWidth = v2;
      await save();
    })
  );
  new import_obsidian2.Setting(containerEl).setName("Templates folder").addText(
    (t2) => t2.setValue(s2.templatesFolder).onChange(async (v2) => {
      s2.templatesFolder = v2 || "Maguilanote Templates";
      await save();
    })
  );
  new import_obsidian2.Setting(containerEl).setName("Assets folder").setDesc("Where dropped files, images and recordings are saved.").addText(
    (t2) => t2.setValue(s2.assetsFolder).onChange(async (v2) => {
      s2.assetsFolder = v2 || "Maguilanote Assets";
      await save();
    })
  );
  containerEl.createEl("h3", { text: "Recording" });
  new import_obsidian2.Setting(containerEl).setName("Default microphone").setDesc("Used to pre-select the mic when opening a Record card's recording popup.").addDropdown((d2) => {
    d2.selectEl.addClass("mgn-mic-dropdown");
    d2.addOption("", "System default");
    d2.setValue(s2.defaultMicId);
    void navigator.mediaDevices?.enumerateDevices().then((devices) => {
      for (const dev of devices.filter((x2) => x2.kind === "audioinput")) {
        d2.addOption(dev.deviceId, dev.label || "Microphone");
      }
      d2.setValue(s2.defaultMicId);
    });
    d2.onChange(async (v2) => {
      s2.defaultMicId = v2;
      await save();
    });
  });
  new import_obsidian2.Setting(containerEl).setName("OpenAI API key").setDesc(
    import_obsidian2.Platform.isDesktopApp ? `Used only by "Transcribe text" on Record cards (calls the Whisper API). Stored outside this vault, in your OS user profile, so it's never swept up by a vault backup.` : `Used only by "Transcribe text" on Record cards (calls the Whisper API). Mobile has no storage outside the vault, so this is saved in the vault's plugin data \u2014 it WILL be included in a vault backup.`
  ).addText((t2) => {
    t2.inputEl.type = "password";
    t2.setPlaceholder("sk-...");
    if (import_obsidian2.Platform.isDesktopApp) void loadOpenAiApiKey().then((key) => {
      t2.setValue(key);
    });
    else t2.setValue(s2.openaiApiKey);
    t2.onChange(async (v2) => {
      const key = v2.trim();
      if (import_obsidian2.Platform.isDesktopApp) {
        await saveOpenAiApiKey(key);
      } else {
        s2.openaiApiKey = key;
        await save();
      }
    });
  });
  containerEl.createEl("h3", { text: "Customization" });
  new import_obsidian2.Setting(containerEl).setName("Body font").setDesc('Pick a preset, or type any Google Font family name (e.g. "Inter") in the text field.').addDropdown((d2) => {
    for (const [value, label] of FONT_CHOICES) d2.addOption(value, label);
    d2.selectEl.value = FONT_CHOICES.some(([v2]) => v2 === s2.fontFamily) ? s2.fontFamily : "";
    d2.onChange(async (v2) => {
      s2.fontFamily = v2;
      await save();
      renderSettingsUI(containerEl, plugin);
    });
  }).addText(
    (t2) => t2.setPlaceholder("or a Google Font name").setValue(s2.fontFamily).onChange(async (v2) => {
      s2.fontFamily = v2.trim();
      await save();
    })
  );
  new import_obsidian2.Setting(containerEl).setName("Heading font").setDesc("Used for card titles and column titles. Blank = same as body font.").addText(
    (t2) => t2.setPlaceholder("Google Font name").setValue(s2.headingFontFamily).onChange(async (v2) => {
      s2.headingFontFamily = v2.trim();
      await save();
    })
  );
  new import_obsidian2.Setting(containerEl).setName("Theme").addDropdown(
    (d2) => d2.addOption("dark", "Dark").addOption("light", "Light").setValue(s2.theme).onChange(async (v2) => {
      s2.theme = v2;
      await save();
      renderSettingsUI(containerEl, plugin);
    })
  );
  containerEl.createEl("h4", { text: `${s2.theme === "light" ? "Light" : "Dark"} theme colors` });
  const colors = s2.colors[s2.theme];
  const colorSetting = (name, field) => new import_obsidian2.Setting(containerEl).setName(name).addColorPicker(
    (cp) => cp.setValue(colors[field]).onChange(async (v2) => {
      colors[field] = v2;
      await save();
    })
  );
  colorSetting("Board background", "canvasBg");
  colorSetting("Default card background", "cardDefaultBg");
  for (const key of CUSTOM_CARD_COLOR_KEYS) {
    colorSetting(CARD_COLOR_NAMES[key], key);
  }
  containerEl.createEl("h3", { text: "Shortcuts" });
  for (const id of Object.keys(SHORTCUT_LABELS)) {
    const setting = new import_obsidian2.Setting(containerEl).setName(SHORTCUT_LABELS[id]);
    let btn;
    const render = () => {
      const b2 = s2.keybindings[id];
      btn.setText(keyBindingLabel(b2) || "(none \u2014 click to set)");
    };
    setting.addButton((b2) => {
      btn = b2.buttonEl;
      b2.onClick(() => recordBinding(plugin, id, btn, render, save));
    });
    setting.addExtraButton(
      (b2) => b2.setIcon("rotate-ccw").setTooltip("Reset to default").onClick(async () => {
        s2.keybindings[id] = DEFAULT_KEYBINDINGS[id];
        await save();
        render();
      })
    );
    render();
  }
  const details = containerEl.createEl("details", { cls: "mgn-shortcuts-foldout" });
  details.createEl("summary", { text: "Mouse & gestures (reference)" });
  const table = details.createEl("table", { cls: "mgn-shortcuts" });
  for (const [k2, v2] of MOUSE_SHORTCUTS) {
    const tr = table.createEl("tr");
    tr.createEl("td", { text: k2, cls: "mgn-shortcut-key" });
    tr.createEl("td", { text: v2 });
  }
}
function recordBinding(plugin, id, btn, render, save) {
  btn.setText("Press a key\u2026");
  const onKey = (e2) => void (async () => {
    e2.preventDefault();
    e2.stopPropagation();
    if (e2.key === "Escape") {
      render();
    } else if (["Control", "Shift", "Alt", "Meta"].includes(e2.key)) {
      return;
    } else {
      const binding = {
        key: e2.key.toLowerCase(),
        ctrl: e2.ctrlKey || e2.metaKey,
        shift: e2.shiftKey,
        alt: e2.altKey
      };
      plugin.settings.keybindings[id] = binding;
      await save();
      render();
    }
    window.removeEventListener("keydown", onKey, true);
  })();
  window.addEventListener("keydown", onKey, true);
}

// src/modals.ts
var TextPromptModal = class extends import_obsidian3.Modal {
  constructor(app, promptTitle, initial, cb) {
    super(app);
    this.promptTitle = promptTitle;
    this.initial = initial;
    this.cb = cb;
  }
  onOpen() {
    this.titleEl.setText(this.promptTitle);
    let value = this.initial;
    new import_obsidian3.Setting(this.contentEl).addText((t2) => {
      t2.setValue(this.initial).onChange((v2) => value = v2);
      t2.inputEl.addClass("mgn-prompt-input");
      t2.inputEl.addEventListener("keydown", (e2) => {
        if (e2.key === "Enter") {
          e2.preventDefault();
          this.close();
          void this.cb(value.trim());
        }
      });
      window.setTimeout(() => t2.inputEl.focus(), 10);
    });
    new import_obsidian3.Setting(this.contentEl).addButton(
      (b2) => b2.setButtonText("OK").setCta().onClick(() => {
        this.close();
        void this.cb(value.trim());
      })
    ).addButton((b2) => b2.setButtonText("Cancel").onClick(() => this.close()));
  }
  onClose() {
    this.contentEl.empty();
  }
};
var ColorPromptModal = class extends import_obsidian3.Modal {
  constructor(app, initial, cb) {
    super(app);
    this.initial = initial;
    this.cb = cb;
  }
  onOpen() {
    this.titleEl.setText("Choose color");
    const value = /^#[0-9a-f]{6}$/i.test(this.initial) ? this.initial : "#cccccc";
    const row = this.contentEl.createDiv({ cls: "mgn-color-prompt" });
    row.createEl("input", { type: "color", value, attr: { "aria-label": "Color spectrum" } });
    const hex = row.createEl("input", {
      type: "text",
      value,
      placeholder: "#RRGGBB",
      cls: "mgn-prompt-input",
      attr: { "aria-label": "Hex color" }
    });
    const picker = row.querySelector('input[type="color"]');
    const normalize = (v2) => {
      const next = v2.startsWith("#") ? v2 : `#${v2}`;
      return /^#[0-9a-f]{6}$/i.test(next) ? next : null;
    };
    let hexTouched = false;
    picker.addEventListener("input", () => {
      hex.value = picker.value;
    });
    picker.addEventListener("change", () => {
      hex.value = picker.value;
    });
    hex.addEventListener("input", () => {
      hexTouched = true;
    });
    const ok = () => {
      const next = hexTouched ? normalize(hex.value) ?? normalize(picker.value) : normalize(picker.value);
      if (!next) {
        hex.focus();
        return;
      }
      this.close();
      this.cb(next);
    };
    new import_obsidian3.Setting(this.contentEl).addButton((b2) => b2.setButtonText("OK").setCta().onClick(ok)).addButton((b2) => b2.setButtonText("Cancel").onClick(() => this.close()));
    hex.addEventListener("keydown", (e2) => {
      if (e2.key === "Enter") {
        e2.preventDefault();
        ok();
      }
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};
var ImportTemplateConfirmModal = class extends import_obsidian3.Modal {
  constructor(app, name, onConfirm) {
    super(app);
    this.name = name;
    this.onConfirm = onConfirm;
  }
  onOpen() {
    this.titleEl.setText("Import template?");
    this.contentEl.createEl("p", {
      text: `You're about to import "${this.name}", replacing the board you currently have open. Only import templates from people you trust \u2014 a template file can bundle files of any type, and importing writes them into your vault.`
    });
    new import_obsidian3.Setting(this.contentEl).addButton((b2) => b2.setButtonText("Cancel").onClick(() => this.close())).addButton(
      (b2) => b2.setButtonText("Import").setCta().onClick(() => {
        this.close();
        void this.onConfirm();
      })
    );
  }
  onClose() {
    this.contentEl.empty();
  }
};
var VaultFilePicker = class extends import_obsidian3.FuzzySuggestModal {
  constructor(app, cb) {
    super(app);
    this.cb = cb;
    this.setPlaceholder("Choose a file from the vault...");
  }
  getItems() {
    return this.app.vault.getFiles();
  }
  getItemText(f2) {
    return f2.path;
  }
  onChooseItem(f2) {
    this.cb(f2);
  }
};
var SettingsModal = class extends import_obsidian3.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }
  onOpen() {
    this.titleEl.setText("Maguilanote settings");
    this.modalEl.addClass("mgn-settings-modal");
    renderSettingsUI(this.contentEl, this.plugin);
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/render.ts
var import_obsidian5 = require("obsidian");

// src/draw.ts
var import_obsidian4 = require("obsidian");

// node_modules/perfect-freehand/dist/esm/index.mjs
var { PI: e } = Math;
var t = e + 1e-4;
var n = 0.5;
var r = [1, 1];
function i(e2, t2, n2, r2 = (e3) => e3) {
  return e2 * r2(0.5 - t2 * (0.5 - n2));
}
var { min: a } = Math;
function o(e2, t2, n2) {
  let r2 = a(1, t2 / n2);
  return a(1, e2 + (a(1, 1 - r2) - e2) * (r2 * 0.275));
}
function s(e2) {
  return [-e2[0], -e2[1]];
}
function c(e2, t2) {
  return [e2[0] + t2[0], e2[1] + t2[1]];
}
function l(e2, t2, n2) {
  return e2[0] = t2[0] + n2[0], e2[1] = t2[1] + n2[1], e2;
}
function u(e2, t2) {
  return [e2[0] - t2[0], e2[1] - t2[1]];
}
function d(e2, t2, n2) {
  return e2[0] = t2[0] - n2[0], e2[1] = t2[1] - n2[1], e2;
}
function f(e2, t2) {
  return [e2[0] * t2, e2[1] * t2];
}
function p(e2, t2, n2) {
  return e2[0] = t2[0] * n2, e2[1] = t2[1] * n2, e2;
}
function m(e2, t2) {
  return [e2[0] / t2, e2[1] / t2];
}
function h(e2) {
  return [e2[1], -e2[0]];
}
function g(e2, t2) {
  let n2 = t2[0];
  return e2[0] = t2[1], e2[1] = -n2, e2;
}
function ee(e2, t2) {
  return e2[0] * t2[0] + e2[1] * t2[1];
}
function _(e2, t2) {
  return e2[0] === t2[0] && e2[1] === t2[1];
}
function v(e2) {
  return Math.hypot(e2[0], e2[1]);
}
function y(e2, t2) {
  let n2 = e2[0] - t2[0], r2 = e2[1] - t2[1];
  return n2 * n2 + r2 * r2;
}
function b(e2) {
  return m(e2, v(e2));
}
function x(e2, t2) {
  return Math.hypot(e2[1] - t2[1], e2[0] - t2[0]);
}
function S(e2, t2, n2) {
  let r2 = Math.sin(n2), i2 = Math.cos(n2), a2 = e2[0] - t2[0], o2 = e2[1] - t2[1], s2 = a2 * i2 - o2 * r2, c2 = a2 * r2 + o2 * i2;
  return [s2 + t2[0], c2 + t2[1]];
}
function C(e2, t2, n2, r2) {
  let i2 = Math.sin(r2), a2 = Math.cos(r2), o2 = t2[0] - n2[0], s2 = t2[1] - n2[1], c2 = o2 * a2 - s2 * i2, l2 = o2 * i2 + s2 * a2;
  return e2[0] = c2 + n2[0], e2[1] = l2 + n2[1], e2;
}
function w(e2, t2, n2) {
  return c(e2, f(u(t2, e2), n2));
}
function te(e2, t2, n2, r2) {
  let i2 = n2[0] - t2[0], a2 = n2[1] - t2[1];
  return e2[0] = t2[0] + i2 * r2, e2[1] = t2[1] + a2 * r2, e2;
}
function T(e2, t2, n2) {
  return c(e2, f(t2, n2));
}
var E = [0, 0];
var D = [0, 0];
var O = [0, 0];
function k(e2, n2) {
  let r2 = T(e2, b(h(u(e2, c(e2, [1, 1])))), -n2), i2 = [], a2 = 1 / 13;
  for (let n3 = a2; n3 <= 1; n3 += a2) i2.push(S(r2, e2, t * 2 * n3));
  return i2;
}
function A(e2, n2, r2) {
  let i2 = [], a2 = 1 / r2;
  for (let r3 = a2; r3 <= 1; r3 += a2) i2.push(S(n2, e2, t * r3));
  return i2;
}
function j(e2, t2, n2) {
  let r2 = u(t2, n2), i2 = f(r2, 0.5), a2 = f(r2, 0.51);
  return [u(e2, i2), u(e2, a2), c(e2, a2), c(e2, i2)];
}
function M(e2, n2, r2, i2) {
  let a2 = [], o2 = T(e2, n2, r2), s2 = 1 / i2;
  for (let n3 = s2; n3 < 1; n3 += s2) a2.push(S(o2, e2, t * 3 * n3));
  return a2;
}
function ne(e2, t2, n2) {
  return [c(e2, f(t2, n2)), c(e2, f(t2, n2 * 0.99)), u(e2, f(t2, n2 * 0.99)), u(e2, f(t2, n2))];
}
function N(e2, t2, n2) {
  return e2 === false || e2 === void 0 ? 0 : e2 === true ? Math.max(t2, n2) : e2;
}
function re(e2, t2, n2) {
  return e2.slice(0, 10).reduce((e3, r2) => {
    let i2 = r2.pressure;
    return t2 && (i2 = o(e3, r2.distance, n2)), (e3 + i2) / 2;
  }, e2[0].pressure);
}
function P(e2, n2 = {}) {
  let { size: r2 = 16, smoothing: a2 = 0.5, thinning: f2 = 0.5, simulatePressure: m2 = true, easing: _2 = (e3) => e3, start: v2 = {}, end: b2 = {}, last: x2 = false } = n2, { cap: S2 = true, easing: w2 = (e3) => e3 * (2 - e3) } = v2, { cap: T2 = true, easing: P2 = (e3) => --e3 * e3 * e3 + 1 } = b2;
  if (e2.length === 0 || r2 <= 0) return [];
  let F2 = e2[e2.length - 1].runningLength, I2 = N(v2.taper, r2, F2), L2 = N(b2.taper, r2, F2), R2 = (r2 * a2) ** 2, z = [], B = [], V = re(e2, m2, r2), H = i(r2, f2, e2[e2.length - 1].pressure, _2), U, W = e2[0].vector, G = e2[0].point, K = G, q = G, J = K, Y = false;
  for (let n3 = 0; n3 < e2.length; n3++) {
    let { pressure: a3 } = e2[n3], { point: s2, vector: h2, distance: v3, runningLength: b3 } = e2[n3], x3 = n3 === e2.length - 1;
    if (!x3 && F2 - b3 < 3) continue;
    f2 ? (m2 && (a3 = o(V, v3, r2)), H = i(r2, f2, a3, _2)) : H = r2 / 2, U === void 0 && (U = H);
    let S3 = b3 < I2 ? w2(b3 / I2) : 1, T3 = F2 - b3 < L2 ? P2((F2 - b3) / L2) : 1;
    H = Math.max(0.01, H * Math.min(S3, T3));
    let k2 = (x3 ? e2[n3] : e2[n3 + 1]).vector, A2 = x3 ? 1 : ee(h2, k2), j2 = ee(h2, W) < 0 && !Y, M2 = A2 !== null && A2 < 0;
    if (j2 || M2) {
      g(E, W), p(E, E, H);
      for (let e3 = 0; e3 <= 1; e3 += 0.07692307692307693) d(D, s2, E), C(D, D, s2, t * e3), q = [D[0], D[1]], z.push(q), l(O, s2, E), C(O, O, s2, t * -e3), J = [O[0], O[1]], B.push(J);
      G = q, K = J, M2 && (Y = true);
      continue;
    }
    if (Y = false, x3) {
      g(E, h2), p(E, E, H), z.push(u(s2, E)), B.push(c(s2, E));
      continue;
    }
    te(E, k2, h2, A2), g(E, E), p(E, E, H), d(D, s2, E), q = [D[0], D[1]], (n3 <= 1 || y(G, q) > R2) && (z.push(q), G = q), l(O, s2, E), J = [O[0], O[1]], (n3 <= 1 || y(K, J) > R2) && (B.push(J), K = J), V = a3, W = h2;
  }
  let X = [e2[0].point[0], e2[0].point[1]], Z = e2.length > 1 ? [e2[e2.length - 1].point[0], e2[e2.length - 1].point[1]] : c(e2[0].point, [1, 1]), Q = [], $ = [];
  if (e2.length === 1) {
    if (!(I2 || L2) || x2) return k(X, U || H);
  } else {
    I2 || L2 && e2.length === 1 || (S2 ? Q.push(...A(X, B[0], 13)) : Q.push(...j(X, z[0], B[0])));
    let t2 = h(s(e2[e2.length - 1].vector));
    L2 || I2 && e2.length === 1 ? $.push(Z) : T2 ? $.push(...M(Z, t2, H, 29)) : $.push(...ne(Z, t2, H));
  }
  return z.concat($, B.reverse(), Q);
}
var F = [0, 0];
function I(e2) {
  return e2 != null && e2 >= 0;
}
function L(e2, t2 = {}) {
  let { streamline: i2 = 0.5, size: a2 = 16, last: o2 = false } = t2;
  if (e2.length === 0) return [];
  let s2 = 0.15 + (1 - i2) * 0.85, l2 = Array.isArray(e2[0]) ? e2 : e2.map(({ x: e3, y: t3, pressure: r2 = n }) => [e3, t3, r2]);
  if (l2.length === 2) {
    let e3 = l2[1];
    l2 = l2.slice(0, -1);
    for (let t3 = 1; t3 < 5; t3++) l2.push(w(l2[0], e3, t3 / 4));
  }
  l2.length === 1 && (l2 = [...l2, [...c(l2[0], r), ...l2[0].slice(2)]]);
  let u2 = [{ point: [l2[0][0], l2[0][1]], pressure: I(l2[0][2]) ? l2[0][2] : 0.25, vector: [...r], distance: 0, runningLength: 0 }], f2 = false, p2 = 0, m2 = u2[0], h2 = l2.length - 1;
  for (let e3 = 1; e3 < l2.length; e3++) {
    let t3 = o2 && e3 === h2 ? [l2[e3][0], l2[e3][1]] : w(m2.point, l2[e3], s2);
    if (_(m2.point, t3)) continue;
    let r2 = x(t3, m2.point);
    if (p2 += r2, e3 < h2 && !f2) {
      if (p2 < a2) continue;
      f2 = true;
    }
    d(F, m2.point, t3), m2 = { point: t3, pressure: I(l2[e3][2]) ? l2[e3][2] : n, vector: b(F), distance: r2, runningLength: p2 }, u2.push(m2);
  }
  return u2[0].vector = u2[1]?.vector || [0, 0], u2;
}
function R(e2, t2 = {}) {
  return P(L(e2, t2), t2);
}

// src/draw.ts
var THINNING = 0.75;
function strokeToPath(stroke, dx = 0, dy = 0) {
  const input = stroke.points.map((p2) => [p2[0] + dx, p2[1] + dy, p2[2] ?? 1]);
  const outline = R(input, {
    size: stroke.size / (1 + THINNING),
    thinning: THINNING,
    smoothing: 0.5,
    streamline: 0.5,
    simulatePressure: false
  });
  if (!outline.length) return "";
  let d2 = `M ${outline[0][0]} ${outline[0][1]}`;
  for (let i2 = 1; i2 < outline.length; i2++) d2 += ` L ${outline[i2][0]} ${outline[i2][1]}`;
  return d2 + " Z";
}
function strokeBBox(s2) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p2 of s2.points) {
    minX = Math.min(minX, p2[0]);
    minY = Math.min(minY, p2[1]);
    maxX = Math.max(maxX, p2[0]);
    maxY = Math.max(maxY, p2[1]);
  }
  if (!s2.points.length) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  return { minX, minY, maxX, maxY };
}
function strokesBBox(strokes) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, pad = 0;
  for (const s2 of strokes) {
    const b2 = strokeBBox(s2);
    minX = Math.min(minX, b2.minX);
    minY = Math.min(minY, b2.minY);
    maxX = Math.max(maxX, b2.maxX);
    maxY = Math.max(maxY, b2.maxY);
    pad = Math.max(pad, s2.size);
  }
  if (!strokes.length) return { x: 0, y: 0, w: 0, h: 0 };
  return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
}
function groupStrokes(strokes, distance) {
  if (!strokes.length) return [];
  const boxes = strokes.map(strokeBBox);
  const parent = strokes.map((_2, i2) => i2);
  const find = (a2) => {
    while (parent[a2] !== a2) {
      parent[a2] = parent[parent[a2]];
      a2 = parent[a2];
    }
    return a2;
  };
  const near = (a2, b2) => {
    const A2 = boxes[a2], B = boxes[b2];
    const gapX = Math.max(0, A2.minX - B.maxX, B.minX - A2.maxX);
    const gapY = Math.max(0, A2.minY - B.maxY, B.minY - A2.maxY);
    return gapX <= distance && gapY <= distance;
  };
  for (let i2 = 0; i2 < strokes.length; i2++)
    for (let j2 = i2 + 1; j2 < strokes.length; j2++)
      if (near(i2, j2)) parent[find(i2)] = find(j2);
  const groups = /* @__PURE__ */ new Map();
  strokes.forEach((_2, i2) => {
    const r2 = find(i2);
    (groups.get(r2) ?? groups.set(r2, []).get(r2)).push(i2);
  });
  const out = [];
  for (const idxs of groups.values()) {
    const members = idxs.map((i2) => strokes[i2]);
    const box = strokesBBox(members);
    const rebased = members.map((s2) => ({
      color: s2.color,
      size: s2.size,
      points: s2.points.map((p2) => [p2[0] - box.x, p2[1] - box.y, p2[2] ?? 0.5])
    }));
    out.push({ strokes: rebased, box });
  }
  return out;
}
var ContextToolbar = class {
  constructor(host, mainTb, groups, inline = false) {
    this.btns = /* @__PURE__ */ new Map();
    this.mainTb = mainTb;
    this.inline = inline;
    if (!inline) mainTb.addClass("mgn-toolbar-dimmed");
    this.el = host.createDiv({ cls: inline ? "mgn-context-toolbar mgn-context-inline" : "mgn-context-toolbar" });
    groups.forEach((g2, gi) => {
      if (gi > 0) this.el.createDiv({ cls: "mgn-ctx-sep" });
      for (const it of g2) {
        if (it.render) {
          const wrap = this.el.createDiv({ cls: "mgn-ctx-custom" });
          it.render(wrap);
          continue;
        }
        const b2 = this.el.createDiv({ cls: "mgn-ctx-tool", attr: { "aria-label": it.label ?? "" } });
        if (it.icon) (0, import_obsidian4.setIcon)(b2, it.icon);
        const onClick = it.onClick;
        if (onClick) b2.addEventListener("click", () => void onClick());
        if (it.id) this.btns.set(it.id, b2);
      }
    });
  }
  setActive(id, on) {
    this.btns.get(id)?.toggleClass("mgn-ctx-active", on);
  }
  close() {
    if (!this.inline) this.mainTb.removeClass("mgn-toolbar-dimmed");
    this.el.remove();
  }
};
var penSeen = false;
var DrawSession = class {
  constructor(cfg) {
    this.strokes = [];
    this.tool = "pen";
    this.color = DEFAULT_STROKE_COLOR;
    this.size = DEFAULT_STROKE_SIZE;
    this.selection = /* @__PURE__ */ new Set();
    this.undoStack = [];
    this.redoStack = [];
    this.live = null;
    this.penPointerId = null;
    /** the one finger drawing/erasing/selecting on a pen-less device */
    this.touchPointerId = null;
    this.penReleaseTimer = null;
    this.drag = null;
    this.svg = cfg.svg;
    this.toCoords = cfg.toCoords;
    this.onChange = cfg.onChange;
    this.strokeG = this.svg.createSvg("g");
    this.overlayG = this.svg.createSvg("g");
    this.svg.addEventListener("pointerdown", (e2) => this.onDown(e2));
    this.svg.addEventListener("pointermove", (e2) => this.onMove(e2));
    this.svg.addEventListener("pointerup", (e2) => this.onUp(e2));
    this.svg.addEventListener("pointercancel", (e2) => this.onCancel(e2));
    this.svg.addEventListener("lostpointercapture", (e2) => this.onCancel(e2));
    this.render();
  }
  setStrokes(strokes) {
    this.strokes = structuredClone(strokes);
    this.selection.clear();
    this.undoStack = [];
    this.redoStack = [];
    this.render();
  }
  snapshot() {
    this.undoStack.push(JSON.stringify(this.strokes));
    this.redoStack = [];
  }
  undo() {
    if (!this.undoStack.length) return;
    this.redoStack.push(JSON.stringify(this.strokes));
    this.strokes = JSON.parse(this.undoStack.pop());
    this.selection.clear();
    this.render();
    this.onChange?.();
  }
  redo() {
    if (!this.redoStack.length) return;
    this.undoStack.push(JSON.stringify(this.strokes));
    this.strokes = JSON.parse(this.redoStack.pop());
    this.selection.clear();
    this.render();
    this.onChange?.();
  }
  /** recolor the currently selected strokes; no-op if nothing is selected */
  recolorSelection(color) {
    if (!this.selection.size) return false;
    this.snapshot();
    for (const i2 of this.selection) this.strokes[i2].color = color;
    this.render();
    this.onChange?.();
    return true;
  }
  // ---------------------------------------------------------------- pointers
  onDown(e2) {
    if (e2.pointerType === "touch" && (penSeen || this.penPointerId !== null)) return;
    if (e2.pointerType === "touch" && this.touchPointerId !== null) return;
    if (e2.button !== 0) return;
    if (e2.pointerType === "touch") this.touchPointerId = e2.pointerId;
    if (e2.pointerType === "pen") {
      penSeen = true;
      if (this.penReleaseTimer !== null) window.clearTimeout(this.penReleaseTimer);
      this.penReleaseTimer = null;
      this.penPointerId = e2.pointerId;
    }
    e2.preventDefault();
    this.svg.setPointerCapture(e2.pointerId);
    const { x: x2, y: y2 } = this.toCoords(e2);
    const pressure = e2.pointerType === "pen" ? e2.pressure || 0.5 : 1;
    if (this.tool === "pen") {
      this.snapshot();
      this.live = [[x2, y2, pressure]];
      return;
    }
    if (this.tool === "eraser") {
      this.snapshot();
      this.eraseAt(x2, y2);
      this.drag = { kind: "move", sx: x2, sy: y2, orig: [] };
      return;
    }
    const hit = this.hitTest(x2, y2);
    if (hit >= 0) {
      if (!e2.shiftKey && !this.selection.has(hit)) this.selection.clear();
      this.selection.add(hit);
      this.snapshot();
      const orig = [...this.selection].map((i2) => this.strokes[i2].points.map((p2) => [...p2]));
      this.drag = { kind: "move", sx: x2, sy: y2, orig };
      this.render();
    } else {
      if (!e2.shiftKey) this.selection.clear();
      const rect = this.overlayG.createSvg("rect", { cls: "mgn-draw-selrect" });
      this.drag = { kind: "rubber", sx: x2, sy: y2, rect };
      this.render();
    }
  }
  onMove(e2) {
    if (e2.pointerType === "touch" && e2.pointerId !== this.touchPointerId) return;
    if (this.penPointerId !== null && e2.pointerId !== this.penPointerId) return;
    const { x: x2, y: y2 } = this.toCoords(e2);
    if (this.live) {
      const pressure = e2.pointerType === "pen" ? e2.pressure || 0.5 : 1;
      this.live.push([x2, y2, pressure]);
      this.renderLive();
      return;
    }
    if (this.tool === "eraser" && this.drag) {
      this.eraseAt(x2, y2);
      return;
    }
    if (!this.drag) return;
    if (this.drag.kind === "move") {
      const dx = x2 - this.drag.sx, dy = y2 - this.drag.sy;
      const sel = [...this.selection];
      sel.forEach((idx, k2) => {
        const orig = this.drag.kind === "move" ? this.drag.orig[k2] : null;
        if (!orig) return;
        this.strokes[idx].points = orig.map((p2) => [p2[0] + dx, p2[1] + dy, p2[2] ?? 0.5]);
      });
      this.render();
    } else if (this.drag.kind === "rubber") {
      const rx = Math.min(x2, this.drag.sx), ry = Math.min(y2, this.drag.sy);
      const rw = Math.abs(x2 - this.drag.sx), rh = Math.abs(y2 - this.drag.sy);
      this.drag.rect.setAttribute("x", String(rx));
      this.drag.rect.setAttribute("y", String(ry));
      this.drag.rect.setAttribute("width", String(rw));
      this.drag.rect.setAttribute("height", String(rh));
      this.selection.clear();
      this.strokes.forEach((s2, i2) => {
        const b2 = strokeBBox(s2);
        if (b2.maxX >= rx && b2.minX <= rx + rw && b2.maxY >= ry && b2.minY <= ry + rh)
          this.selection.add(i2);
      });
      this.render(false);
    }
  }
  onUp(e2) {
    if (this.penPointerId !== null && e2.pointerId !== this.penPointerId) return;
    if (e2.pointerId === this.penPointerId) {
      this.penReleaseTimer = window.setTimeout(() => {
        this.penPointerId = null;
        this.penReleaseTimer = null;
      }, 300);
    }
    if (e2.pointerType === "touch" && e2.pointerId !== this.touchPointerId) return;
    this.touchPointerId = null;
    try {
      this.svg.releasePointerCapture(e2.pointerId);
    } catch {
    }
    if (this.live) {
      if (this.live.length >= 1) {
        this.strokes.push({ points: this.live, color: this.color, size: this.size });
      }
      this.live = null;
      this.render();
      this.onChange?.();
      return;
    }
    if (this.drag) {
      const wasRubber = this.drag.kind === "rubber";
      if (this.drag.kind === "rubber") this.drag.rect.remove();
      this.drag = null;
      if (!wasRubber) this.onChange?.();
      this.render();
    }
  }
  onCancel(e2) {
    if (this.penPointerId !== null && e2.pointerId !== this.penPointerId) return;
    if (e2.pointerType === "touch" && e2.pointerId !== this.touchPointerId) return;
    this.touchPointerId = null;
    if (e2.pointerId === this.penPointerId) {
      this.penPointerId = null;
      if (this.penReleaseTimer !== null) window.clearTimeout(this.penReleaseTimer);
      this.penReleaseTimer = null;
    }
    if (this.live) {
      this.live = null;
      this.render();
    }
    if (this.drag) {
      if (this.drag.kind === "move") {
        const sel = [...this.selection];
        sel.forEach((idx, k2) => {
          const orig = this.drag?.kind === "move" ? this.drag.orig[k2] : null;
          if (orig) this.strokes[idx].points = orig.map((p2) => [...p2]);
        });
      } else if (this.drag.kind === "rubber") this.drag.rect.remove();
      this.drag = null;
      this.render();
    }
    try {
      this.svg.releasePointerCapture(e2.pointerId);
    } catch {
    }
  }
  // ------------------------------------------------------------------ helpers
  eraseAt(x2, y2) {
    let changed = false;
    for (let i2 = this.strokes.length - 1; i2 >= 0; i2--) {
      if (this.pointNearStroke(x2, y2, this.strokes[i2])) {
        this.strokes.splice(i2, 1);
        changed = true;
      }
    }
    if (changed) {
      this.selection.clear();
      this.render();
      this.onChange?.();
    }
  }
  hitTest(x2, y2) {
    for (let i2 = this.strokes.length - 1; i2 >= 0; i2--)
      if (this.pointNearStroke(x2, y2, this.strokes[i2])) return i2;
    return -1;
  }
  pointNearStroke(x2, y2, s2) {
    const thr = s2.size / 2 + 6;
    for (const p2 of s2.points) {
      if (Math.hypot(p2[0] - x2, p2[1] - y2) <= thr) return true;
    }
    return false;
  }
  renderLive() {
    let path = this.strokeG.querySelector(".mgn-draw-live");
    if (!path) {
      path = this.strokeG.createSvg("path", { cls: "mgn-draw-live" });
    }
    path.setAttribute("d", strokeToPath({ points: this.live, color: this.color, size: this.size }));
    path.setAttribute("fill", this.color);
  }
  render(withOverlay = true) {
    this.strokeG.empty();
    this.strokes.forEach((s2, i2) => {
      const p2 = this.strokeG.createSvg("path", {
        cls: this.selection.has(i2) ? ["mgn-draw-stroke", "mgn-draw-selected"] : "mgn-draw-stroke"
      });
      p2.setAttribute("d", strokeToPath(s2));
      p2.setAttribute("fill", s2.color);
    });
    if (withOverlay) {
      this.overlayG.querySelectorAll(".mgn-draw-selbox").forEach((n2) => n2.remove());
      for (const i2 of this.selection) {
        const b2 = strokeBBox(this.strokes[i2]);
        const r2 = this.overlayG.createSvg("rect", { cls: "mgn-draw-selbox" });
        r2.setAttribute("x", String(b2.minX - 4));
        r2.setAttribute("y", String(b2.minY - 4));
        r2.setAttribute("width", String(b2.maxX - b2.minX + 8));
        r2.setAttribute("height", String(b2.maxY - b2.minY + 8));
      }
    }
  }
};

// src/render.ts
function markMissing(el, label = "Missing reference") {
  el.addClass("mgn-missing");
  const w2 = el.createDiv({ cls: "mgn-missing-label" });
  (0, import_obsidian5.setIcon)(w2.createSpan(), "alert-triangle");
  w2.createSpan({ text: label });
}
function iconPlaceholder(parent, icon, text) {
  const ph = parent.createDiv({ cls: "mgn-placeholder mgn-icon-placeholder" });
  (0, import_obsidian5.setIcon)(ph.createSpan({ cls: "mgn-icon-placeholder-ico" }), icon);
  ph.createSpan({ cls: "mgn-icon-placeholder-text", text });
}
var recordAudio = /* @__PURE__ */ new Map();
function fmtTime(s2) {
  if (!Number.isFinite(s2) || s2 < 0) s2 = 0;
  return `${Math.floor(s2 / 60)}:${String(Math.floor(s2 % 60)).padStart(2, "0")}`;
}
function pauseRecordAudio(id) {
  recordAudio.get(id)?.pause();
}
function clearRecordAudio(ids) {
  const keys = ids ?? recordAudio.keys();
  for (const id of keys) {
    const audio = recordAudio.get(id);
    audio?.pause();
    audio?.remove();
    recordAudio.delete(id);
  }
}
function renderVideoPlayer(view, el, src) {
  const wrap = el.createDiv({ cls: "mgn-video-wrap" });
  const v2 = wrap.createEl("video", {
    attr: { src, preload: "metadata", style: "width:100%;display:block;border-radius:2px;" }
  });
  v2.addEventListener("loadeddata", () => view.drawEdges());
  const player = wrap.createDiv({ cls: "mgn-video-bar" });
  const btn = player.createEl("button", { cls: "mgn-video-play", attr: { "aria-label": "Play video" } });
  const bar = player.createDiv({ cls: "mgn-video-progress" });
  const fill = bar.createDiv({ cls: "mgn-video-progress-fill" });
  const time = player.createDiv({ cls: "mgn-video-time" });
  v2.addEventListener("error", () => {
    wrap.addClass("mgn-media-error");
    time.setText("Unable to play media");
  });
  const sync = () => {
    (0, import_obsidian5.setIcon)(btn, v2.paused ? "play" : "pause");
    const t2 = v2.duration || 0;
    fill.style.width = t2 ? `${Math.min(100, v2.currentTime / t2 * 100)}%` : "0%";
    time.setText(`${fmtTime(v2.currentTime)} / ${fmtTime(t2)}`);
  };
  v2.onloadedmetadata = v2.ontimeupdate = v2.onplay = v2.onpause = v2.onended = sync;
  btn.addEventListener("click", (e2) => {
    e2.stopPropagation();
    if (v2.paused) v2.play().catch(() => {
      time.setText("Unable to play media");
      wrap.addClass("mgn-media-error");
    });
    else v2.pause();
  });
  bar.addEventListener("click", (e2) => {
    e2.stopPropagation();
    const t2 = v2.duration || 0;
    if (!t2) return;
    const r2 = bar.getBoundingClientRect();
    v2.currentTime = Math.max(0, Math.min(1, (e2.clientX - r2.left) / r2.width)) * t2;
    sync();
  });
  sync();
}
function renderRecordPlayer(el, it, src) {
  let cached = recordAudio.get(it.id);
  if (!cached || cached.src !== src) {
    cached?.pause();
    cached?.remove();
    cached = createEl("audio");
    cached.addClass("mgn-record-audio");
    cached.preload = "metadata";
    cached.src = src;
    cached.controls = true;
    recordAudio.set(it.id, cached);
  }
  const audio = cached;
  el.appendChild(audio);
  const player = el.createDiv({ cls: "mgn-record-player" });
  const btn = player.createEl("button", { cls: "mgn-record-play" });
  const bar = player.createDiv({ cls: "mgn-record-bar" });
  const fill = bar.createDiv({ cls: "mgn-record-bar-fill" });
  const time = player.createDiv({ cls: "mgn-record-time" });
  const total = () => Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : it.duration ?? 0;
  const sync = () => {
    (0, import_obsidian5.setIcon)(btn, audio.paused ? "play" : "pause");
    btn.setAttribute("aria-label", audio.paused ? "Play recording" : "Pause recording");
    const t2 = total();
    fill.style.width = t2 ? `${Math.min(100, audio.currentTime / t2 * 100)}%` : "0%";
    time.setText(`${fmtTime(audio.currentTime)} / ${fmtTime(t2)}`);
  };
  audio.onloadedmetadata = audio.ontimeupdate = audio.onplay = audio.onpause = audio.onended = sync;
  audio.onerror = () => {
    player.addClass("mgn-media-error");
    time.setText("Unable to play recording");
  };
  btn.addEventListener("click", (e2) => {
    e2.stopPropagation();
    if (audio.paused) audio.play().catch(() => {
      time.setText("Unable to play recording");
      player.addClass("mgn-media-error");
    });
    else audio.pause();
  });
  bar.addEventListener("click", (e2) => {
    e2.stopPropagation();
    const t2 = total();
    if (!t2) return;
    const r2 = bar.getBoundingClientRect();
    audio.currentTime = Math.max(0, Math.min(1, (e2.clientX - r2.left) / r2.width)) * t2;
    sync();
  });
  sync();
}
var todoDragClosers = /* @__PURE__ */ new Map();
function cancelTodoDrags(view) {
  [...todoDragClosers.get(view) ?? []].forEach((close) => close());
}
function startTodoItemDrag(view, source, startIdx, e2) {
  if (!source.todos || source.todos.length === 0) return;
  e2.preventDefault();
  e2.stopPropagation();
  const entry = source.todos[startIdx];
  const ghost = view.containerEl.doc.body.createDiv({ cls: "mgn-todo-ghost", text: entry.text || "Empty item" });
  const dropLine = createDiv({ cls: "mgn-todo-drop-line" });
  view.containerEl.doc.body.addClass("mgn-todo-grabbing");
  let target = null;
  let hlEl = null;
  const positionGhost = (ev) => {
    ghost.style.left = `${ev.clientX + 12}px`;
    ghost.style.top = `${ev.clientY + 6}px`;
  };
  const clearTarget = () => {
    hlEl?.removeClass("mgn-todo-drop-target");
    hlEl = null;
    dropLine.remove();
  };
  const onMove = (ev) => {
    if (ev.pointerId !== e2.pointerId) return;
    positionGhost(ev);
    const under = view.containerEl.doc.elementFromPoint(ev.clientX, ev.clientY);
    const cardEl = under?.closest(".mgn-card.mgn-todo");
    const overItem = cardEl?.dataset.id ? view.item(cardEl.dataset.id) : null;
    if (cardEl && overItem?.type === "todo") {
      if (hlEl !== cardEl) {
        clearTarget();
        hlEl = cardEl;
        cardEl.addClass("mgn-todo-drop-target");
      }
      const listEl = cardEl.querySelector(".mgn-todo-list") ?? cardEl;
      const rows = Array.from(cardEl.querySelectorAll(".mgn-todo-row"));
      let index = rows.length;
      for (let i2 = 0; i2 < rows.length; i2++) {
        const rr = rows[i2].getBoundingClientRect();
        if (ev.clientY < rr.top + rr.height / 2) {
          index = i2;
          break;
        }
      }
      if (index < rows.length) listEl.insertBefore(dropLine, rows[index]);
      else listEl.appendChild(dropLine);
      ghost.removeClass("mgn-todo-ghost-new");
      target = { card: overItem, index };
    } else {
      clearTarget();
      ghost.addClass("mgn-todo-ghost-new");
      target = null;
    }
  };
  const cleanup = () => {
    window.removeEventListener("pointermove", onMove, true);
    window.removeEventListener("pointerup", onUp, true);
    window.removeEventListener("pointercancel", onCancel, true);
    window.removeEventListener("lostpointercapture", onCancel, true);
  };
  const onCancel = (ev) => {
    if (ev.pointerId !== e2.pointerId) return;
    viewClosers.delete(closeForView);
    if (!viewClosers.size) todoDragClosers.delete(view);
    cleanup();
    clearTarget();
    ghost.remove();
    view.containerEl.doc.body.removeClass("mgn-todo-grabbing");
  };
  const onUp = (ev) => {
    if (ev.pointerId !== e2.pointerId) return;
    viewClosers.delete(closeForView);
    if (!viewClosers.size) todoDragClosers.delete(view);
    cleanup();
    clearTarget();
    ghost.remove();
    view.containerEl.doc.body.removeClass("mgn-todo-grabbing");
    applyTodoDrop(view, source, entry, target, ev);
  };
  const closeForView = () => onCancel(e2);
  const viewClosers = todoDragClosers.get(view) ?? /* @__PURE__ */ new Set();
  viewClosers.add(closeForView);
  todoDragClosers.set(view, viewClosers);
  window.addEventListener("pointermove", onMove, true);
  window.addEventListener("pointerup", onUp, true);
  window.addEventListener("pointercancel", onCancel, true);
  window.addEventListener("lostpointercapture", onCancel, true);
  window.addEventListener("pointercancel", onCancel, true);
  window.addEventListener("lostpointercapture", onCancel, true);
  onMove(e2);
}
function applyTodoDrop(view, source, entry, target, ev) {
  var _a;
  const srcIdx = source.todos?.indexOf(entry) ?? -1;
  if (srcIdx < 0) return;
  if (target && target.card === source) {
    source.todos.splice(srcIdx, 1);
    let idx = target.index;
    if (idx > srcIdx) idx--;
    source.todos.splice(idx, 0, entry);
    view.commit();
    return;
  }
  source.todos.splice(srcIdx, 1);
  if (target) {
    ((_a = target.card).todos ?? (_a.todos = [])).splice(target.index, 0, entry);
  } else {
    const w2 = view.screenToWorld(ev.clientX, ev.clientY);
    const nc = {
      id: newId(),
      type: "todo",
      x: w2.x,
      y: w2.y,
      w: view.plugin.settings.defaultNoteWidth,
      todos: [entry]
    };
    view.board.items.push(nc);
    view.selection = /* @__PURE__ */ new Set([nc.id]);
  }
  if (source.todos.length === 0) {
    view.board.items = view.board.items.filter((i2) => i2.id !== source.id);
    view.board.edges = view.board.edges.filter((e2) => e2.from !== source.id && e2.to !== source.id);
    view.selection.delete(source.id);
  }
  view.commit();
}
function renderCardTitle(view, el, it) {
  if (!it.showTitle || !(it.type in TITLE_LABELS)) return;
  if (it.title === void 0) it.title = TITLE_LABELS[it.type];
  const head = el.createDiv({ cls: "mgn-card-title" });
  const input = head.createEl("input", {
    cls: "mgn-card-title-text",
    type: "text",
    value: it.title ?? ""
  });
  input.addEventListener("input", () => {
    it.title = input.value;
    view.requestSave();
  });
  input.addEventListener("change", () => view.commit(false));
}
function renderCardFn(view, it, inColumn = false) {
  const c2 = colorOf(it.color);
  const el = createDiv({ cls: `mgn-card mgn-${it.type}` });
  el.dataset.id = it.id;
  if (!inColumn) {
    el.style.left = `${it.x}px`;
    el.style.top = `${it.y}px`;
    el.style.width = `${it.w}px`;
    if (it.h) el.style.minHeight = `${it.h}px`;
  }
  if (it.type !== "column" && it.type !== "swatch" && it.type !== "drawing") {
    el.style.background = c2.bg;
    el.style.color = c2.fg;
  }
  if (it.accentColor && it.accentColor !== "default" && it.type !== "column" && it.type !== "swatch") {
    el.style.borderLeft = `4px solid ${colorOf(it.accentColor).bg}`;
  }
  if (view.selection.has(it.id)) el.addClass("mgn-selected");
  if (it.locked) el.addClass("mgn-locked");
  renderCardTitle(view, el, it);
  switch (it.type) {
    case "note":
    case "comment": {
      const body = el.createDiv({ cls: "mgn-note-body" });
      if (it.text?.trim()) {
        void import_obsidian5.MarkdownRenderer.render(view.app, it.text, body, view.file?.path ?? "", view);
      } else {
        body.createDiv({
          cls: "mgn-placeholder",
          text: it.type === "comment" ? "Empty comment" : "Empty note"
        });
      }
      break;
    }
    case "todo": {
      if (!it.todos?.length) it.todos = [{ text: "", done: false }];
      const list = el.createDiv({ cls: "mgn-todo-list" });
      const focusTodoText = (idx, caretEnd = false) => {
        window.setTimeout(() => {
          const fresh = view.worldEl.querySelectorAll(
            `.mgn-card[data-id="${it.id}"] .mgn-todo-text`
          )[idx];
          if (!fresh) return;
          fresh.focus();
          if (caretEnd) fresh.setSelectionRange(fresh.value.length, fresh.value.length);
        }, 10);
      };
      (it.todos ?? []).forEach((t2, idx) => {
        const row = list.createDiv({ cls: "mgn-todo-row" });
        const cb = row.createEl("input", { type: "checkbox", cls: "mgn-todo-check" });
        cb.checked = t2.done;
        const txt = row.createEl("input", {
          type: "text",
          cls: "mgn-todo-text" + (t2.done ? " mgn-done" : ""),
          value: t2.text,
          attr: { placeholder: "Add item" }
        });
        cb.addEventListener("change", () => {
          t2.done = cb.checked;
          txt.toggleClass("mgn-done", cb.checked);
          view.commit(false);
        });
        txt.addEventListener("input", () => {
          t2.text = txt.value;
          view.requestSave();
        });
        txt.addEventListener("change", () => view.commit(false));
        txt.addEventListener("keydown", (e2) => {
          if (e2.key === "Enter") {
            e2.preventDefault();
            (it.todos ?? (it.todos = [])).splice(idx + 1, 0, { text: "", done: false });
            view.commit(false);
            view.rerenderItem(it);
            focusTodoText(idx + 1);
          } else if (e2.key === "Backspace" && !txt.value && (it.todos?.length ?? 0) > 1) {
            e2.preventDefault();
            it.todos?.splice(idx, 1);
            view.commit(false);
            view.rerenderItem(it);
            focusTodoText(Math.max(0, idx - 1), true);
          }
        });
        const grip = row.createDiv({ cls: "mgn-todo-grip" });
        (0, import_obsidian5.setIcon)(grip, "grip-vertical");
        grip.addEventListener("pointerdown", (e2) => startTodoItemDrag(view, it, idx, e2));
      });
      break;
    }
    case "image": {
      const f2 = view.resolveFile(it.path);
      if (f2) {
        const img = el.createEl("img", {
          attr: { src: view.app.vault.getResourcePath(f2), draggable: "false" }
        });
        img.addEventListener("load", () => view.drawEdges());
      } else {
        markMissing(el);
      }
      break;
    }
    case "link": {
      const head = el.createDiv({ cls: "mgn-link-head" });
      (0, import_obsidian5.setIcon)(head.createSpan({ cls: "mgn-link-ico" }), "link");
      head.createDiv({ cls: "mgn-link-title", text: it.title || it.url || "Link" });
      el.createDiv({ cls: "mgn-link-url", text: it.url ?? "" });
      const yt = it.url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
      if (yt) {
        const frame = el.createEl("iframe", {
          attr: {
            src: `https://www.youtube.com/embed/${yt[1]}`,
            frameborder: "0",
            allowfullscreen: "true",
            style: "width:100%;aspect-ratio:16/9;border-radius:4px;margin-top:6px;"
          }
        });
        frame.addEventListener("load", () => view.drawEdges());
      }
      break;
    }
    case "file": {
      const f2 = view.resolveFile(it.path);
      const ext = f2?.extension?.toLowerCase() ?? "";
      const isVideo = VIDEO_EXTS.includes(ext);
      if (!it.showTitle && !isVideo) {
        const head = el.createDiv({ cls: "mgn-file-head" });
        (0, import_obsidian5.setIcon)(
          head.createSpan({ cls: "mgn-link-ico" }),
          AUDIO_EXTS.includes(ext) ? "music" : "file"
        );
        head.createDiv({ cls: "mgn-link-title", text: f2?.name || it.path || "File" });
      }
      if (!f2) markMissing(el);
      if (f2 && AUDIO_EXTS.includes(ext)) {
        el.createEl("audio", {
          attr: { controls: "true", src: view.app.vault.getResourcePath(f2), style: "width:100%;margin-top:6px;" }
        });
      }
      if (f2 && isVideo) {
        renderVideoPlayer(view, el, view.app.vault.getResourcePath(f2));
      }
      break;
    }
    case "record": {
      const f2 = view.resolveFile(it.path);
      if (!it.path) {
        iconPlaceholder(el, "mic", "Double-click to record");
      } else if (!f2) {
        markMissing(el);
      } else {
        renderRecordPlayer(el, it, view.app.vault.getResourcePath(f2));
      }
      break;
    }
    case "board": {
      const inner = el.createDiv({ cls: "mgn-board-inner" });
      (0, import_obsidian5.setIcon)(inner.createDiv({ cls: "mgn-board-ico" }), "layout-dashboard");
      const txt = inner.createDiv({ cls: "mgn-board-text" });
      txt.createDiv({ cls: "mgn-board-title", text: it.title || it.path || "Board" });
      const summary = txt.createDiv({ cls: "mgn-board-summary" });
      const bf = view.resolveFile(it.path);
      if (!bf) {
        markMissing(el);
      } else {
        void view.app.vault.cachedRead(bf).then((raw) => {
          try {
            const d2 = JSON.parse(raw);
            const items = Array.isArray(d2?.items) ? d2.items : [];
            const boards = items.filter((i2) => i2.type === "board").length;
            const files = items.filter((i2) => i2.type === "file" || i2.type === "image").length;
            const cards = items.length - boards - files;
            const parts = [];
            if (boards) parts.push(`${boards} board${boards > 1 ? "s" : ""}`);
            if (cards) parts.push(`${cards} card${cards > 1 ? "s" : ""}`);
            if (files) parts.push(`${files} file${files > 1 ? "s" : ""}`);
            summary.setText(parts.length ? parts.join(", ") : "Empty board");
            view.drawEdges();
          } catch {
            summary.setText("");
          }
        });
      }
      break;
    }
    case "swatch": {
      const hex = it.swatch ?? "#cccccc";
      el.style.background = hex;
      const lbl = el.createDiv({ cls: "mgn-swatch-label", text: hex.toUpperCase() });
      lbl.style.color = contrastColor(hex);
      const picker = el.createEl("input", {
        type: "color",
        cls: "mgn-swatch-input",
        value: /^#[0-9a-f]{6}$/i.test(hex) ? hex : "#cccccc"
      });
      picker.addEventListener("input", () => {
        it.swatch = picker.value;
        el.style.background = picker.value;
        lbl.setText(picker.value.toUpperCase());
        lbl.style.color = contrastColor(picker.value);
      });
      picker.addEventListener("change", () => {
        view.commit(false);
      });
      lbl.addEventListener("click", (e2) => {
        e2.stopPropagation();
        new TextPromptModal(view.app, "Color (hex)", hex, (v2) => {
          it.swatch = v2.startsWith("#") ? v2 : "#" + v2;
          view.commit();
        }).open();
      });
      break;
    }
    case "column": {
      const head = el.createDiv({ cls: "mgn-col-head" });
      const title = head.createEl("input", {
        type: "text",
        cls: "mgn-col-title",
        value: it.title ?? "",
        attr: { placeholder: "Column" }
      });
      title.addEventListener("input", () => {
        it.title = title.value;
        view.requestSave();
      });
      title.addEventListener("change", () => view.commit(false));
      const children = view.board.items.filter((ch) => ch.parent === it.id).sort((a2, b2) => (a2.order ?? 0) - (b2.order ?? 0));
      head.createDiv({
        cls: "mgn-col-count",
        text: `${children.length} ${children.length === 1 ? "card" : "cards"}`
      });
      const body = el.createDiv({ cls: "mgn-col-body" });
      for (const ch of children) body.appendChild(renderCardFn(view, ch, true));
      if (!children.length) body.createDiv({ cls: "mgn-col-empty" });
      break;
    }
    case "drawing": {
      const svg = el.createSvg("svg", {
        cls: "mgn-drawing-svg",
        attr: { viewBox: `0 0 ${it.w} ${it.h ?? it.w}`, preserveAspectRatio: "none" }
      });
      svg.setCssStyles({ height: `${it.h ?? it.w}px` });
      for (const s2 of it.strokes ?? []) {
        const p2 = svg.createSvg("path");
        p2.setAttribute("d", strokeToPath(s2));
        p2.setAttribute("fill", s2.color);
      }
      break;
    }
    case "sketch": {
      const prev = el.createDiv({ cls: "mgn-sketch-preview" });
      const strokes = it.strokes ?? [];
      if (strokes.length) {
        const bb = strokesBBox(strokes);
        const svg = prev.createSvg("svg", {
          cls: "mgn-drawing-svg",
          attr: {
            viewBox: `${bb.x} ${bb.y} ${bb.w || 1} ${bb.h || 1}`,
            preserveAspectRatio: "xMidYMid meet"
          }
        });
        for (const s2 of strokes) {
          const p2 = svg.createSvg("path");
          p2.setAttribute("d", strokeToPath(s2));
          p2.setAttribute("fill", s2.color);
        }
      } else {
        iconPlaceholder(prev, "pen-tool", "Double-click to draw");
      }
      break;
    }
  }
  if (!inColumn) {
    const conn = el.createDiv({ cls: "mgn-connector", attr: { "aria-label": "Drag to connect" } });
    conn.dataset.for = it.id;
    const rez = el.createDiv({ cls: "mgn-resize" });
    rez.dataset.for = it.id;
  }
  if (it.locked) {
    const lk = el.createDiv({ cls: "mgn-lock-badge" });
    (0, import_obsidian5.setIcon)(lk, "lock");
  }
  return el;
}
function clipToRect(rect, tx, ty) {
  const cx = rect.x + rect.w / 2, cy = rect.y + rect.h / 2;
  const dx = tx - cx, dy = ty - cy;
  if (rect.w === 0 && rect.h === 0) return { x: cx, y: cy };
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const tScaleX = dx !== 0 ? rect.w / 2 / Math.abs(dx) : Infinity;
  const tScaleY = dy !== 0 ? rect.h / 2 / Math.abs(dy) : Infinity;
  const t2 = Math.min(tScaleX, tScaleY);
  return { x: cx + dx * t2, y: cy + dy * t2 };
}
function drawEdgesFn(view) {
  if (!view.svgEl) return;
  view.svgEl.querySelectorAll(".mgn-edge, .mgn-edge-hit, .mgn-edge-handle").forEach((p2) => p2.remove());
  view.labelsEl.empty();
  const rects = view.cardWorldRects();
  const endRect = (id, pt) => {
    if (id) return rects.get(id) ?? null;
    if (pt) return { x: pt.x, y: pt.y, w: 0, h: 0 };
    return null;
  };
  for (const e2 of view.board.edges) {
    const a2 = endRect(e2.from, e2.fromPt);
    const b2 = endRect(e2.to, e2.toPt);
    if (!a2 || !b2) continue;
    const acx = a2.x + a2.w / 2, acy = a2.y + a2.h / 2;
    const bcx = b2.x + b2.w / 2, bcy = b2.y + b2.h / 2;
    const selected = view.selectedEdges.has(e2.id);
    const mode = e2.mode ?? "smart";
    let x1, y1, x2, y2;
    let d2;
    let mx, my;
    if (mode === "free") {
      ({ x: x1, y: y1 } = clipToRect(a2, bcx, bcy));
      ({ x: x2, y: y2 } = clipToRect(b2, acx, acy));
      if (e2.bend) {
        d2 = `M ${x1} ${y1} Q ${e2.bend.x} ${e2.bend.y}, ${x2} ${y2}`;
        mx = 0.25 * x1 + 0.5 * e2.bend.x + 0.25 * x2;
        my = 0.25 * y1 + 0.5 * e2.bend.y + 0.25 * y2;
      } else {
        d2 = `M ${x1} ${y1} L ${x2} ${y2}`;
        mx = (x1 + x2) / 2;
        my = (y1 + y2) / 2;
      }
    } else {
      const dx = bcx - acx, dy = bcy - acy;
      let c1x, c1y, c2x, c2y;
      const bend = Math.max(40, Math.min(160, Math.hypot(dx, dy) / 2.5));
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          x1 = a2.x + a2.w;
          x2 = b2.x;
        } else {
          x1 = a2.x;
          x2 = b2.x + b2.w;
        }
        y1 = acy;
        y2 = bcy;
        c1x = x1 + (dx > 0 ? bend : -bend);
        c1y = y1;
        c2x = x2 - (dx > 0 ? bend : -bend);
        c2y = y2;
      } else {
        if (dy > 0) {
          y1 = a2.y + a2.h;
          y2 = b2.y;
        } else {
          y1 = a2.y;
          y2 = b2.y + b2.h;
        }
        x1 = acx;
        x2 = bcx;
        c1x = x1;
        c1y = y1 + (dy > 0 ? bend : -bend);
        c2x = x2;
        c2y = y2 - (dy > 0 ? bend : -bend);
      }
      d2 = `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
      mx = (x1 + x2) / 2 + (c1x + c2x - x1 - x2) * 0.375;
      my = (y1 + y2) / 2 + (c1y + c2y - y1 - y2) * 0.375;
    }
    const hit = view.svgEl.createSvg("path", {
      cls: "mgn-edge-hit",
      attr: { d: d2, fill: "none" }
    });
    hit.dataset.id = e2.id;
    const p2 = view.svgEl.createSvg("path", {
      cls: selected ? ["mgn-edge", "mgn-edge-selected"] : "mgn-edge",
      attr: { d: d2, fill: "none" }
    });
    const useColor = e2.color && e2.color !== "default" && !selected;
    if (e2.arrow !== false) {
      const marker = useColor ? `mgn-arrowhead-${e2.color}` : selected ? "mgn-arrowhead-selected" : "mgn-arrowhead";
      p2.setAttr("marker-end", `url(#${marker})`);
    }
    if (e2.dashed) p2.setAttr("stroke-dasharray", "6 5");
    if (useColor) {
      const hex = colorOf(e2.color).bg;
      p2.style.stroke = hex;
      p2.style.color = hex;
    }
    p2.dataset.id = e2.id;
    if (e2.label) {
      const lb = view.labelsEl.createDiv({ cls: "mgn-edge-label", text: e2.label });
      lb.style.left = `${mx}px`;
      lb.style.top = `${my}px`;
      lb.dataset.id = e2.id;
    }
    if (selected) {
      for (const [end, hx, hy] of [["from", x1, y1], ["to", x2, y2]]) {
        const h2 = view.svgEl.createSvg("circle", {
          cls: "mgn-edge-handle",
          attr: { cx: hx, cy: hy, r: 6 }
        });
        h2.dataset.id = e2.id;
        h2.dataset.end = end;
      }
      if (mode === "free") {
        const bx = e2.bend?.x ?? mx, by = e2.bend?.y ?? my;
        const h2 = view.svgEl.createSvg("circle", {
          cls: ["mgn-edge-handle", "mgn-edge-bend-handle"],
          attr: { cx: bx, cy: by, r: 5 }
        });
        h2.dataset.id = e2.id;
        h2.dataset.end = "bend";
      }
    }
  }
}

// src/fonts.ts
var import_obsidian6 = require("obsidian");
var loadedFonts = /* @__PURE__ */ new Map();
var registered = [];
function isGoogleFontName(name) {
  const n2 = name.trim();
  return n2.length > 0 && !n2.startsWith("var(") && !n2.includes(",");
}
function parseFaces(css) {
  const faces = [];
  for (const block of css.match(/@font-face\s*\{[^}]*\}/g) ?? []) {
    const url = block.match(/src:[^;]*url\(([^)]+)\)/)?.[1];
    if (!url) continue;
    faces.push({ weight: block.match(/font-weight:\s*([^;]+);/)?.[1].trim() ?? "400", url });
  }
  return faces;
}
function ensureGoogleFont(name, doc) {
  const n2 = name.trim();
  const loaded = loadedFonts.get(doc) ?? /* @__PURE__ */ new Set();
  if (!isGoogleFontName(n2) || loaded.has(n2)) return;
  loaded.add(n2);
  loadedFonts.set(doc, loaded);
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(n2).replace(/%20/g, "+")}:wght@400;600;700&display=swap`;
  void (0, import_obsidian6.requestUrl)({ url }).then(async (res) => {
    for (const f2 of parseFaces(res.text)) {
      const face = new FontFace(n2, `url(${f2.url})`, { weight: f2.weight, display: "swap" });
      await face.load();
      doc.fonts.add(face);
      registered.push({ face, doc });
    }
  }).catch(() => {
    loaded.delete(n2);
  });
}
function removeGoogleFonts() {
  for (const { face, doc } of registered) doc.fonts.delete(face);
  registered.length = 0;
  loadedFonts.clear();
}
function fontFamilyValue(name) {
  const n2 = name.trim();
  if (!n2) return "inherit";
  if (n2.startsWith("var(") || n2.includes(",")) return n2;
  return `"${n2}", sans-serif`;
}

// src/card-toolbar.ts
var import_obsidian7 = require("obsidian");

// src/drawing-toolbar.ts
var DRAW_SWATCHES = [
  "#33343d",
  "#fff5c0",
  "#ffd9b0",
  "#ffc7c2",
  "#e2cbf7",
  "#c4ddff",
  "#bdede0",
  "#d3f2c0",
  "#e4e4e8",
  "#ffffff"
];
function makeDrawToolbar(view, host, session, onSave, onDiscard, inline) {
  let bar;
  const setTool = (t2) => {
    session.tool = t2;
    bar.setActive("pen", t2 === "pen");
    bar.setActive("select", t2 === "select");
    bar.setActive("eraser", t2 === "eraser");
  };
  const groups = [
    [
      { id: "pen", icon: "pen", label: "Pen", onClick: () => setTool("pen") },
      { id: "select", icon: "mouse-pointer-2", label: "Select", onClick: () => setTool("select") },
      { id: "eraser", icon: "eraser", label: "Eraser", onClick: () => setTool("eraser") }
    ],
    [
      { render: (h2) => renderColorControl(view, h2, session) },
      { render: (h2) => renderSizeControl(view, h2, session) }
    ],
    [
      { icon: "undo-2", label: "Undo", onClick: () => session.undo() },
      { icon: "redo-2", label: "Redo", onClick: () => session.redo() }
    ],
    [
      { icon: "x", label: "Discard", onClick: onDiscard },
      { icon: "check", label: "Save", onClick: onSave }
    ]
  ];
  bar = new ContextToolbar(host, view.tbEl, groups, inline);
  setTool("pen");
  return bar;
}
function makePopover(view, anchor) {
  view.contentEl.querySelectorAll(".mgn-ctx-popover").forEach((p2) => p2.remove());
  const pop = view.contentEl.createDiv({ cls: "mgn-ctx-popover" });
  const cr = view.contentEl.getBoundingClientRect();
  const ar = anchor.getBoundingClientRect();
  const left = Math.min(Math.max(8, ar.right - cr.left + 8), cr.width - 220);
  const top = Math.min(Math.max(8, ar.top - cr.top), cr.height - 180);
  pop.style.left = `${left}px`;
  pop.style.top = `${top}px`;
  const close = (e2) => {
    const t2 = e2.target;
    if (anchor.contains(t2) || pop.contains(t2)) return;
    pop.remove();
    anchor.doc.removeEventListener("pointerdown", close, true);
  };
  window.setTimeout(() => anchor.doc.addEventListener("pointerdown", close, true), 0);
  return pop;
}
function renderColorControl(view, h2, session) {
  const btn = h2.createDiv({ cls: "mgn-ctx-tool mgn-ctx-swatchbtn", attr: { "aria-label": "Color" } });
  const dot = btn.createDiv({ cls: "mgn-ctx-colordot" });
  dot.style.background = session.color;
  const pick = (c2, close = true) => {
    session.color = c2;
    session.recolorSelection(c2);
    dot.style.background = c2;
    if (close) view.contentEl.querySelectorAll(".mgn-ctx-popover").forEach((p2) => p2.remove());
  };
  btn.addEventListener("click", () => {
    if (view.contentEl.querySelector(".mgn-ctx-popover")) {
      view.contentEl.querySelectorAll(".mgn-ctx-popover").forEach((p2) => p2.remove());
      return;
    }
    const pop = makePopover(view, btn);
    const grid = pop.createDiv({ cls: "mgn-ctx-colorgrid" });
    for (const hex of DRAW_SWATCHES) {
      const sw = grid.createDiv({ cls: "mgn-ctx-swatch" });
      sw.style.background = hex;
      sw.addEventListener("click", () => pick(hex));
    }
    const custom = pop.createEl("input", {
      type: "color",
      cls: "mgn-ctx-customcolor",
      value: /^#[0-9a-f]{6}$/i.test(session.color) ? session.color : "#000000",
      attr: { "aria-label": "Custom color" }
    });
    custom.addEventListener("input", () => pick(custom.value, false));
  });
}
function renderSizeControl(view, h2, session) {
  const btn = h2.createDiv({ cls: "mgn-ctx-tool mgn-ctx-sizebtn", attr: { "aria-label": "Stroke size" } });
  const dot = btn.createDiv({ cls: "mgn-ctx-sizedot" });
  const sizeDot = (el, s2) => {
    const d2 = Math.max(3, Math.min(18, s2));
    el.style.width = `${d2}px`;
    el.style.height = `${d2}px`;
  };
  sizeDot(dot, session.size);
  btn.addEventListener("click", () => {
    if (view.contentEl.querySelector(".mgn-ctx-popover")) {
      view.contentEl.querySelectorAll(".mgn-ctx-popover").forEach((p2) => p2.remove());
      return;
    }
    const pop = makePopover(view, btn);
    const list = pop.createDiv({ cls: "mgn-ctx-sizelist" });
    for (const s2 of STROKE_SIZES) {
      const row = list.createDiv({ cls: "mgn-ctx-sizerow" });
      sizeDot(row.createDiv({ cls: "mgn-ctx-sizedot" }), s2);
      row.addEventListener("click", () => {
        session.size = s2;
        sizeDot(dot, s2);
        view.contentEl.querySelectorAll(".mgn-ctx-popover").forEach((p2) => p2.remove());
      });
    }
  });
}
function makeSurface(view) {
  const surface = view.viewportEl.createSvg("svg", { cls: "mgn-draw-surface" });
  updateSurfaceViewBox(view, surface);
  return surface;
}
function updateSurfaceViewBox(view, surface) {
  const vr = view.viewportEl.getBoundingClientRect();
  const tl = view.screenToWorld(vr.left, vr.top);
  surface.setAttribute("viewBox", `${tl.x} ${tl.y} ${vr.width / view.zoom} ${vr.height / view.zoom}`);
}
function enterDrawMode(view, editItem) {
  if (view.drawMode) return;
  view.closePreview();
  view.selection.clear();
  view.refreshSelectionClasses();
  view.viewportEl.addClass("mgn-draw-active");
  const scrim = view.viewportEl.createDiv({ cls: "mgn-draw-scrim" });
  const surface = makeSurface(view);
  const session = new DrawSession({
    svg: surface,
    toCoords: (e2) => view.screenToWorld(e2.clientX, e2.clientY)
  });
  session.color = view.defaultStrokeColor();
  if (editItem?.strokes) {
    session.setStrokes(
      editItem.strokes.map((s2) => ({
        color: s2.color,
        size: s2.size,
        points: s2.points.map((p2) => [p2[0] + editItem.x, p2[1] + editItem.y, p2[2] ?? 0.5])
      }))
    );
  }
  const toolbar = makeDrawToolbar(
    view,
    view.viewportEl,
    session,
    () => view.exitDrawMode(true),
    () => view.exitDrawMode(false),
    false
  );
  const keyHandler = (e2) => {
    const m2 = e2.ctrlKey || e2.metaKey;
    if (e2.key === "Escape") {
      e2.preventDefault();
      e2.stopPropagation();
      view.exitDrawMode(false);
    } else if (m2 && e2.key.toLowerCase() === "z" && !e2.shiftKey) {
      e2.preventDefault();
      e2.stopPropagation();
      session.undo();
    } else if (m2 && e2.key.toLowerCase() === "z" && e2.shiftKey || m2 && e2.key.toLowerCase() === "y") {
      e2.preventDefault();
      e2.stopPropagation();
      session.redo();
    }
  };
  view.containerEl.doc.addEventListener("keydown", keyHandler, true);
  view.drawMode = { session, toolbar, scrim, surface, editId: editItem?.id ?? null, keyHandler };
  if (editItem) view.render();
}
function exitDrawMode(view, save) {
  const dm = view.drawMode;
  if (!dm) return;
  view.containerEl.doc.removeEventListener("keydown", dm.keyHandler, true);
  dm.toolbar.close();
  dm.surface.remove();
  dm.scrim.remove();
  view.viewportEl.removeClass("mgn-draw-active");
  view.drawMode = null;
  if (!save) {
    if (dm.editId) view.render();
    return;
  }
  if (dm.editId) view.board.items = view.board.items.filter((i2) => i2.id !== dm.editId);
  const groups = groupStrokes(dm.session.strokes, DRAW_GROUP_DISTANCE);
  const newIds = [];
  for (const g2 of groups) {
    const it = {
      id: newId(),
      type: "drawing",
      x: g2.box.x,
      y: g2.box.y,
      w: g2.box.w,
      h: g2.box.h,
      strokes: g2.strokes
    };
    view.board.items.push(it);
    newIds.push(it.id);
  }
  view.selection = new Set(newIds);
  view.commit();
}
function addSketch(view, x2, y2) {
  view.addItem({ type: "sketch", strokes: [], w: 280, h: 200 }, x2, y2);
}
function openSketchPopup(view, it) {
  view.closePreview();
  view.closeCardToolbar();
  const W = 640, H = 440;
  const ov = view.contentEl.createDiv({ cls: "mgn-preview" });
  const panel = ov.createDiv({ cls: "mgn-preview-panel mgn-sketch-panel" });
  const head = panel.createDiv({ cls: "mgn-preview-head" });
  head.createDiv({ cls: "mgn-preview-crumbs" }).createSpan({ cls: "mgn-crumb-current", text: "Sketch" });
  const body = panel.createDiv({ cls: "mgn-preview-body mgn-sketch-body" });
  const surface = body.createSvg("svg", {
    cls: ["mgn-draw-surface", "mgn-sketch-surface"],
    attr: { viewBox: `0 0 ${W} ${H}` }
  });
  surface.style.width = `${W}px`;
  surface.style.height = `${H}px`;
  const session = new DrawSession({
    svg: surface,
    toCoords: (e2) => {
      const r2 = surface.getBoundingClientRect();
      return { x: (e2.clientX - r2.left) / r2.width * W, y: (e2.clientY - r2.top) / r2.height * H };
    }
  });
  session.color = view.defaultStrokeColor();
  session.setStrokes(it.strokes ?? []);
  let toolbar;
  const finish = (save) => {
    if (save) {
      it.strokes = structuredClone(session.strokes);
      view.commit(false);
      view.rerenderItem(it);
    }
    view.containerEl.doc.removeEventListener("keydown", keyHandler, true);
    toolbar.close();
    ov.remove();
  };
  const keyHandler = (e2) => {
    const m2 = e2.ctrlKey || e2.metaKey;
    if (e2.key === "Escape") {
      e2.preventDefault();
      e2.stopPropagation();
      finish(false);
    } else if (m2 && e2.key.toLowerCase() === "z" && !e2.shiftKey) {
      e2.preventDefault();
      e2.stopPropagation();
      session.undo();
    } else if (m2 && e2.key.toLowerCase() === "z" && e2.shiftKey || m2 && e2.key.toLowerCase() === "y") {
      e2.preventDefault();
      e2.stopPropagation();
      session.redo();
    }
  };
  view.containerEl.doc.addEventListener("keydown", keyHandler, true);
  ov.addEventListener("pointerdown", (e2) => {
    if (e2.target === ov) finish(true);
  });
  toolbar = makeDrawToolbar(view, ov, session, () => finish(true), () => finish(false), false);
}

// src/card-toolbar.ts
var COLOR_EXCLUDED_TYPES = ["swatch", "column"];
function renderCardColorControl(view, h2, it, icon, label, get, apply) {
  const btn = h2.createDiv({ cls: "mgn-ctx-tool", attr: { "aria-label": label } });
  (0, import_obsidian7.setIcon)(btn, icon);
  btn.addEventListener("click", () => {
    if (view.contentEl.querySelector(".mgn-ctx-popover")) {
      view.contentEl.querySelectorAll(".mgn-ctx-popover").forEach((p2) => p2.remove());
      return;
    }
    const pop = makePopover(view, btn);
    const closePopover = () => view.contentEl.querySelectorAll(".mgn-ctx-popover").forEach((p2) => p2.remove());
    const applyToSelection = (key, rerenderOnly = false) => {
      for (const id of view.selection) {
        const t2 = view.item(id);
        if (t2 && !COLOR_EXCLUDED_TYPES.includes(t2.type)) {
          apply(t2, key);
          if (rerenderOnly) view.rerenderItem(t2);
        }
      }
      if (!rerenderOnly) view.commit();
    };
    const grid = pop.createDiv({ cls: "mgn-ctx-colorgrid" });
    for (const c2 of CARD_COLORS) {
      const sw = grid.createDiv({ cls: "mgn-ctx-swatch", attr: { "aria-label": c2.name } });
      sw.style.background = c2.bg;
      sw.addEventListener("click", () => {
        applyToSelection(c2.key === "default" ? void 0 : c2.key);
        closePopover();
      });
    }
    const current = get(it);
    const custom = pop.createEl("input", {
      type: "color",
      cls: "mgn-ctx-customcolor",
      value: current && /^#[0-9a-f]{6}$/i.test(current) ? current : "#000000",
      attr: { "aria-label": "Custom color" }
    });
    custom.addEventListener("input", () => applyToSelection(custom.value, true));
    custom.addEventListener("change", () => view.commit(false));
  });
}
function buildGroups(view, it) {
  const groups = [];
  if (!COLOR_EXCLUDED_TYPES.includes(it.type)) {
    groups.push([
      {
        render: (h2) => renderCardColorControl(view, h2, it, "palette", "Card color", (t2) => t2.color, (t2, key) => {
          t2.color = key;
        })
      },
      {
        render: (h2) => renderCardColorControl(view, h2, it, "flag", "Accent color", (t2) => t2.accentColor, (t2, key) => {
          t2.accentColor = key;
        })
      }
    ]);
  }
  if (TITLE_ELIGIBLE_TYPES.includes(it.type)) {
    groups.push([
      {
        icon: "heading",
        label: it.showTitle ? "Hide title" : "Show title",
        onClick: () => {
          const show = !it.showTitle;
          for (const id of view.selection) {
            const t2 = view.item(id);
            if (t2 && TITLE_ELIGIBLE_TYPES.includes(t2.type)) t2.showTitle = show;
          }
          view.commit();
        }
      }
    ]);
  }
  if (it.type === "file" || it.type === "image" || it.type === "board") {
    groups.push([
      { icon: "link-2", label: "Replace reference...", onClick: () => view.relinkItem(it) }
    ]);
  }
  if (it.type === "record" && it.path) {
    groups.push([
      { icon: "captions", label: "Transcribe text", onClick: () => view.transcribeRecord(it) }
    ]);
  }
  return groups;
}
function renderEdgeColorControl(view, h2, edge) {
  const btn = h2.createDiv({ cls: "mgn-ctx-tool", attr: { "aria-label": "Line color" } });
  (0, import_obsidian7.setIcon)(btn, "palette");
  btn.addEventListener("click", () => {
    if (view.contentEl.querySelector(".mgn-ctx-popover")) {
      view.contentEl.querySelectorAll(".mgn-ctx-popover").forEach((p2) => p2.remove());
      return;
    }
    const pop = makePopover(view, btn);
    const closePopover = () => view.contentEl.querySelectorAll(".mgn-ctx-popover").forEach((p2) => p2.remove());
    const grid = pop.createDiv({ cls: "mgn-ctx-colorgrid" });
    for (const c2 of CARD_COLORS) {
      const sw = grid.createDiv({ cls: "mgn-ctx-swatch", attr: { "aria-label": c2.name } });
      sw.style.background = c2.bg;
      sw.addEventListener("click", () => {
        edge.color = c2.key === "default" ? void 0 : c2.key;
        view.commit();
        closePopover();
      });
    }
    const current = colorOf(edge.color).key;
    const custom = pop.createEl("input", {
      type: "color",
      cls: "mgn-ctx-customcolor",
      value: current && /^#[0-9a-f]{6}$/i.test(current) ? current : "#000000",
      attr: { "aria-label": "Custom color" }
    });
    custom.addEventListener("input", () => {
      edge.color = custom.value;
      view.commit(false);
    });
    custom.addEventListener("change", () => view.commit(false));
  });
}
function buildEdgeGroups(view, edge) {
  return [
    [{ render: (h2) => renderEdgeColorControl(view, h2, edge) }],
    [
      {
        icon: "pencil",
        label: "Edit label",
        onClick: () => {
          new TextPromptModal(view.app, "Arrow label", edge.label ?? "", (v2) => {
            edge.label = v2 || void 0;
            view.commit();
          }).open();
        }
      },
      {
        icon: "move-right",
        label: edge.arrow === false ? "Show arrowhead" : "Remove arrowhead",
        onClick: () => {
          edge.arrow = edge.arrow === false ? true : false;
          view.commit();
          view.syncCardToolbar();
        }
      },
      {
        icon: "minus",
        label: edge.dashed ? "Solid line" : "Dashed line",
        onClick: () => {
          edge.dashed = !edge.dashed;
          view.commit();
          view.syncCardToolbar();
        }
      },
      {
        icon: "arrow-left-right",
        label: "Reverse direction",
        onClick: () => {
          [edge.from, edge.to] = [edge.to, edge.from];
          [edge.fromPt, edge.toPt] = [edge.toPt, edge.fromPt];
          view.commit();
        }
      },
      {
        icon: "route",
        label: (edge.mode ?? "smart") === "free" ? "Switch to Smart routing" : "Switch to Free line",
        onClick: () => {
          const isFree = (edge.mode ?? "smart") === "free";
          edge.mode = isFree ? "smart" : "free";
          if (edge.mode === "smart") edge.bend = void 0;
          view.commit();
          view.syncCardToolbar();
        }
      }
    ],
    [
      {
        icon: "trash",
        label: "Delete arrow",
        onClick: () => {
          view.board.edges = view.board.edges.filter((x2) => x2.id !== edge.id);
          view.selectedEdges.clear();
          view.commit();
        }
      }
    ]
  ];
}
function openCardToolbar(view) {
  closeCardToolbar(view);
  if (view.drawMode) return;
  if (view.selection.size === 1) {
    const it = view.item([...view.selection][0]);
    if (!it) return;
    const groups = buildGroups(view, it);
    if (!groups.length) return;
    view.cardToolbar = new ContextToolbar(view.viewportEl, view.tbEl, groups);
    return;
  }
  if (view.selectedEdges.size === 1) {
    const edge = view.board.edges.find((x2) => x2.id === [...view.selectedEdges][0]);
    if (!edge) return;
    view.cardToolbar = new ContextToolbar(view.viewportEl, view.tbEl, buildEdgeGroups(view, edge));
  }
}
function closeCardToolbar(view) {
  view.cardToolbar?.close();
  view.cardToolbar = null;
}
function syncCardToolbar(view) {
  const single = view.selection.size === 1 || view.selectedEdges.size === 1;
  if (view.drawMode || !single) {
    closeCardToolbar(view);
    return;
  }
  openCardToolbar(view);
}

// src/board-history.ts
function commit(view, rerender = true) {
  view.history = view.history.slice(0, view.histIdx + 1);
  view.history.push(JSON.stringify(view.board));
  if (view.history.length > 100) view.history.shift();
  view.histIdx = view.history.length - 1;
  view.requestSave();
  if (rerender) view.render();
}
function undo(view) {
  if (view.histIdx <= 0) return;
  view.histIdx--;
  view.board = JSON.parse(view.history[view.histIdx]);
  view.selection.clear();
  view.requestSave();
  view.render();
}
function redo(view) {
  if (view.histIdx >= view.history.length - 1) return;
  view.histIdx++;
  view.board = JSON.parse(view.history[view.histIdx]);
  view.selection.clear();
  view.requestSave();
  view.render();
}

// src/board-camera.ts
var import_obsidian8 = require("obsidian");
function applyTransform(view) {
  view.worldEl.style.transform = `translate(${view.panX}px, ${view.panY}px) scale(${view.zoom})`;
  view.zoomLabel?.setText(`${Math.round(view.zoom * 100)}%`);
  const gs = view.plugin.settings.gridSize * view.zoom;
  view.viewportEl.style.backgroundSize = `${gs}px ${gs}px`;
  view.viewportEl.style.backgroundPosition = `${view.panX}px ${view.panY}px`;
}
function screenToWorld(view, clientX, clientY) {
  const r2 = view.viewportEl.getBoundingClientRect();
  return {
    x: (clientX - r2.left - view.panX) / view.zoom,
    y: (clientY - r2.top - view.panY) / view.zoom
  };
}
function viewCenter(view) {
  const r2 = view.viewportEl.getBoundingClientRect();
  return view.screenToWorld(r2.left + r2.width / 2, r2.top + r2.height / 2);
}
function setZoom(view, z, cx, cy) {
  z = Math.min(3, Math.max(0.1, z));
  const r2 = view.viewportEl.getBoundingClientRect();
  const px = cx ?? r2.left + r2.width / 2;
  const py = cy ?? r2.top + r2.height / 2;
  const before = view.screenToWorld(px, py);
  view.zoom = z;
  const afterX = before.x * view.zoom + view.panX + r2.left;
  const afterY = before.y * view.zoom + view.panY + r2.top;
  view.panX += px - afterX;
  view.panY += py - afterY;
  view.applyTransform();
}
function zoomToFit(view, initial = false) {
  const rects = view.cardWorldRects();
  if (!rects.size) {
    if (!initial) new import_obsidian8.Notice("Board is empty");
    return;
  }
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const r2 of rects.values()) {
    minX = Math.min(minX, r2.x);
    minY = Math.min(minY, r2.y);
    maxX = Math.max(maxX, r2.x + r2.w);
    maxY = Math.max(maxY, r2.y + r2.h);
  }
  const vr = view.viewportEl.getBoundingClientRect();
  const pad = 60;
  const zw = (vr.width - pad * 2) / (maxX - minX || 1);
  const zh = (vr.height - pad * 2) / (maxY - minY || 1);
  view.zoom = Math.min(1.25, Math.max(0.1, Math.min(zw, zh)));
  view.panX = (vr.width - (maxX - minX) * view.zoom) / 2 - minX * view.zoom;
  view.panY = (vr.height - (maxY - minY) * view.zoom) / 2 - minY * view.zoom;
  view.applyTransform();
}
function centerOn(view, id) {
  const rects = view.cardWorldRects();
  const r2 = rects.get(id);
  if (!r2) return;
  const vr = view.viewportEl.getBoundingClientRect();
  view.panX = vr.width / 2 - (r2.x + r2.w / 2) * view.zoom;
  view.panY = vr.height / 2 - (r2.y + r2.h / 2) * view.zoom;
  view.applyTransform();
}
function cardWorldRects(view) {
  const map = /* @__PURE__ */ new Map();
  const wr = view.worldEl.getBoundingClientRect();
  view.worldEl.querySelectorAll(".mgn-card").forEach((el) => {
    const id = el.dataset.id;
    if (!id) return;
    const r2 = el.getBoundingClientRect();
    map.set(id, {
      x: (r2.left - wr.left) / view.zoom,
      y: (r2.top - wr.top) / view.zoom,
      w: r2.width / view.zoom,
      h: r2.height / view.zoom
    });
  });
  return map;
}
function onWheel(view, e2) {
  if (view.drawMode) {
    e2.preventDefault();
    return;
  }
  e2.preventDefault();
  if (e2.ctrlKey || e2.metaKey) {
    const factor = e2.deltaY < 0 ? 1.12 : 1 / 1.12;
    view.setZoom(view.zoom * factor, e2.clientX, e2.clientY);
  } else {
    view.panX -= e2.deltaX;
    view.panY -= e2.deltaY;
    view.applyTransform();
  }
}

// src/geometry.ts
function segmentIntersectsRect(x0, y0, x1, y1, xmin, ymin, xmax, ymax) {
  let t0 = 0, t1 = 1;
  const dx = x1 - x0, dy = y1 - y0;
  const p2 = [-dx, dx, -dy, dy];
  const q = [x0 - xmin, xmax - x0, y0 - ymin, ymax - y0];
  for (let i2 = 0; i2 < 4; i2++) {
    if (p2[i2] === 0) {
      if (q[i2] < 0) return false;
    } else {
      const r2 = q[i2] / p2[i2];
      if (p2[i2] < 0) {
        if (r2 > t1) return false;
        if (r2 > t0) t0 = r2;
      } else {
        if (r2 < t0) return false;
        if (r2 < t1) t1 = r2;
      }
    }
  }
  return true;
}

// src/board-context-menu.ts
var import_obsidian9 = require("obsidian");
function onContextMenu(view, e2) {
  if (view.drawMode) {
    e2.preventDefault();
    return;
  }
  const target = e2.target;
  const edgeEl = target.closest(".mgn-edge-hit, .mgn-edge-label");
  if (edgeEl?.dataset.id) {
    e2.preventDefault();
    return;
  }
  const cardEl = target.closest(".mgn-card");
  if (!cardEl?.dataset.id) return;
  e2.preventDefault();
  const it = view.item(cardEl.dataset.id);
  if (!it) return;
  if (!view.selection.has(it.id)) {
    view.selection = /* @__PURE__ */ new Set([it.id]);
    view.refreshSelectionClasses();
  }
  showCardMenu(view, it, e2.clientX, e2.clientY);
}
function showCardMenu(view, it, x2, y2) {
  if (!view.selection.has(it.id)) {
    view.selection = /* @__PURE__ */ new Set([it.id]);
    view.refreshSelectionClasses();
  }
  const menu = new import_obsidian9.Menu();
  menu.addItem((i2) => i2.setTitle(it.locked ? "Unlock" : "Lock on board").setIcon(it.locked ? "unlock" : "lock").onClick(() => {
    it.locked = !it.locked;
    view.commit();
  }));
  menu.addItem((i2) => i2.setTitle("Duplicate (Ctrl+D)").setIcon("copy").onClick(() => view.duplicateSelection()));
  menu.addItem((i2) => i2.setTitle("Bring to front").setIcon("arrow-up").onClick(() => {
    const idx = view.board.items.findIndex((x3) => x3.id === it.id);
    const [moved] = view.board.items.splice(idx, 1);
    view.board.items.push(moved);
    view.commit();
  }));
  menu.addItem((i2) => i2.setTitle("Send to back").setIcon("arrow-down").onClick(() => {
    const idx = view.board.items.findIndex((x3) => x3.id === it.id);
    const [moved] = view.board.items.splice(idx, 1);
    view.board.items.unshift(moved);
    view.commit();
  }));
  menu.addSeparator();
  menu.addItem((i2) => i2.setTitle("Delete").setIcon("trash").onClick(() => view.deleteSelection()));
  menu.showAtPosition({ x: x2, y: y2 });
}

// src/board-interaction.ts
function cancelDrag(view) {
  if (view.longPressTimer !== null) window.clearTimeout(view.longPressTimer);
  view.longPressTimer = null;
  const d2 = view.drag;
  if (d2.kind === "move") {
    window.clearTimeout(d2.settleTimer);
    view.clearColumnHighlight();
    for (const id of d2.ids) {
      const it = view.item(id), origin = d2.orig.get(id);
      if (it && origin) {
        it.x = d2.detached && id === d2.ids[0] ? d2.detached.x : origin.x;
        it.y = d2.detached && id === d2.ids[0] ? d2.detached.y : origin.y;
        if (d2.detached && id === d2.ids[0]) {
          it.parent = d2.detached.parent;
          it.order = d2.detached.order;
        }
      }
      view.worldEl.querySelector(`.mgn-card[data-id="${id}"]`)?.classList.remove("mgn-dragging");
    }
    view.render();
  } else if (d2.kind === "pan") {
    view.panX = d2.panX;
    view.panY = d2.panY;
    view.applyTransform();
  } else if (d2.kind === "resize") {
    const it = view.item(d2.id);
    if (it) {
      it.w = d2.w0;
      it.h = d2.h0;
    }
    view.render();
  } else if (d2.kind === "rubber") {
    d2.el.remove();
    view.selection.clear();
    view.selectedEdges.clear();
    view.refreshSelectionClasses();
    view.drawEdges();
  } else if (d2.kind === "connect") d2.tempPath.remove();
  else if (d2.kind === "line-end") {
    const edge = view.board.edges.find((x2) => x2.id === d2.id);
    if (edge) {
      delete edge.from;
      delete edge.to;
      delete edge.fromPt;
      delete edge.toPt;
      delete edge.bend;
      Object.assign(edge, structuredClone(d2.original));
    }
    view.clearCardHighlight();
    view.drawEdges();
  } else if (d2.kind === "line-move") {
    const edge = view.board.edges.find((x2) => x2.id === d2.id);
    if (edge) {
      edge.fromPt = { ...d2.origFrom };
      edge.toPt = { ...d2.origTo };
    }
    view.drawEdges();
  }
  view.drag = { kind: "none" };
  view.gesturePointerId = null;
  view.lastMoveEvent = null;
}
function setDragTilt(view, ids, deg) {
  for (const id of ids) {
    const el = view.worldEl.querySelector(`.mgn-card[data-id="${id}"]`);
    el?.style.setProperty("--mgn-tilt", `${deg}deg`);
  }
}
function onPointerDown(view, e2) {
  if (view.drawMode) return;
  if (view.drag.kind !== "none" && view.gesturePointerId === null) cancelDrag(view);
  if (e2.pointerType === "touch" || e2.pointerType === "pen") {
    if (e2.pointerType === "touch" && view.activePenPointerId !== null) return;
    if (e2.pointerType === "pen" && view.activePenPointerId !== null && view.activePenPointerId !== e2.pointerId) return;
    if (e2.pointerType === "touch" && view.touchPointers.size >= 2) return;
    if (e2.pointerType === "touch") view.touchPointers.set(e2.pointerId, { x: e2.clientX, y: e2.clientY });
    if (e2.pointerType === "touch" && view.touchPointers.size === 2) {
      cancelDrag(view);
      const [a2, b2] = [...view.touchPointers.values()];
      view.drag = {
        kind: "pinch",
        startDist: Math.hypot(a2.x - b2.x, a2.y - b2.y) || 1,
        startZoom: view.zoom,
        startMidX: (a2.x + b2.x) / 2,
        startMidY: (a2.y + b2.y) / 2,
        startPanX: view.panX,
        startPanY: view.panY
      };
      e2.preventDefault();
      return;
    }
  }
  if (e2.pointerType === "touch") {
    const target2 = e2.target;
    if (!target2.closest(".mgn-context-toolbar, .mgn-ctx-popover")) {
      e2.preventDefault();
      e2.stopPropagation();
    }
    if (view.activePenPointerId !== null) return;
  }
  if (e2.pointerType === "pen") {
    if (view.penReleaseTimer !== null) window.clearTimeout(view.penReleaseTimer);
    view.penReleaseTimer = null;
    view.activePenPointerId = e2.pointerId;
  }
  const target = e2.target;
  if (target.closest(".mgn-context-toolbar, .mgn-ctx-popover")) return;
  const interactive = !!target.closest(
    // Keep only the actual media controls interactive. The player row itself
    // must remain a drag surface so Pencil can move a recorded-note card.
    "input, textarea, audio, iframe, a, button, .mgn-todo-grip, .mgn-record-play, .mgn-record-bar, .mgn-video-bar, [contenteditable=true]"
  );
  if (!interactive) view.viewportEl.focus({ preventScroll: true });
  if (e2.button === 1 || e2.button === 0 && view.spaceDown) {
    view.drag = { kind: "pan", startX: e2.clientX, startY: e2.clientY, panX: view.panX, panY: view.panY, moved: false };
    view.gesturePointerId = e2.pointerId;
    view.viewportEl.setPointerCapture(e2.pointerId);
    e2.preventDefault();
    return;
  }
  if (e2.button !== 0) return;
  if (interactive) return;
  if (e2.pointerType === "touch") {
    view.longPressStartX = e2.clientX;
    view.longPressStartY = e2.clientY;
  }
  if (e2.pointerType === "touch" && !grabsSelection(view, target)) {
    view.drag = { kind: "pan", startX: e2.clientX, startY: e2.clientY, panX: view.panX, panY: view.panY, moved: false, tapTarget: target };
    view.gesturePointerId = e2.pointerId;
    const cardEl2 = target.closest(".mgn-card");
    const card = cardEl2?.dataset.id ? view.item(cardEl2.dataset.id) : void 0;
    if (card) {
      view.longPressTimer = window.setTimeout(() => {
        view.longPressTimer = null;
        if (view.drag.kind === "pan" && view.gesturePointerId === e2.pointerId) {
          view.drag = { kind: "none" };
          view.gesturePointerId = null;
          showCardMenu(view, card, e2.clientX, e2.clientY);
        }
      }, 500);
    }
    view.viewportEl.setPointerCapture(e2.pointerId);
    return;
  }
  view.lastDownOnCanvas = false;
  const connEl = target.closest(".mgn-connector");
  if (connEl?.dataset.for) {
    const tempPath = view.svgEl.createSvg("path", {
      cls: ["mgn-edge", "mgn-edge-temp"],
      attr: { fill: "none" }
    });
    view.drag = { kind: "connect", from: connEl.dataset.for, tempPath };
    view.gesturePointerId = e2.pointerId;
    view.viewportEl.setPointerCapture(e2.pointerId);
    e2.preventDefault();
    return;
  }
  const rezEl = target.closest(".mgn-resize");
  if (rezEl?.dataset.for) {
    const it = view.item(rezEl.dataset.for);
    if (!it || it.locked) return;
    const w2 = view.screenToWorld(e2.clientX, e2.clientY);
    const cardDom = view.worldEl.querySelector(`.mgn-card[data-id="${it.id}"]`);
    const h0 = it.h ?? (cardDom ? cardDom.getBoundingClientRect().height / view.zoom : 60);
    view.drag = { kind: "resize", id: it.id, startWX: w2.x, startWY: w2.y, w0: it.w, h0 };
    view.gesturePointerId = e2.pointerId;
    view.viewportEl.setPointerCapture(e2.pointerId);
    e2.preventDefault();
    return;
  }
  const handleEl = target.closest(".mgn-edge-handle");
  if (handleEl?.dataset.id && handleEl.dataset.end) {
    view.drag = {
      kind: "line-end",
      id: handleEl.dataset.id,
      end: handleEl.dataset.end,
      moved: false,
      original: (() => {
        const edge = view.board.edges.find((x2) => x2.id === handleEl.dataset.id);
        return { from: edge.from, to: edge.to, fromPt: edge.fromPt ? { ...edge.fromPt } : void 0, toPt: edge.toPt ? { ...edge.toPt } : void 0, bend: edge.bend ? { ...edge.bend } : void 0 };
      })()
    };
    view.gesturePointerId = e2.pointerId;
    view.viewportEl.setPointerCapture(e2.pointerId);
    e2.preventDefault();
    return;
  }
  const edgeEl = target.closest(".mgn-edge-hit, .mgn-edge-label");
  if (edgeEl?.dataset.id) {
    e2.preventDefault();
    const id = edgeEl.dataset.id;
    const now = Date.now();
    const isDouble = view.lastClickId === id && now - view.lastClickAt < 450;
    view.lastClickAt = now;
    view.lastClickId = id;
    view.selectedEdges = /* @__PURE__ */ new Set([id]);
    view.selection.clear();
    view.refreshSelectionClasses();
    view.drawEdges();
    if (isDouble) {
      view.lastClickId = null;
      const edge2 = view.board.edges.find((x2) => x2.id === id);
      if (edge2)
        new TextPromptModal(view.app, "Arrow label", edge2.label ?? "", (v2) => {
          edge2.label = v2 || void 0;
          view.commit();
        }).open();
      return;
    }
    const edge = view.board.edges.find((x2) => x2.id === id);
    if (edge && !edge.from && !edge.to && edge.fromPt && edge.toPt) {
      const w2 = view.screenToWorld(e2.clientX, e2.clientY);
      view.drag = {
        kind: "line-move",
        id,
        startWX: w2.x,
        startWY: w2.y,
        origFrom: { ...edge.fromPt },
        origTo: { ...edge.toPt },
        moved: false
      };
      view.gesturePointerId = e2.pointerId;
      view.viewportEl.setPointerCapture(e2.pointerId);
    }
    return;
  }
  const cardEl = target.closest(".mgn-card");
  if (cardEl?.dataset.id) {
    const id = cardEl.dataset.id;
    const it = view.item(id);
    if (!it) return;
    if ((e2.ctrlKey || e2.metaKey) && (it.type === "file" || it.type === "image" || it.type === "board")) {
      const f2 = view.resolveFile(it.path);
      if (f2) void view.app.workspace.getLeaf("tab").openFile(f2);
      else view.relinkItem(it);
      return;
    }
    view.selectedEdges.clear();
    if (e2.shiftKey) {
      if (view.selection.has(id)) view.selection.delete(id);
      else view.selection.add(id);
    } else if (!view.selection.has(id)) {
      view.selection = /* @__PURE__ */ new Set([id]);
    }
    view.refreshSelectionClasses();
    if (it.locked) return;
    const w2 = view.screenToWorld(e2.clientX, e2.clientY);
    const detach = !!it.parent;
    let ids = detach ? [id] : [...view.selection].filter((sid) => !view.item(sid)?.locked && !view.item(sid)?.parent);
    if (e2.altKey && !detach && ids.length) {
      ids = view.cloneInPlace(ids);
      view.selection = new Set(ids);
      view.render();
      view.syncCardToolbar();
    }
    const orig = /* @__PURE__ */ new Map();
    for (const sid of ids) {
      const si = view.item(sid);
      if (si) orig.set(sid, { x: si.x, y: si.y });
    }
    view.drag = { kind: "move", ids, startWX: w2.x, startWY: w2.y, orig, moved: false, detach };
    view.gesturePointerId = e2.pointerId;
    if (e2.pointerType === "touch" || e2.pointerType === "pen") {
      view.longPressTimer = window.setTimeout(() => {
        view.longPressTimer = null;
        if (view.drag.kind === "move" && !view.drag.moved && view.drag.ids[0] === id) {
          view.drag = { kind: "none" };
          showCardMenu(view, it, e2.clientX, e2.clientY);
        }
      }, 500);
    }
    view.viewportEl.setPointerCapture(e2.pointerId);
    e2.preventDefault();
    return;
  }
  view.lastDownOnCanvas = true;
  view.selection.clear();
  view.selectedEdges.clear();
  view.refreshSelectionClasses();
  view.drawEdges();
  const band = view.viewportEl.createDiv({ cls: "mgn-rubber" });
  const vr = view.viewportEl.getBoundingClientRect();
  view.drag = { kind: "rubber", startX: e2.clientX - vr.left, startY: e2.clientY - vr.top, el: band };
  view.gesturePointerId = e2.pointerId;
  view.viewportEl.setPointerCapture(e2.pointerId);
}
function cloneInPlace(view, rootIds) {
  const ids = new Set(rootIds);
  for (const it of view.board.items) {
    if (it.parent && ids.has(it.parent)) ids.add(it.id);
  }
  const idMap = /* @__PURE__ */ new Map();
  const clones = [];
  for (const it of view.board.items) {
    if (!ids.has(it.id)) continue;
    const n2 = structuredClone(it);
    const nid = newId();
    idMap.set(it.id, nid);
    n2.id = nid;
    clones.push(n2);
  }
  for (const n2 of clones) {
    if (n2.parent) n2.parent = idMap.get(n2.parent) ?? void 0;
  }
  for (const e2 of view.board.edges) {
    if (e2.from === void 0 && e2.to === void 0) continue;
    if (e2.from && !idMap.has(e2.from) || e2.to && !idMap.has(e2.to)) continue;
    view.board.edges.push({
      ...structuredClone(e2),
      id: newId(),
      from: e2.from ? idMap.get(e2.from) : void 0,
      to: e2.to ? idMap.get(e2.to) : void 0
    });
  }
  view.board.items.push(...clones);
  return rootIds.map((id) => idMap.get(id)).filter(Boolean);
}
function onPointerMove(view, e2) {
  if (e2.pointerType === "touch") {
    e2.preventDefault();
    e2.stopPropagation();
    if (view.activePenPointerId !== null) return;
    if (view.longPressTimer !== null && Math.hypot(e2.clientX - view.longPressStartX, e2.clientY - view.longPressStartY) > 8) {
      window.clearTimeout(view.longPressTimer);
      view.longPressTimer = null;
    }
  }
  if (view.touchPointers.has(e2.pointerId))
    view.touchPointers.set(e2.pointerId, { x: e2.clientX, y: e2.clientY });
  if (e2.pointerType === "touch" && view.drag.kind === "pan" && view.gesturePointerId === e2.pointerId && view.longPressTimer !== null && Math.hypot(e2.clientX - view.longPressStartX, e2.clientY - view.longPressStartY) > 8) {
    window.clearTimeout(view.longPressTimer);
    view.longPressTimer = null;
  }
  if (view.drag.kind === "pinch") {
    if (e2.pointerType !== "touch") return;
    if (!view.rafPending) {
      view.rafPending = true;
      view.rafId = window.requestAnimationFrame(() => {
        view.rafId = null;
        view.rafPending = false;
        if (!view.closed && view.drag.kind === "pinch") view.processPointerMove(e2);
      });
    }
    return;
  }
  if (view.gesturePointerId !== null && view.gesturePointerId !== e2.pointerId) return;
  if (e2.pointerType === "pen" && view.activePenPointerId !== e2.pointerId) return;
  if (view.drag.kind === "none") return;
  view.lastMoveEvent = e2;
  if (view.rafPending) return;
  view.rafPending = true;
  view.rafId = window.requestAnimationFrame(() => {
    view.rafId = null;
    view.rafPending = false;
    if (!view.closed && view.lastMoveEvent && view.drag.kind !== "none") {
      view.processPointerMove(view.lastMoveEvent);
    }
  });
}
function snapStep(view, e2) {
  const invert = e2.ctrlKey || e2.metaKey;
  const on = view.plugin.settings.gridSnap !== invert;
  return on ? view.plugin.settings.gridSize : 0;
}
function processPointerMove(view, e2) {
  const d2 = view.drag;
  switch (d2.kind) {
    case "pinch": {
      if (e2.pointerType === "pen") return;
      const points = [...view.touchPointers.values()];
      if (points.length < 2) break;
      const [a2, b2] = points;
      const midX = (a2.x + b2.x) / 2, midY = (a2.y + b2.y) / 2;
      const dist = Math.hypot(a2.x - b2.x, a2.y - b2.y) || 1;
      view.zoom = d2.startZoom;
      view.panX = d2.startPanX;
      view.panY = d2.startPanY;
      view.setZoom(d2.startZoom * dist / d2.startDist, d2.startMidX, d2.startMidY);
      view.panX += midX - d2.startMidX;
      view.panY += midY - d2.startMidY;
      view.applyTransform();
      break;
    }
    case "pan": {
      d2.moved || (d2.moved = Math.hypot(e2.clientX - d2.startX, e2.clientY - d2.startY) > 8);
      if (!d2.moved && e2.pointerType === "touch") return;
      view.panX = d2.panX + (e2.clientX - d2.startX);
      view.panY = d2.panY + (e2.clientY - d2.startY);
      view.applyTransform();
      break;
    }
    case "move": {
      const w2 = view.screenToWorld(e2.clientX, e2.clientY);
      let dx = w2.x - d2.startWX;
      let dy = w2.y - d2.startWY;
      const tapSlop = e2.pointerType === "mouse" ? 3 : 12;
      if (!d2.moved && Math.abs(dx) + Math.abs(dy) > tapSlop) {
        if (view.longPressTimer !== null) window.clearTimeout(view.longPressTimer);
        view.longPressTimer = null;
        d2.moved = true;
        for (const id of d2.ids) {
          view.worldEl.querySelector(`.mgn-card[data-id="${id}"]`)?.classList.add("mgn-dragging");
        }
        if (d2.detach) {
          const it = view.item(d2.ids[0]);
          if (it) {
            d2.detached = { parent: it.parent, order: it.order, x: it.x, y: it.y };
            it.parent = void 0;
            it.order = void 0;
            it.x = w2.x - it.w / 2;
            it.y = w2.y - 16;
            d2.startWX = w2.x;
            d2.startWY = w2.y;
            dx = 0;
            dy = 0;
            view.render();
          }
        }
      }
      if (!d2.moved) break;
      const now = performance.now();
      let tilt = 0;
      if (d2.lastX !== void 0 && d2.lastT !== void 0) {
        const vx = (e2.clientX - d2.lastX) / Math.max(1, now - d2.lastT);
        tilt = Math.max(-10, Math.min(10, vx * 6));
      }
      d2.lastX = e2.clientX;
      d2.lastT = now;
      window.clearTimeout(d2.settleTimer);
      d2.settleTimer = window.setTimeout(() => setDragTilt(view, d2.ids, 0), 90);
      setDragTilt(view, d2.ids, tilt);
      const snap = snapStep(view, e2);
      for (const id of d2.ids) {
        const it = view.item(id);
        const o2 = d2.orig.get(id);
        if (!it || !o2) continue;
        it.x = o2.x + dx;
        it.y = o2.y + dy;
        if (snap) {
          it.x = Math.round(it.x / snap) * snap;
          it.y = Math.round(it.y / snap) * snap;
        }
        const el = view.worldEl.querySelector(`.mgn-card[data-id="${id}"]`);
        if (el) {
          el.style.left = `${it.x}px`;
          el.style.top = `${it.y}px`;
        }
      }
      view.highlightColumnUnder(e2, d2.ids);
      if (view.board.edges.length) view.drawEdges();
      break;
    }
    case "rubber": {
      const vr = view.viewportEl.getBoundingClientRect();
      const x2 = e2.clientX - vr.left, y2 = e2.clientY - vr.top;
      const rx = Math.min(x2, d2.startX), ry = Math.min(y2, d2.startY);
      const rw = Math.abs(x2 - d2.startX), rh = Math.abs(y2 - d2.startY);
      Object.assign(d2.el.style, { left: rx + "px", top: ry + "px", width: rw + "px", height: rh + "px" });
      const wp1 = view.screenToWorld(vr.left + rx, vr.top + ry);
      const wp2 = view.screenToWorld(vr.left + rx + rw, vr.top + ry + rh);
      const rects = view.cardWorldRects();
      view.selection.clear();
      for (const it of view.board.items) {
        if (it.parent) continue;
        const r2 = rects.get(it.id);
        if (!r2) continue;
        if (r2.x < wp2.x && r2.x + r2.w > wp1.x && r2.y < wp2.y && r2.y + r2.h > wp1.y)
          view.selection.add(it.id);
      }
      view.selectedEdges.clear();
      const endPoint = (id, pt) => {
        if (pt) return pt;
        const r2 = id ? rects.get(id) : void 0;
        return r2 ? { x: r2.x + r2.w / 2, y: r2.y + r2.h / 2 } : null;
      };
      for (const ed of view.board.edges) {
        const p1 = endPoint(ed.from, ed.fromPt);
        const p2 = endPoint(ed.to, ed.toPt);
        if (p1 && p2 && segmentIntersectsRect(p1.x, p1.y, p2.x, p2.y, wp1.x, wp1.y, wp2.x, wp2.y))
          view.selectedEdges.add(ed.id);
      }
      view.refreshSelectionClasses();
      view.drawEdges();
      break;
    }
    case "resize": {
      const it = view.item(d2.id);
      if (!it) break;
      const w2 = view.screenToWorld(e2.clientX, e2.clientY);
      const snap = snapStep(view, e2);
      it.w = Math.max(120, d2.w0 + (w2.x - d2.startWX));
      it.h = Math.max(48, d2.h0 + (w2.y - d2.startWY));
      if (snap) {
        it.w = Math.max(120, Math.round(it.w / snap) * snap);
        it.h = Math.max(48, Math.round(it.h / snap) * snap);
      }
      const el = view.worldEl.querySelector(`.mgn-card[data-id="${d2.id}"]`);
      if (el) {
        el.style.width = `${it.w}px`;
        el.style.minHeight = `${it.h}px`;
      }
      view.drawEdges();
      break;
    }
    case "connect": {
      const rects = view.cardWorldRects();
      const a2 = rects.get(d2.from);
      if (!a2) break;
      const w2 = view.screenToWorld(e2.clientX, e2.clientY);
      const x1 = a2.x + a2.w / 2, y1 = a2.y + a2.h / 2;
      d2.tempPath.setAttr("d", `M ${x1} ${y1} L ${w2.x} ${w2.y}`);
      d2.tempPath.setAttr("marker-end", "url(#mgn-arrowhead)");
      break;
    }
    case "line-end": {
      const edge = view.board.edges.find((x2) => x2.id === d2.id);
      if (!edge) break;
      d2.moved = true;
      const w2 = view.screenToWorld(e2.clientX, e2.clientY);
      if (d2.end === "bend") {
        edge.bend = { x: w2.x, y: w2.y };
      } else {
        if (d2.end === "from") {
          edge.from = void 0;
          edge.fromPt = { x: w2.x, y: w2.y };
        } else {
          edge.to = void 0;
          edge.toPt = { x: w2.x, y: w2.y };
        }
        view.highlightCardUnder(e2);
      }
      view.drawEdges();
      break;
    }
    case "line-move": {
      const edge = view.board.edges.find((x2) => x2.id === d2.id);
      if (!edge || !edge.fromPt || !edge.toPt) break;
      const w2 = view.screenToWorld(e2.clientX, e2.clientY);
      const dx = w2.x - d2.startWX;
      const dy = w2.y - d2.startWY;
      if (!d2.moved && Math.abs(dx) + Math.abs(dy) > 3) d2.moved = true;
      if (!d2.moved) break;
      const snap = snapStep(view, e2);
      let nx1 = d2.origFrom.x + dx, ny1 = d2.origFrom.y + dy;
      let nx2 = d2.origTo.x + dx, ny2 = d2.origTo.y + dy;
      if (snap) {
        const sx = Math.round(nx1 / snap) * snap - nx1;
        const sy = Math.round(ny1 / snap) * snap - ny1;
        nx1 += sx;
        ny1 += sy;
        nx2 += sx;
        ny2 += sy;
      }
      edge.fromPt = { x: nx1, y: ny1 };
      edge.toPt = { x: nx2, y: ny2 };
      view.drawEdges();
      break;
    }
  }
}
function onPointerUp(view, e2) {
  if (view.longPressTimer !== null) window.clearTimeout(view.longPressTimer);
  view.longPressTimer = null;
  view.touchPointers.delete(e2.pointerId);
  if (view.drag.kind === "pinch") {
    if (view.touchPointers.size < 2) {
      view.drag = { kind: "none" };
      view.gesturePointerId = null;
    }
    return;
  }
  if (view.gesturePointerId !== null && view.gesturePointerId !== e2.pointerId) return;
  if (e2.pointerType === "touch" && view.longPressTimer !== null && view.drag.kind === "pan" && !view.drag.moved) {
    window.clearTimeout(view.longPressTimer);
    view.longPressTimer = null;
  }
  if (e2.pointerType === "touch") {
    e2.preventDefault();
    e2.stopPropagation();
    if (view.activePenPointerId !== null) return;
  }
  if (e2.pointerType === "pen" && view.activePenPointerId === e2.pointerId) {
    if (view.penReleaseTimer !== null) window.clearTimeout(view.penReleaseTimer);
    view.penReleaseTimer = window.setTimeout(() => {
      view.activePenPointerId = null;
      view.penReleaseTimer = null;
    }, 300);
  }
  if (view.drag.kind !== "none") view.processPointerMove(e2);
  const d2 = view.drag;
  view.drag = { kind: "none" };
  view.gesturePointerId = null;
  view.lastMoveEvent = null;
  switch (d2.kind) {
    case "move": {
      view.clearColumnHighlight();
      window.clearTimeout(d2.settleTimer);
      for (const id of d2.ids) {
        const el = view.worldEl.querySelector(`.mgn-card[data-id="${id}"]`);
        el?.classList.remove("mgn-dragging");
        el?.style.removeProperty("--mgn-tilt");
      }
      if (!d2.moved) {
        if (!e2.shiftKey && !e2.ctrlKey && !e2.metaKey && d2.ids.length === 1) {
          const it = view.item(d2.ids[0]);
          if (it) {
            const now = Date.now();
            const closeEnough = Math.hypot(e2.clientX - view.lastClickX, e2.clientY - view.lastClickY) < 24;
            const isDouble = view.lastClickId === it.id && closeEnough && now - view.lastClickAt < 450;
            view.lastClickAt = now;
            view.lastClickId = it.id;
            view.lastClickX = e2.clientX;
            view.lastClickY = e2.clientY;
            if (isDouble) {
              view.lastClickId = null;
              view.openCard(it);
            }
          }
        }
        break;
      }
      if (d2.ids.length === 1) {
        const col = view.columnUnder(e2, d2.ids);
        const it = view.item(d2.ids[0]);
        if (col && it && it.type !== "column" && col.id !== it.id) {
          const siblings = view.board.items.filter((c2) => c2.parent === col.id).sort((a2, b2) => (a2.order ?? 0) - (b2.order ?? 0));
          const rects = view.cardWorldRects();
          const wy = view.screenToWorld(e2.clientX, e2.clientY).y;
          let ord = siblings.length;
          for (let i2 = 0; i2 < siblings.length; i2++) {
            const sr = rects.get(siblings[i2].id);
            if (sr && wy < sr.y + sr.h / 2) {
              ord = i2;
              break;
            }
          }
          it.parent = col.id;
          siblings.splice(ord, 0, it);
          siblings.forEach((s2, i2) => s2.order = i2);
        }
      }
      view.commit();
      break;
    }
    case "rubber": {
      d2.el.remove();
      break;
    }
    case "pan": {
      if (!d2.moved && d2.tapTarget) touchTap(view, d2.tapTarget, e2);
      break;
    }
    case "resize": {
      view.commit();
      break;
    }
    case "connect": {
      d2.tempPath.remove();
      const to = view.cardIdUnder(e2);
      if (to && to !== d2.from) {
        view.board.edges.push({ id: newId(), from: d2.from, to, arrow: true, mode: "free" });
        view.commit();
      } else if (to === d2.from) {
        view.drawEdges();
      } else {
        const w2 = view.screenToWorld(e2.clientX, e2.clientY);
        view.board.edges.push({ id: newId(), from: d2.from, toPt: { x: w2.x, y: w2.y }, arrow: true, mode: "free" });
        view.commit();
      }
      break;
    }
    case "line-end": {
      view.clearCardHighlight();
      if (!d2.moved) {
        view.drawEdges();
        break;
      }
      const edge = view.board.edges.find((x2) => x2.id === d2.id);
      if (edge && d2.end !== "bend") {
        const over = view.cardIdUnder(e2);
        if (over) {
          if (d2.end === "from") {
            edge.from = over;
            edge.fromPt = void 0;
          } else {
            edge.to = over;
            edge.toPt = void 0;
          }
        }
      }
      view.commit();
      break;
    }
    case "line-move": {
      if (d2.moved) view.commit();
      break;
    }
  }
}
function grabsSelection(view, target) {
  if (target.closest(".mgn-edge-handle")) return true;
  const edgeId = target.closest(".mgn-edge-hit, .mgn-edge-label")?.dataset.id;
  if (edgeId) return view.selectedEdges.has(edgeId);
  const cardId = target.closest(".mgn-card")?.dataset.id;
  return !!cardId && view.selection.has(cardId) && !view.item(cardId)?.locked;
}
function touchTap(view, target, e2) {
  const edgeId = target.closest(".mgn-edge-hit, .mgn-edge-label")?.dataset.id;
  const cardId = edgeId ? void 0 : target.closest(".mgn-card")?.dataset.id;
  const tapId = edgeId ?? cardId ?? "canvas";
  const now = Date.now();
  const closeEnough = Math.hypot(e2.clientX - view.lastClickX, e2.clientY - view.lastClickY) < 24;
  const isDouble = view.lastClickId === tapId && closeEnough && now - view.lastClickAt < 450;
  view.lastClickId = isDouble ? null : tapId;
  view.lastClickAt = now;
  view.lastClickX = e2.clientX;
  view.lastClickY = e2.clientY;
  view.selection.clear();
  view.selectedEdges.clear();
  if (edgeId) view.selectedEdges.add(edgeId);
  if (cardId) view.selection.add(cardId);
  view.refreshSelectionClasses();
  view.drawEdges();
  if (!isDouble) return;
  if (edgeId) {
    const edge = view.board.edges.find((x2) => x2.id === edgeId);
    if (edge)
      new TextPromptModal(view.app, "Arrow label", edge.label ?? "", (v2) => {
        edge.label = v2 || void 0;
        view.commit();
      }).open();
  } else if (cardId) {
    const it = view.item(cardId);
    if (it) view.openCard(it);
  } else {
    const w2 = view.screenToWorld(e2.clientX, e2.clientY);
    view.addNote(w2.x, w2.y, true);
  }
}
function onPointerCancel(view, e2) {
  if (view.longPressTimer !== null) window.clearTimeout(view.longPressTimer);
  view.longPressTimer = null;
  view.touchPointers.delete(e2.pointerId);
  if (e2.pointerType === "pen" && view.activePenPointerId === e2.pointerId) {
    view.activePenPointerId = null;
    if (view.penReleaseTimer !== null) window.clearTimeout(view.penReleaseTimer);
    view.penReleaseTimer = null;
  }
  if (view.drag.kind === "pinch") {
    if (view.touchPointers.size < 2) {
      view.drag = { kind: "none" };
      view.gesturePointerId = null;
    }
    return;
  }
  if (view.gesturePointerId !== null && view.gesturePointerId !== e2.pointerId) return;
  view.gesturePointerId = null;
  cancelDrag(view);
}
function cardIdUnder(view, e2) {
  const under = view.containerEl.doc.elementFromPoint(e2.clientX, e2.clientY);
  return under?.closest(".mgn-card")?.dataset.id ?? null;
}
function highlightCardUnder(view, e2) {
  view.clearCardHighlight();
  const id = view.cardIdUnder(e2);
  if (id) view.worldEl.querySelector(`.mgn-card[data-id="${id}"]`)?.addClass("mgn-conn-target");
}
function clearCardHighlight(view) {
  view.worldEl.querySelectorAll(".mgn-conn-target").forEach((el) => el.removeClass("mgn-conn-target"));
}
function columnUnder(view, e2, draggedIds) {
  const dragged = new Set(draggedIds);
  const els = view.containerEl.doc.elementsFromPoint(e2.clientX, e2.clientY);
  for (const el of els) {
    const card = el.closest?.(".mgn-card");
    if (!card?.dataset.id || dragged.has(card.dataset.id)) continue;
    const it = view.item(card.dataset.id);
    if (it?.type === "column") return it;
    if (it?.parent) {
      const parent = view.item(it.parent);
      if (parent?.type === "column") return parent;
    }
  }
  return null;
}
function highlightColumnUnder(view, e2, ids) {
  view.clearColumnHighlight();
  if (ids.length !== 1) return;
  const it = view.item(ids[0]);
  if (!it || it.type === "column") return;
  const col = view.columnUnder(e2, ids);
  if (col) {
    view.worldEl.querySelector(`.mgn-card[data-id="${col.id}"]`)?.addClass("mgn-col-target");
  }
}
function clearColumnHighlight(view) {
  view.worldEl.querySelectorAll(".mgn-col-target").forEach((el) => el.removeClass("mgn-col-target"));
}
function refreshSelectionClasses(view) {
  view.worldEl.querySelectorAll(".mgn-card").forEach((el) => {
    el.toggleClass("mgn-selected", view.selection.has(el.dataset.id ?? ""));
  });
  view.syncCardToolbar();
}

// src/board-item-crud.ts
var import_obsidian10 = require("obsidian");
function placed(view, x2, y2) {
  const c2 = view.viewCenter();
  return { x: x2 ?? c2.x - 120, y: y2 ?? c2.y - 60 };
}
function addItem(view, partial, x2, y2) {
  const p2 = placed(view, x2, y2);
  const it = {
    id: newId(),
    x: p2.x,
    y: p2.y,
    w: view.plugin.settings.defaultNoteWidth,
    ...partial
  };
  view.board.items.push(it);
  view.selection = /* @__PURE__ */ new Set([it.id]);
  view.commit();
  view.syncCardToolbar();
  return it;
}
function addNote(view, x2, y2, edit = false) {
  const it = view.addItem({ type: "note", text: "" }, x2, y2);
  if (edit)
    window.setTimeout(() => {
      const el = view.worldEl.querySelector(`.mgn-card[data-id="${it.id}"]`);
      if (el) view.editNote(it, el);
    }, 30);
}
function addTodo(view, x2, y2) {
  view.addItem({ type: "todo", todos: [] }, x2, y2);
}
function addColumn(view, x2, y2) {
  view.addItem({ type: "column", title: "Column", w: 300 }, x2, y2);
}
function addSwatch(view, x2, y2) {
  view.addItem({ type: "swatch", swatch: "#31303b", w: 160 }, x2, y2);
}
function addComment(view, x2, y2) {
  view.addItem({ type: "comment", text: "", color: "yellow" }, x2, y2);
}
function addRecord(view, x2, y2) {
  view.addItem({ type: "record", w: 220 }, x2, y2);
}
function createFromTool(view, key, x2, y2) {
  switch (key) {
    case "note":
      view.addNote(x2, y2, true);
      break;
    case "todo":
      view.addTodo(x2, y2);
      break;
    case "column":
      view.addColumn(x2, y2);
      break;
    case "swatch":
      view.addSwatch(x2, y2);
      break;
    case "comment":
      view.addComment(x2, y2);
      break;
    case "sketch":
      view.addSketch(x2, y2);
      break;
    case "record":
      view.addRecord(x2, y2);
      break;
    case "line":
      view.addLine(x2, y2);
      break;
    case "link":
      view.promptLink({ x: x2, y: y2 });
      break;
    case "board":
      view.promptBoard({ x: x2, y: y2 });
      break;
    case "image":
      view.pendingPos = { x: x2, y: y2 };
      view.imgInput.click();
      break;
    case "file":
      view.pendingPos = { x: x2, y: y2 };
      new VaultFilePicker(view.app, (f2) => view.addVaultFile(f2)).open();
      break;
  }
}
function addLine(view, x2, y2) {
  const half = 80;
  const edge = {
    id: newId(),
    fromPt: { x: x2 - half, y: y2 },
    toPt: { x: x2 + half, y: y2 },
    arrow: true,
    mode: "free"
  };
  view.board.edges.push(edge);
  view.selection.clear();
  view.selectedEdges = /* @__PURE__ */ new Set([edge.id]);
  view.refreshSelectionClasses();
  view.commit();
}
function promptLink(view, pos) {
  new TextPromptModal(view.app, "Link URL", "https://", async (url) => {
    if (!url || url === "https://") return;
    const it = view.addItem({ type: "link", url, title: url.replace(/^https?:\/\//, "") }, pos?.x, pos?.y);
    try {
      const res = await (0, import_obsidian10.requestUrl)({ url });
      const m2 = res.text.match(/<title[^>]*>([^<]*)<\/title>/i);
      if (m2?.[1]) {
        it.title = m2[1].trim();
        view.commit();
      }
    } catch {
    }
  }).open();
}
function promptBoard(view, pos) {
  new TextPromptModal(view.app, "New board name", "New board", async (name) => {
    if (!name) return;
    const folder = view.file?.parent?.path ?? "";
    const prefix = folder && folder !== "/" ? folder + "/" : "";
    let path = (0, import_obsidian10.normalizePath)(`${prefix}${name}.board`);
    let i2 = 1;
    while (view.app.vault.getAbstractFileByPath(path)) {
      path = (0, import_obsidian10.normalizePath)(`${prefix}${name} ${i2++}.board`);
    }
    await view.app.vault.create(path, JSON.stringify({ version: 1, items: [], edges: [] }, null, 2));
    view.addItem({ type: "board", path, title: name, w: 220 }, pos?.x, pos?.y);
  }).open();
}
function addVaultFile(view, f2) {
  const c2 = view.pendingPos ?? view.viewCenter();
  view.pendingPos = null;
  view.addVaultFileAt(f2, c2.x, c2.y);
}
function addVaultFileAt(view, f2, x2, y2) {
  if (IMAGE_EXTS.includes(f2.extension.toLowerCase())) {
    view.addItem({ type: "image", path: f2.path, w: 280 }, x2 - 140, y2 - 100);
  } else if (f2.extension === "board") {
    view.addItem({ type: "board", path: f2.path, title: f2.basename, w: 220 }, x2, y2);
  } else {
    const video = VIDEO_EXTS.includes(f2.extension.toLowerCase());
    view.addItem({ type: "file", path: f2.path, w: video ? 420 : 260 }, x2, y2);
  }
}

// src/board-clipboard.ts
var import_obsidian11 = require("obsidian");
function copySelection(view, cut) {
  if (!view.selection.size) return;
  const ids = new Set(view.selection);
  for (const it of view.board.items) {
    if (it.parent && ids.has(it.parent)) ids.add(it.id);
  }
  const items = view.board.items.filter((i2) => ids.has(i2.id)).map((i2) => structuredClone(i2));
  const edges = view.board.edges.filter((e2) => !!e2.from && !!e2.to && ids.has(e2.from) && ids.has(e2.to)).map((e2) => structuredClone(e2));
  view.plugin.clipboard = { items, edges };
  if (cut) {
    view.board.items = view.board.items.filter((i2) => !ids.has(i2.id));
    view.board.edges = view.board.edges.filter((e2) => !(e2.from && ids.has(e2.from)) && !(e2.to && ids.has(e2.to)));
    view.selection.clear();
    view.syncCardToolbar();
    view.commit();
  }
  new import_obsidian11.Notice(cut ? "Cut" : "Copied");
}
function pasteInternal(view) {
  const clip = view.plugin.clipboard;
  if (!clip?.items.length) return;
  const idMap = /* @__PURE__ */ new Map();
  const clones = clip.items.map((i2) => {
    const n2 = structuredClone(i2);
    const nid = newId();
    idMap.set(i2.id, nid);
    n2.id = nid;
    return n2;
  });
  for (const n2 of clones) {
    if (n2.parent) n2.parent = idMap.get(n2.parent) ?? void 0;
    if (!n2.parent) {
      n2.x += 30;
      n2.y += 30;
    }
  }
  for (const e2 of clip.edges) {
    const nf = e2.from ? idMap.get(e2.from) : void 0;
    const nt = e2.to ? idMap.get(e2.to) : void 0;
    if (nf && nt) view.board.edges.push({ ...structuredClone(e2), id: newId(), from: nf, to: nt });
  }
  view.board.items.push(...clones);
  view.selection = new Set(clones.filter((c2) => !c2.parent).map((c2) => c2.id));
  view.syncCardToolbar();
  view.commit();
}
function duplicateSelection(view) {
  if (!view.selection.size) return;
  const saved = view.plugin.clipboard;
  view.copySelection(false);
  view.pasteInternal();
  view.plugin.clipboard = saved;
}
function deleteSelection(view) {
  if (!view.selection.size && !view.selectedEdges.size) return;
  const ids = new Set(view.selection);
  for (const it of view.board.items) {
    if (it.parent && ids.has(it.parent)) ids.add(it.id);
  }
  const edgeIds = new Set(view.selectedEdges);
  clearRecordAudio(ids);
  view.board.items = view.board.items.filter((i2) => !ids.has(i2.id));
  view.board.edges = view.board.edges.filter(
    (e2) => !edgeIds.has(e2.id) && !(e2.from && ids.has(e2.from)) && !(e2.to && ids.has(e2.to))
  );
  view.selection.clear();
  view.selectedEdges.clear();
  view.syncCardToolbar();
  view.commit();
}

// src/board-keyboard.ts
function onKeyDown(view, e2) {
  const target = e2.target;
  const editing = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
  if (e2.code === "Space" && !editing) {
    view.spaceDown = true;
    return;
  }
  if (editing) return;
  const kb = view.plugin.settings.keybindings;
  if (view.drawMode) {
    if (e2.key === "Escape") {
      e2.preventDefault();
      view.exitDrawMode(false);
      return;
    }
    if (matchesBinding(e2, kb.undo)) {
      e2.preventDefault();
      view.drawMode.session.undo();
      return;
    }
    if (matchesBinding(e2, kb.redo)) {
      e2.preventDefault();
      view.drawMode.session.redo();
      return;
    }
    return;
  }
  if (matchesBinding(e2, kb.undo)) {
    e2.preventDefault();
    view.undo();
    return;
  }
  if (matchesBinding(e2, kb.redo)) {
    e2.preventDefault();
    view.redo();
    return;
  }
  if (matchesBinding(e2, kb.duplicate)) {
    e2.preventDefault();
    view.duplicateSelection();
    return;
  }
  if (matchesBinding(e2, kb.copy)) {
    e2.preventDefault();
    view.copySelection(false);
    return;
  }
  if (matchesBinding(e2, kb.cut)) {
    e2.preventDefault();
    view.copySelection(true);
    return;
  }
  if (matchesBinding(e2, kb.paste)) {
    view.pasteInternal();
    return;
  }
  if (matchesBinding(e2, kb.selectAll)) {
    e2.preventDefault();
    view.selection = new Set(view.board.items.filter((i2) => !i2.parent).map((i2) => i2.id));
    view.refreshSelectionClasses();
    return;
  }
  if (matchesBinding(e2, kb.search)) {
    e2.preventDefault();
    view.openSearch();
    return;
  }
  if (matchesBinding(e2, kb.drawMode)) {
    view.enterDrawMode();
    return;
  }
  if (matchesBinding(e2, kb.zoomReset)) {
    e2.preventDefault();
    view.setZoom(1);
    return;
  }
  if (matchesBinding(e2, kb.deleteSelection) || e2.key === "Backspace") {
    e2.preventDefault();
    view.deleteSelection();
    return;
  }
  if (e2.key === "Escape") {
    view.closePreview();
    view.selection.clear();
    view.selectedEdges.clear();
    view.contentEl.querySelector(".mgn-toolbar .mgn-tool-active")?.removeClass("mgn-tool-active");
    view.refreshSelectionClasses();
    view.drawEdges();
    view.closeSearch();
    return;
  }
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e2.key) && view.selection.size) {
    e2.preventDefault();
    const step = e2.shiftKey ? 10 : 1;
    const dx = e2.key === "ArrowLeft" ? -step : e2.key === "ArrowRight" ? step : 0;
    const dy = e2.key === "ArrowUp" ? -step : e2.key === "ArrowDown" ? step : 0;
    for (const id of view.selection) {
      const it = view.item(id);
      if (it && !it.locked && !it.parent) {
        it.x += dx;
        it.y += dy;
      }
    }
    view.commit();
    return;
  }
}

// src/board-drop-import.ts
var import_obsidian12 = require("obsidian");
async function onDrop(view, e2) {
  e2.preventDefault();
  const w2 = view.screenToWorld(e2.clientX, e2.clientY);
  const toolKey = e2.dataTransfer?.getData("mgn-tool");
  if (toolKey) {
    view.createFromTool(toolKey, w2.x, w2.y);
    return;
  }
  const dm = view.app.dragManager;
  const draggable = dm?.draggable;
  if (draggable) {
    const files2 = [];
    if (draggable.type === "file" && draggable.file instanceof import_obsidian12.TFile) files2.push(draggable.file);
    if (draggable.type === "files" && Array.isArray(draggable.files)) {
      for (const f2 of draggable.files) if (f2 instanceof import_obsidian12.TFile) files2.push(f2);
    }
    if (files2.length) {
      let off = 0;
      for (const f2 of files2) {
        view.addVaultFileAt(f2, w2.x + off, w2.y + off);
        off += 30;
      }
      return;
    }
  }
  const files = Array.from(e2.dataTransfer?.files ?? []);
  if (files.length) {
    let off = 0;
    for (const f2 of files) {
      await view.importOsFile(f2, w2.x + off, w2.y + off);
      off += 30;
    }
    return;
  }
  const text = e2.dataTransfer?.getData("text/plain");
  if (text) {
    const linked = view.app.metadataCache.getFirstLinkpathDest(
      text.replace(/^\[\[|\]\]$/g, "").trim(),
      view.file?.path ?? ""
    );
    if (linked) {
      view.addVaultFileAt(linked, w2.x, w2.y);
      return;
    }
    if (/^https?:\/\//.test(text.trim())) {
      view.addItem({ type: "link", url: text.trim(), title: text.trim().replace(/^https?:\/\//, "") }, w2.x, w2.y);
    } else {
      view.addItem({ type: "note", text }, w2.x, w2.y);
    }
  }
}
async function onPaste(view, e2) {
  const target = e2.target;
  if (target.closest("input, textarea, [contenteditable=true]")) return;
  const files = Array.from(e2.clipboardData?.files ?? []);
  if (files.length) {
    e2.preventDefault();
    const c2 = view.viewCenter();
    let off = 0;
    for (const f2 of files) {
      await view.importOsFile(f2, c2.x + off, c2.y + off);
      off += 30;
    }
    return;
  }
  const text = e2.clipboardData?.getData("text/plain");
  if (text && !view.plugin.clipboard) {
    e2.preventDefault();
    const c2 = view.viewCenter();
    if (/^https?:\/\/\S+$/.test(text.trim())) {
      view.addItem({ type: "link", url: text.trim(), title: text.trim().replace(/^https?:\/\//, "") }, c2.x, c2.y);
    } else {
      view.addItem({ type: "note", text }, c2.x, c2.y);
    }
  }
}
async function importOsFile(view, f2, x2, y2) {
  if (!f2 || !f2.name) return;
  const buf = await f2.arrayBuffer();
  const base = (0, import_obsidian12.normalizePath)(view.plugin.settings.assetsFolder?.trim() || "Maguilanote Assets");
  if (!view.app.vault.getAbstractFileByPath(base)) {
    await view.app.vault.createFolder(base).catch(() => {
    });
  }
  const safe = f2.name.replace(/[\\/:*?"<>|]/g, "-") || "file";
  let path = (0, import_obsidian12.normalizePath)(`${base}/${safe}`);
  let i2 = 1;
  const dot = safe.lastIndexOf(".");
  const stem = dot > 0 ? safe.slice(0, dot) : safe;
  const ext = dot > 0 ? safe.slice(dot) : "";
  while (view.app.vault.getAbstractFileByPath(path)) {
    path = (0, import_obsidian12.normalizePath)(`${base}/${stem}-${i2++}${ext}`);
  }
  const tf = await view.app.vault.createBinary(path, buf);
  const lower = tf.extension.toLowerCase();
  if (IMAGE_EXTS.includes(lower)) {
    view.addItem({ type: "image", path: tf.path, w: 280 }, x2, y2);
  } else {
    const video = VIDEO_EXTS.includes(lower);
    view.addItem({ type: "file", path: tf.path, w: video ? 420 : 260 }, x2, y2);
  }
}

// src/record-card.ts
var import_obsidian13 = require("obsidian");
var openRecordClosers = /* @__PURE__ */ new Map();
function closeRecordPopups(view) {
  const closers = openRecordClosers.get(view);
  if (!closers) return;
  [...closers].forEach((close) => close());
}
async function saveAssetBinary(view, filename, buf) {
  const base = (0, import_obsidian13.normalizePath)(view.plugin.settings.assetsFolder?.trim() || "Maguilanote Assets");
  if (!view.app.vault.getAbstractFileByPath(base)) {
    await view.app.vault.createFolder(base).catch(() => {
    });
  }
  const safe = filename.replace(/[\\/:*?"<>|]/g, "-") || "recording.webm";
  let path = (0, import_obsidian13.normalizePath)(`${base}/${safe}`);
  let i2 = 1;
  const dot = safe.lastIndexOf(".");
  const stem = dot > 0 ? safe.slice(0, dot) : safe;
  const ext = dot > 0 ? safe.slice(dot) : "";
  while (view.app.vault.getAbstractFileByPath(path)) {
    path = (0, import_obsidian13.normalizePath)(`${base}/${stem}-${i2++}${ext}`);
  }
  return view.app.vault.createBinary(path, buf);
}
function openRecordPopup(view, it) {
  view.closePreview();
  const ov = view.contentEl.createDiv({ cls: "mgn-preview" });
  const panel = ov.createDiv({ cls: "mgn-preview-panel mgn-record-panel" });
  const head = panel.createDiv({ cls: "mgn-preview-head" });
  head.createDiv({ cls: "mgn-preview-crumbs" }).createSpan({ cls: "mgn-crumb-current", text: "Record" });
  const body = panel.createDiv({ cls: "mgn-preview-body mgn-record-body" });
  const micRow = body.createDiv({ cls: "mgn-record-mic-row" });
  micRow.createSpan({ text: "Microphone: " });
  const micSelect = micRow.createEl("select", { cls: "dropdown" });
  const status = body.createDiv({ cls: "mgn-record-status", text: "Ready" });
  const viz = body.createEl("canvas", { cls: "mgn-record-viz", attr: { width: "280", height: "56" } });
  const vizCtx = viz.getContext("2d");
  const timer = body.createDiv({ cls: "mgn-record-timer", text: "00:00" });
  if (it.path) {
    const f2 = view.resolveFile(it.path);
    if (f2) renderRecordPlayer(body, it, view.app.vault.getResourcePath(f2));
  }
  const btnRow = body.createDiv({ cls: "mgn-record-btn-row" });
  const recordBtn = btnRow.createEl("button", { text: it.path ? "Record again" : "Record" });
  const stopBtn = btnRow.createEl("button", { text: "Stop" });
  stopBtn.disabled = true;
  let stream = null;
  let recorder = null;
  let chunks = [];
  let startedAt = 0;
  let timerHandle;
  let newBlob = null;
  let audioCtx = null;
  let analyser = null;
  let vizFrame;
  let saveRecording = false;
  let finished = false;
  let stopping = false;
  const stopTimer = () => {
    if (timerHandle) window.clearInterval(timerHandle);
    timerHandle = void 0;
  };
  const stopStream = () => {
    stream?.getTracks().forEach((t2) => t2.stop());
    stream = null;
  };
  const stopViz = () => {
    if (vizFrame) cancelAnimationFrame(vizFrame);
    vizFrame = void 0;
    void audioCtx?.close();
    audioCtx = null;
    analyser = null;
    vizCtx?.clearRect(0, 0, viz.width, viz.height);
  };
  const drawViz = () => {
    if (!analyser || !vizCtx) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(data);
    vizCtx.clearRect(0, 0, viz.width, viz.height);
    const barCount = 32;
    const step = Math.floor(data.length / barCount);
    const barW = viz.width / barCount;
    const style = getComputedStyle(viz);
    vizCtx.fillStyle = style.color || "#888";
    for (let i2 = 0; i2 < barCount; i2++) {
      let peak = 0;
      for (let j2 = 0; j2 < step; j2++) {
        peak = Math.max(peak, Math.abs(data[i2 * step + j2] - 128) / 128);
      }
      const h2 = Math.max(2, peak * viz.height);
      vizCtx.fillRect(i2 * barW + 1, (viz.height - h2) / 2, barW - 2, h2);
    }
    vizFrame = window.requestAnimationFrame(drawViz);
  };
  const populateMics = async () => {
    micSelect.empty();
    const devices = await navigator.mediaDevices.enumerateDevices();
    const mics = devices.filter((d2) => d2.kind === "audioinput");
    for (const d2 of mics) {
      micSelect.createEl("option", { value: d2.deviceId, text: d2.label || "Microphone" });
    }
    const preferred = view.plugin.settings.defaultMicId;
    if (preferred && mics.some((d2) => d2.deviceId === preferred)) micSelect.value = preferred;
  };
  populateMics().catch(() => {
    status.setText("Could not list microphones");
  });
  const closePopup = () => {
    if (finished) return;
    finished = true;
    pauseRecordAudio(it.id);
    stopTimer();
    stopViz();
    stopStream();
    view.containerEl.doc.removeEventListener("keydown", keyHandler, true);
    view.containerEl.doc.removeEventListener("visibilitychange", visibilityHandler);
    const closers2 = openRecordClosers.get(view);
    closers2?.delete(closeForView);
    if (closers2?.size === 0) openRecordClosers.delete(view);
    ov.remove();
  };
  const cancelRecording = () => {
    if (finished) return;
    saveRecording = false;
    if (recorder && recorder.state !== "inactive" && !stopping) {
      stopping = true;
      recorder.stop();
    } else if (!recorder || recorder.state === "inactive") closePopup();
  };
  const stopAndSaveRecording = () => {
    if (finished) return;
    saveRecording = true;
    stopTimer();
    stopViz();
    stopStream();
    if (recorder && recorder.state !== "inactive" && !stopping) {
      stopping = true;
      recorder.stop();
    } else if (!recorder || recorder.state === "inactive") closePopup();
  };
  const closeForView = () => cancelRecording();
  const visibilityHandler = () => {
    if (view.containerEl.doc.visibilityState === "hidden") cancelRecording();
  };
  const closers = openRecordClosers.get(view) ?? /* @__PURE__ */ new Set();
  closers.add(closeForView);
  openRecordClosers.set(view, closers);
  const keyHandler = (e2) => {
    if (e2.key === "Escape") {
      e2.preventDefault();
      e2.stopPropagation();
      cancelRecording();
    }
  };
  view.containerEl.doc.addEventListener("keydown", keyHandler, true);
  view.containerEl.doc.addEventListener("visibilitychange", visibilityHandler);
  ov.addEventListener("pointerdown", (e2) => {
    if (e2.target === ov) cancelRecording();
  });
  recordBtn.addEventListener("click", () => void (async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: micSelect.value ? { deviceId: { exact: micSelect.value } } : true
      });
    } catch {
      status.setText("Microphone access denied");
      return;
    }
    if (finished || recorder && recorder.state !== "inactive") {
      stopStream();
      return;
    }
    chunks = [];
    if (typeof MediaRecorder === "undefined") {
      stopStream();
      status.setText("Audio recording is not supported on this device");
      return;
    }
    const mimeTypes = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
    const mimeType = mimeTypes.find((type) => MediaRecorder.isTypeSupported(type));
    if (!mimeType) {
      stopStream();
      status.setText("Audio recording is not supported on this device");
      return;
    }
    try {
      recorder = new MediaRecorder(stream, { mimeType });
    } catch {
      stopStream();
      status.setText("Could not start audio recording");
      return;
    }
    const activeRecorder = recorder;
    recorder.ondataavailable = (e2) => {
      if (e2.data.size > 0) chunks.push(e2.data);
    };
    recorder.onstop = async () => {
      recorder = null;
      const actualType = activeRecorder.mimeType || mimeType;
      if (!saveRecording || finished) {
        closePopup();
        return;
      }
      try {
        newBlob = new Blob(chunks, { type: actualType });
        const buf = await newBlob.arrayBuffer();
        const extension = actualType.includes("mp4") ? "m4a" : actualType.includes("ogg") ? "ogg" : "webm";
        const tf = await saveAssetBinary(view, `recording.${extension}`, buf);
        it.path = tf.path;
        it.duration = Math.round((Date.now() - startedAt) / 1e3);
        delete it.h;
        view.commit(false);
        view.rerenderItem(it);
        view.syncCardToolbar();
        status.setText("Saved");
      } catch {
        status.setText("Could not save recording");
      }
      closePopup();
    };
    try {
      recorder.start();
    } catch {
      recorder = null;
      stopStream();
      status.setText("Could not start audio recording");
      return;
    }
    startedAt = Date.now();
    status.setText("Recording\u2026");
    recordBtn.disabled = true;
    stopBtn.disabled = false;
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    audioCtx.createMediaStreamSource(stream).connect(analyser);
    drawViz();
    timerHandle = window.setInterval(() => {
      const s2 = Math.floor((Date.now() - startedAt) / 1e3);
      timer.setText(`${String(Math.floor(s2 / 60)).padStart(2, "0")}:${String(s2 % 60).padStart(2, "0")}`);
    }, 250);
  })());
  stopBtn.addEventListener("click", () => {
    stopAndSaveRecording();
    recordBtn.disabled = true;
    stopBtn.disabled = true;
  });
}
async function transcribeRecord(view, it) {
  const apiKey = await view.plugin.getOpenAiApiKey();
  if (!apiKey) {
    new import_obsidian13.Notice("Set an OpenAI API key in Settings \u2192 Recording first");
    return;
  }
  const f2 = view.resolveFile(it.path);
  if (!f2) {
    new import_obsidian13.Notice("Recording file not found");
    return;
  }
  new import_obsidian13.Notice("Transcribing...");
  let text;
  try {
    const buf = await view.app.vault.readBinary(f2);
    const form = new FormData();
    const mime = /\.m4a$/i.test(f2.name) ? "audio/mp4" : /\.ogg$/i.test(f2.name) ? "audio/ogg" : "audio/webm";
    form.append("file", new Blob([buf], { type: mime }), f2.name);
    form.append("model", "whisper-1");
    const encoded = new Response(form);
    const res = await (0, import_obsidian13.requestUrl)({
      url: "https://api.openai.com/v1/audio/transcriptions",
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      contentType: encoded.headers.get("content-type") ?? void 0,
      body: await encoded.arrayBuffer(),
      throw: false
    });
    if (res.status >= 400) throw new Error(`${res.status} ${res.text}`);
    const data = res.json;
    text = (data.text ?? "").trim();
  } catch (err) {
    new import_obsidian13.Notice(`Transcription failed: ${err instanceof Error ? err.message : err}`);
    return;
  }
  if (!text) {
    new import_obsidian13.Notice("Transcription returned no text");
    return;
  }
  const note = view.addItem({ type: "note", text, w: view.plugin.settings.defaultNoteWidth }, it.x + it.w + 60, it.y);
  view.board.edges.push({ id: newId(), from: it.id, to: note.id, arrow: true, mode: "free" });
  view.commit();
}

// src/file-preview.ts
var import_obsidian14 = require("obsidian");
function relinkItem(view, it) {
  new VaultFilePicker(view.app, (f2) => {
    it.path = f2.path;
    if (it.type === "board") it.title = f2.basename;
    view.commit();
  }).open();
}
async function openPreviewFor(view, it) {
  if (it.type === "board") {
    const bf = view.resolveFile(it.path);
    if (bf) void view.navigateTo(bf);
    else view.relinkItem(it);
    return;
  }
  const f2 = view.resolveFile(it.path);
  if (!f2) {
    view.relinkItem(it);
    return;
  }
  view.closePreview();
  const ov = view.contentEl.createDiv({ cls: "mgn-preview" });
  const panel = ov.createDiv({ cls: "mgn-preview-panel" });
  const head = panel.createDiv({ cls: "mgn-preview-head" });
  const crumb = head.createDiv({ cls: "mgn-preview-crumbs" });
  crumb.createSpan({ cls: "mgn-crumb", text: view.file?.basename ?? "Board" });
  crumb.createSpan({ cls: "mgn-crumb-sep", text: "\u203A" });
  crumb.createSpan({ cls: "mgn-crumb-current", text: f2.name });
  const actions = head.createDiv({ cls: "mgn-preview-actions" });
  const openBtn = actions.createEl("button", { text: "Open in Obsidian" });
  openBtn.addEventListener("click", () => {
    view.closePreview();
    void view.app.workspace.getLeaf("tab").openFile(f2);
  });
  const closeBtn = actions.createEl("button", { cls: "mgn-preview-close", text: "\u2715" });
  closeBtn.addEventListener("click", () => view.closePreview());
  ov.addEventListener("click", (e2) => {
    if (e2.target === ov) view.closePreview();
  });
  const body = panel.createDiv({ cls: "mgn-preview-body markdown-rendered" });
  const ext = f2.extension.toLowerCase();
  if (ext === "md") {
    const text = await view.app.vault.cachedRead(f2);
    await import_obsidian14.MarkdownRenderer.render(view.app, text, body, f2.path, view);
  } else if (IMAGE_EXTS.includes(ext)) {
    body.createEl("img", {
      cls: "mgn-preview-media",
      attr: { src: view.app.vault.getResourcePath(f2) }
    });
  } else if (AUDIO_EXTS.includes(ext)) {
    body.createEl("audio", {
      cls: "mgn-preview-media",
      attr: { controls: "true", src: view.app.vault.getResourcePath(f2) }
    });
  } else if (VIDEO_EXTS.includes(ext)) {
    body.createEl("video", {
      cls: "mgn-preview-media",
      attr: { controls: "true", src: view.app.vault.getResourcePath(f2) }
    });
  } else if (ext === "pdf") {
    body.addClass("mgn-preview-body-pdf");
    await import_obsidian14.MarkdownRenderer.render(view.app, `![[${f2.path}]]`, body, f2.path, view);
  } else {
    body.createDiv({ text: `No preview available for .${ext} files.` });
  }
}
function closePreview(view) {
  view.contentEl.querySelector(".mgn-preview")?.remove();
}

// src/board-search.ts
function openSearch(view) {
  view.searchEl.show();
  view.searchInput.focus();
  view.searchInput.select();
}
function closeSearch(view) {
  view.searchEl.hide();
  view.searchInput.value = "";
  view.runSearch("");
  view.viewportEl.focus();
}
function runSearch(view, q) {
  q = q.toLowerCase().trim();
  view.searchHits = [];
  view.searchIdx = 0;
  view.worldEl.querySelectorAll(".mgn-card").forEach((el) => {
    el.removeClass("mgn-dim", "mgn-hit");
  });
  if (!q) return;
  const matches = (it) => [it.text, it.title, it.url, it.path, it.swatch, ...(it.todos ?? []).map((t2) => t2.text)].filter(Boolean).some((s2) => s2.toLowerCase().includes(q));
  for (const it of view.board.items) {
    if (matches(it)) view.searchHits.push(it.id);
  }
  const hitSet = new Set(view.searchHits);
  view.worldEl.querySelectorAll(".mgn-card").forEach((el) => {
    const id = el.dataset.id ?? "";
    el.toggleClass("mgn-hit", hitSet.has(id));
    el.toggleClass("mgn-dim", !hitSet.has(id));
  });
  if (view.searchHits.length) view.centerOn(view.searchHits[0]);
}

// src/board-view.ts
var VIEW_TYPE_BOARD = "maguilanote-board";
var BoardView = class extends import_obsidian15.TextFileView {
  constructor(leaf, plugin) {
    super(leaf);
    // NEVER name this "data": TextFileView.save() assigns `this.data = getViewData()`
    // (a string), which used to clobber our object and freeze the board.
    this.board = { version: 1, items: [], edges: [] };
    this.panX = 0;
    this.panY = 0;
    this.zoom = 1;
    this.fitTimer = null;
    this.rafId = null;
    this.closed = false;
    this.selection = /* @__PURE__ */ new Set();
    this.selectedEdges = /* @__PURE__ */ new Set();
    this.spaceDown = false;
    this.drag = { kind: "none" };
    /** Pointer IDs currently participating in a touch gesture. */
    this.touchPointers = /* @__PURE__ */ new Map();
    /** Pointer that owns the active single-pointer board gesture. */
    this.gesturePointerId = null;
    this.longPressTimer = null;
    this.longPressStartX = 0;
    this.longPressStartY = 0;
    this.history = [];
    this.histIdx = -1;
    // active board-level draw mode (null when not drawing)
    this.drawMode = null;
    // contextual toolbar for the single selected (non-drawing) card, if any
    this.cardToolbar = null;
    this.searchHits = [];
    this.searchIdx = 0;
    this.crumbs = [];
    this.pendingNav = null;
    this.pendingPos = null;
    // manual double-click detection (pointer capture retargets native dblclick)
    this.lastClickAt = 0;
    this.lastClickId = null;
    this.lastClickX = 0;
    this.lastClickY = 0;
    this.lastDownOnCanvas = false;
    // pointermove throttling (1x per frame)
    this.rafPending = false;
    this.lastMoveEvent = null;
    // Used to reject a palm touch while an Apple Pencil interaction is active.
    this.activePenPointerId = null;
    this.penReleaseTimer = null;
    this.resizeObserver = null;
    this.toolDragCancel = null;
    this.toolDragEndedAt = 0;
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_BOARD;
  }
  getDisplayText() {
    return this.file?.basename ?? "Board";
  }
  getIcon() {
    return "layout-dashboard";
  }
  // ------------------------------------------------------------------ data
  getViewData() {
    return JSON.stringify(this.board, null, 2);
  }
  setViewData(raw, clear) {
    const oldRecordIds = this.board.items.filter((it) => it.type === "record").map((it) => it.id);
    clearRecordAudio(oldRecordIds);
    closeRecordPopups(this);
    if (this.longPressTimer !== null) window.clearTimeout(this.longPressTimer);
    this.longPressTimer = null;
    this.toolDragCancel?.();
    this.toolDragCancel = null;
    cancelTodoDrags(this);
    this.drag = { kind: "none" };
    this.touchPointers.clear();
    this.gesturePointerId = null;
    this.activePenPointerId = null;
    if (this.penReleaseTimer !== null) window.clearTimeout(this.penReleaseTimer);
    this.penReleaseTimer = null;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.rafPending = false;
    this.lastMoveEvent = null;
    this.board = parseBoard(raw);
    if (clear) {
      this.history = [JSON.stringify(this.board)];
      this.histIdx = 0;
      this.selection.clear();
      this.selectedEdges.clear();
      this.closeCardToolbar();
    }
    this.render();
    this.renderCrumbs();
    if (this.fitTimer !== null) window.clearTimeout(this.fitTimer);
    this.fitTimer = window.setTimeout(() => {
      this.fitTimer = null;
      if (!this.closed && this.viewportEl) this.zoomToFit(true);
    }, 50);
  }
  clear() {
    this.board = { version: 1, items: [], edges: [] };
  }
  async onLoadFile(file) {
    if (this.pendingNav !== file.path) this.crumbs = [];
    this.pendingNav = null;
    await super.onLoadFile(file);
  }
  /** open another .board in THIS view, pushing current board onto the trail */
  async navigateTo(f2) {
    if (this.file) this.crumbs.push({ path: this.file.path, name: this.file.basename });
    this.pendingNav = f2.path;
    await this.leaf.openFile(f2);
  }
  renderCrumbs() {
    if (!this.crumbsEl) return;
    this.crumbsEl.empty();
    const parts = [
      ...this.crumbs,
      { path: this.file?.path ?? "", name: this.file?.basename ?? "Board" }
    ];
    parts.forEach((p2, i2) => {
      const last = i2 === parts.length - 1;
      const seg = this.crumbsEl.createSpan({
        cls: "mgn-crumb" + (last ? " mgn-crumb-current" : ""),
        text: p2.name
      });
      if (last) {
        seg.setAttribute("title", "Double-click to rename");
        seg.addEventListener("dblclick", (e2) => {
          e2.preventDefault();
          this.plugin.renameBoard(this);
        });
      }
      if (!last) {
        seg.addEventListener("click", () => {
          const f2 = this.app.vault.getAbstractFileByPath(p2.path);
          if (f2 instanceof import_obsidian15.TFile) {
            this.crumbs = this.crumbs.slice(0, i2);
            this.pendingNav = f2.path;
            void this.leaf.openFile(f2);
          }
        });
        this.crumbsEl.createSpan({ cls: "mgn-crumb-sep", text: "\u203A" });
      }
    });
  }
  /** apply the user's font / theme / color settings to this board's DOM */
  applyAppearance() {
    const s2 = this.plugin.settings;
    ensureGoogleFont(s2.fontFamily, this.containerEl.doc);
    ensureGoogleFont(s2.headingFontFamily, this.containerEl.doc);
    this.contentEl.style.setProperty("--mgn-font-family", fontFamilyValue(s2.fontFamily));
    this.contentEl.style.setProperty(
      "--mgn-font-family-heading",
      s2.headingFontFamily ? fontFamilyValue(s2.headingFontFamily) : "var(--mgn-font-family)"
    );
    this.contentEl.toggleClass("mgn-theme-light", s2.theme === "light");
    const c2 = s2.colors[s2.theme];
    this.contentEl.style.setProperty("--mgn-canvas-bg", c2.canvasBg);
    this.contentEl.style.setProperty("--mgn-card-default-bg", c2.cardDefaultBg);
    for (const key of CUSTOM_CARD_COLOR_KEYS) {
      this.contentEl.style.setProperty(`--mgn-card-color-${key}`, c2[key]);
    }
    this.applyTransform();
  }
  /** Draw/Sketch's default pen color: readable against the opposite end of the
   * theme spectrum (white ink on the dark theme, dark ink on the light theme). */
  defaultStrokeColor() {
    return this.plugin.settings.theme === "dark" ? "#ffffff" : DEFAULT_STROKE_COLOR;
  }
  /** open/close the card contextual toolbar to match the current selection */
  syncCardToolbar() {
    return syncCardToolbar(this);
  }
  /** close the card contextual toolbar unconditionally */
  closeCardToolbar() {
    return closeCardToolbar(this);
  }
  /** re-pick the vault file a card points to (broken/renamed references) */
  relinkItem(it) {
    return relinkItem(this, it);
  }
  /** inline preview overlay (double-click on a vault file card) */
  async openPreviewFor(it) {
    return openPreviewFor(this, it);
  }
  closePreview() {
    return closePreview(this);
  }
  // -------------------------------------------------------------- drawing
  enterDrawMode(editItem) {
    return enterDrawMode(this, editItem);
  }
  exitDrawMode(save) {
    return exitDrawMode(this, save);
  }
  addSketch(x2, y2) {
    return addSketch(this, x2, y2);
  }
  /** popup editor for a sketch card (draw only inside the fixed canvas) */
  openSketchPopup(it) {
    return openSketchPopup(this, it);
  }
  /** re-render a single card in place (safe during other interactions) */
  rerenderItem(it) {
    const old = this.worldEl.querySelector(`.mgn-card[data-id="${it.id}"]`);
    if (!old) {
      this.render();
      return;
    }
    const fresh = renderCardFn(this, it, !!it.parent);
    old.replaceWith(fresh);
    window.requestAnimationFrame(() => this.drawEdges());
  }
  /** push history snapshot, save + rerender */
  commit(rerender = true) {
    return commit(this, rerender);
  }
  undo() {
    return undo(this);
  }
  redo() {
    return redo(this);
  }
  item(id) {
    return this.board.items.find((i2) => i2.id === id);
  }
  // ------------------------------------------------------------------ dom
  async onOpen() {
    this.closed = false;
    const root = this.contentEl;
    root.empty();
    root.addClass("mgn-root");
    const tb = root.createDiv({ cls: "mgn-toolbar" });
    this.tbEl = tb;
    const tool = (icon, label, opts) => {
      const b2 = tb.createDiv({ cls: "mgn-tool", attr: { "aria-label": label } });
      (0, import_obsidian15.setIcon)(b2, icon);
      if (opts.click) {
        b2.addEventListener("click", opts.click);
      } else if (opts.drag) {
        b2.addEventListener("click", () => {
          if (performance.now() - this.toolDragEndedAt < 500) return;
          const c2 = this.viewCenter();
          this.createFromTool(opts.drag, c2.x, c2.y);
        });
      }
      if (opts.drag) {
        b2.draggable = true;
        b2.addEventListener("dragstart", (ev) => {
          ev.dataTransfer?.setData("mgn-tool", opts.drag);
          if (ev.dataTransfer) ev.dataTransfer.effectAllowed = "copy";
        });
        b2.addEventListener("pointerdown", (ev) => {
          if (ev.pointerType === "pen" || ev.pointerType === "touch")
            this.dragToolWithPointer(b2, opts.drag, label, ev);
        });
      }
      return b2;
    };
    tool("sticky-note", "Note", { drag: "note" });
    tool("list-todo", "To-do list", { drag: "todo" });
    tool("spline", "Line", { drag: "line" });
    tool("columns-3", "Column", { drag: "column" });
    tool("layout-dashboard", "Nested board", { drag: "board" });
    tool("palette", "Color swatch", { drag: "swatch" });
    tool("pen-tool", "Sketch card", { drag: "sketch" });
    tool("mic", "Record", { drag: "record" });
    tb.createDiv({ cls: "mgn-tool-sep" });
    tool("image", "Media", { drag: "image" });
    tool("file", "Vault file", { drag: "file" });
    tool("link", "Link", { drag: "link" });
    tool("pencil", "Draw on the board (D)", { click: () => this.enterDrawMode() });
    tb.createDiv({ cls: "mgn-tool-sep" });
    tool("undo-2", "Undo (Ctrl+Z)", { click: () => this.undo() });
    tool("redo-2", "Redo (Ctrl+Shift+Z)", { click: () => this.redo() });
    this.imgInput = tb.createEl("input", {
      type: "file",
      attr: { accept: "image/*,video/*,audio/*,application/pdf", multiple: true, style: "display:none" }
    });
    this.imgInput.addEventListener("change", () => void (async () => {
      const files = Array.from(this.imgInput.files ?? []);
      const base = this.pendingPos ?? this.viewCenter();
      this.pendingPos = null;
      let off = 0;
      for (const f2 of files) {
        await this.importOsFile(f2, base.x + off, base.y + off);
        off += 30;
      }
      this.imgInput.value = "";
    })());
    this.viewportEl = root.createDiv({ cls: "mgn-viewport" });
    this.viewportEl.tabIndex = 0;
    this.worldEl = this.viewportEl.createDiv({ cls: "mgn-world" });
    this.svgEl = this.worldEl.createSvg("svg", { cls: "mgn-edges" });
    const defs = this.svgEl.createSvg("defs");
    const marker = defs.createSvg("marker", {
      attr: {
        id: "mgn-arrowhead",
        viewBox: "0 0 10 10",
        refX: "9",
        refY: "5",
        markerWidth: "7",
        markerHeight: "7",
        orient: "auto-start-reverse"
      }
    });
    marker.createSvg("path", {
      cls: "mgn-arrowhead-path",
      attr: { d: "M 0 0 L 10 5 L 0 10 z" }
    });
    const selMarker = defs.createSvg("marker", {
      attr: {
        id: "mgn-arrowhead-selected",
        viewBox: "0 0 10 10",
        refX: "9",
        refY: "5",
        markerWidth: "7",
        markerHeight: "7",
        orient: "auto-start-reverse"
      }
    });
    selMarker.createSvg("path", {
      cls: "mgn-arrowhead-path",
      attr: { d: "M 0 0 L 10 5 L 0 10 z" }
    }).setCssProps({ "--mgn-marker-fill": "var(--mgn-accent)" });
    for (const c2 of CARD_COLORS) {
      if (c2.key === "default") continue;
      const cm = defs.createSvg("marker", {
        attr: {
          id: `mgn-arrowhead-${c2.key}`,
          viewBox: "0 0 10 10",
          refX: "9",
          refY: "5",
          markerWidth: "7",
          markerHeight: "7",
          orient: "auto-start-reverse"
        }
      });
      const cmPath = cm.createSvg("path", {
        cls: "mgn-arrowhead-path",
        attr: { d: "M 0 0 L 10 5 L 0 10 z" }
      });
      cmPath.setCssProps({ "--mgn-marker-fill": c2.bg });
    }
    this.labelsEl = this.worldEl.createDiv({ cls: "mgn-edge-labels" });
    this.emptyHint = this.viewportEl.createDiv({
      cls: "mgn-empty",
      text: "Double-click to create a note \u2014 or drag a tool from the left toolbar"
    });
    const zb = root.createDiv({ cls: "mgn-zoombar" });
    const zbtn = (icon, label, cb) => {
      const b2 = zb.createDiv({ cls: "mgn-tool", attr: { "aria-label": label } });
      (0, import_obsidian15.setIcon)(b2, icon);
      b2.addEventListener("click", () => void cb());
      return b2;
    };
    zbtn("zoom-out", "Zoom out", () => this.setZoom(this.zoom / 1.2));
    this.zoomLabel = zb.createDiv({ cls: "mgn-zoom-label", text: "100%" });
    zbtn("zoom-in", "Zoom in", () => this.setZoom(this.zoom * 1.2));
    const pct = zb.createDiv({ cls: "mgn-zoom-100", text: "1:1", attr: { "aria-label": "Zoom to 100%" } });
    pct.addEventListener("click", () => this.setZoom(1));
    zbtn("maximize", "Zoom to fit", () => this.zoomToFit());
    zb.createDiv({ cls: "mgn-vsep" });
    this.snapBtn = zbtn("layout-grid", "Snap to grid (hold Ctrl while dragging to invert)", async () => {
      this.plugin.settings.gridSnap = !this.plugin.settings.gridSnap;
      await this.plugin.saveSettings();
      this.snapBtn.toggleClass("mgn-tool-active", this.plugin.settings.gridSnap);
    });
    this.snapBtn.toggleClass("mgn-tool-active", this.plugin.settings.gridSnap);
    zb.createDiv({ cls: "mgn-vsep" });
    zbtn("download", "Export current board as template", () => this.plugin.exportBoardAsTemplate(this));
    zbtn("upload", "Import template (replaces this board)", () => this.plugin.openImportTemplateDialog(this));
    zb.createDiv({ cls: "mgn-vsep" });
    zbtn("settings", "Maguilanote settings", () => new SettingsModal(this.app, this.plugin).open());
    this.searchEl = root.createDiv({ cls: "mgn-search" });
    this.searchInput = this.searchEl.createEl("input", {
      type: "text",
      attr: { placeholder: "Search this board..." }
    });
    const searchCount = this.searchEl.createDiv({ cls: "mgn-search-count" });
    this.searchInput.addEventListener("input", () => {
      this.runSearch(this.searchInput.value);
      searchCount.setText(
        this.searchHits.length ? `${this.searchIdx + 1}/${this.searchHits.length}` : "0"
      );
    });
    this.searchInput.addEventListener("keydown", (e2) => {
      if (e2.key === "Enter" && this.searchHits.length) {
        this.searchIdx = (this.searchIdx + 1) % this.searchHits.length;
        this.centerOn(this.searchHits[this.searchIdx]);
        searchCount.setText(`${this.searchIdx + 1}/${this.searchHits.length}`);
      } else if (e2.key === "Escape") {
        this.closeSearch();
      }
    });
    this.searchEl.hide();
    this.crumbsEl = root.createDiv({ cls: "mgn-crumbs" });
    this.renderCrumbs();
    this.applyAppearance();
    this.registerDomEvent(this.viewportEl, "touchstart", (e2) => {
      const target = e2.target;
      if (target.closest(".mgn-context-toolbar, .mgn-ctx-popover, audio, video, button, input, select, textarea")) return;
      e2.preventDefault();
      e2.stopPropagation();
    }, { passive: false, capture: true });
    for (const type of ["touchstart", "touchmove"])
      this.registerDomEvent(root, type, (e2) => e2.stopPropagation());
    this.registerDomEvent(this.viewportEl, "pointerdown", (e2) => this.onPointerDown(e2));
    this.registerDomEvent(this.viewportEl, "pointermove", (e2) => this.onPointerMove(e2));
    this.registerDomEvent(this.viewportEl, "pointerup", (e2) => this.onPointerUp(e2));
    this.registerDomEvent(this.viewportEl, "pointercancel", (e2) => this.onPointerCancel(e2));
    this.registerDomEvent(this.viewportEl, "lostpointercapture", (e2) => this.onPointerCancel(e2));
    this.registerDomEvent(this.viewportEl, "pointerdown", (e2) => this.onPencilTap(e2));
    this.registerDomEvent(this.viewportEl, "dblclick", (e2) => this.onDblClick(e2));
    this.registerDomEvent(this.viewportEl, "wheel", (e2) => this.onWheel(e2), { passive: false });
    this.registerDomEvent(this.viewportEl, "contextmenu", (e2) => this.onContextMenu(e2));
    this.registerDomEvent(this.viewportEl, "keydown", (e2) => this.onKeyDown(e2));
    this.registerDomEvent(this.viewportEl, "keyup", (e2) => {
      if (e2.code === "Space") this.spaceDown = false;
    });
    this.registerDomEvent(this.viewportEl, "dragover", (e2) => e2.preventDefault());
    this.registerDomEvent(this.viewportEl, "drop", (e2) => this.onDrop(e2));
    this.registerDomEvent(this.viewportEl, "paste", (e2) => this.onPaste(e2));
    this.applyTransform();
    this.resizeObserver = new ResizeObserver(() => {
      tb.toggleClass("mgn-toolbar-scrolls", tb.scrollHeight > tb.clientHeight);
      this.applyTransform();
      this.drawEdges();
      if (this.drawMode) updateSurfaceViewBox(this, this.drawMode.surface);
    });
    this.resizeObserver.observe(this.viewportEl);
  }
  async onClose() {
    this.closed = true;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (this.fitTimer !== null) window.clearTimeout(this.fitTimer);
    this.fitTimer = null;
    if (this.drawMode) this.exitDrawMode(false);
    closeRecordPopups(this);
    this.closePreview();
    this.toolDragCancel?.();
    this.toolDragCancel = null;
    cancelTodoDrags(this);
    this.drag = { kind: "none" };
    if (this.longPressTimer !== null) window.clearTimeout(this.longPressTimer);
    this.longPressTimer = null;
    this.touchPointers.clear();
    this.gesturePointerId = null;
    if (this.penReleaseTimer !== null) window.clearTimeout(this.penReleaseTimer);
    this.penReleaseTimer = null;
    this.activePenPointerId = null;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.rafPending = false;
    this.lastMoveEvent = null;
    clearRecordAudio(this.board.items.filter((it) => it.type === "record").map((it) => it.id));
    this.containerEl.doc.body.removeClass("mgn-todo-grabbing");
    this.contentEl.empty();
  }
  /** Drag a toolbar tool with Apple Pencil (native HTML DnD is not reliable on iPadOS). */
  dragToolWithPointer(btn, key, label, start) {
    start.preventDefault();
    const pointerId = start.pointerId;
    const sx = start.clientX, sy = start.clientY;
    let moved = false;
    let ghost = null;
    const stop = () => {
      if (this.toolDragCancel === cancel) this.toolDragCancel = null;
      window.removeEventListener("pointermove", move, true);
      window.removeEventListener("pointerup", up, true);
      window.removeEventListener("pointercancel", cancel, true);
      window.removeEventListener("lostpointercapture", cancel, true);
      btn.removeClass("mgn-tool-dragging");
      ghost?.remove();
    };
    const move = (ev) => {
      if (ev.pointerId !== pointerId) return;
      ev.preventDefault();
      if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
        moved = true;
        btn.addClass("mgn-tool-dragging");
        ghost = btn.doc.body.createDiv({ cls: "mgn-tool-drag-ghost" });
        const icon = btn.querySelector("svg");
        if (icon) ghost.appendChild(icon.cloneNode(true));
        ghost.createSpan({ text: label });
      }
      if (ghost) {
        ghost.style.left = `${ev.clientX + 14}px`;
        ghost.style.top = `${ev.clientY + 14}px`;
      }
    };
    const up = (ev) => {
      if (ev.pointerId !== pointerId) return;
      ev.preventDefault();
      if (moved) this.toolDragEndedAt = performance.now();
      if (moved && this.viewportEl.contains(this.viewportEl.doc.elementFromPoint(ev.clientX, ev.clientY))) {
        const w2 = this.screenToWorld(ev.clientX, ev.clientY);
        this.createFromTool(key, w2.x, w2.y);
      }
      stop();
    };
    const cancel = (ev) => {
      if (ev.pointerId === pointerId) {
        ev.preventDefault();
        stop();
      }
    };
    this.toolDragCancel = () => cancel(start);
    window.addEventListener("pointermove", move, true);
    window.addEventListener("pointerup", up, true);
    window.addEventListener("pointercancel", cancel, true);
    window.addEventListener("lostpointercapture", cancel, true);
  }
  // ------------------------------------------------------------- transforms
  applyTransform() {
    return applyTransform(this);
  }
  screenToWorld(clientX, clientY) {
    return screenToWorld(this, clientX, clientY);
  }
  viewCenter() {
    return viewCenter(this);
  }
  setZoom(z, cx, cy) {
    return setZoom(this, z, cx, cy);
  }
  zoomToFit(initial = false) {
    return zoomToFit(this, initial);
  }
  centerOn(id) {
    return centerOn(this, id);
  }
  /** world-space rects of every rendered card (incl. column children) */
  cardWorldRects() {
    return cardWorldRects(this);
  }
  // ------------------------------------------------------------------ render
  render() {
    if (!this.worldEl) return;
    this.worldEl.querySelectorAll(".mgn-card").forEach((el) => el.remove());
    this.emptyHint?.toggle(this.board.items.length === 0);
    const roots = this.board.items.filter((i2) => !i2.parent && i2.id !== this.drawMode?.editId);
    for (const it of roots) {
      this.worldEl.appendChild(renderCardFn(this, it));
    }
    window.requestAnimationFrame(() => this.drawEdges());
  }
  drawEdges() {
    drawEdgesFn(this);
  }
  resolveFile(path) {
    if (!path) return null;
    const f2 = this.app.vault.getAbstractFileByPath(path);
    if (f2 instanceof import_obsidian15.TFile) return f2;
    return this.app.metadataCache.getFirstLinkpathDest(path, this.file?.path ?? "");
  }
  // ------------------------------------------------------------ interaction
  onPointerDown(e2) {
    return onPointerDown(this, e2);
  }
  /** clone items (incl. column children + internal edges) at the same position */
  cloneInPlace(rootIds) {
    return cloneInPlace(this, rootIds);
  }
  onPointerMove(e2) {
    return onPointerMove(this, e2);
  }
  processPointerMove(e2) {
    return processPointerMove(this, e2);
  }
  onPointerUp(e2) {
    return onPointerUp(this, e2);
  }
  onPointerCancel(e2) {
    return onPointerCancel(this, e2);
  }
  /** id of the topmost card under the pointer, or null over empty canvas */
  cardIdUnder(e2) {
    return cardIdUnder(this, e2);
  }
  highlightCardUnder(e2) {
    return highlightCardUnder(this, e2);
  }
  clearCardHighlight() {
    return clearCardHighlight(this);
  }
  columnUnder(e2, draggedIds) {
    return columnUnder(this, e2, draggedIds);
  }
  highlightColumnUnder(e2, ids) {
    return highlightColumnUnder(this, e2, ids);
  }
  clearColumnHighlight() {
    return clearColumnHighlight(this);
  }
  refreshSelectionClasses() {
    return refreshSelectionClasses(this);
  }
  onWheel(e2) {
    return onWheel(this, e2);
  }
  onPencilTap(e2) {
    if (e2.pointerType !== "pen" || e2.button !== 0 || this.drawMode) return;
    const target = e2.target;
    if (target.closest("input, textarea, audio, iframe, .mgn-connector, .mgn-resize, .mgn-video-bar")) return;
    const cardEl = target.closest(".mgn-card");
    if (!cardEl?.dataset.id) return;
    const it = this.item(cardEl.dataset.id);
    if (!it || it.type !== "sketch" && it.type !== "swatch") return;
    const now = Date.now();
    const closeEnough = Math.hypot(e2.clientX - this.lastClickX, e2.clientY - this.lastClickY) < 24;
    if (this.lastClickId === it.id && closeEnough && now - this.lastClickAt < 450) {
      this.lastClickId = null;
      if (it.type === "sketch") this.openSketchPopup(it);
      else new ColorPromptModal(this.app, it.swatch ?? "#cccccc", (hex) => {
        it.swatch = hex;
        this.commit();
      }).open();
    }
    this.lastClickId = it.id;
    this.lastClickAt = now;
    this.lastClickX = e2.clientX;
    this.lastClickY = e2.clientY;
  }
  onDblClick(e2) {
    if (this.drawMode) return;
    const target = e2.target;
    if (target.closest("input, textarea, audio, iframe, .mgn-connector, .mgn-resize, .mgn-video-bar")) return;
    const edgeEl = target.closest(".mgn-edge-hit, .mgn-edge-label");
    if (edgeEl?.dataset.id) {
      const edge = this.board.edges.find((x2) => x2.id === edgeEl.dataset.id);
      if (edge)
        new TextPromptModal(this.app, "Arrow label", edge.label ?? "", (v2) => {
          edge.label = v2 || void 0;
          this.commit();
        }).open();
      return;
    }
    const cardEl = target.closest(".mgn-card");
    if (cardEl?.dataset.id) {
      const it = this.item(cardEl.dataset.id);
      if (it) this.openCard(it);
      return;
    }
    if (!this.lastDownOnCanvas) return;
    const w2 = this.screenToWorld(e2.clientX, e2.clientY);
    this.addNote(w2.x, w2.y, true);
  }
  /** double-click action for a card */
  openCard(it) {
    switch (it.type) {
      case "note":
      case "comment": {
        const el = this.worldEl.querySelector(`.mgn-card[data-id="${it.id}"]`);
        if (el) this.editNote(it, el);
        return;
      }
      case "board": {
        const f2 = this.resolveFile(it.path);
        if (f2) void this.navigateTo(f2);
        else this.relinkItem(it);
        return;
      }
      case "image":
      case "file":
        void this.openPreviewFor(it);
        return;
      case "link":
        if (it.url) window.open(it.url, "_blank");
        return;
      case "drawing":
        this.enterDrawMode(it);
        return;
      case "sketch":
        this.openSketchPopup(it);
        return;
      case "record":
        this.openRecordPopup(it);
        return;
      case "swatch":
        new ColorPromptModal(this.app, it.swatch ?? "#cccccc", (hex) => {
          it.swatch = hex;
          this.commit();
        }).open();
        return;
      case "todo":
      case "column":
        return;
    }
  }
  editNote(it, cardEl) {
    if (it.locked) return;
    const body = cardEl.querySelector(".mgn-note-body");
    if (!body) return;
    body.empty();
    body.addClass("mgn-note-body-editing");
    const ta = body.createEl("textarea", {
      cls: "mgn-note-edit",
      attr: { placeholder: "Start typing...", rows: "1" }
    });
    ta.value = it.text ?? "";
    const fit = () => {
      ta.setCssStyles({ height: "auto" });
      ta.setCssStyles({ height: `${ta.scrollHeight}px` });
      this.drawEdges();
    };
    ta.addEventListener("input", fit);
    ta.addEventListener("keydown", (e2) => {
      e2.stopPropagation();
      if (e2.key === "Escape" || e2.key === "Enter" && (e2.ctrlKey || e2.metaKey)) {
        ta.blur();
      }
    });
    ta.addEventListener("blur", () => {
      it.text = ta.value;
      this.commit(false);
      this.rerenderItem(it);
    });
    window.setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(ta.value.length, ta.value.length);
      fit();
    }, 10);
  }
  onContextMenu(e2) {
    return onContextMenu(this, e2);
  }
  onKeyDown(e2) {
    return onKeyDown(this, e2);
  }
  // ------------------------------------------------------------- add items
  addItem(partial, x2, y2) {
    return addItem(this, partial, x2, y2);
  }
  addNote(x2, y2, edit = false) {
    return addNote(this, x2, y2, edit);
  }
  addTodo(x2, y2) {
    return addTodo(this, x2, y2);
  }
  addColumn(x2, y2) {
    return addColumn(this, x2, y2);
  }
  addSwatch(x2, y2) {
    return addSwatch(this, x2, y2);
  }
  addComment(x2, y2) {
    return addComment(this, x2, y2);
  }
  addRecord(x2, y2) {
    return addRecord(this, x2, y2);
  }
  createFromTool(key, x2, y2) {
    return createFromTool(this, key, x2, y2);
  }
  /** drop a standalone line centered on (x, y); both ends free, selected */
  addLine(x2, y2) {
    return addLine(this, x2, y2);
  }
  promptLink(pos) {
    return promptLink(this, pos);
  }
  promptBoard(pos) {
    return promptBoard(this, pos);
  }
  addVaultFile(f2) {
    return addVaultFile(this, f2);
  }
  addVaultFileAt(f2, x2, y2) {
    return addVaultFileAt(this, f2, x2, y2);
  }
  // ------------------------------------------------------ clipboard & dupes
  copySelection(cut) {
    return copySelection(this, cut);
  }
  pasteInternal() {
    return pasteInternal(this);
  }
  duplicateSelection() {
    return duplicateSelection(this);
  }
  deleteSelection() {
    return deleteSelection(this);
  }
  // --------------------------------------------------------- import / drop
  async onDrop(e2) {
    return onDrop(this, e2);
  }
  async onPaste(e2) {
    return onPaste(this, e2);
  }
  async importOsFile(f2, x2, y2) {
    return importOsFile(this, f2, x2, y2);
  }
  /** popup recorder for a record card: pick mic, record, save as vault audio file */
  openRecordPopup(it) {
    return openRecordPopup(this, it);
  }
  /** transcribe a record card's audio via the OpenAI Whisper API, dropping the
   * result into a new note card connected back to the recording */
  async transcribeRecord(it) {
    return transcribeRecord(this, it);
  }
  // ---------------------------------------------------------------- search
  openSearch() {
    return openSearch(this);
  }
  closeSearch() {
    return closeSearch(this);
  }
  runSearch(q) {
    return runSearch(this, q);
  }
};

// src/template-bundle.ts
var import_obsidian16 = require("obsidian");
var ASSET_ITEM_TYPES = /* @__PURE__ */ new Set(["image", "file", "record"]);
function arrayBufferToBase64(buf) {
  const bytes = new Uint8Array(buf);
  const chunk = 32768;
  let binary = "";
  for (let i2 = 0; i2 < bytes.length; i2 += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i2, i2 + chunk));
  }
  return btoa(binary);
}
function base64ToArrayBuffer(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i2 = 0; i2 < binary.length; i2++) bytes[i2] = binary.charCodeAt(i2);
  return bytes.buffer;
}
async function collectBundle(app, rootFile) {
  const boards = {};
  const assets = {};
  const visitBoard = async (file) => {
    if (boards[file.path] !== void 0) return;
    const raw = await app.vault.read(file);
    boards[file.path] = raw;
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return;
    }
    for (const it of data.items ?? []) {
      if (!it.path) continue;
      const f2 = app.vault.getAbstractFileByPath(it.path);
      if (!(f2 instanceof import_obsidian16.TFile)) continue;
      if (it.type === "board") {
        await visitBoard(f2);
      } else if (ASSET_ITEM_TYPES.has(it.type) && assets[it.path] === void 0) {
        assets[it.path] = arrayBufferToBase64(await app.vault.readBinary(f2));
      }
    }
  };
  await visitBoard(rootFile);
  return { format: "maguilanote-template", version: 1, root: rootFile.path, boards, assets };
}
function dedupedTarget(app, taken, folder, filename) {
  const dot = filename.lastIndexOf(".");
  const stem = dot > 0 ? filename.slice(0, dot) : filename;
  const ext = dot > 0 ? filename.slice(dot) : "";
  let target = (0, import_obsidian16.normalizePath)(folder ? `${folder}/${filename}` : filename);
  let i2 = 1;
  while (app.vault.getAbstractFileByPath(target) || taken.has(target)) {
    target = (0, import_obsidian16.normalizePath)(folder ? `${folder}/${stem} ${i2++}${ext}` : `${stem} ${i2++}${ext}`);
  }
  taken.add(target);
  return target;
}
async function unbundleTemplate(app, bundle, destFolder) {
  const folder = (0, import_obsidian16.normalizePath)(destFolder);
  if (folder && !app.vault.getAbstractFileByPath(folder)) {
    await app.vault.createFolder(folder).catch(() => {
    });
  }
  const remap = /* @__PURE__ */ new Map();
  const taken = /* @__PURE__ */ new Set();
  const assetPaths = Object.keys(bundle.assets);
  const assetsFolder = (0, import_obsidian16.normalizePath)(folder ? `${folder}/assets` : "assets");
  if (assetPaths.length && !app.vault.getAbstractFileByPath(assetsFolder)) {
    await app.vault.createFolder(assetsFolder).catch(() => {
    });
  }
  for (const orig of assetPaths) {
    const name = orig.split("/").pop() || "asset";
    remap.set(orig, dedupedTarget(app, taken, assetsFolder, name));
  }
  let rootTarget = "";
  for (const orig of Object.keys(bundle.boards)) {
    const name = orig.split("/").pop() || "board";
    const filename = name.toLowerCase().endsWith(".board") ? name : `${name}.board`;
    const target = dedupedTarget(app, taken, folder, filename);
    remap.set(orig, target);
    if (orig === bundle.root) rootTarget = target;
  }
  for (const [orig, b64] of Object.entries(bundle.assets)) {
    await app.vault.createBinary(remap.get(orig), base64ToArrayBuffer(b64));
  }
  for (const [orig, raw] of Object.entries(bundle.boards)) {
    let data = null;
    try {
      data = JSON.parse(raw);
    } catch {
    }
    if (data) {
      for (const it of data.items) {
        if (it.path && remap.has(it.path)) it.path = remap.get(it.path);
      }
    }
    await app.vault.create(remap.get(orig), data ? JSON.stringify(data, null, 2) : raw);
  }
  const rootFile = app.vault.getAbstractFileByPath(rootTarget);
  if (!(rootFile instanceof import_obsidian16.TFile)) throw new Error("Template import failed: root board missing");
  return rootFile;
}

// src/main.ts
var DEFAULT_SETTINGS = {
  gridSnap: false,
  gridSize: 24,
  defaultNoteWidth: 260,
  templatesFolder: "Maguilanote Templates",
  assetsFolder: "Maguilanote Assets",
  fontFamily: "",
  headingFontFamily: "",
  theme: "dark",
  keybindings: { ...DEFAULT_KEYBINDINGS },
  colors: { light: { ...DEFAULT_THEME_COLORS.light }, dark: { ...DEFAULT_THEME_COLORS.dark } },
  defaultMicId: "",
  openaiApiKey: ""
};
var isFiniteNumber = (v2) => typeof v2 === "number" && Number.isFinite(v2);
var MaguilanotePlugin = class extends import_obsidian17.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    /** internal clipboard shared across boards */
    this.clipboard = null;
  }
  /** desktop: key lives outside the vault (src/secrets.ts); mobile: settings fallback */
  async getOpenAiApiKey() {
    return import_obsidian17.Platform.isDesktopApp ? await loadOpenAiApiKey() : this.settings.openaiApiKey;
  }
  async onload() {
    await this.loadSettings();
    this.registerView(VIEW_TYPE_BOARD, (leaf) => new BoardView(leaf, this));
    this.registerExtensions(["board"], VIEW_TYPE_BOARD);
    this.addRibbonIcon(
      "layout-dashboard",
      "Maguilanote: new board",
      () => this.createBoard()
    );
    this.addCommand({
      id: "new-board",
      name: "New board",
      callback: () => this.createBoard()
    });
    this.addCommand({
      id: "export-board-markdown",
      name: "Export current board to Markdown",
      checkCallback: (checking) => {
        const view = this.activeBoard();
        if (!view) return false;
        if (!checking) void this.exportMarkdown(view);
        return true;
      }
    });
    this.addCommand({
      id: "export-board-json-canvas",
      name: "Export current board to JSON Canvas",
      checkCallback: (checking) => {
        const view = this.activeBoard();
        if (!view || !view.file) return false;
        if (!checking) void this.exportJsonCanvas(view).catch((error) => {
          new import_obsidian17.Notice(`JSON Canvas export failed: ${error instanceof Error ? error.message : "unknown error"}`);
        });
        return true;
      }
    });
    this.addCommand({
      id: "import-json-canvas",
      name: "Import JSON Canvas into current board",
      checkCallback: (checking) => {
        const view = this.activeBoard();
        if (!view) return false;
        if (!checking) new JsonCanvasPicker(this.app, this).open();
        return true;
      }
    });
    this.addCommand({
      id: "save-board-as-template",
      name: "Save current board as template",
      checkCallback: (checking) => {
        const view = this.activeBoard();
        if (!view || !view.file) return false;
        if (!checking) void this.exportBoardAsTemplate(view);
        return true;
      }
    });
    this.addCommand({
      id: "new-board-from-template",
      name: "New board from template",
      callback: () => new TemplatePicker(this.app, this).open()
    });
    this.addCommand({
      id: "zoom-to-fit",
      name: "Zoom to fit (current board)",
      checkCallback: (checking) => {
        const view = this.activeBoard();
        if (!view) return false;
        if (!checking) view.zoomToFit();
        return true;
      }
    });
    this.addSettingTab(new MaguilanoteSettingTab(this.app, this));
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (file instanceof import_obsidian17.TFolder) {
          menu.addItem(
            (mi) => mi.setTitle("New Maguilanote board").setIcon("layout-dashboard").onClick(() => this.createBoard(file.path))
          );
        }
      })
    );
    this.registerEvent(
      this.app.vault.on(
        "rename",
        (file, oldPath) => this.repairBoardRefs(file, oldPath)
      )
    );
  }
  activeBoard() {
    return this.app.workspace.getActiveViewOfType(BoardView);
  }
  async createBoard(folderPath, name = "New board") {
    const folder = folderPath ?? this.app.workspace.getActiveFile()?.parent?.path ?? "";
    const prefix = folder && folder !== "/" ? folder + "/" : "";
    let path = (0, import_obsidian17.normalizePath)(`${prefix}${name}.board`);
    let i2 = 1;
    while (this.app.vault.getAbstractFileByPath(path)) {
      path = (0, import_obsidian17.normalizePath)(`${prefix}${name} ${i2++}.board`);
    }
    const file = await this.app.vault.create(
      path,
      JSON.stringify(DEFAULT_BOARD, null, 2)
    );
    await this.app.workspace.getLeaf(false).openFile(file);
    return file;
  }
  /** Rename the current board in place (same folder). `fileManager.renameFile`
   * updates every markdown link to the board; references stored inside other
   * .board files and open breadcrumb trails are fixed by the vault "rename"
   * listener (repairBoardRefs), since Obsidian can't see those JSON paths. */
  renameBoard(view) {
    const file = view.file;
    if (!file) return;
    new TextPromptModal(this.app, "Rename board", file.basename, async (name) => {
      if (!name || name === file.basename) return;
      const prefix = file.parent && file.parent.path !== "/" ? file.parent.path + "/" : "";
      const newPath = (0, import_obsidian17.normalizePath)(`${prefix}${name}.board`);
      if (this.app.vault.getAbstractFileByPath(newPath)) {
        new import_obsidian17.Notice(`"${name}.board" already exists in that folder`);
        return;
      }
      try {
        await this.app.fileManager.renameFile(file, newPath);
      } catch (e2) {
        new import_obsidian17.Notice(`Rename failed: ${e2 instanceof Error ? e2.message : e2}`);
      }
    }).open();
  }
  /**
   * After a .board file is renamed by any means, repair the references Obsidian
   * can't reach: nested board cards (`type: "board"`, stored as plain JSON paths)
   * inside other .board files, and the breadcrumb trails of open board views.
   * Titles are refreshed only when they still match the old basename, so a card
   * the user has given a custom title keeps it.
   */
  async repairBoardRefs(file, oldPath) {
    if (!(file instanceof import_obsidian17.TFile) || file.extension !== "board") return;
    const views = this.app.workspace.getLeavesOfType(VIEW_TYPE_BOARD).map((leaf) => leaf.view).filter((v2) => v2 instanceof BoardView);
    for (const view of views) {
      let touched = false;
      for (const c2 of view.crumbs) {
        if (c2.path === oldPath) {
          c2.path = file.path;
          c2.name = file.basename;
          touched = true;
        }
      }
      if (touched || view.file?.path === file.path) view.renderCrumbs();
    }
    const oldBasename = oldPath.split("/").pop()?.replace(/\.board$/i, "") ?? oldPath;
    const open = new Map(
      views.filter((v2) => !!v2.file).map((v2) => [v2.file.path, v2])
    );
    for (const f2 of this.app.vault.getFiles()) {
      if (f2.extension !== "board") continue;
      let raw;
      try {
        raw = await this.app.vault.read(f2);
      } catch {
        continue;
      }
      if (!raw.includes(oldPath)) continue;
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        continue;
      }
      if (!Array.isArray(data.items)) continue;
      const openView = open.get(f2.path);
      if (openView) {
        let dirty2 = false;
        for (const it of openView.board.items) {
          if (it.type === "board" && it.path === oldPath) {
            it.path = file.path;
            if (it.title === oldBasename) it.title = file.basename;
            dirty2 = true;
          }
        }
        if (dirty2) openView.commit();
        continue;
      }
      let dirty = false;
      for (const it of data.items) {
        if (it.type === "board" && it.path === oldPath) {
          it.path = file.path;
          if (it.title === oldBasename) it.title = file.basename;
          dirty = true;
        }
      }
      if (!dirty) continue;
      try {
        await this.app.vault.modify(f2, JSON.stringify(data, null, 2));
      } catch {
      }
    }
  }
  /** Bundles `view`'s board and everything it references (nested boards, images, files, recordings) into a single `.board.template` in the templates folder. */
  async exportBoardAsTemplate(view) {
    await view.save();
    const file = view.file;
    if (!file) return;
    const bundle = await collectBundle(this.app, file);
    const folder = (0, import_obsidian17.normalizePath)(this.settings.templatesFolder);
    if (!this.app.vault.getAbstractFileByPath(folder)) {
      await this.app.vault.createFolder(folder).catch(() => {
      });
    }
    let target = (0, import_obsidian17.normalizePath)(`${folder}/${file.basename}.board.template`);
    let i2 = 1;
    while (this.app.vault.getAbstractFileByPath(target)) {
      target = (0, import_obsidian17.normalizePath)(`${folder}/${file.basename} ${i2++}.board.template`);
    }
    await this.app.vault.create(target, JSON.stringify(bundle, null, 2));
    new import_obsidian17.Notice(`Template saved to ${target}`);
  }
  /**
   * Opens a file picker restricted to `.board.template` files.
   * Importing replaces `view`'s board: the picked template is unpacked next to
   * it, opened in its place, and the board it replaces is trashed.
   */
  openImportTemplateDialog(view) {
    const input = createEl("input");
    input.type = "file";
    input.accept = ".template";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const raw = await file.text();
      await this.importTemplateFile(raw, file.name.replace(/\.board\.template$/i, ""), view);
    };
    input.click();
  }
  /**
   * Validates `raw` as a template bundle, warns the user before writing anything
   * (it replaces `view`'s current board), then unpacks it next to `view`'s file,
   * opens the result in `view`'s place, and trashes the board it replaced.
   */
  async importTemplateFile(raw, displayName, view) {
    let bundle;
    try {
      bundle = JSON.parse(raw);
      if (bundle.format !== "maguilanote-template") throw new Error("not a template");
    } catch {
      new import_obsidian17.Notice("Not a valid Maguilanote template file");
      return;
    }
    new ImportTemplateConfirmModal(this.app, displayName, async () => {
      try {
        const oldFile = view.file;
        const destFolder = oldFile?.parent?.path ?? "";
        const rootFile = await unbundleTemplate(this.app, bundle, destFolder);
        await view.leaf.openFile(rootFile);
        if (oldFile && oldFile.path !== rootFile.path) {
          await this.app.fileManager.trashFile(oldFile);
        }
        new import_obsidian17.Notice(`Imported template "${displayName}"`);
      } catch (e2) {
        console.error("Maguilanote: template import failed", e2);
        new import_obsidian17.Notice(`Failed to import template: ${e2 instanceof Error ? e2.message : e2}`);
      }
    }).open();
  }
  async importJsonCanvas(file, view) {
    try {
      const data = JSON.parse(await this.app.vault.read(file));
      if (!data || !Array.isArray(data.nodes)) throw new Error("invalid JSON Canvas");
      const nodes = data.nodes;
      const canvasEdges = Array.isArray(data.edges) ? data.edges : [];
      const ids = /* @__PURE__ */ new Map();
      const seenNodeIds = /* @__PURE__ */ new Set();
      const groups = /* @__PURE__ */ new Map();
      const imported = [];
      for (const node of nodes) {
        if (!node || typeof node !== "object" || typeof node.id !== "string" || seenNodeIds.has(node.id) || !isFiniteNumber(node.x) || !isFiniteNumber(node.y) || typeof node.type !== "string" || !["text", "file", "link", "group"].includes(node.type)) continue;
        seenNodeIds.add(node.id);
        const id = newId();
        const item = {
          id,
          type: node.type === "group" ? "column" : node.type === "file" ? "file" : node.type === "link" ? "link" : "note",
          x: node.x,
          y: node.y,
          w: isFiniteNumber(node.width) ? Math.max(120, node.width) : 260,
          h: isFiniteNumber(node.height) ? Math.max(48, node.height) : void 0
        };
        if (item.type === "note") item.text = typeof node.text === "string" ? node.text : "";
        if (item.type === "file") {
          if (typeof node.file !== "string" || !node.file.trim()) continue;
          item.path = node.file;
        }
        if (item.type === "link") {
          if (typeof node.url !== "string" || !/^https?:\/\//i.test(node.url)) continue;
          item.url = node.url;
        }
        if (node.type === "group") {
          item.title = typeof node.label === "string" ? node.label : "Column";
          groups.set(node.id, item);
        }
        if (item.type === "file" && !this.resolveImportedPath(item.path)) continue;
        ids.set(node.id, id);
        imported.push(item);
      }
      for (const node of nodes) {
        if (node?.type !== "group" || typeof node.id !== "string" || !Array.isArray(node.children)) continue;
        const parent = groups.get(node.id);
        if (!parent) continue;
        for (const childId of node.children) {
          const child = typeof childId === "string" ? imported.find((it) => it.id === ids.get(childId)) : void 0;
          if (child && child.id !== parent.id) child.parent = parent.id;
        }
      }
      const edges = canvasEdges.flatMap((edge) => {
        if (!edge || typeof edge.fromNode !== "string" || typeof edge.toNode !== "string") return [];
        const from = ids.get(edge.fromNode), to = ids.get(edge.toNode);
        return from && to ? [{ id: newId(), from, to, arrow: true, mode: "free", label: typeof edge.label === "string" ? edge.label : void 0 }] : [];
      });
      if (!imported.length) throw new Error("no compatible nodes");
      view.board.items.push(...imported);
      view.board.edges.push(...edges);
      view.selection = new Set(imported.map((it) => it.id));
      view.commit();
      new import_obsidian17.Notice(`Imported ${imported.length} JSON Canvas nodes`);
    } catch (error) {
      new import_obsidian17.Notice(`JSON Canvas import failed: ${error instanceof Error ? error.message : "invalid file"}`);
    }
  }
  resolveImportedPath(path) {
    const normalized = path?.trim();
    return normalized && !normalized.startsWith("/") && !normalized.includes("..") ? normalized : void 0;
  }
  async exportJsonCanvas(view) {
    const nodes = [];
    const groups = /* @__PURE__ */ new Map();
    const nodeIds = /* @__PURE__ */ new Set();
    for (const it of view.board.items) {
      if (nodeIds.has(it.id)) continue;
      nodeIds.add(it.id);
      if (it.type === "column") {
        const group = { id: it.id, type: "group", x: it.x, y: it.y, width: it.w, height: it.h ?? 300, label: it.title || "Column", children: [] };
        groups.set(it.id, group);
        nodes.push(group);
        continue;
      }
      const base2 = { id: it.id, x: it.x, y: it.y, width: it.w, height: it.h ?? 120 };
      if (it.type === "note" || it.type === "comment" || it.type === "todo")
        nodes.push({ ...base2, type: "text", text: it.text || (it.todos ?? []).map((t2) => `- [${t2.done ? "x" : " "}] ${t2.text}`).join("\n") });
      else if (it.path) nodes.push({ ...base2, type: "file", file: it.path });
      else if (it.url) nodes.push({ ...base2, type: "link", url: it.url });
      else nodes.push({ ...base2, type: "text", text: it.title || it.type });
    }
    for (const it of view.board.items) {
      if (it.parent && groups.has(it.parent)) {
        const group = groups.get(it.parent);
        group.children.push(it.id);
      }
    }
    const edges = view.board.edges.filter((e2) => e2.from && e2.to).map((e2) => ({
      id: e2.id,
      fromNode: e2.from,
      toNode: e2.to,
      fromSide: "right",
      toSide: "left",
      label: e2.label
    }));
    const base = view.file?.parent?.path ? `${view.file.parent.path}/` : "";
    let path = (0, import_obsidian17.normalizePath)(`${base}${view.file?.basename ?? "board"} (export).canvas`);
    let i2 = 1;
    while (this.app.vault.getAbstractFileByPath(path)) {
      path = (0, import_obsidian17.normalizePath)(
        `${base}${view.file?.basename ?? "board"} (export ${i2++}).canvas`
      );
    }
    const file = await this.app.vault.create(path, JSON.stringify({ nodes, edges }, null, 2));
    await this.app.workspace.getLeaf("tab").openFile(file);
    new import_obsidian17.Notice("Board exported to JSON Canvas");
  }
  async exportMarkdown(view) {
    const data = view.board;
    const lines = [`# ${view.file?.basename ?? "Board"}`, ""];
    const roots = data.items.filter((it) => !it.parent).sort((a2, b2) => a2.y - b2.y || a2.x - b2.x);
    const renderItem = (it, indent) => {
      switch (it.type) {
        case "note":
        case "comment":
          lines.push(
            ...(it.text ?? "").split("\n").map((l2) => indent + (it.type === "comment" ? "> \u{1F4AC} " : "") + l2)
          );
          break;
        case "todo":
          if (it.title) lines.push(`${indent}**${it.title}**`);
          for (const t2 of it.todos ?? [])
            lines.push(`${indent}- [${t2.done ? "x" : " "}] ${t2.text}`);
          break;
        case "link":
          lines.push(`${indent}[${it.title || it.url}](${it.url})`);
          break;
        case "image":
          lines.push(`${indent}![[${it.path}]]`);
          break;
        case "file":
          lines.push(`${indent}[[${it.path}]]`);
          break;
        case "board":
          lines.push(`${indent}\u{1F4CB} [[${it.path}|${it.title || it.path}]]`);
          break;
        case "swatch":
          lines.push(`${indent}\u{1F3A8} \`${it.swatch}\``);
          break;
      }
      lines.push("");
    };
    for (const it of roots) {
      if (it.type === "column") {
        lines.push(`## ${it.title || "Column"}`, "");
        const children = data.items.filter((c2) => c2.parent === it.id).sort((a2, b2) => (a2.order ?? 0) - (b2.order ?? 0));
        for (const c2 of children) renderItem(c2, "");
      } else {
        renderItem(it, "");
      }
    }
    const base = view.file?.parent?.path ? view.file.parent.path + "/" : "";
    let path = (0, import_obsidian17.normalizePath)(`${base}${view.file?.basename ?? "board"} (export).md`);
    let i2 = 1;
    while (this.app.vault.getAbstractFileByPath(path)) {
      path = (0, import_obsidian17.normalizePath)(
        `${base}${view.file?.basename ?? "board"} (export ${i2++}).md`
      );
    }
    const f2 = await this.app.vault.create(path, lines.join("\n"));
    await this.app.workspace.getLeaf("tab").openFile(f2);
    new import_obsidian17.Notice("Board exported to Markdown");
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.settings.keybindings = Object.assign(
      {},
      DEFAULT_KEYBINDINGS,
      this.settings.keybindings
    );
    this.settings.colors = {
      light: Object.assign({}, DEFAULT_THEME_COLORS.light, this.settings.colors?.light),
      dark: Object.assign({}, DEFAULT_THEME_COLORS.dark, this.settings.colors?.dark)
    };
    this.settings.gridSize = Number.isFinite(this.settings.gridSize) && this.settings.gridSize > 0 ? this.settings.gridSize : DEFAULT_SETTINGS.gridSize;
    this.settings.defaultNoteWidth = Number.isFinite(this.settings.defaultNoteWidth) && this.settings.defaultNoteWidth > 0 ? this.settings.defaultNoteWidth : DEFAULT_SETTINGS.defaultNoteWidth;
  }
  /** re-apply appearance (theme/font) to every open board and refresh keyboard shortcuts */
  refreshBoards() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_BOARD)) {
      if (leaf.view instanceof BoardView) leaf.view.applyAppearance();
    }
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  onunload() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_BOARD)) {
      if (leaf.view instanceof BoardView) void leaf.view.onClose();
    }
    removeGoogleFonts();
  }
};
var JsonCanvasPicker = class extends import_obsidian17.FuzzySuggestModal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
    this.setPlaceholder("Choose a .canvas file...");
  }
  getItems() {
    return this.app.vault.getFiles().filter((f2) => f2.extension.toLowerCase() === "canvas");
  }
  getItemText(f2) {
    return f2.path;
  }
  onChooseItem(f2) {
    const view = this.plugin.activeBoard();
    if (view) void this.plugin.importJsonCanvas(f2, view);
  }
};
var TemplatePicker = class extends import_obsidian17.FuzzySuggestModal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
    this.setPlaceholder("Choose a template...");
  }
  getItems() {
    const folder = (0, import_obsidian17.normalizePath)(this.plugin.settings.templatesFolder);
    return this.app.vault.getFiles().filter((f2) => f2.path.startsWith(folder) && f2.path.toLowerCase().endsWith(".board.template"));
  }
  getItemText(f2) {
    return f2.name.replace(/\.board\.template$/i, "");
  }
  onChooseItem(f2) {
    void this.createFromTemplate(f2);
  }
  async createFromTemplate(f2) {
    const raw = await this.app.vault.read(f2);
    let bundle;
    try {
      bundle = JSON.parse(raw);
    } catch {
      new import_obsidian17.Notice("Invalid template file");
      return;
    }
    const folder = this.app.workspace.getActiveFile()?.parent?.path ?? "";
    const nf = await unbundleTemplate(this.app, bundle, folder);
    await this.app.workspace.getLeaf(false).openFile(nf);
  }
};
var MaguilanoteSettingTab = class extends import_obsidian17.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    renderSettingsUI(this.containerEl, this.plugin);
  }
};

/* nosourcemap */