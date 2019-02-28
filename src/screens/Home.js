import React, { Component } from 'react'
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import Ads from '../components/Ads';
import { db } from '../config/Firebase';
import loader from '../images/loader.gif';
import CategoryFilter from '../components/CategoryFilter';
import OrderByFilter from '../components/OrderByFilter';
import InputRange from 'react-input-range';
import '../styles/Dashboard.css';


export default class Home extends Component {

    constructor(props) {
        super(props);
        

        this.state = {
            adsList: [],
            showLoader: true,
            value: { min: 0, max: 0 }
        }

        this.login = this.login.bind(this);
        this.profile = this.profile.bind(this);
        this.register = this.register.bind(this);
        this.currentUser = this.currentUser.bind(this);
        this.logout = this.logout.bind(this);
        this.changeModalState = this.changeModalState.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getSearchTextFromHeader = this.getSearchTextFromHeader.bind(this);
        this.categoryFilter = this.categoryFilter.bind(this);
        this.orderByFilter = this.orderByFilter.bind(this);
    }

    getSearchTextFromHeader(e) {
        //console.log(searchText);
        var mySearchArr = [];
        const start = e.target.value;
        const end = start + '\uf8ff';

        //console.log(start, end);
        db.collection('ads').orderBy('title')
            .startAt(start)
            .endAt(end)
            .get().then(doc => {
                doc.forEach(res => {
                    //console.log('res =>', res.data());
                    if (res.data().title != null && res.data().description != null && res.data().price != null
                        && res.data().images.length > 0 && res.data().category != null
                    ) {
                        const obj = {id: res.id, ...res.data()}
                        //console.log('res==>', res);
                        mySearchArr.push(obj);
                        this.setState({
                            adsList: mySearchArr
                        })
                    }

                });
            });

    }

    login() {
        this.setState({
            showLogin: true,
            showRegister: false,
            // user: ''
        })
    }
    profile() {
        this.setState({
            showProfile: true,
            //showRegister: false,
            // user: ''
        })
    }

    register() {
        this.setState({
            showRegister: true,
            showLogin: false,
        })
    }

    changeModalState(modal) {
        this.setState({
            modal: modal
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    // getUser(user){
    //   console.log('user from app.js => ', user);
    //   this.setState({user});
    // }

    currentUser(user) {
        console.log('user from app.js => ', user);
        this.setState({ currentUser: user, showLogin: false });
    }

    // updateChangePasswordState(result){
    //   this.setState({
    //       showChangePassword : result
    //   })
    // }

    logout(currentUser) {
        this.setState({ currentUser })
    }

    async getAllAds() {
        const { adsList, showLoader } = this.state;
        var arr = [];
        try {
            db.collection("ads")
                .onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === "added") {
                            if (change.doc.data().title != null && change.doc.data().description != null && change.doc.data().price != null
                                && change.doc.data().images.length != 0 && change.doc.data().category != null
                            ) {
                                //console.log(change.doc.id);
                                const obj = { id: change.doc.id, ...change.doc.data() }
                                arr.push(obj);
                            }

                        }
                    })
                    const arrSorted = arr.sort((a, b) => {
                        return b.createdAt - a.createdAt;
                    });
                    this.setState({ adsList: arrSorted, showLoader: false });
                })
        }
        catch (e) {
            this.setState({ showLoader: false });
        }
    }

    getMaxValue() {
        var myArr = [];
        var collectionRef = db.collection("ads");
        collectionRef.orderBy("price", "asc")
            .get().then(doc => {
                //console.log(doc);
                doc.forEach(res => {
                    //console.log(res.data());
                    if(res.data().title != null && res.data().description != null && res.data().price != null
                    && res.data().images.length != 0 && res.data().category != null){
                        myArr.push(parseInt(res.data().price) || 0);
                    }
                    
                    
                });
                const val = Math.max.apply(null, myArr);
                this.setState({
                    maxPrice: val,
                    value: { max: val, min: 0 }
                })
            });
    }

    componentDidMount() {
        this.getAllAds();
        this.getMaxValue();
    }

    orderByFilter(type) {
        var mySearchArr = [];
        const { adsList } = this.state;
        mySearchArr = adsList;
        if (type == "Oldest") {
            const arrSorted = mySearchArr.sort((a, b) => {
                return a.createdAt - b.createdAt;
            });
            this.setState({ adsList: arrSorted });
        }
        else {
            const arrSorted = mySearchArr.sort((a, b) => {
                return b.createdAt - a.createdAt;
            });
            this.setState({ adsList: arrSorted });
        }

    }

    categoryFilter(category) {

        if (category == "0") {
            this.getAllAds();
        }

        this.setState({
            adsList: []
        })

        var mySearchArr = [];
        var myAds = db.collection("ads");
        var query = myAds.where("category", "==", category);
        //console.log(query);
        query.get().then(doc => {
            doc.forEach(res => {
                //console.log('res =>', res.data());
                if (res.data().title && res.data().description && res.data().price
                    && res.data().images.length > 0 && res.data().category
                ) {
                    mySearchArr.push(res.data());
                    this.setState({
                        adsList: mySearchArr
                    })
                }

            });
        });
    }

    showDetail(id) {
        //console.log(id);
        //console.log(this);
        this.props.history.push({
            pathname: `/AddDetail/${id}`,
        })
        
        //this.props.history.push('AddDetail');
    }
    getText(e) {
        //console.log(e.target.value);
        this.props.searchText(e.target.value);
      }
    render() {
        const { showProfile, value, maxPrice, showLogin, showRegister, user, showChangePassword, currentUser, showLoader } = this.state;
        var { adsList } = this.state;
        adsList = adsList.filter((item) => item.price >= value.min && item.price <= value.max);
        return (
            <div>
                <Container>
                    <Row className="mt-3">
                        <Col md="10">
                            <Input onChange={this.getSearchTextFromHeader} type="text" placeholder="Search by title.." />
                        </Col>
                        <Col md="2">
                            <Button color="primary" onClick={this.toggle}>
                                Want to sell?
                          </Button>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <CategoryFilter currentCategory={this.categoryFilter} />
                        <Col md="4">
                            <FormGroup>
                                <Label className="mb-3">Price Range</Label>
                                <InputRange
                                    maxValue={maxPrice}
                                    minValue={0}
                                    value={value}
                                    onChange={value => this.setState({ value })} />
                                {/* <Nouislider range={{ min: 0, max: 100 }} tooltips= {[false, wNumb({decimals: 1}), true]} start={[20, 80]} connect /> */}
                            </FormGroup>
                        </Col>
                        <OrderByFilter getOrderBy={this.orderByFilter} />
                    </Row>
                </Container>
                {showLoader ?
                    <div className="d-flex justify-content-center" style={{ marginTop: '15%' }}>
                        <img width="7%" height="3%" src={loader} />
                    </div>
                    :
                    <Container className="mt-3">
                        <Row>
                            {
                                adsList.map((item, index) => {
                                    return (
                                        <Col key={item.id} md="3" sm="6" className="mt-3">
                                            <div className="adDiv" style={{ height: "55vh", display: "flex", flexDirection: "column" }}>
                                                <div style={{ height: "150px" }}>
                                                    <img style={{ height: "25vh", width: "100%" }} src={item.images.length > 0 ? item.images[0] : ""} className="img-fluid" />
                                                </div>
                                                <div style={{ height: "20px" }} className="pt-4 pb-4 pr-2 pl-2">
                                                    <h5>RS {item.price}</h5>
                                                    <h6>{item.title}</h6>
                                                    <p>{item.description}</p>
                                                    <Button size="sm" onClick={this.showDetail.bind(this, item.id)}>View more</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    )//<Dashboard key={index} obj={item} key={item.createdAt} />
                                })
                            }

                        </Row>

                    </Container>}
                <Ads modalState={this.state.modal} toggle={this.toggle} />
            </div>
        )
    }
}
