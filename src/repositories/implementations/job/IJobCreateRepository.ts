import { Job } from "@prisma/client";
import { JobSaveProps } from "../../../types";

export interface IJobCreateRepotiry {
    create(data: JobSaveProps): Promise<Job>
}