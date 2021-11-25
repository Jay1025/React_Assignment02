import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDictionaryFB, updateDictionaryFB } from "./redux/modules/dictionary";

const Plusword = () => {
  const history = useHistory();
  const paramIdx = useParams();

  const wordText = React.useRef(null);
  const meanText = React.useRef(null);
  const exText = React.useRef(null);
  const dispatch = useDispatch();
  
  const dictionary_lists = useSelector((state) => state.dictionary.list);
  
  function updateWord(index) {
    const new_lists = {word: wordText.current.value, mean: meanText.current.value, ex: exText.current.value, completed: false};
    if(new_lists.word === "" || new_lists.mean === "" || new_lists.ex === ""){
      return window.alert("모든 항목을 입력해 주세요.")
    }else {
      const doubleCheck = window.confirm("변경된 사항으로 수정하시겠습니까?");
      if(doubleCheck){
        dispatch(updateDictionaryFB(new_lists ,dictionary_lists[index].id));
        window.alert("단어 수정 완료!")
        return history.push("/")
      }else{
        return
      }
    }
  }

  function addWord() {
    const new_lists = {word: wordText.current.value, mean: meanText.current.value, ex: exText.current.value, completed: false};
    if(new_lists.word === "" || new_lists.mean === "" || new_lists.ex === ""){
      return window.alert("모든 항목을 입력해 주세요.")
    }else {
      dispatch(addDictionaryFB(new_lists));
      window.alert("단어 등록 완료!!")
      return history.push("/")
    }
  }
    return (
        <Div className="App">
            {
              paramIdx.index ? <H1>단어 수정</H1> : <H1>단어 등록</H1>
            }
            <Card>
                <H5>단어</H5>
                {
                  paramIdx.index ? <Input type="text" ref={wordText} placeholder={dictionary_lists[paramIdx.index].word}/> : <Input type="text" ref={wordText}/>
                }
            </Card>
            <Card>
                <H5>설명</H5>
                {
                  paramIdx.index ? <Input type="text" ref={meanText} placeholder={dictionary_lists[paramIdx.index].mean}/> : <Input type="text" ref={meanText}/>
                }
            </Card>
            <Card>
                <H5>예시</H5>
                {
                  paramIdx.index ? <Input type="text" ref={exText} placeholder={dictionary_lists[paramIdx.index].ex}/> : <Input type="text" ref={exText}/>
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