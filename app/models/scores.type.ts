export type PlayerScores = {
    _metadata: PlayerScoresMetadata;
    username: string;
    id: Number;
    scores: PlayerScoresValue[];
};

type PlayerScoresMetadata = {
    etag: string;
    asof: string;
}

type PlayerScoresValue = {
    id: Number;
    value: Number;
}