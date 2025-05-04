// @ts-nocheck

import {
  DefaultNodeTypes,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical';
import {
  JSXConvertersFunction,
  RichText as ConvertRichText,
  type JSXConverters,
} from '@payloadcms/richtext-lexical/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/utilities/ui';
import React from 'react';

// Define node types for TypeScript
type NodeTypes = DefaultNodeTypes;


// Helper function to extract plain text from node children
const extractTextFromNode = (node: SerializedLexicalNode, converters: JSXConverters): string => {
  if (node.type === 'text') {
    return (node as Extract<NodeTypes, { type: 'text' }>).text || '';
  }
  if ('children' in node && Array.isArray(node.children)) {
    return node.children
      .map((child: SerializedLexicalNode) => extractTextFromNode(child, converters))
      .join(' ');
  }
  return '';
};

// Custom JSX converters
const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => {
  return {
    ...defaultConverters,

    // Text node converter with format handling
    text: ({ node }: ConverterProps) => {
      if (node.type !== 'text') return null;
      const textNode = node as Extract<NodeTypes, { type: 'text' }>;
      let content: React.ReactNode = textNode.text || '';
      if (textNode.format & 1) { // Assuming 1 = bold
        content = <strong>{content}</strong>;
      }
      // Add more format checks (e.g., italic: 2, underline: 4) as needed
      return content;
    },

    // Heading node converter
    heading: ({ node, childIndex, converters }: ConverterProps) => {
      if (node.type !== 'heading') return null;
      const headingNode = node as Extract<NodeTypes, { type: 'heading' }>;
      const tag = headingNode.tag;
      if (!tag) {
        console.warn('Heading node missing tag:', node);
        return null;
      }

      // Process children nodes
      const children = Array.isArray(headingNode.children)
        ? headingNode.children.map((child: SerializedLexicalNode, index: number) => {
          const converter = converters[child.type] || converters.unknown;
          return converter({
            node: child,
            childIndex: index,
            converters,
            parent: headingNode,
          });
        }).filter((child) => child !== null)
        : [];

      if (!children.length) {
        console.warn('Heading node has no valid children:', node);
        return null;
      }

      // Generate a unique ID from the text content
      const text = extractTextFromNode(headingNode, converters).trim();
      const id = text
        ? text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        : `heading-${childIndex}`;

      // Validate tag
      const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      if (!validTags.includes(tag)) {
        console.warn('Invalid heading tag:', tag);
        return null;
      }

      // Render heading based on tag
      switch (tag) {
        case 'h1':
          return <h1 id={id} className="text-4xl font-bold">{children}</h1>;
        case 'h2':
          return <h2 id={id} className="text-3xl font-semibold">{children}</h2>;
        case 'h3':
          return <h3 id={id} className="text-2xl font-semibold">{children}</h3>;
        case 'h4':
          return <h4 id={id} className="text-xl font-semibold">{children}</h4>;
        case 'h5':
          return <h5 id={id} className="text-lg font-semibold">{children}</h5>;
        case 'h6':
          return <h6 id={id} className="text-base font-semibold">{children}</h6>;
        default:
          return null;
      }
    },

    // Paragraph node converter
    paragraph: ({ node, converters }: ConverterProps) => {
      if (node.type !== 'paragraph') return null;
      const paragraphNode = node as Extract<NodeTypes, { type: 'paragraph' }>;
      const children = Array.isArray(paragraphNode.children)
        ? paragraphNode.children.map((child: SerializedLexicalNode, index: number) => {
          const converter = converters[child.type] || converters.unknown;
          return converter({
            node: child,
            childIndex: index,
            converters,
            parent: paragraphNode,
          });
        }).filter((child) => child !== null)
        : [];

      if (!children.length) {
        console.warn('Paragraph node has no valid children:', node);
        return null;
      }
      return <p className="leading-7">{children}</p>;
    },

    // Horizontal rule node converter
    horizontalrule: ({ node, childIndex }: ConverterProps) => {
      if (node.type !== 'horizontalrule') return null;
      return <hr key={`hr-${childIndex}`} className="my-4 border-t" />;
    },

    // Table node converter
    table: ({ node, converters }: ConverterProps) => {
      if (node.type !== 'table') return null;
      const tableNode = node as Extract<NodeTypes, { type: 'table' }>;
      const children = Array.isArray(tableNode.children)
        ? tableNode.children.map((child: SerializedLexicalNode, index: number) => {
          const converter = converters[child.type] || converters.unknown;
          return converter({
            node: child,
            childIndex: index,
            converters,
            parent: tableNode,
          });
        }).filter((child) => child !== null)
        : [];

      if (!children.length) {
        console.warn('Table node has no valid children:', node);
        return null;
      }
      return (
        <div className="my-6 w-full overflow-auto">
          <Table>
            <TableBody>{children}</TableBody>
          </Table>
        </div>
      );
    },

    // Table row node converter
    tablerow: ({ node, converters }: ConverterProps) => {
      if (node.type !== 'tablerow') return null;
      const rowNode = node as Extract<NodeTypes, { type: 'tablerow' }>;
      const children = Array.isArray(rowNode.children)
        ? rowNode.children.map((child: SerializedLexicalNode, index: number) => {
          const converter = converters[child.type] || converters.unknown;
          return converter({
            node: child,
            childIndex: index,
            converters,
            parent: rowNode,
          });
        }).filter((child) => child !== null)
        : [];

      if (!children.length) {
        console.warn('Tablerow node has no valid children:', node);
        return null;
      }
      return <TableRow>{children}</TableRow>;
    },

    // Table cell node converter
    tablecell: ({ node, converters }: ConverterProps) => {
      if (node.type !== 'tablecell') return null;
      const cellNode = node as Extract<NodeTypes, { type: 'tablecell' }>;
      const children = Array.isArray(cellNode.children)
        ? cellNode.children.map((child: SerializedLexicalNode, index: number) => {
          const converter = converters[child.type] || converters.unknown;
          return converter({
            node: child,
            childIndex: index,
            converters,
            parent: cellNode,
          });
        }).filter((child) => child !== null)
        : [];

      if (!children.length) {
        console.warn('Tablecell node has no valid children:', node);
        return null;
      }
      const headerState = (node as any).headerState;
      const isHeader = headerState > 0;
      return isHeader ? (
        <TableHead className="font-bold">{children}</TableHead>
      ) : (
        <TableCell>{children}</TableCell>
      );
    },

    // List node converter (ul or ol)
    list: ({ node, converters }: ConverterProps) => {
      if (node.type !== 'list') return null;
      const listNode = node as Extract<NodeTypes, { type: 'list' }>;
      const children = Array.isArray(listNode.children)
        ? listNode.children.map((child: SerializedLexicalNode, index: number) => {
          const converter = converters[child.type] || converters.unknown;
          return converter({
            node: child,
            childIndex: index,
            converters,
            parent: listNode,
          });
        }).filter((child) => child !== null)
        : [];

      if (!children.length) {
        console.warn('List node has no valid children:', node);
        return null;
      }
      if (listNode.listType === 'bullet') {
        return <ul className="list-disc pl-5 my-4">{children}</ul>;
      } else if (listNode.listType === 'number') {
        return <ol className="list-decimal pl-5 my-4">{children}</ol>;
      }
      console.warn('Invalid list type:', listNode.listType);
      return null;
    },

    // List item node converter
    listitem: ({ node, converters }: ConverterProps) => {
      if (node.type !== 'listitem') return null;
      const itemNode = node as Extract<NodeTypes, { type: 'listitem' }>;
      const children = Array.isArray(itemNode.children)
        ? itemNode.children.map((child: SerializedLexicalNode, index: number) => {
          const converter = converters[child.type] || converters.unknown;
          return converter({
            node: child,
            childIndex: index,
            converters,
            parent: itemNode,
          });
        }).filter((child) => child !== null)
        : [];

      if (!children.length) {
        console.warn('Listitem node has no valid children:', node);
        return null;
      }
      return <li>{children}</li>;
    },

    // Blockquote node converter
    blockquote: ({ node, converters }: ConverterProps) => {
      if (node.type !== 'blockquote') return null;
      const quoteNode = node as Extract<NodeTypes, { type: 'blockquote' }>;
      const children = Array.isArray(quoteNode.children)
        ? quoteNode.children.map((child: SerializedLexicalNode, index: number) => {
          const converter = converters[child.type] || converters.unknown;
          return converter({
            node: child,
            childIndex: index,
            converters,
            parent: quoteNode,
          });
        }).filter((child) => child !== null)
        : [];

      if (!children.length) {
        console.warn('Blockquote node has no valid children:', node);
        return null;
      }
      return <blockquote className="border-l-4 pl-4 my-4 italic text-gray-600">{children}</blockquote>;
    },

    // Fallback for unhandled node types
    unknown: ({ node }: ConverterProps) => {
      console.warn('Unhandled node type:', node);
      return null;
    },
  };
};

// Component props
type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

// RichText component
export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, data, ...rest } = props;

  // Validate input data
  if (!data?.root?.children?.length) {
    console.warn('No valid rich text data provided:', data);
    return null;
  }

  return (
    <ConvertRichText
      data={data}
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          'container': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto': enableProse,
        },
        className
      )}
      {...rest}
    />
  );
}