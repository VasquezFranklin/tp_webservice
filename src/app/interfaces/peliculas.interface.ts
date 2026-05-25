export interface PeliculasSeason {
    seasonId: string;
    episodes: PeliculasEpisode[];
}
export interface PeliculasEpisode {
    episodeId: string;
    title: string;
    contextualSynopsis: {
        text: string;
    };
    interestingMoment: {
        _342x192: {
            webp: {
                value: {
                    url: string;
                }
            }
        }
    };
    summary: {
        episode: number;
        season: number;
    };
}