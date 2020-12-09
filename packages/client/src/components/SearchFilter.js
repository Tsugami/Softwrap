import styled from 'styled-components'

const Container = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
`

const FilterOption = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-evenly;
  width: 100px;
  height: 50px;
  justify-items: center;
`

const CivilStateSelect = styled.select`
  height: 100px;
`

const Label = styled.label`
  color: #fff;
`

const SearchFilterComponent = () => (
  <Container>
    <FilterOption>
      <Label>Estado Civil</Label>
      <CivilStateSelect>
        <option></option>
        <option>Solteiro</option>
        <option>Casado</option>
        <option>Divorciado</option>
        <option>Viúvo</option>
      </CivilStateSelect>
    </FilterOption>
    <FilterOption>

    </FilterOption>
  </Container>
)

export default SearchFilterComponent
