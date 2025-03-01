document.addEventListener("DOMContentLoaded", function () {
  async function loadSection(id, file) {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to load ${file}: ${response.status}`);
      }
      const html = await response.text();
      document.getElementById(id).innerHTML = html;
      return true;
    } catch (error) {
      console.error(`Error loading section ${id} from ${file}:`, error);
      document.getElementById(id).innerHTML = `<p>Error loading section: ${error.message}</p>`;
      return false;
    }
  }

  // Load sections sequentially to ensure proper rendering
  async function loadAllSections() {
    await loadSection("header-section", "src/components/header.html");
    await loadSection("quote-section", "src/components/quote-section.html");
    
    // Force a reflow to ensure all content is properly rendered
    document.body.offsetHeight;
    
    console.log("All sections loaded successfully");
  }

  loadAllSections();
});
