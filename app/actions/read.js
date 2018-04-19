import {instance,instance2} from '../utils/instance'

//分类
const receiveCats = (response) => ({
    type: 'RECEIVE_CATS',
    cats: response
})
export const getCategory = () => async (dispatch) => {
    try {
        let response = await instance.get('/cats/lv2/statistics')
        await dispatch(receiveCats(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//分类详情
const receiveCatsDetail = (response) => ({
    type: 'RECEIVE_CATSDETAIL',
    cats_detail: response
})
export const getCategoryDetail = () => async (dispatch) => {
    try {
        let response = await instance.get('/cats/lv2')
        await dispatch(receiveCatsDetail(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//分类书籍列表
const receiveListByCat = (response) => ({
    type: 'RECEIVE_LISTBYCAT',
    listByCat: response.books
})
export const getNovelListByCat = (gender, type, major, minor = '', start = 0, limit = 20) => async (dispatch) => {
    try {
        let response = await instance.get('/book/by-categories?gender=' + gender + '&type=' + type + '&major=' + major + '&minor=' + minor + '&start=' + start + '&limit=' + limit)
        await dispatch(receiveListByCat(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//书籍详情
const receiveBookDetail = (response) => ({
    type: 'RECEIVE_BOOKDETAIL',
    book_detail: response
})
export const getBookDetail = (bookId) => async (dispatch) => {
    try {
        let response = await instance.get('/book/' + bookId)
        await dispatch(receiveBookDetail(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//排行榜列表
const receiveRanking = (response) => ({
    type: 'RECEIVE_RANKING',
    ranking: response
})
export const getRanking = () => async (dispatch) => {
    try {
        let response = await instance.get('/Ranking/gender')
        await dispatch(receiveRanking(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//排行榜详情
const receiveRankingDetail = (response) => ({
    type: 'RECEIVE_RANKINGDETAIL',
    ranking_detail: response.ranking
})
export const getRankingDetail = (id) => async (dispatch) => {
    try {
        let response = await instance.get('/Ranking/' + id)
        await dispatch(receiveRankingDetail(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//搜索热词
const receiveHotwords = (response) => ({
    type: 'RECEIVE_HOTWORDS',
    hotwords: response.searchHotWords
})
export const getHotwords = () => async (dispatch) => {
    try {
        let response = await instance.get('/book/search-hotwords')
        await dispatch(receiveHotwords(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//联想查询auto-complete
const receiveAutocomplete = (response) => ({
    type: 'RECEIVE_AUTOCOMPLETE',
    auto_complete: response.keywords
})
export const getAutoComplete = (outText) => async (dispatch) => {
    try {
        let response = await instance.get('/book/auto-complete?query=' + outText)
        await dispatch(receiveAutocomplete(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//模糊查询fuzzy-search
const receiveFuzzySearch = (response) => ({
    type: 'RECEIVE_FUZZYSEARCH',
    fuzzy_search: response.books
})
export const getFuzzySearch = (outText) => async (dispatch) => {
    try {
        let response = await instance.get('/book/fuzzy-search?query=' + outText)
        await dispatch(receiveFuzzySearch(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//小说章节
const receiveChapter = (response) => ({
    type: 'RECEIVE_CHAPTER',
    chapters: response.chapters
})
export const getChapter = (id) => async (dispatch) => {
    try {
        let response = await instance.get('toc/' + id + '?view=chapters')
        // alert(JSON.stringify(response.data))
        await dispatch(receiveChapter(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//小说source
const receiveSource = (response) => ({
    type: 'RECEIVE_SOURCE',
    source: response
})
export const getSource = (id) => async (dispatch) => {
    try {
        let response = await instance.get('atoc?view=summary&book=' + id)
        // alert(JSON.stringify(response))
        await dispatch(receiveSource(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
//小说内容
const receiveChapterContent = (response) => ({
    type: 'RECEIVE_CHAPTERCONTENT',
    chapter_content: response.chapter
})
const receiveError = (error) =>({
    type: 'RECEIVE_ERROR',
    error: error
})
export const getChapterContent = (link) => async (dispatch) => {
    try {
        // alert('/chapter/' + link)
        await dispatch(receiveError(null))
        let response = await instance2.get('/chapter/' + link)
        // alert(JSON.stringify(link))
        await dispatch(receiveChapterContent(response.data))
    } catch (error) {
        // alert(JSON.stringify(error.response.data))
        await dispatch(receiveError(error.response.data.message))
        console.log('error: ', error)
    }
}
