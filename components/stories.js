import React from 'react';
import { storiesOf } from '@storybook/react';
import Pictogram from './Pictogram'
import StackedBar from './StackedBar'
import '../css/tachyons.min.css'
import styled from 'styled-components'

const Container = styled.div`
  
  display:flex;
  > div {
    width:100%;
    max-width:95vh;
    margin:auto;
  }
  > .landscape {
    width:90vw;
    height:350px;
    max-width:none;
  }
  > .vertical {
    height:95vh;
    width:350px;
    
  }
`



const fakeData = {
  deathBC:{
    name:"Death from Breast Cancer",
    risk:8
  },
  deathOther:{
    name:"Death from Other Causes",
    risk:42
  },
  healthy:{
    name:"Healthy",
    risk:50
  }
}

const placeholderText = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."

  storiesOf('Pictogram', module)
    .add('solid', ()=>(
     <Container><div><Pictogram data={fakeData} /></div></Container>  
    ))
    .add('outline', ()=>(
      <Container><div><Pictogram data={fakeData} dime={{cellStyle:"outline"}}/></div></Container> 
    ))
    .add('circle', ()=>(
      <Container><div><Pictogram data={fakeData} dime={{shape:"circle"}}/> </div></Container>
    ))
    .add('circle outline', ()=>(
      <Container><div><Pictogram data={fakeData} dime={{shape:"circle", cellStyle:"outline"}}/> </div></Container>
    ))
    .add('icon', ()=>(
      <Container><div> <Pictogram data={fakeData} dime={{shape:"female"}}/> </div></Container>
    ))



  storiesOf('Stacked Bar', module)
    .add('vertical', ()=>(
      <Container><div className = "vertical"><StackedBar data={fakeData} /></div></Container>  
      ))
    .add('landscape', ()=>(
      <Container><div className="landscape"><StackedBar data={fakeData} landscape/></div></Container>  
      ))
 