import React from 'react';
import { storiesOf } from '@storybook/react';
import Pictogram from './Pictogram'
import StackedBar from './StackedBar'
import '../css/tachyons.min.css'
import styled from 'styled-components'
import {
  withKnobs,
  number,
  boolean
} from '@storybook/addon-knobs';



const Container = styled.div`
  min-height:100vh;
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
    max-height:20vh;
  }
  > .vertical {
    height:95vh;
    width:350px;
    max-width:20vw;
    
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

const makeFakeData = ()=>{
  return  {
    deathBC:{
      name:"Death from Breast Cancer",
      risk: number('BC Death Risk',8,{range:true, min:0, max:100,step:1})
    },
    deathOther:{
      name:"Death from Other Causes",
      risk: number('Other Death Risk',42,{range:true, min:0, max:100,step:1})
    },
    healthy:{
      name:"Healthy",
      risk: number('Healthy',50,{range:true, min:0, max:100,step:1})
    }
  }
}

const placeholderText = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."

  storiesOf('Pictogram', module)
    .addDecorator(withKnobs)
    .add('solid', ()=>{
      const data = makeFakeData()
      const normalize = boolean('Normalize', true);
      return (
        <Container><div><Pictogram data={data} dime={{normalize}}/></div></Container>  
       )
    })
    .add('outline', ()=>{
      const data = makeFakeData()
      const normalize = boolean('Normalize', true);
      return (
      <Container><div><Pictogram data={data} dime={{cellStyle:"outline",normalize}}/></div></Container> 
    )})
    .add('circle', ()=>{
      const data = makeFakeData()
      const normalize = boolean('Normalize', true);
      return (
      <Container><div><Pictogram data={data} dime={{shape:"circle",normalize}}/> </div></Container>
    )})
    .add('circle outline', ()=>{
      const data = makeFakeData()
      const normalize = boolean('Normalize', true);
      return (
      <Container><div><Pictogram data={data} dime={{shape:"circle", cellStyle:"outline",normalize}}/> </div></Container>
    )})
    .add('icon', ()=>{
      const data = makeFakeData()
      const normalize = boolean('Normalize', true);
      return (
      <Container><div> <Pictogram data={data} dime={{shape:"female",normalize}}/> </div></Container>
    )})



  storiesOf('Stacked Bar', module)
    .addDecorator(withKnobs)
    .add('vertical', ()=>{
      const data = makeFakeData();
      return (
      <Container><div className = "vertical"><StackedBar data={data} /></div></Container>  
      )})
    .add('landscape', ()=>{
      const data = makeFakeData();
      return(
      <Container><div className="landscape"><StackedBar data={data} landscape/></div></Container>  
      )}
      )
 