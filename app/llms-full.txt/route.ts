import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value || "es";

  const docsDir = path.join(process.cwd(), `content/${cookieLocale}`);

  const files = getMdxFiles(docsDir);

  let content = "";

  const host = request.headers.get("host") || "docs.rayflat.com";
  const protocol = request.headers.get("x-forwarded-proto") || "https";
  const domain = `${protocol}://${host}`;

  const CURRENT_DIRECTORY = process.cwd();

  files.forEach((file) => {
    const filePath = file.path
      .split(`${CURRENT_DIRECTORY}/content/`)[1]
      .replace(/\\/g, "/")
      .replace(".mdx", "")
      .replace(/\/index$/, "");

    content += `\n\n---\n\n# File: ${domain}/${filePath}\n\n`;
    content += file.content;
  });

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

interface FileInfo {
  path: string;
  content: string;
}

function getMdxFiles(dir: string, fileList: FileInfo[] = []): FileInfo[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getMdxFiles(filePath, fileList);
    } else if (file.endsWith(".mdx")) {
      fileList.push({
        path: filePath,
        content: fs.readFileSync(filePath, "utf-8"),
      });
    }
  });

  return fileList;
}
