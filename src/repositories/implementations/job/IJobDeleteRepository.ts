

export interface IJobDeleteRepository {
    deleteById(id: number, id_user: number): Promise<void>
    destroyer(): Promise<void>
}