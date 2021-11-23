import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createDictionary } from "./redux/modules/dictionary";

const Plusword = () => {
  const history = useHistory();
  const wordText = React.useRef(null);
  const meanText = React.useRef(null);
  const exText = React.useRef(null);
  const dispatch = useDispatch();

    return (
        <Div className="App">
            <H1>단어 등록</H1>
            <Card>
                <H5>단어</H5>
                <Input type="text" ref={wordText}/>
            </Card>
            <Card>
                <H5>설명</H5>
                <Input type="text" ref={meanText}/>
            </Card>
            <Card>
                <H5>예시</H5>
                <Input type="text" ref={exText}/>
            </Card>
            <Button onClick={() => {
              dispatch(createDictionary({word: wordText.current.value, mean: meanText.current.value, ex: exText.current.value}));
              history.push("/")
            }}>등록</Button>
        </Div>
    )
}

const Div = styled.div`
  & button:hover {
    opacity: 0.9;
}
`;

const H1 = styled.h1`
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
  background: white;
  text-align: left;
  padding: 5px;
  margin: 2vw auto;
  width: 25vw;
  height: 10vh;
`;

const Input = styled.input`
  width: 24.5vw;
  height: 6vh;
  margin: auto;
  outline: none;
  &:focus {
    border: 2px solid red;
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
`;

export default Plusword;