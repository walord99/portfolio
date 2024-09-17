import "../css/Projects.css";
import {
  ProjectPreview,
  ProjectPreviewInfo,
} from "../components/ProjectPreview";
import { useState } from "react";

import portfolio from "../projects/portfolio";
import minishell from "../projects/minishell";
import cube3d from "../projects/cube3d";

const projects = [cube3d, minishell, portfolio];

function Projects() {
  const [display, setDisplay] = useState<ProjectPreviewInfo | null>(null);

  return (
    <div id="projects">
      <div id="project_list">
        {projects.map((project) => {
          return (
            <div
              key={project.name}
              onClick={() => {
                setDisplay(project);
              }}
              className={project == display ? "selected_project" : ""}
            >
              <img src={project.language} alt="" />
              <h3>{project.name}</h3>
            </div>
          );
        })}
      </div>
      <div id="project_display">
        <ProjectPreview project={display} />
      </div>
    </div>
  );
}

export default Projects;
