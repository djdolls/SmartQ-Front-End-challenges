import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import  Paper  from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ActionBook from 'material-ui/svg-icons/action/book';
import ImageNavigateNext from 'material-ui/svg-icons/image/navigate-next'
import Divider from 'material-ui/Divider';

class Category extends Component {
    constructor(){
        super();
        this.state = {
            category : ["All","Oriental","Chinese Combos","Chinese Starter","Salads"]
        }
    }
    
    getCategory(category){
        console.log(category);
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
                <div>
                    {/* <ListItem
                    primaryText="All Food"
                    leftIcon={<img width="60px" height="60px" src="https://image.flaticon.com/icons/svg/138/138307.svg"/>}
                /> */}
                {Category}
                    
                </div>
            </div>
        );
    }
}

export default Category;