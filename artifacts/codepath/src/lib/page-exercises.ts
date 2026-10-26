import DOMPurify from "dompurify";

type HtmlCheck = { kind: "html"; label: string; selector: string; min?: number; count?: number; text?: boolean; attribute?: string; nonempty?: boolean };
type CssCheck = { kind: "css"; label: string; selector: string; property: string; value: string[]; media?: string };
export type PageExercise = { language: "html" | "css"; prompt: string; starter: string; template: string; checks: (HtmlCheck | CssCheck)[]; hints: string[] };
export type PageResult = { label: string; passed: boolean };
const forbiddenTags = ["script", "iframe", "object", "embed", "link", "meta", "base", "svg", "math"];
const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, "").replace(/\b0px\b/g, "0");

export function checkPageExercise(exercise: PageExercise, code: string): PageResult[] {
  if (code.length > 100000) throw new Error("Keep this lesson exercise under 100,000 characters.");
  if (exercise.language === "html") {
    const fragment = DOMPurify.sanitize(code, { RETURN_DOM_FRAGMENT: true, FORBID_TAGS: forbiddenTags, FORBID_ATTR: ["src", "srcset"] });
    return exercise.checks.map((check) => {
      if (check.kind !== "html") return { label: check.label, passed: false };
      const nodes = [...fragment.querySelectorAll(check.selector)];
      const countOk = check.count === undefined ? nodes.length >= (check.min ?? 1) : nodes.length === check.count;
      const contentOk = nodes.every((node) => (!check.text || !!node.textContent?.trim()) && (!check.attribute || (node.hasAttribute(check.attribute) && (!check.nonempty || !!node.getAttribute(check.attribute)?.trim()))));
      return { label: check.label, passed: countOk && contentOk };
    });
  }
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(code);
  const declarations: { selector: string; style: CSSStyleDeclaration; media: string[] }[] = [];
  function collect(rules: CSSRuleList, media: string[] = []) {
    for (const rule of rules) {
      if (rule instanceof CSSStyleRule) declarations.push({ selector: rule.selectorText, style: rule.style, media });
      else if (rule instanceof CSSMediaRule) collect(rule.cssRules, [...media, rule.conditionText]);
    }
  }
  collect(sheet.cssRules);
  return exercise.checks.map((check) => ({
    label: check.label,
    passed: check.kind === "css" && declarations.some((rule) =>
      rule.selector.split(",").some((selector) => selector.trim() === check.selector)
      && (check.media ? rule.media.some((media) => normalize(media).includes(normalize(check.media!))) : rule.media.length === 0)
      && check.value.some((value) => normalize(value) === normalize(rule.style.getPropertyValue(check.property))))
  }));
}

export function pagePreview(exercise: PageExercise, code: string) {
  const html = exercise.language === "html" ? code : exercise.template;
  const clean = DOMPurify.sanitize(html, { FORBID_TAGS: [...forbiddenTags, "style"], FORBID_ATTR: ["src", "srcset", "href", "action", "formaction"] });
  const css = (exercise.language === "css" ? code : "").replace(/</g, "\\3c ");
  return `<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src 'none'; connect-src 'none'; base-uri 'none'; form-action 'none'"><style>body{font-family:system-ui,sans-serif;padding:20px;color:#172133;background:#fff}button,input{font:inherit}article{margin-bottom:12px} :focus-visible{outline:3px solid #dc4b26;outline-offset:3px}${css}</style></head><body>${clean}</body></html>`;
}
