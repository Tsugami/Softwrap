import styled from 'styled-components'

export default styled.div`
  display: grid;
  width: 100%;
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`
