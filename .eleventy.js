module.exports = function(eleventyConfig) {

  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");

  // Blog post collection, newest first
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });

  // Featured post (first post with featured: true, or just the newest)
  eleventyConfig.addCollection("featuredPost", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
    return posts.filter(p => p.data.featured).length > 0
      ? posts.filter(p => p.data.featured)
      : [posts[0]];
  });

  // Date filter: "April 2026"
  eleventyConfig.addFilter("postDate", function(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    });
  });

  // Slug filter
  eleventyConfig.addFilter("slugify", function(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk"
  };
};
