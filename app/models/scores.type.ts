export type Player = {
    _metadata?: PlayerScoresMetadata;
    username: string;
    id?: number;
    scores?: PlayerScoresValue[];
};

export type PlayerScoresValue = {
    id: number;
    value: number;
}

type PlayerScoresMetadata = {
    etag: string;
    asof: string;
}