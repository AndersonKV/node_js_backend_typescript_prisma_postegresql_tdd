import { Matching } from "@prisma/client";
import { MatchingCreateProps } from "../../../types";

export interface IMatchingCreateRepository {
    create(data: MatchingCreateProps): Promise<Matching>
}