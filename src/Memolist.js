import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import { loadDictionaryFB, deleteDictionaryFB } from "./redux/modules/dictionary";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Memolist = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const dictionary_lists = useSelector((state) => state.dictionary.list);
  
  React.useEffect(() => {
    dispatch(loadDictionaryFB());
  }, [dictionary_lists]);

  function DeleteWord(idx){
    if(window.confirm("정말 삭제하시겠습니까?")){
      dispatch(deleteDictionaryFB(dictionary_lists[idx].id))
    }else{
      return
    }
  }
    return (
        <div className="App">
            <H1>My Dictionary</H1>
            <Linebox>
            {   
                dictionary_lists.map((list,idx) => {
                    return (
                        <Card key={idx}>
                        <H6>단어
                          <DeleteIcon className="DeleteBtn" onClick={() => {
                            DeleteWord(idx)}}/>
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