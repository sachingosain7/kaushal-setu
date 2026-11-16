export interface TextChunk {
  id: string;
  chunkIndex: number;
  content: string;
  tokenCountEstimate: number;
  sourceTitle: string;
  charStart: number;
  charEnd: number;
}

export function chunkText(text: string, sourceTitle: string = 'Uploaded Document', chunkSizeChars: number = 1800, overlapChars: number = 300): TextChunk[] {
  const cleaned = text.replace(/\r\n/g, '\n').trim();
  if (!cleaned) return [];

  const chunks: TextChunk[] = [];
  let start = 0;
  let index = 0;

  // Split preferentially at paragraph or sentence boundaries
  while (start < cleaned.length) {
    let end = start + chunkSizeChars;
    if (end >= cleaned.length) {
      end = cleaned.length;
    } else {
      // Find nearest newline or period within the last 200 characters of the window
      const slice = cleaned.substring(start, end);
      const lastParagraph = slice.lastIndexOf('\n\n');
      const lastSentence = slice.lastIndexOf('. ');

      if (lastParagraph > chunkSizeChars * 0.6) {
        end = start + lastParagraph + 2;
      } else if (lastSentence > chunkSizeChars * 0.6) {
        end = start + lastSentence + 2;
      }
    }

    const content = cleaned.substring(start, end).trim();
    if (content.length > 50) {
      chunks.push({
        id: `chunk-${index + 1}`,
        chunkIndex: index + 1,
        content,
        tokenCountEstimate: Math.round(content.length / 4),
        sourceTitle,
        charStart: start,
        charEnd: end,
      });
      index++;
    }

    if (end >= cleaned.length) break;
    start = end - overlapChars;
  }

  return chunks;
}
