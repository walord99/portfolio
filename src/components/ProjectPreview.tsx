import Markdown from "react-markdown";
import "../css/ProjectCard.css";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import rehypeRaw from "rehype-raw";

export type ProjectPreviewInfo = {
  name: string;
  logos_path: string[];
  content_path: string;
  link: string;
  language: string;
};

export function ProjectPreview({
  project,
}: {
  project: ProjectPreviewInfo | null;
}) {
  const [mdContent, setMdContent] = useState("");

  useEffect(() => {
    if (project != null) {
      fetch(project.content_path)
        .then((Response) => Response.text())
        .then((text) => setMdContent(text))
        .catch((error) => console.error("Error fetching markdown file", error));
    }
  }, [project]);

  if (project == null) return null;
  return (
    <>
      <div id="logos">
        <a href={project.link} target="_blank">
          <img id="github_link" src="github.svg" alt="github link" />
        </a>

        {project.logos_path.map((path: string) => {
          const filename = path.substring(
            path.lastIndexOf("/") + 1,
            path.lastIndexOf(".")
          );
          return (
            <Tooltip title={filename} key={filename}>
              <img key={filename} src={path} alt={filename + " logo"} />
            </Tooltip>
          );
        })}
      </div>
      <Markdown rehypePlugins={[rehypeRaw]}>{mdContent}</Markdown>
    </>
  );
}
