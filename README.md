# remark-img-caption

A remark plugin to use `<figcaption>` with image.

<center>
  <img
    src="./img/example.webp"
    alt="example"
    width="50%"
    style="margin-inline: auto"
  >
</center>

## Install

```sh
npm i remark-img-caption remark-rehype
```

Of course you can use other package managers.

> [!WARNING]
> `remark-rehype` is necessary for correct conversion.

## Usage

A paragraph contains one image and following inline content(s) will be converted to a `<figure>` element contains `<img>` and `<figcaption>`.\
Simple Example:

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

![alt text](https://example.com/image.png)
example caption

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

will be:

```html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<figure>
  <img alt="alt text" src="https://example.com/image.png">
  <figcaption>example caption</figcaption>
</figure>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
```

You can use inline contents in caption like `*emphasis*`, `**strong**`, `[link](url)` and ...

### With 'unified'

```js
import { unified } from 'unified';
import remarkParse from "remark-parse";
import remarkImgCaption from 'remark-img-caption';
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const md2html = (markdown: string): string => {
  const file = unified()
    .use(remarkParse)
    .use(remarkImgCaption)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(markdown);

  return String(file).trim();
}
```

## With Framework Like Astro

```js
import remarkImgCaption from "remark-img-caption";
import remarkRehype from "remark-rehype";
// ...

export default defineConfig({
  // ...
  remarkPlugins: [
    ...others,
    remarkImgCaption,
  ],
  rehypePlugins: [
    ...others,
    remarkRehype,
  ],
  // ...
});
```
