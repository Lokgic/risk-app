import {Component} from "react"
import styled from 'styled-components'
import colorGen from '../colorGen'
import { Object } from "es6-shim";


const StackContainer = styled.div`
    display:grid;
    width:100%;
    height:100%;
    grid-template-columns:${props=>
        props.landscape?
            props.data.map(d=>`${d}fr `)
        :"1fr"};
    grid-template-rows:${props=>
        props.landscape? 
            "1fr"
        :props.data.map(d=>`${d}fr `)};
`

const Slice = styled.div`
    background:${props=>props.color};
`

class StackedBar extends Component{
    constructor(props){
        super(props);
        const data = props.data;
        const keys = Object.keys(data)
        let state = {
            data,
            keys,
            slices:[]
        }

        this.state = state;
        this.processStack = this.processStack.bind(this);

    }
    componentDidMount(){
        this.setState({slices:this.processStack()});
    }
    componentDidUpdate(prevProps,prevState){
        if (prevProps.data !== this.props.data){
            this.setState({data:this.props.data});
        }
        if (prevState.data!==this.state.data){
            this.setState({slices:this.processStack()});
        }
    }
    processStack(){
        const {data,keys} = this.state;
        return keys.map(d=>data[d].risk)
    }
    render(){
        const {slices,keys} = this.state;
        const color = colorGen([-1,keys.length]);
        return (<StackContainer data={slices} landscape={this.props.landscape}>
            {
                slices.map((d,i)=><Slice key={`slice_key_${keys[i]}`}color={color(i)}/>)
            }
        </StackContainer>)
    }
}

export default StackedBar;