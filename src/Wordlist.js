import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { loadDictionaryFB, deleteDictionaryFB } from "./redux/modules/dictionary";

//matarial-ui icon 가져오기
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Memolist = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // redux 부분에 저장되어 있는 data 가져오기
  const dictionary_lists = useSelector((state) => state.dictionary.list);
  
  // dispatch를 통해 firebase에 저장되어 있는 단어 불러오기 요청
  React.useEffect(() => {
    dispatch(loadDictionaryFB());
    // console.log(dictionary_lists);
  }, [dictionary_lists]);

  // 단어 삭제기능 함수
  function DeleteWord(idx){
    if(window.confirm("정말 삭제하시겠습니까?")){
      // 해당 단어의 index를 받아와 전체 단어 data의 index값에 해당하는 id를 넘겨주고,
      // firebase에서 일치하는 id를 가진 단어를 삭제해달라고 요청   
      dispatch(deleteDictionaryFB(dictionary_lists[idx].id))
    }else{
      return
    }
  }
    return (
        <div className="App">
            <H1>My Dictionary</H1>
            <Linebox>
            {/* redux의 모든 데이터를 map함수를 활용해 화면에 뿌려주기 (반복문 효과) */}
            {   
                dictionary_lists.map((list,idx) => {
                    return (
                        <Card key={idx}>
                        <H6>단어
                          {/* 삭제 버튼 클릭시 해당 단어의 index값을 DeleteWord함수에 넘겨줌 */}
                          <DeleteIcon className="DeleteBtn" onClick={() => {
                            DeleteWord(idx)}}/>
                            {/* 수정 화면으로 아동했을시, 화면에 선택한 단어의 값들을 가져오기 위해
                            수정 버튼 클릭시 해당 단어의 index값을 기본 설정 경로 뒤에 붙여주어 이동 */}
                          <EditIcon className="EditBtn" onClick={() => {
                            history.push("/plusword/" + idx)
                          }}/>
                        </H6>
                            <H4>{list.word}</H4>
                        <H6>설명</H6>
                            <H4>{list.mean}</H4>
                        <H6>예시</H6>
                            <Blueword>{list.ex}</Blueword>
                        </Card>
                    )
                 }) 
             }
            </Linebox>
            {/* 버튼 클릭시 react hook useHistory를 통해 경로 이동 */}
            <Button onClick={() => {
                history.push("/plusword")
            }}>+</Button>
        </div>
    )
}

const Linebox = styled.div`
    height: 65vh;
    overflow: auto;
    &::-webkit-scrollbar {
        background: orange;
        border-radius: 10px;
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: red;
        border-radius: 10px;
        border: 2px solid orange;
    }

`;

const H1 = styled.h1`
  color: red;
  text-align: left;
  margin: 30px 0 20px 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid red;
`;

const H4 = styled.h4`
  margin: 10px;
  border-bottom: 1px solid red;
`;

const H6 = styled.h6`
  margin: 5px;
`;

const Blueword = styled.div`
    color: #0d8eec;
    font-weight: bolder;
    margin: 5px;
    border-bottom: 1px solid red;
`;

const Card = styled.div`
  background: orange;
  border: 3px solid orange;
  border-radius: 10px;
  text-align: left;
  padding: 5px;
  margin: 2vw auto;
  width: 25vw;
`;

const Button = styled.button`
  border: 3px solid orange;
  border-radius: 50%;
  background: orange;
  color: white;
  font-size: 50px;
  font-weight: bolder;
  margin-top: 20px;
  padding: 0;
  width: 60px;
  height: 60px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  
  &:hover {
      animation: spin 2s;    
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Memolist;