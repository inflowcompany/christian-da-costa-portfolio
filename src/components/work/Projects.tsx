import { getCases } from "@/lib/cases";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude = [] }: ProjectsProps) {
  const projects = getCases().filter((project) => !exclude.includes(project.slug));
  const displayed = range ? projects.slice(range[0] - 1, range[1] ?? projects.length) : projects;
  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l" s={{ paddingX: "0" }}>
      {displayed.map((post) => (
        <ProjectCard
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          status={post.metadata.status}
        />
      ))}
    </Column>
  );
}

