
# 🧩 code-comment-check

> 🧠 A lightweight, fast CLI tool that checks whether your variable declarations are properly commented before committing code.
> Ensure code readability and consistency across your team with one simple command.

---

https://github.com/laoer536/code-comment-check/blob/main/README.zh.md

## 🚀 Why use code-comment-check?

Modern projects often enforce strict code style rules — yet **comment standards** are easy to overlook.
`code-comment-check` solves exactly that problem:

* ✅ Automatically detects missing comments for each variable declaration
* ✅ Prevents committing code with missing comments
* ✅ By default, only checks **changed lines** in the current commit — fast and efficient
* ✅ Supports a `--strict` mode to inspect all declarations in changed files
* 🚫 Ignores test files by default (`__tests__`, `.test.ts`, `.spec.tsx`, etc.)

Use it in your local workflow or CI pipeline to enforce consistent documentation standards across your team.

---

## 📦 Installation

```bash
# Recommended
pnpm add -D code-comment-check

# Or using npm / yarn
npm install -D code-comment-check
# or
yarn add -D code-comment-check
```

After installation, the CLI command is automatically registered:

```bash
comment-check
```

---

## ⚙️ Usage

### 🔹 Default mode (recommended)

```bash
pnpm comment-check
```

Default behavior:

* Only checks **changed lines** in the committed files
* Automatically **ignores test files**
* Displays missing comment entries in a formatted table (file, line, declaration)
* Returns a non-zero exit code if issues are found, blocking the commit

---

### 🔹 Strict mode

```bash
pnpm comment-check --strict
```

In strict mode, the tool scans all declarations in changed files,
making it ideal for **code review** or **CI environments**.

---

## 🪝 Integrating with Husky (pre-commit hook)

In your `.husky/pre-commit` file, add the following:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm comment-check
```

Effect:

* ✅ If all checks pass — the commit proceeds
* ❌ If any declaration lacks a comment — a table of missing comments is printed, and the commit is blocked

---

## 💡 Example Output

```
🔍 Checking annotation comments...

⚠️  Missing annotation comments:

┌────────────────────────────┬──────┬──────────────────────────┐
│ File                       │ Line │ Declaration              │
├────────────────────────────┼──────┼──────────────────────────┤
│ src/utils/math.ts          │  12  │ const totalPrice = ...   │
│ src/components/Button.tsx  │  45  │ let isDisabled = false   │
└────────────────────────────┴──────┴──────────────────────────┘

❌ Please add comments before committing your code.
```

---

## 🌟 Features & Advantages

| Feature               | Description                                           |
| --------------------- | ----------------------------------------------------- |
| ⚡️ High performance   | Built on the SWC compiler — much faster than Babel    |
| 🧩 Zero configuration | Works out of the box, automatically registers the CLI |
| 💬 Clear output       | Displays missing comment details in a table           |
| 🧠 Smart parsing      | Supports TypeScript / JSX / TSX syntax                |
| 🪶 Lightweight        | Non-intrusive — analyzes AST without modifying code   |
| 🔧 Extensible         | Supports the `--strict` flag for broader checks       |

---

## 📘 Use Cases

* Enforcing code documentation standards
* Pre-commit comment validation
* Automated CI code inspection
* Integration in internal dev tools or monorepo setups

---

## 📄 License

MIT © 2025 — maintained by [laoer536](https://github.com/laoer536)

---