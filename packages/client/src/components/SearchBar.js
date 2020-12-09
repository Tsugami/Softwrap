import React, { useState } from 'react'
import styled from 'styled-components'
import { BiSearchAlt } from 'react-icons/bi'
import { ItemColor as barColor } from '../styles/Constants'

const Container = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: row;
  height: 65px;
`

const CreateButton = styled.button`
  margin-left: 5px;
  border-radius: 4px;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
  cursor: pointer;
`

const Button = styled.button`
  width: 57px;
  background-color: ${barColor};
  cursor: pointer;
  border-radius: 0 15px 15px 0;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
`

const Input = styled.input`
  padding: 10px;
  width: 100%;
  font-size: 20px;
  background-color: ${barColor};
  cursor: text;
  border-radius: 15px 0 0 15px;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
`

const ButtonIcon = styled(BiSearchAlt)`
  width: 90%;
  height: 50%;
  &:hover {
    font-size: 10px;
    color: #ADADAD;
  }
`

const SearchBarComponent = ({ newRegister, onClickHandler }) => {
  const [input, setInput] = useState('')

  return (
  <Container>
    <Input onChange={e => setInput(e.target.value)} placeholder="Pesquise pelo nome ou CPF"></Input>
    <Button onClick={() => onClickHandler(input)} type='button'><ButtonIcon/></Button>
    <CreateButton onClick={newRegister}>Novo Registro</CreateButton>
  </Container>
)
}

export default SearchBarComponent
