import type { Image, Node, Paragraph, PhrasingContent, Text } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const remarkFigure: Plugin<[], Node> = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node: Paragraph) => {
      const children = node.children;
      if (children.length < 2) return;
      const [imageNode, ...rest] = children;
      if (imageNode === undefined || imageNode.type !== 'image') return;
      const image = imageNode as Image;
      const caption = trimLeadingWhitespace(rest);
      if (caption.length === 0) return;
      const figcaptionNode: Paragraph = {
        type: 'paragraph',
        children: caption,
        data: { hName: 'figcaption' },
      };
      node.children = [image, figcaptionNode] as unknown as PhrasingContent[];
      node.data = { ...node.data, hName: 'figure' };
    });
  };
};

function trimLeadingWhitespace(nodes: PhrasingContent[]): PhrasingContent[] {
  const [head, ...tail] = nodes;
  if (head === undefined) return nodes;
  if (head.type !== 'text') return nodes;

  const text = head as Text;
  const trimmed = text.value.replace(/^\s+/, '');

  if (trimmed.length === 0) return trimLeadingWhitespace(tail);

  return [{ ...text, value: trimmed }, ...tail];
}

export default remarkFigure;
