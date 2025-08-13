/**
 * Convert custom HTML-like tags to proper HTML
 */
export function mapMetafieldToHtml(text: string): string {
    if (!text) return text;

    let result = text;

    // Convert headings: <h1>text</h1> -> <h1>text</h1> (already valid)
    result = result.replace(/<(h[1-5])>(.*?)<\/\1>/g, '<$1>$2</$1>');

    // Convert lists: <list><list-item>item</list-item></list> -> <ul><li>item</li></ul>
    result = result.replace(
        /<list>([\s\S]*?)<\/list>/g,
        (match, listContent) => {
            const items: string[] = [];
            const itemRegex = /<list-item>([\s\S]*?)<\/list-item>/g;
            let itemMatch;

            while ((itemMatch = itemRegex.exec(listContent)) !== null) {
                items.push(itemMatch[1].trim());
            }

            return items.length > 0
                ? `<ul>\n${items.map((item) => `  <li>${item}</li>`).join('\n')}\n</ul>`
                : match;
        }
    );

    return result;
}

/**
 * Process all text metafields in an article
 */
export function processArticleMetafields(metafields: any[]): any[] {
    return metafields.map((field) => {
        if (field.type === 'multi_line_text_field' && field.value) {
            return {
                ...field,
                value: mapMetafieldToHtml(field.value),
            };
        }
        return field;
    });
}
