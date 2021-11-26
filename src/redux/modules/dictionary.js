import {db} from '../../firebase'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, } from "firebase/firestore";

//Action part
const LOAD = "dictionary/LOAD"
const CREATE = "dictionary/CREATE"
const UPDATE = "dictionary/UPDATE"
const DELETE = "dictionary/DELETE"

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

export const updateDictionary = (word) => {
  return {type: UPDATE, word}
}

export const deleteDictionary = (word_id) => {
  return {type: DELETE, word_id}
}

//firebase와 통신하는 부분
export const loadDictionaryFB = () => {
    return async function (dispatch) {
      // 데이터를 가져온다!
      const dictionary_data = await getDocs(collection(db, "Dictionary"));
      let dictionary_list  = [];
      // 하나씩 우리가 쓸 수 있는 배열 데이터로 만들어준다
      dictionary_data.forEach((word) => {
      dictionary_list.push({ id: word.id, ...word.data() });
      });
  
      // 잘 만들어졌는지 리스트 확인
      dispatch(loadDictionary(dictionary_list));
    }
  }

  export const addDictionaryFB = (word) => {
    return async function (dispatch) {
      //firebase에 추가하기를 대기
      const docRef = await addDoc(collection(db, "Dictionary"), word);
      // 추가한 데이터 중 id를 가져와서 dicationary_data를 생성
      const dictionary_data = { id: docRef.id, ...word };
      // 수정 요청
      dispatch(createDictionary(dictionary_data));
    }
  }

  export const updateDictionaryFB = (updatedWord, word_id) => {
    return async function (dispatch, getState) {
      // 수정할 document 가져오기
      const docRef = doc(db, "Dictionary", word_id);
      // 수정
      await updateDoc(docRef, {word: updatedWord.word, mean: updatedWord.mean, ex: updatedWord.ex});
      // getState()를 사용해서 스토어의 데이터를 가져오기
      console.log(getState().dictionary)
      // dictionary list 데이터 가져오기
      const _dictionary_list = getState().dictionary.list;
      // findIndex로 몇 번째에 있는 지 찾기
      const dictionary_index = _dictionary_list.findIndex((b) => {
        // updateBucketFB의 파라미터로 넘겨받은 아이디와 
        // 아이디가 똑같은 요소는 몇 번째에 있는 지 찾는다.
        return b.id === word_id;
      })
  
      dispatch(updateDictionary(dictionary_index));
    };
  };

  export const deleteDictionaryFB = (word_id) => {
    return async function (dispatch, getState) {
      if(!word_id){
        window.alert("아이디가 없네요!");
        return;
      }
      const docRef = doc(db, "Dictionary", word_id); 
      await deleteDoc(docRef);

      const _dictionary_list = getState().dictionary.list;
      const dictionary_idx = _dictionary_list.findIndex((b) => {
        return b.id === word_id;
      })
      dispatch(deleteDictionary(dictionary_idx));
    }
  }

//Reducer Part
export default function reducer(state = initialState, action = {}){
    switch(action.type) {
        case "dictionary/LOAD": {
            return {list: action.word}
          }
        
        case "dictionary/CREATE": {
            const new_list = [...state.list, action.word];
            return {list: new_list};
        }

        case "dictionary/UPDATE": {
          const update_list = state.list.map((l, idx) => {
            if(parseInt(action.word_index) === idx){
                return {...l };
            }else {
                return l;
            }
          })
          console.log({list: update_list})
          return {...state, list: update_list};
        } 
        
        case "dictionary/DELETE": {
          const new_dictionary_list = state.list.filter((l, idx) => {
              return parseInt(action.word_index) !== idx;
          });
          return {...state, list: new_dictionary_list};
        }

        default:
            return state;
    }
}