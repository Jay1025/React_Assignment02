import './App.css';
import React from "react"
import styled from "styled-components";
import {Route} from "react-router-dom"

import Wordlist from './Wordlist';
import Plusword from './Plusword';

function App() {

  return (
      <Container className="App">
          {/* 메인화면 단어 목록, 삭제 컴포넌트 */}
          <Route exact path="/" component={Wordlist}/>
          {/* 단어 추가하기 컴포넌트 */}
          <Route exact path="/plusword/" component={Plusword}/>
          {/* 단어 수정하기 컴포넌트 */}
          <Route exact path="/plusword/:index" component={Plusword}/>
      </Container>
  );
}

const Container = styled.div`
  border: 2px solid #FDDA24;
  border-radius: 10px;
  background: #FDDA24;
  width: 30vw;
  height: 90vh;
  margin: 1vw auto;
  box-shadow: 10px 10px 30px #fda00f;
`;


export default App;
