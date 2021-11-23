
//Action part
const LOAD = "dictionary/LOAD"
const CREATE = "dictionary/CREATE"

//InitialState
const initialState = {
    list: [{word: "사과", mean: "빨갛고 동그란 과일", ex: "사과가 참 맛있다."},]
}

//Action Creator Part
export const loadDictionary = (word) => {
    return {type: LOAD, word};
};


export const createDictionary = (abc) => {
    return {type: CREATE, abc};
};

//Reducer Part
export default function reducer(state = initialState, action = {}){
    switch(action.type) {
        case "dictionary/LOAD":
            return state;
        
        case "dictionary/CREATE":
            const new_list = [...state.list, action.abc];
            return {list: new_list};
        
        default:
            return state;
    }
}