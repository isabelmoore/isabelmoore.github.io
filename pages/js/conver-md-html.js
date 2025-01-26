const fs = require("fs");
const path = require("path");
const marked = require("marked");

const inputDir = path.join(__dirname, "pages/_posts");
const outputDir = path.join(__dirname, "pages/posts");
const layoutTemplatePath = path.join(__dirname, "pages/_layout/post.html");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readFile(layoutTemplatePath, "utf8", (err, layoutTemplate) => {
  if (err) {
    console.error("Error reading layout template:", err);
    return;
  }

  fs.readdir(inputDir, (err, files) => {
    if (err) {
      console.error("Error reading _posts directory:", err);
      return;
    }

    files
      .filter(file => file.endsWith(".md"))
      .forEach(file => {
        const filePath = path.join(inputDir, file);
        const outputFileName = file.replace(".md", ".html");
        const outputPath = path.join(outputDir, outputFileName);

        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.error(`Error reading ${file}:`, err);
            return;
          }

          const [yaml, markdown] = data.split("---").slice(1); // Split YAML front matter
          const meta = yaml.split("\n").reduce((acc, line) => {
            const [key, value] = line.split(":").map(v => v.trim());
            if (key && value) acc[key] = value;
            return acc;
          }, {});

          const htmlContent = marked(markdown);

          const fullHtml = layoutTemplate
            .replace("{{ page.title }}", meta.title || "Untitled Post")
            .replace("{{ page.date }}", meta.date || "Unknown Date")
            .replace("{{ content }}", htmlContent)
            .replace("{{ site.author.name }}", "Isabel Moore")
            .replace("{{ site.author.bio }}", "A passionate writer and developer.")
            .replace("{{ tags }}", meta.tags ? meta.tags.map(tag => `<li><a href="/tags/${tag}">${tag}</a></li>`).join("") : "");

          fs.writeFile(outputPath, fullHtml, err => {
            if (err) {
              console.error(`Error writing ${outputFileName}:`, err);
            } else {
              console.log(`${outputFileName} generated successfully!`);
            }
          });
        });
      });
  });
});
