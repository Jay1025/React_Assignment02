import './App.css';
import React from "react"
import styled from "styled-components";
import {Route} from "react-router-dom"

import Memolist from './Memolist';
import Plusword from './Plusword';

function App() {

  return (
      <Container className="App">
          <Route exact path="/">
            <Memolist/>
          </Route>
          <Route exact path="/plusword">
            <Plusword/>
          </Route>
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
