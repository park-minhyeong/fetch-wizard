import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
  const packageJsonPath = path.join(__dirname, "package.json");
  const distPath = path.join(__dirname, "dist");
  const readmePath = path.join(__dirname, "README.md");
  if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);
  const source = fs.readFileSync(packageJsonPath).toString("utf-8");
  const sourceObj = JSON.parse(source);
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};
  
  // Fix main and module paths for dist folder
  if (sourceObj.main && sourceObj.main.startsWith("./dist/"))
    sourceObj.main = sourceObj.main.slice(6); // Remove "./dist/"
  if (sourceObj.module && sourceObj.module.startsWith("./dist/"))
    sourceObj.module = sourceObj.module.slice(6); // Remove "./dist/"
  if (sourceObj.types && sourceObj.types.startsWith("./dist/"))
    sourceObj.types = sourceObj.types.slice(6); // Remove "./dist/"
    
  // Fix exports paths
  if (sourceObj.exports && sourceObj.exports["."] && sourceObj.exports["."].import) {
    sourceObj.exports["."].import = sourceObj.exports["."].import.replace("./dist/", "./");
  }
  if (sourceObj.exports && sourceObj.exports["."] && sourceObj.exports["."].require) {
    sourceObj.exports["."].require = sourceObj.exports["."].require.replace("./dist/", "./");
  }
  if (sourceObj.exports && sourceObj.exports["."] && sourceObj.exports["."].types) {
    sourceObj.exports["."].types = sourceObj.exports["."].types.replace("./dist/", "./");
  }
  
  // Remove files field since we're already in dist folder
  delete sourceObj.files;
  const distPackageJsonPath = path.join(distPath, "package.json");
  const versionFilePath = path.join(distPath, "version.txt");
  const npmignorePath = path.join(distPath, ".npmignore");
  const distReadmePath = path.join(distPath, "README.md");
  fs.writeFileSync(
    distPackageJsonPath,
    Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8")
  );
  fs.writeFileSync(versionFilePath, Buffer.from(sourceObj.version, "utf-8"));
  if (fs.existsSync(npmignorePath))
    fs.copyFileSync(npmignorePath, path.join(distPath, ".npmignore"));
  if (fs.existsSync(readmePath)) fs.copyFileSync(readmePath, distReadmePath);
}

main();
