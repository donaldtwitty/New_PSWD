/**
 * Eleventy configuration
 *
 * Source files live in src/. `npm run build` writes the finished site to
 * _site/, which GitHub Actions publishes to GitHub Pages.
 */
import prettier from 'prettier';

export default function (eleventyConfig) {
    // Tidy each finished page with the project's Prettier settings, so the
    // published HTML is evenly indented with no leftover template whitespace
    eleventyConfig.addTransform('format-html', async function (content) {
        if (!this.page.outputPath || !this.page.outputPath.endsWith('.html')) {
            return content;
        }
        const options = await prettier.resolveConfig('src/index.html');
        return prettier.format(content, { ...options, parser: 'html' });
    });

    // Files copied to the finished site exactly as they are
    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy('src/New_PSWD'); // legacy email-signature images
    eleventyConfig.addPassthroughCopy('src/CNAME');
    eleventyConfig.addPassthroughCopy('src/robots.txt');
    eleventyConfig.addPassthroughCopy('src/service-worker.js');
    eleventyConfig.addPassthroughCopy('src/google139b1757fc4b402e.html');

    // Google's verification file must be copied untouched, not built as a page
    eleventyConfig.ignores.add('src/google139b1757fc4b402e.html');

    // Current year, for the footer copyright line
    eleventyConfig.addShortcode('year', () => String(new Date().getFullYear()));

    return {
        dir: {
            input: 'src',
            includes: '_includes',
            data: '_data',
            output: '_site',
        },
        // Pages are plain .html files that can use Nunjucks tags
        htmlTemplateEngine: 'njk',
    };
}
