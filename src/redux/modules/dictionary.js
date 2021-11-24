import {db} from '../../firebase'
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, } from "firebase/firestore";

//Action part
const LOAD = "dictionary/LOAD"
const CREATE = "dictionary/CREATE"

//InitialState
const initialState = {
    list: []
}

//Action Creator Part
export const loadDictionary = (word) => {
    return {type: LOAD, word};
};


export const createDictionary = (word) => {
    return {type: CREATE, word};
};

// 파이어베이스랑 통신하는 부분
export const loadDictionaryFB = () => {
    return async function (dispatch) {
      // 데이터를 가져온다!
      const dictionary_data = await getDocs(collection(db, "Dictionary"));
      
      let dictionary_list  = [];
  
      // 하나씩 우리가 쓸 수 있는 배열 데이터로 만들어줍시다!
      dictionary_data.forEach((word) => {
        // 콘솔로 확인해요!
        // console.log(word.id, word.data());
        dictionary_list.push({ id: word.id, ...word.data() });
      });
  
      // 잘 만들어졌는 지 리스트도 확인해봐요! :)
      dispatch(loadDictionary(dictionary_list));
    }
  }

//Reducer Part
export default function reducer(state = initialState, action = {}){
    switch(action.type) {
        case "dictionary/LOAD": {
            return {list: action.word}
          }
        
        case "dictionary/CREATE":
            const new_list = [...state.list, action.word];
            return {list: new_list};
        
        default:
            return state;
    }
}