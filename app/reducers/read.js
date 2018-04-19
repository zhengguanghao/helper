const initState = {
    cats: {},
    cats_detail: {},
    listByCat: [],
    book_detail: {},
    ranking: [],
    ranking_detail: {},
    hotwords: [],
    auto_complete: [],
    mixToc:{},
    chapters:{},
    chapter_content:{},
    source:[],
    error:null
};

export const read = (state = initState, action) => {
    switch (action.type) {
        case 'RECEIVE_CATS':
            return {
                ...state,
                cats: action.cats
            };
        case 'RECEIVE_CATSDETAIL':
            return {
                ...state,
                cats_detail: action.cats_detail
            };
        case 'RECEIVE_LISTBYCAT':
            return {
                ...state,
                listByCat: action.listByCat
            };
        case 'RECEIVE_BOOKDETAIL':
            return {
                ...state,
                book_detail: action.book_detail
            };
        case 'RECEIVE_RANKING':
            return {
                ...state,
                ranking: action.ranking
            };
        case 'RECEIVE_RANKINGDETAIL':
            return {
                ...state,
                ranking_detail: action.ranking_detail
            };
        case 'RECEIVE_HOTWORDS':
            return {
                ...state,
                hotwords: action.hotwords
            };
        case 'RECEIVE_AUTOCOMPLETE':
            return {
                ...state,
                auto_complete: action.auto_complete
            };
        case 'RECEIVE_FUZZYSEARCH':
            return {
                ...state,
                fuzzy_search: action.fuzzy_search
            };
        case 'RECEIVE_CHAPTER':
            return {
                ...state,
                chapters: action.chapters
            };
        case 'RECEIVE_CHAPTERCONTENT':
            return {
                ...state,
                chapter_content: action.chapter_content
            };
        case 'RECEIVE_SOURCE':
            return {
                ...state,
                source: action.source
            };
        case 'RECEIVE_ERROR':
        return {
            ...state,
            error: action.error
        };
        default:
            return state;
    }
}; 