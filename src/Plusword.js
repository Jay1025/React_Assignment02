import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDictionaryFB, updateDictionaryFB } from "./redux/modules/dictionary";

const Plusword = () => {
  const history = useHistory();
  const paramIdx = useParams();
  // html의 id와 같이, 해당 단어의 value값을 쉽게 가져오기 위해 useRef를 이용해서 요소를 지정 
  const wordText = React.useRef(null);
  const meanText = React.useRef(null);
  const exText = React.useRef(null);
  const dispatch = useDispatch();
  
  const dictionary_lists = useSelector((state) => state.dictionary.list);
  
  //수정하기 요청 함수
  function updateWord(index) {
    // 3개의 Input value값들을 useRef로 가져와 변수 선언
    const new_lists = {word: wordText.current.value, mean: meanText.current.value, ex: exText.current.value};
    // 공백일 경우 경고문 출력
    if(new_lists.word === "" || new_lists.mean === "" || new_lists.ex === ""){
      return window.alert("모든 항목을 입력해 주세요.")
    }else {
      // 입력 사항을 알림창을 통해 다시 한 번 확인
      const doubleCheck = window.confirm("변경된 사항으로 수정하시겠습니까?");
      if(doubleCheck){
        //해당 단어를 변경된 값들로 수정하기 위해 firebase에 저장된 id와 동일한 단어를 찾기위해 id값을 넘겨주고,
        //수정할 value값들도 넘겨주어 수정 요청  
        dispatch(updateDictionaryFB(new_lists ,dictionary_lists[index].id));
        //단어 수정 완료 후 메인으로 이동 
        window.alert("단어 수정 완료!")
        return history.push("/")
      }else{
        return
      }
    }
  }
  
  //단어 추가하기 요청 함수
  function addWord() {
    // 3개의 Input value값들을 useRef로 가져와 변수 선언
    const new_lists = {word: wordText.current.value, mean: meanText.current.value, ex: exText.current.value};
    // 공백일 경우 경고문 출력
    if(new_lists.word === "" || new_lists.mean === "" || new_lists.ex === ""){
      return window.alert("모든 항목을 입력해 주세요.")
    }else {
    // dispatch를 통해 입력한 값들을 firebase에 추가시켜 주기를 요청  
      dispatch(addDictionaryFB(new_lists));
      //단어 등록 완료 후, 메인으로 돌아가기
      window.alert("단어 등록 완료!!")
      return history.push("/")
    }
  }
    return (
        <Div className="App">
          {/* 단어 추가하기 페이지와 수정하기 페이지에 중복되는 값이 많기 때문에, 
          useParams를 활용해 기본경로 뒤에 index값이 있냐 업냐의 차이에 따라 3항연산식을 활용해 화면에 보여줄 값을 달리해줌*/}
            {
              paramIdx.index ? <H1>단어 수정</H1> : <H1>단어 등록</H1>
            }
            <Card>
                <H5>단어</H5>
                {
                  paramIdx.index ? <Input type="text" ref={wordText} defaultValue={dictionary_lists[paramIdx.index].word}/> : <Input type="text" ref={wordText}/>
                }
            </Card>
            <Card>
                <H5>설명</H5>
                {
                  paramIdx.index ? <Input type="text" ref={meanText} defaultValue={dictionary_lists[paramIdx.index].mean}/> : <Input type="text" ref={meanText}/>
                }
            </Card>
            <Card>
                <H5>예시</H5>
                {
                  paramIdx.index ? <Input type="text" ref={exText} defaultValue={dictionary_lists[paramIdx.index].ex}/> : <Input type="text" ref={exText}/>
                }
            </Card>
            {
              paramIdx.index ? <Button onClick={() => {updateWord(paramIdx.index)}}>수정</Button> : <Button onClick={addWord}>등록</Button>
            }
            <Button onClick={() => { history.goBack(); }}>목록</Button>
        </Div>
    )
}

const Div = styled.div`
  & button:hover {
    opacity: 0.9;
}
`;

const H1 = styled.h1`
  color: red;
  text-align: left;
  margin: 30px 0 20px 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid red;
`;

const H5 = styled.h5`
  margin: 5px;
`;

const Card = styled.div`
  border: 3px solid red;
  border-radius: 10px;
  background: red;
  opacity: 0.4;
  color: white;
  text-align: left;
  padding: 5px;
  margin: 2vw auto;
  width: 25vw;
  height: 10vh;
`;

const Input = styled.input`
  color: black;
  width: 24.5vw;
  height: 6vh;
  margin: auto;
  outline: none;
  border: 2px solid orange;
  background-color: orange;
  opacity: 0.7;
  border-radius: 10px;
  &:focus {
    border: 2px solid red;
    border-radius: 10px;
  }
`;

const Button = styled.button`
  border: 3px solid orange;
  border-radius: 10px;
  background: orange;
  font-size: 30px;
  font-weight: bolder;
  width: 25vw;
  color: white;
  cursor: pointer;
  margin-bottom: 5px;
`;

export default Plusword;