import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface ProjectIdPageProps {
    params: {
        documentId: Id<"projects">;
    }
}

const ProjectIdPage = ({
    params
}: ProjectIdPageProps) => {
    const project = useQuery

    return (
        <>

        </>
    );
};

export default ProjectIdPage;