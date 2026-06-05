module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });

  eleventyConfig.addCollection("featuredPost", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
    return posts.filter(p => p.data.featured).length > 0
      ? posts.filter(p => p.data.featured)
      : [posts[0]];
  });

  eleventyConfig.addFilter("postDate", function(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    });
  });

  eleventyConfig.addFilter("slugify", function(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk"
  };
};
