import fs from "fs";
import path from "path";

// Función recursiva para obtener todos los archivos .mdx
function getMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Si es un directorio, buscar recursivamente
      getMdxFiles(filePath, fileList);
    } else if (file.endsWith(".mdx")) {
      // Si es un archivo .mdx, agregarlo a la lista
      fileList.push({
        path: filePath,
        content: fs.readFileSync(filePath, "utf-8"),
      });
    }
  });

  return fileList;
}

function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    // Split the header string by semicolons to get individual cookie strings
    cookieHeader.split(";").forEach((cookieString) => {
      // Trim whitespace from the string
      const [name, value] = cookieString.trim().split("=");
      // Add the name-value pair to the object, decoding the value
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    });
  }
  return cookies;
}

function FulltextDoc() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ req, res }) {
  const { NEXT_LOCALE } = parseCookies(req.headers.cookie);

  const docsDir = path.join(process.cwd(), `pages`);

  const files = getMdxFiles(docsDir);

  let content = "";

  const host = req.headers.host; // example: "localhost:3000" or "www.example.com"

  const protocol = req.headers["x-forwarded-proto"] || "https";
  const domain = `${protocol}://${host}`;

  files.forEach((file) => {
    const path = file.path
      .split("/workspaces/docs/pages/")[1]
      .replace(/\\/g, "/")
      .replace(".mdx", "")
      .replace(/\/index$/, "");

    content += `\n\n---\n\n# File: ${domain}/${path}\n\n`;
    content += file.content;
  });

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  // we send the XML to the browser
  res.write(content);
  res.end();

  return {
    props: {},
  };
}

export default FulltextDoc;
