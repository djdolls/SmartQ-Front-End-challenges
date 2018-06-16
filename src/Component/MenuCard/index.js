import React, { Component } from 'react';
import axios from 'axios';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import NavigationArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up'
import ActionDelete from 'material-ui/svg-icons/action/delete';
import moment from 'moment'
let array;
class MenuCard extends Component {
    state = {
        data: [],
        selectItemInCart: [],
        totalAmount: 0,
        allCategory: ["Oriental", "Chinese Combos", "Chinese Starter", "Salads"]
    }

    componentDidMount() {
        axios.get(`https://thesmartq.firebaseio.com/menu.json`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
    }

    selectItem(data) {
        console.log(data);
        let l1 = data.availabletime.slice(0, 5);
        let l2 = data.availabletime.slice(7, 11);
        if (this.handleShowItemTimestamp(l1, l2)) {
            let tempArray = this.state.selectItemInCart;
            if (!tempArray.includes(data)) {
                tempArray.push(data)
            }
            else{
                alert("Functionality of adding more item is not available");
            }
            this.setState({
                selectItemInCart: tempArray
            });
            let total = this.state.totalAmount + data.price;
            this.setState({
                totalAmount: total
            });
        }
        else {
            alert("Item not Available");
        }

        // console.log(this.state.selectItemInCart, " ", total);
    }
    deleteItem(data) {
        let tempArray = this.state.selectItemInCart;
        tempArray.pop(data);
        this.setState({
            selectItemInCart: tempArray
        });
        let total = this.state.totalAmount - data.price;
        this.setState({
            totalAmount: total
        });
        console.log(total);
    }
    handleShowItemTimestamp(start_time, end_time) {
        let st_time = moment(start_time, "HH:mm");
        let et_time = moment(end_time, "HH:mm");

        let curr_time = moment();

        return (curr_time.isBetween(st_time, et_time));
    }
    doCheckout() {
        this.state.totalAmount == 0 ? alert("Nothing on cart") : alert("Checkout successfully");
    }
    deleteAll(){
        this.setState({
            selectItemInCart : []
        });
    }
    constructor(props) {
        super(props);
    }

    render() {
        const filterData = this.state.data.filter(data => data.category == this.props.category)
        console.log(filterData)
        const displayFilteredData = filterData.map((data) => {
            let l1 = data.availabletime.slice(0, 5);
            let l2 = data.availabletime.slice(7, 11);
            return (
                <div>
                    <ListItem
                        primaryText={data.description == "" ? <div style={{ marginTop: '6px', marginBottom: '-10px' }}>
                            {this.handleShowItemTimestamp(l1, l2) ? <div>{data.name}</div> : <strike>{data.name}</strike>}
                        </div>
                            : <div>
                                {this.handleShowItemTimestamp(l1, l2) ? <div>{data.name}</div> : <strike>{data.name}</strike>}
                            </div>}

                        leftIcon={data.vegflag == "nonveg" ? <div style={{ backgroundColor: '#ef5350', width: '10px', height: '10px', borderRadius: '50%', marginTop: '18px' }}></div> : <div style={{ backgroundColor: '#66BB6A', width: '10px', height: '10px', borderRadius: '50%', marginTop: '18px' }}></div>}
                        style={{ textAlign: 'left', backgroundColor: '#F5F5F5', borderRadius: '40px', fontSize: '13px', textTransform: 'uppercase' }}
                        rightAvatar={<div style={{ paddingTop: '10px', paddingRight: '10px' }}>₹ {data.price}</div>}
                        onClick={() => this.selectItem(data)}
                        secondaryText={<div style={{ fontSize: '11px' }}>{data.description}</div>}
                    />
                    <br />
                </div>
            );
        });

        const selectData = this.state.selectItemInCart.map((data, index) => {
            return (
                <div key={index}>
                    <ListItem
                        primaryText={data.name}
                        style={{ textAlign: 'left', backgroundColor: '#F5F5F5', borderRadius: '25px', fontSize: '13px', textTransform: 'uppercase' }}
                        rightIcon={<ActionDelete onClick={() => this.deleteItem(data)} color="#ef9a9a" />}
                    />
                    <br />
                </div>
            );
        })

        const allCat = this.state.allCategory.map((data1) => {

            const filterData1 = this.state.data.filter(data => data.category == data1)
            return (
                <div>
                    <ListItem
                        primaryText ={data1}
                        style={{ textAlign: 'center', backgroundColor: '#FFF59D', borderRadius: '25px', fontSize: '13px', textTransform: 'uppercase' }}
                   
                    />
                    <br/>
               { filterData1.map((data) => {
                    let l1 = data.availabletime.slice(0, 5);
                    let l2 = data.availabletime.slice(7, 11);
                    return (
                        <div>
                            <ListItem
                                primaryText={data.description == "" ? <div style={{ marginTop: '6px', marginBottom: '-10px' }}>
                                    {this.handleShowItemTimestamp(l1, l2) ? <div>{data.name}</div> : <strike>{data.name}</strike>}
                                </div>
                                    : <div>
                                        {this.handleShowItemTimestamp(l1, l2) ? <div>{data.name}</div> : <strike>{data.name}</strike>}
                                    </div>}

                                leftIcon={data.vegflag == "nonveg" ? <div style={{ backgroundColor: '#ef5350', width: '10px', height: '10px', borderRadius: '50%', marginTop: '18px' }}></div> : <div style={{ backgroundColor: '#66BB6A', width: '10px', height: '10px', borderRadius: '50%', marginTop: '18px' }}></div>}
                                style={{ textAlign: 'left', backgroundColor: '#F5F5F5', borderRadius: '40px', fontSize: '13px', textTransform: 'uppercase' }}
                                rightAvatar={<div style={{ paddingTop: '10px', paddingRight: '10px' }}>₹ {data.price}</div>}
                                onClick={() => this.selectItem(data)}
                                secondaryText={<div style={{ fontSize: '11px' }}>{data.description}</div>}
                            />
                            <br/>
                        </div>
                    );
                })}
                <br/>
                </div>
            );
        });
        return (
            <div className="row">
                <div className="col-md-8">
                    <div style={{ backgroundColor: "#EEEEEE", height: '45px', borderRadius: '25px' }}>
                        <div style={{ paddingTop: '8px', fontSize: '16px', textTransform: 'uppercase' }}>
                            {this.props.category}
                        </div>
                        <div style={{ marginTop: '38px' }}>
                            {this.props.category == "All" ?
                                <div>
                                    {allCat}
                                </div>

                                : displayFilteredData}

                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div>
                        <ListItem
                            primaryText="MY CART"
                            style={{ textAlign: 'center', backgroundColor: '#F5F5F5', borderRadius: '25px', fontSize: '13px', textTransform: 'uppercase' }}
                            rightIcon={<ActionDelete onClick={()=>this.deleteAll()}/>}
                        />
                        <br />
                        {this.state.selectItemInCart.length == 0 ?
                            <ListItem
                                primaryText="Your cart is empty"
                                leftIcon={<ActionInfo color="#000000" />}
                                style={{ textAlign: 'center', backgroundColor: '#C8E6C9', borderRadius: '25px', fontSize: '13px', textTransform: 'uppercase' }}
                            /> : null
                        }
                        {selectData}
                    </div>
                    <br />
                    <div style={{ position: 'fixed', bottom: '30px' }}>
                        <span>
                            <ListItem
                                primaryText={<div><span>Total</span><span style={{ paddingLeft: '210px' }}>₹ {this.state.totalAmount}</span></div>}
                                style={{ textAlign: 'left', backgroundColor: '#D1C4E9', borderRadius: '25px', fontSize: '13px', textTransform: 'uppercase', width: '100%' }}
                                onClick={() => this.doCheckout()}
                            />
                            <div style={{ fontWeight: '500', letterSpacing: '4px', fontSize: '13px', paddingTop: '10px' }}>Click above to Checkout</div>
                        </span>

                    </div>
                </div>
            </div>
        );
    }
}

export default MenuCard;