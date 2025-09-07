export interface SessionModel {
    userId: string,
    role: string,
    accessToken: string;
    expiredAt: number;
}