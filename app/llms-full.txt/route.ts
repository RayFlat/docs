import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value || "es";

  const docsDir = path.join(process.cwd(), `content/${cookieLocale}`);

  const files = await getMdxFiles(docsDir);

  const host = request.headers.get("host") || "docs.rayflat.com";
  const protocol = request.headers.get("x-forwarded-proto") || "https";
  const domain = `${protocol}://${host}`;

  const CURRENT_DIRECTORY = process.cwd();

  const content = files.map((file) => {
    const filePath = file.path
      .split(`${CURRENT_DIRECTORY}/content/`)[1]
      .replace(/[\\/]/g, "/")
      .replace(/\.mdx$/, "")
      .replace(/\/index$/, "");

    return `\n\n---\n\n# File: ${domain}/${filePath}\n\n${file.content}`;
  }).join("");

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

async function getMdxFiles(dir: string, fileList: FileInfo[] = []): Promise<FileInfo[]> {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await getMdxFiles(filePath, fileList);
    } else if (file.endsWith(".mdx")) {
      const content = await fs.readFile(filePath, "utf-8");
      fileList.push({
        path: filePath,
        content,
      });
    }
  }

  return fileList;
}
