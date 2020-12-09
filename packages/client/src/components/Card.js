import styled from 'styled-components'
import {normalizeCpf} from '../utils/Util'
import {AiFillDelete} from 'react-icons/ai'
import {GoPencil} from 'react-icons/go'
import { ItemColor as cardBackgroundColor } from '../styles/Constants'

const spanColor = 'rgb(150, 150, 150)'

const textColor = '#000'

const Container = styled.div`
  width: 230px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 30px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  background-color: ${cardBackgroundColor};
  align-items: center;
  margin: 3px;
  padding: 10px;
  border-radius: 3px;
`

const Name = styled.h2`
  color: ${textColor};
`

const BasicInfoBox = styled.div`
  display: grid;
  width: 100%;
  margin: 10px 0;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
`

const BoxInfo = styled.span`
`

const Box = styled.div`
  margin: 10px 0;
  display: grid;
  flex-direction: column;
  width: 100%;
  justify-items: center;
`

const Location = styled.span`
  color: ${spanColor};
`

const Buttons = styled.div`
  margin-top: 10px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 10px;
`

const Button = styled.button`
  height: 50px;
	border: 0;
  background-color: ${props => props.red ? '#ff4040' : '#68ff70'};
	border-radius: 4px;
  color: #fff;
  font-size: 20px;
	cursor: pointer;
  &:hover {
    background-color: ${props => props.red ? '#BD3C3C' : '#4DBD53'};
  }
`

const CardComponent = ({ user, deleteButtomHandler, updateButtonHandler }) => {
  const civilStates = {
    single: 'Solteiro',
    married: 'Casado',
    divorced: 'Divorciado',
    widowed: 'Víuvo'
  }

  const {
    name,
    age,
    civil_state,
    cpf,
    state_uf,
    city
  } = user

  return <Container>
    <Content>
        <Name>{name}</Name>
        <Location>{state_uf.toUpperCase()}, {city}</Location>
        <Box>
          <BasicInfoBox>
            <BoxInfo>{age} anos</BoxInfo>
            <BoxInfo>{civilStates[civil_state.toLowerCase()]}</BoxInfo>
          </BasicInfoBox>
          <span>CPF: {normalizeCpf(cpf)}</span>
        </Box>
    </Content>
    <Buttons>
      <Button onClick={updateButtonHandler}><GoPencil/></Button>
      <Button onClick={deleteButtomHandler} red><AiFillDelete/></Button>
    </Buttons>
  </Container>
}

export default CardComponent
