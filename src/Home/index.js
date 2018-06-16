import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Category from '../Component/Category'
import MenuCard from '../Component/MenuCard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import  MapsLocalDining  from 'material-ui/svg-icons/maps/local-dining';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { ListItem } from 'material-ui/List';
import ActionBook from 'material-ui/svg-icons/action/book';
import ImageNavigateNext from 'material-ui/svg-icons/image/navigate-next'

const muiTheme = getMuiTheme({
    appBar: {
      backgroundColor: "#000000",
    },
  });

class Home extends Component {
    constructor(){
        super();
        this.state = {
            category : ["All","Oriental","Chinese Combos","Chinese Starter","Salads"],
            selectedCat : "All"
        }
    }
    getCategory(category){
        console.log(category);
        this.setState({
            selectedCat : category
        });
    }
    render() {
        const Category = this.state.category.map((category)=>{
            return(
                <div key={category}>
                    <ListItem
                        primaryText={category}
                        leftIcon={<ActionBook/>}
                        rightIcon={<ImageNavigateNext/>}
                        style={{textAlign:'left',backgroundColor:'#F5F5F5',borderRadius:'25px',fontSize:'13px',textTransform:'uppercase'}}
                        onClick={()=>this.getCategory(category)}
                    />
                    <br/>
                </div>
            );
        });
        return (
            <div>
                <MuiThemeProvider >
                    <AppBar
                        style={{backgroundColor:'#4527A0'}}
                        title={<div style={{fontSize:'16px',textTransform:'uppercase',}}>SMARTQ DINING restaurant</div>}
                        iconElementLeft={<div></div>}
                    />
                    <div style={{marginTop:'40px'}}className="row">
                        <div className="col-md-3" style={{marginLeft:'10px'}}>
                            {Category}
                        </div>
                        <div className="col-md-8" style={{marginLeft:'10px'}}>
                        <MenuCard category={this.state.selectedCat}/>
                        </div>
                    </div> 
                   
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Home;