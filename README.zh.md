# 🧩 code-comment-check

> 🧠 一个轻量、快速的命令行工具，用于在提交代码前检查变量声明是否缺少注释。
> 通过简单的 CLI，一键确保团队代码的可读性与一致性。

---

## 🚀 为什么要用 comment-check？

现代项目往往有严格的代码规范，但「**注释规范**」却容易被忽略。
`code-comment-check` 解决的就是这个痛点：

* ✅ 自动检测每个声明是否有注释
* ✅ 在提交前自动阻止未加注释的代码提交
* ✅ 默认仅检查**本次提交变更的行**，快速高效
* ✅ 可开启严格模式，获取变更文件所有声明没有注释的情况
* 🚫 默认忽略测试文件（`__tests__`、`.test.ts`、`.spec.tsx` 等）

通过它，你可以在 CI 或本地 commit 阶段强制执行注释检查规则，
让团队保持一致的代码可读性标准。

---

## 📦 安装

```bash
# 推荐使用 pnpm
pnpm add -D code-comment-check

# 或使用 npm / yarn
npm install -D code-comment-check
# 或
yarn add -D code-comment-check
```

安装完成后，会自动注册全局命令：

```bash
comment-check
```

---

## ⚙️ 使用方法

### 🔹 默认模式（推荐）

```bash
pnpm comment-check
```

默认行为：

* 仅检查 **本次提交变动的文件的变动行**；
* 自动 **忽略单元测试文件**；
* 输出缺失注释的变量列表（包含文件、行号、代码）；
* 检查失败时返回非零状态码，可阻止提交。

---

### 🔹 严格模式

```bash
pnpm comment-check --strict
```

在严格模式下，工具会扫描变更文件，并检查所有声明的注释，
适用于代码审查或持续集成（CI）阶段的全量检查。

---

## 🪝 在 Git 提交前自动检查（Husky 集成）

在 `.husky/pre-commit` 中添加以下内容：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm comment-check
```

执行效果：

* 若检测通过：继续提交；
* 若检测失败：打印缺失注释表格并中断提交。

---

## 💡 使用示例输出

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

## 🌟 特性与优势

| 特性       | 描述                        |
| -------- | ------------------------- |
| ⚡️ 高性能   | 基于 SWC 编译器解析，速度远超 Babel   |
| 🧩 零配置   | 安装即可使用，自动注册命令             |
| 💬 直观输出  | 表格形式展示缺少注释的变量             |
| 🧠 智能识别  | 支持 TypeScript / JSX / TSX |
| 🪶 轻量无侵入 | 不改变原代码结构，仅分析语法树           |
| 🔧 可扩展   | 支持 `--strict` 参数控制范围      |

---

## 📘 适用场景

* 团队代码规范检查
* 提交前注释强制校验
* CI 阶段代码审查自动化
* 内部规范工具集成（如 monorepo 环境）

---

## 📄 License

MIT © 2025 — maintained by [laoer536](https://github.com/laoer536)]

---
