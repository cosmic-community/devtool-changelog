const fs = require('fs');
const path = require('path');

function injectConsoleCapture() {
  const buildDir = path.join(process.cwd(), '.next');
  const outDir = path.join(process.cwd(), 'out');
  
  // Determine which directory to use
  const targetDir = fs.existsSync(outDir) ? outDir : buildDir;
  
  if (!fs.existsSync(targetDir)) {
    console.log('No build output found. Skipping console capture injection.');
    return;
  }
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  function injectIntoHTML(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Only inject if not already present
      if (content.includes('dashboard-console-capture.js')) {
        return;
      }
      
      // Try to inject in head first, fallback to before closing body
      if (content.includes('</head>')) {
        content = content.replace('</head>', `  ${scriptTag}\n</head>`);
      } else if (content.includes('</body>')) {
        content = content.replace('</body>', `  ${scriptTag}\n</body>`);
      } else {
        return; // Skip if neither head nor body found
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`✓ Injected console capture into: ${filePath}`);
    } catch (error) {
      console.warn(`Warning: Could not inject console capture into ${filePath}:`, error.message);
    }
  }
  
  function walkDirectory(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        walkDirectory(fullPath);
      } else if (file.name.endsWith('.html')) {
        injectIntoHTML(fullPath);
      }
    }
  }
  
  console.log('Injecting console capture script into HTML files...');
  walkDirectory(targetDir);
  console.log('Console capture injection complete.');
}

// Run the injection
injectConsoleCapture();