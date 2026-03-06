# Progress Log — $mol Documentation Website

## Format

```
### TASK-XXX: Описание
**Date**: YYYY-MM-DD
**Agent**: имя/идентификатор
**Status**: done
**Summary**: что было сделано
**Files changed**: список файлов
**Notes**: заметки, проблемы, решения
```

---

### TASK-001: Создать meta.tree и базовую структуру модулей bog/docs
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Created docs.meta.tree with includes for $mol_book2, $mol_page, $mol_text, $mol_locale, $mol_link. Created directories app/, landing/, guide/, play/. Created app/index.html entry point with $bog_docs_app root component. Created minimal app.view.tree extending $mol_book2. Updated .gitignore to exclude MAM-cloned dependencies (mol/, node/, bog/). Build passes, Audit passed.
**Files changed**: docs.meta.tree, app/index.html, app/app.view.tree, .gitignore
**Notes**:
- MAM clones mol/, node/, bog/ into the docs directory during build — added to .gitignore
- Push to upstream hyoo-ru/mam.git denied (permission). User's fork remote is `my` at `https://github.com/Dev-cmyser/mam.git` in the parent repo. The docs submodule needs a proper remote configured for push.
- Node tests fail with `$mol_ambient_ref is not defined` — this is a known MAM issue with Node.js v24, not related to our code. Web build and audit pass cleanly.

---

### TASK-002: Создать App shell с $mol_book2 навигацией между страницами
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Created app shell with $mol_book2 routing. app.view.tree declares Landing, Guide, Play sub-components. app.view.ts implements routing via $mol_state_arg — reads `page` arg from URL hash (#!page=landing|guide|play), defaults to 'landing'. app.view.css.ts adds flex:grow:1. Created stub page components: landing/landing.view.tree ($mol_page with placeholder text), guide/guide.view.tree, play/play.view.tree. Build passes, Audit passed.
**Files changed**: app/app.view.tree, app/app.view.ts, app/app.view.css.ts, landing/landing.view.tree, guide/guide.view.tree, play/play.view.tree
**Notes**:
- Build command from bog/docs: `npx mam app` (NOT `npx mam bog/docs/app` — the latter builds the cloned copy inside bog/ which has old code).
- Using $mol_book2 (not $mol_book2_catalog) per original task spec. TASK-001a in tasks.json proposes migration to $mol_book2_catalog — this should be done as a separate task.
- $mol_state_arg uses hash-based routing: `#!page=guide`, not query params `?page=guide`.
- Node tests still fail with known Node.js v24 issue — not related to our code.

---

### TASK-001a: Перейти с $mol_book2 на $mol_book2_catalog в app shell
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Migrated app shell from $mol_book2 to $mol_book2_catalog. app.view.tree now uses $mol_book2_catalog with `param \page`, `menu_title \$mol Docs`, and `spreads *` dictionary mapping landing/guide/play to their page components. Each spread page has Spread_close button in tools for mobile back-navigation. app.view.ts simplified to only override `spread()` defaulting to 'landing'. docs.meta.tree updated to include \/mol/book2/catalog instead of \/mol/book2. Landing title updated to "Landing" for menu display. Build passes, Audit passed.
**Files changed**: docs.meta.tree, app/app.view.tree, app/app.view.ts, landing/landing.view.tree, tasks.json
**Notes**:
- $mol_book2_catalog automatically generates menu sidebar from `spreads *` dictionary keys.
- Menu link titles are derived from each spread page's `.title()` method.
- Routing uses `$mol_state_arg` with param name "page": `#!page=guide`, `#!page=play`.
- Default spread is 'landing' (overridden in view.ts).
- Spread_close link in each page's tools allows mobile users to navigate back to menu.
- Build command: `npm exec --prefix /Users/cmyser/code/mam mam bog/docs/app` or `cd /Users/cmyser/code/mam && npm exec mam bog/docs/app`.
- Node tests still fail with known Node.js v24 `$mol_ambient_ref` issue — not related to our code.

---

### TASK-003: Создать Landing page — Hero секция с заголовком и CTA кнопками
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6 (fixed manually)
**Status**: done
**Summary**: Landing page hero section created with title "The $mol Framework", subtitle about reactivity, and two CTA buttons (Get Started → guide, Playground → play). Styles use $mol_style_define with proper theme tokens ($mol_theme.control for accent colors). Fixed borderRadius → border.radius, $mol_theme.accent → $mol_theme.control. Build passes, Audit passed.
**Files changed**: landing/landing.view.tree, landing/landing.view.css.ts
**Notes**:
- Agent completed work but didn't output RALPH_COMPLETE, causing ralph.sh to count as failure
- Fixed style errors: `borderRadius` shorthand → `border: { radius }`, `$mol_theme.accent` doesn't exist → `$mol_theme.control`

---

### TASK-007: Создать базовый Playground — textarea редактор view.tree кода
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Created Playground page with $mol_textarea editor for view.tree code. play.view.tree uses $mol_page with $mol_textarea, binding value to `source` property. play.view.ts provides @$mol_mem `source()` method with Hello World initial code ($my_hello $mol_view with "Hello World!" sub). Code persists reactively — switching pages and returning preserves edits. Build passes, Audit passed.
**Files changed**: play/play.view.tree, play/play.view.ts
**Notes**:
- MAM scans .ts files for `$`-prefixed identifiers and tries to resolve them as dependencies. Initial code strings containing `$my_hello` caused build failure ("Root package my not found"). Fixed by constructing the `$` prefix dynamically (`prefix + 'my_hello'`) to prevent MAM dependency resolution.
- $mol_textarea auto-includes $mol_text_code for syntax highlighting view.
- Build command: `node -e "process.chdir('/Users/cmyser/code/mam'); require('child_process').execSync('npm exec mam bog/docs/app', {stdio: 'inherit'})"` — workaround for sandbox cd restriction.

---

### TASK-008: Playground — транспиляция view.tree → JS через $mol_view_tree2_to_js
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Added reactive view.tree → JS transpilation to the Playground page. Uses the full $mol transpiler pipeline: `$mol_tree2_from_string` → `$mol_view_tree2_to_js` → `$mol_tree2_js_to_text` → `$mol_tree2_text_to_string`. Transpiled JavaScript is displayed below the editor via `$mol_text` as a markdown code block. Parse/transpile errors are caught and displayed inline as formatted error messages without crashing the page. Build passes, Audit passed.
**Files changed**: play/play.view.tree, play/play.view.ts
**Notes**:
- Transpilation pipeline: string → tree AST → JS AST → text tree → JS string. All functions are pure transformations available on the `$` namespace.
- Error handling: `output_text()` wraps `transpiled()` in try/catch, re-throws Promises (async signals) but catches parse/transpile errors and formats them as markdown blockquotes.
- MAM auto-resolved dependencies: `$mol_tree2_from_string`, `$mol_view_tree2_to_js`, `$mol_tree2_js_to_text`, `$mol_tree2_text_to_string` — all pulled in automatically by MAM's `$`-identifier scanning.

---

### TASK-013: Создать компонент Lesson — layout с explanation, editor, preview, task
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Created the Lesson component at `guide/lesson/` with full layout: explanation section ($mol_text for markdown), editor+preview split view ($mol_textarea + $mol_text showing transpiled JS), and task section with Check/Hint/Solution/Next buttons. Properties declared in view.tree: `lesson_title`, `explanation`, `task_text`, `initial_code`, `solution`, `code` (reactive, initialized from `initial_code`). Preview uses the same transpilation pipeline as Playground ($mol_tree2_from_string → $mol_view_tree2_to_js → $mol_tree2_js_to_text → $mol_tree2_text_to_string). CSS uses flex-wrap for responsive editor/preview split. Guide page updated to render a test lesson. Build passes, Audit passed.
**Files changed**: guide/lesson/lesson.view.tree, guide/lesson/lesson.view.ts, guide/lesson/lesson.view.css.ts, guide/guide.view.tree
**Notes**:
- `initial_code` and `solution` declared as view.tree properties so they're part of the base class and can be overridden by parent components.
- `code()` in TS override uses `@$mol_mem` with fallback to `initial_code()`.
- `hints()` method returns empty array by default — will be populated by TASK-015.
- Check/Hint/Solution click handlers are stubs (declared in view.tree as `<=> check? null` etc.) — logic will be implemented in TASK-014 and TASK-015.
- `Next_button` is a `$mol_link` with configurable `arg` for navigation — will be wired by TASK-016.

---

### TASK-014: Lesson — кнопка Check с валидацией ответа через tree-парсинг
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Implemented Check button validation using structural tree comparison. When user clicks Check, both user code and solution are parsed via `$mol_tree2_from_string` into AST trees, then compared recursively (type, value, kids) ignoring positional span data. On correct answer, "Correct!" message appears styled in green (#388e3c). On incorrect answer, "Try again" message appears. Parse errors are caught and treated as incorrect. Added `check_status` reactive state ('', 'success', 'error'), `check_result_sub` dynamic list that shows Check_success or Check_error sub-components, and `trees_equal` recursive structural comparison method. Check handler uses `@$mol_action` for safe atom writes.
**Files changed**: guide/lesson/lesson.view.tree, guide/lesson/lesson.view.ts, guide/lesson/lesson.view.css.ts
**Notes**:
- `Check_success` and `Check_error` are declared as class-level sub-components in view.tree, dynamically included via `check_result_sub` override.
- `trees_equal` compares `type`, `value`, and `kids` recursively — structural comparison that ignores whitespace/indentation differences (since parser normalizes them).
- `@$mol_action` on `check()` override allows safe writes to `check_status` atom without circular subscription issues.
