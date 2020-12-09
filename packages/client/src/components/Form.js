import React, { useState, useEffect} from 'react'
import styled, { keyframes } from 'styled-components'
import CpfUtil from '@softwrap/cpf-utils'
import axios from 'axios'

const FormAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-65%)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`;

const Container = styled.section`
  background-color: #0e0a14ef;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 400ms;
`;


const Label = styled.label``
const Input = styled.input`
`

const Form = styled.form`
  font-family: monospace;
  animation: ${FormAnimation} 0.7s;
  background-color: #fff;
  width: 400px;
  display: grid;
  padding: 30px 25px;
  border-radius: 10px;

  select, input, button {
    margin-top: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
  }
`


const Box = styled.div`
  display: flex;
  margin: 10px 0;
  flex-direction: column;
`

const NameAndAgeBox = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 60px;
  ${Box}:first-child {
    margin-right: 10px;
  }
`

const LocationBox = styled.div`
 display: grid;
  justify-content: space-between;
  grid-template-columns: 100px 1fr;
  ${Box}:first-child {
    margin-right: 10px;
  }
`

const Button = styled.button`
  cursor: pointer;
  &:hover {

  }
`

const FormComponent = ({ data = {}, handler, buttonContent = 'Registrar' }) => {
  const [name, setName] = useState(data?.name ?? '')
  const [age, setAge] = useState(data?.age ?? '')
  const [civilState, setCivilState] = useState(data?.civil_state?.toLowerCase() ?? 'single')
  const [cpf, setCpf] = useState(data?.cpf ?? '')
  const [stateUf, setStateUf] = useState(data?.state_uf ?? '')
  const [city, setCity] = useState(data?.city ?? '')

  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(res => setUfs(res.data.map(state => state.sigla) ?? []))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (!stateUf) return
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateUf}/municipios`)
      .then(res => setCities(res.data.map(city => city.nome) ?? []))
      .catch(error => console.error(error));
  }, [stateUf]);


  useEffect(() => setCpf(CpfUtil.parse(cpf.slice(0, 14))), [cpf])

  async function onButtonClick(event) {
    event.preventDefault()
    if (!name || !age || !civilState || !cpf || !stateUf || !city) return

    const infos = {
      name,
      age: Number(age),
      civilState,
      cpf,
      stateUf,
      city,
    }

    await handler(infos)
    setAge('')
    setCpf('')
    setName('')
    setStateUf('-')
    setCity('-')
  }

  const civilStateNormalized = ['Solteiro', 'Casado', 'Divorciado', 'Víuvo']
  const civilStates = ['single', 'married', 'divorced', 'widowed']

  function civilStateHandler (event) {
    const select = event.target.value
    const index = civilStateNormalized.indexOf(select)
    setCivilState(civilStates[index])
  }

  return <Container>
    <Form>
      <NameAndAgeBox>
        <Box>
          <Label>Nome</Label>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            required />
        </Box>
        <Box>
          <Label>Idade</Label>
          <Input
            pattern={/\d{*}/}
            value={age}
            onChange={e => setAge(e.target.value.slice(0, 3))}
            required />
        </Box>
      </NameAndAgeBox>
      <Box>
        <Label>CPF</Label>
        <Input
          value={cpf}
          onChange={(event) => setCpf(event.target.value)}
          placeholder='Ex: XXX.XXX.XXX-XX' required></Input>
      </Box>
      <Box>
        <Label>Estado Civil</Label>
        <select value={civilStateNormalized[civilStates.indexOf[civilState]]} onChange={civilStateHandler}>
        {civilStateNormalized.map((civil, i) => <option key={i}>{civil}</option>)}
        </select>
      </Box>
      <LocationBox>
        <Box>
          <Label>Estado</Label>
          <select value={stateUf} onChange={(e) => setStateUf(e.target.value)}>
            <option>-</option>
            {ufs?.map(uf => <option key={uf}>{uf}</option>)}
          </select>
        </Box>
        <Box>
          <Label>Cidade</Label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option>-</option>
            {cities?.map(city => <option key={city}>{city}</option>)}
          </select>
        </Box>
      </LocationBox>
    <Button onClick={onButtonClick}>{buttonContent}</Button>
  </Form>
  </Container>
}

export default FormComponent
