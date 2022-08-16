

export interface IUserDeleteRepository {
    deleteById(id: number): Promise<void>
    destroyer(): Promise<void>
}