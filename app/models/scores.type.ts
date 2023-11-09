export type PlayerScores = {
    _metadata: PlayerScoresMetadata;
    username: string;
    id: number;
    scores: PlayerScoresValue[];
};

type PlayerScoresMetadata = {
    etag: string;
    asof: string;
}

type PlayerScoresValue = {
    id: number;
    value: number;
}