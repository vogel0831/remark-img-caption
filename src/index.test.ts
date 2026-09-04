import { describe, expect, it } from "bun:test";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import remarkImgCaption from "../src/index";

const process = (markdown: string): string => {
  const file = unified()
    .use(remarkParse)
    .use(remarkImgCaption)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(markdown);

  return String(file).trim();
};

describe("remarkImgCaption", () => {
  it("img+caption to be converted to figure>img+figcaption", () => {
    const html = process("![alt text](/foo.png)\ncaption text");
    expect(html).toBe(
      "<figure><img src=\"/foo.png\" alt=\"alt text\"><figcaption>caption text</figcaption></figure>",
    );
  });

  it("Do not convert text-only paragraph", () => {
    const html = process("just text");

    expect(html).toBe("<p>just text</p>");
  });

  it("Remain inline elements", () => {
    const html = process(
      "![alt text](/foo.png)\ncaption with **bold** and [link](/bar)",
    );
    expect(html).toBe(
      "<figure><img src=\"/foo.png\" alt=\"alt text\"><figcaption>caption with <strong>bold</strong> and <a href=\"/bar\">link</a></figcaption></figure>",
    );
  });

  it("Do not convert image-only (no caption) paragraph", () => {
    const html = process("![alt text](/foo.png)");
    expect(html).toBe("<p><img src=\"/foo.png\" alt=\"alt text\"></p>");
  });
});
