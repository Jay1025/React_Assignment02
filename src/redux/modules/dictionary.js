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

export const updateDictionary = (a, b, c) => {
  return {type: UPDATE, a, b, c}
}

export const deleteDictionary = (word_id) => {
  return {type: DELETE, word_id}
}

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

  export const addDictionaryFB = (word) => {
    return async function (dispatch) {
      // 파이어스토어에 추가하기를 기다려요!
      const docRef = await addDoc(collection(db, "Dictionary"), word);
      // 추가한 데이터 중 id를 가져와서 bucket_data를 만들어줬어요!
      const dictionary_data = { id: docRef.id, ...word };
      // 그럼 이제 액션을 일으키자! (수정해달라고 요청하자!)
      dispatch(createDictionary(dictionary_data));
    }
  }

  export const updateDictionaryFB = (updatedWord, word_id) => {
    return async function (dispatch, getState) {
      // 수정할 도큐먼트를 가져오고,
      const docRef = doc(db, "Dictionary", word_id);
      // 수정합시다!
      await updateDoc(docRef, {word: updatedWord.word, mean: updatedWord.mean, ex: updatedWord.ex});
      // getState()를 사용해서 스토어의 데이터를 가져올 수 있어요.
      console.log(getState().dictionary)
      // dictionary list 데이터를 가져와요.
      const _dictionary_list = getState().dictionary.list;
      // findIndex로 몇 번째에 있는 지 찾기!
      const dictionary_index = _dictionary_list.findIndex((b) => {
        // updateBucketFB의 파라미터로 넘겨받은 아이디와 
        // 아이디가 독같은 요소는 몇 번째에 있는 지 찾아봐요!
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