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

---

### TASK-004: Создать Landing page — Value Propositions секция (3 карточки)
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Added 3 Value Proposition cards (Reactive, Composable, Lightweight) below the Hero section on the Landing page. Each card has an emoji icon, title, and description text. Cards use flex-wrap layout for responsive behavior — row on desktop, stacking on narrow screens. Cards styled with `$mol_theme.line` borders, `$mol_gap.round` border radius, and `$mol_gap.block` padding. Titles use `$mol_theme.text`, descriptions use `$mol_theme.shade`.
**Files changed**: landing/landing.view.tree, landing/landing.view.css.ts
**Notes**:
- `borderRadius: $mol_gap.round` fails TypeScript — `$mol_gap.round` is a `$mol_style_func<"var", unknown>` not assignable to `string`. Must use `border: { radius: $mol_gap.round }` instead.
- Cards use `flex: { basis: '250px', grow: 1, shrink: 1 }` with `maxWidth: '350px'` for responsive sizing.

---

### TASK-018: Контент урока 2: view.tree Syntax
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Added lesson 2 content covering view.tree syntax — component declaration, nesting with `<=`, and indentation rules. Created `guide.view.ts` with a lessons data array holding both lesson 1 (Setup & First App) and lesson 2 (view.tree Syntax). Each lesson has: title, explanation (markdown), task_text, initial_code, solution, and hints. Guide.view.tree updated to delegate lesson properties through guide-level methods. Lesson.view.tree updated to declare `hints /string` property. Simple URL-based lesson selection via `#!lesson=N` arg. Build passes, Audit passed.
**Files changed**: guide/guide.view.tree, guide/guide.view.ts (new), guide/lesson/lesson.view.tree, guide/lesson/lesson.view.ts, tasks.json
**Notes**:
- Lesson 2 initial_code: simple `$my_app $mol_view` with text, no nesting.
- Lesson 2 solution: adds `<= Action $mol_button_minor` with `sub / \Click me` nested inside.
- All `$`-prefixed identifiers in strings use dynamic `const d = '$'` prefix construction to prevent MAM from resolving them as dependencies.
- `hints` property added to lesson.view.tree (`hints /string`) so it can be set from the parent guide component. Previous `hints()` method in lesson.view.ts (returning empty array) removed since view.tree now provides the default.
- Lesson switching via URL: `#!page=guide&lesson=2` shows lesson 2. Default is lesson 1. Full navigation (sidebar, prev/next) deferred to TASK-016.
- Lesson 1 now also has a solution set (was missing — `$my_hello $mol_view` with `\Hello World!`), enabling the Check button to work for lesson 1 too.

---

### TASK-019: Контент урока 3: Bindings (<=, <=>, =>)
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Added lesson 3 content covering bindings — one-way (`<=`), two-way (`<=>`), and output (`=>`) bindings with examples. Explanation covers all three binding types with clear code examples showing component property connections. Task asks user to create a form with a `$mol_string` input using two-way binding `<=>` to a `name` property, and a `$mol_view` greeting that reads `name` via `<=`. Initial code provides the skeleton without bindings. Solution adds `value? <=> name? \` and `sub / <= name`. Three hints guide the user progressively. Build passes, Audit passed.
**Files changed**: guide/guide.view.ts, tasks.json, progress.md
**Notes**:
- Follows the same pattern as lessons 1 and 2 — data object in `lessons()` array with title, explanation, task, initial_code, solution, hints.
- All `$`-prefixed identifiers in strings use dynamic `const d = '$'` prefix to prevent MAM dependency resolution.
- Accessible via `#!page=guide&lesson=3`.

---

### TASK-020: Контент урока 4: Reactivity (@$mol_mem)
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Added lesson 4 content covering reactivity — @$mol_mem decorator, auto-tracking dependencies, lazy evaluation, memoization, and reactive graph. Explanation covers how every view.tree property automatically gets @$mol_mem behavior, what the generated TypeScript looks like, and how reactive state propagation works. Exercise: create a `$my_reactive` component extending `$mol_page` with two `$mol_string` inputs (Input and Mirror) that share the same `text?` reactive property via `<=>`. Typing in one input instantly updates the other, demonstrating reactive auto-tracking. Three progressive hints guide the student. Build passes, Audit passed.
**Files changed**: guide/guide.view.ts, tasks.json, progress.md
**Notes**:
- Exercise uses view.tree syntax (compatible with existing tree-parsing validator in lesson component).
- Demonstrates reactive state sharing: two inputs bound to same `text?` property via `<=>`.
- Follows the same data pattern as lessons 1-3 in the `lessons()` array.
- Accessible via `#!page=guide&lesson=4`.

---

### TASK-005: Создать Landing page — Ecosystem секция и Footer
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Added Ecosystem section with 4 external links (MAM, Giper Baza, Components, Tauri) and Footer with 3 links (GitHub, Docs, Community). Ecosystem links open in new tabs (`target \_blank`) with pill-style borders. Footer has a top border separator and muted link colors. Docs link uses internal routing (`arg * page \guide`). All links use `$mol_link`. Styles use `$mol_theme` tokens — no `as any`, no `rgba()`, no shorthand padding strings. Build passes, Audit passed.
**Files changed**: landing/landing.view.tree, landing/landing.view.css.ts
**Notes**:
- External links use `uri` + `target \_blank` on `$mol_link`.
- Internal "Docs" link uses `arg * page \guide` for hash-based routing.
- Ecosystem links styled as bordered pills with `$mol_theme.control` text color.
- Footer links styled with `$mol_theme.shade` for subdued appearance.
- GitHub URL: https://github.com/hyoo-ru/mam (upstream org).

---

### TASK-022: Контент урока 5: Built-in Components
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Added lesson 5 content covering built-in components — $mol_page (layout with title/tools/body), $mol_button_major/$mol_button_minor (primary/secondary buttons), $mol_form (structured form with form_fields/buttons), and $mol_list (virtual list). Exercise: create a `$my_profile` component extending `$mol_page` with title, an Edit button in tools, and a `$mol_form` in body containing two `$mol_string` inputs (Name, Email). Three progressive hints guide the student. Build passes, Audit passed.
**Files changed**: guide/guide.view.ts, tasks.json, progress.md
**Notes**:
- Follows the same data pattern as lessons 1-4 in the `lessons()` array.
- Accessible via `#!page=guide&lesson=5`.
- All `$`-prefixed identifiers in strings use dynamic `const d = '$'` prefix to prevent MAM dependency resolution.

---

### TASK-023: Контент урока 6: Styling (view.css.ts)
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Added lesson 6 content covering styling — $mol_style_define, view.css.ts file structure, theme tokens ($mol_theme.back/card/text/shade/accent/control/field), spacing tokens ($mol_gap.block/round), styling sub-components by PascalCase property name, and key rules (no `as any`, no `rgba()`, no shorthand strings, camelCase for borderRadius, top-level sub-components only). Exercise: refactor a `$my_card` component from plain text to named sub-components (`Title` and `Description` as `$mol_view`) that can be targeted by `$mol_style_define`. Three progressive hints guide the student. Build passes, Audit passed.
**Files changed**: guide/guide.view.ts, tasks.json, progress.md
**Notes**:
- Exercise uses view.tree (compatible with existing tree-parsing validator). The explanation covers css.ts concepts, while the exercise focuses on creating named sub-components that would be styled.
- Follows the same data pattern as lessons 1-5 in the `lessons()` array.
- Accessible via `#!page=guide&lesson=6`.
- All `$`-prefixed identifiers in strings use dynamic `const d = '$'` prefix to prevent MAM dependency resolution.

---

### TASK-024: Контент урока 7: Lists & Collections (* свойства)
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Added lesson 7 content covering lists and collections — `*` dictionary syntax for key-value maps, `Item*` multi-property syntax for keyed component factories, dynamic list population with `@$mol_mem_key`, and virtual scrolling with `$mol_list`. Exercise: create a `$my_nav` component with a `$mol_list` named `Menu` containing `Row*` multi-property `$mol_button_minor` items with parameterized `row_title*`. Three progressive hints guide the student. Build passes, Audit passed.
**Files changed**: guide/guide.view.ts, tasks.json, progress.md
**Notes**:
- Explanation covers both uses of `*`: dictionary values (`dictionary *`) and multi-properties (`<= Row* $mol_view`).
- Includes TypeScript code examples showing `@$mol_mem_key` generated from `*` properties.
- Follows the same data pattern as lessons 1-6 in the `lessons()` array.
- Accessible via `#!page=guide&lesson=7`.
- All `$`-prefixed identifiers in strings use dynamic `const d = '$'` prefix to prevent MAM dependency resolution.

---

### TASK-025: Контент урока 8: Navigation ($mol_book2, arg routing)
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Added lesson 8 content covering navigation — $mol_book2 for multi-page layout, $mol_link for declarative arg-based navigation, `arg *` dictionary syntax for URL parameters, $mol_state_arg for programmatic routing, and the routing pattern combining links with reactive page switching. Exercise: create a `$my_app` extending `$mol_page` with two `$mol_link` components in `tools /` — Home_link (`arg * page \home`) and Settings_link (`arg * page \settings`). Three progressive hints guide the student. Build passes, Audit passed.
**Files changed**: guide/guide.view.ts, tasks.json, progress.md
**Notes**:
- Explanation covers $mol_book2 (pages stacking), $mol_link (arg-based navigation), `arg *` syntax, $mol_state_arg (reactive reading), and the common routing pattern.
- Exercise uses view.tree only (compatible with tree-parsing validator).
- Follows the same data pattern as lessons 1-7 in the `lessons()` array.
- Accessible via `#!page=guide&lesson=8`.
- All `$`-prefixed identifiers in strings use dynamic `const d = '$'` prefix to prevent MAM dependency resolution.
