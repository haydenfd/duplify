import styled from "styled-components"

const Button = styled.button`
  background-color: #1ed760; 
  transition: transform 0.35s ease-out;
  width: auto;
  border-radius: 10px;
  border: none; 
  height: auto;  
  padding: 0.7em 0.75em;
  flex: 1;
  margin-right: 0.5em;
  box-shadow: 2px 3px 4px #999;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 400;
  :hover {
    color: white;
  }

  :active {
    top: -200%;
    width: 150%;
    height: 300%;
    box-shadow: 0 1.5px 2px #666;
    transform: translateY(1rem);
    transform: translateX(0.15rem);
    color: white;
  }
 `

const Input = styled.input`
  flex: 8;
  padding: 0.75em 0.75em;
  margin-right: 1.5em;
  border: 0.25em solid #191914;
  border-radius: 3rem;
 

  :focus {
  border-color: #1ed760;
  outline: none;
}

  `

const Status = styled.div`
  position:absolute;
  display: flex;
  top:0;
  right:0;
  background-color: #1ed760;
  padding: 1vw;
  border-left: 0.25em solid black;
  border-bottom: 0.25em solid black;`

const Form = styled.div`
  display: flex; 
  flex-direction: row;
  /* grid-column: 2; */
  width: 75%;
  padding: 3rem;
  margin-top: 7em;
  `

// const Title = styled.h1`
//   font-size: 8em;
//   color: #1ed760;
//   margin-top:2.5em;
//   padding-right: 10rem;
// `

// const SubTitle = styled.h2`
//   font-size: 5em;
//   color: #1ed760;
//   margin-top:1em;
//   padding-right: 10rem;
// `

export {
  Button,
  Input,
  Status,
  Form,
  // Title, 
  // SubTitle,
}