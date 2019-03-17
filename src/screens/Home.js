import React, { Component } from 'react'
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import Ads from '../components/Ads';
import { db } from '../config/Firebase';
import loader from '../images/loader.gif';
import CategoryFilter from '../components/CategoryFilter';
import OrderByFilter from '../components/OrderByFilter';
import InputRange from 'react-input-range';
import '../styles/Dashboard.css';
import { connect } from 'react-redux';
import { getAds, searchByTitle, filterByCategory, sortByOrder } from '../redux/olxAdd/action';
import InfiniteScroll from "react-infinite-scroll-component";


class Home extends Component {

    constructor(props) {
        super(props);


        this.state = {
            adsList: [],
            value: { min: 0, max: 0 },
            limit: 5,
            hasMore: true,
            adsCount: 0
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
        this.getAddCounts = this.getAddCounts.bind(this);
    }

    getSearchTextFromHeader(e) {
    
        this.props.searchByTitle(e);
        
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
    

    currentUser(user) {
        //console.log('user from app.js => ', user);
        this.setState({ currentUser: this.props.user, showLogin: false });
    }

    // updateChangePasswordState(result){
    //   this.setState({
    //       showChangePassword : result
    //   })
    // }

    logout(currentUser) {
        this.setState({ currentUser })
    }

    
    getMaxValue() {
        var myArr = [];
        var collectionRef = db.collection("ads");
        collectionRef.orderBy("price", "asc")
            .get().then(doc => {
                //console.log(doc);
                doc.forEach(res => {
                    //console.log(res.data());
                    if (res.data().title != null && res.data().description != null && res.data().price != null
                        && res.data().images.length != 0 && res.data().category != null) {
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
    fetchMoreData = () => {
        const { limit, adsCount } = this.state;
        console.log(adsCount);
        if (this.props.ads.length >= adsCount) {
            this.setState({ hasMore: false });
            return;
        }
        this.props.updateAddsFunc(limit);
        this.setState({ limit: limit + 1 });
        // this.getPosts().then(res => {
        //     console.log(res.results);
        //     this.setState({ limit: limit + 20, data:res.results });
        // });
    };
    componentDidMount() {
        //this.getAllAds();
        const { limit } = this.state;
        this.props.updateAddsFunc(limit);
        this.setState({ limit: limit + 1 });
        this.getMaxValue();
        this.getAddCounts();
        // this.refs.iScroll.addEventListener("scroll", () => {
        //     console.log('scroll..')
        // })
    }

    orderByFilter(type) {
        this.props.sortByOrder(type);
    }

    categoryFilter(category) {
        this.props.categoryFilter(category);
    }

    showDetail(id) {
        this.props.history.push({
            pathname: `/AddDetail/${id}`,
        })
    }
    getText(e) {
        this.props.searchText(e.target.value);
    }

    async getAddCounts(){
        try{
            db.collection("ads").onSnapshot((snapshot)=>{
                var arr = [];
    
                //console.log("realtime update...");
                snapshot.forEach((change)=>{
                    const obj = {id: change.id, ...change.data()}
                    arr.push(obj);
                });
                this.setState({adsCount: arr.length});
                //console.log(arr);
            });
        }
        catch(e){

        }
        
    }

    render() {
        const {hasMore, showProfile, value, maxPrice, showLogin, showRegister, user, showChangePassword, currentUser } = this.state;
        //var { adsList } = this.state;
        const { ads, showLoader } = this.props;
        //ads = ads.filter((item) => item.price >= value.min && item.price <= value.max);
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
                                    onChange={value => this.setState({ value })}
                                />
                                
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
                    
                        
                            <InfiniteScroll
                                dataLength={ads.length}
                                next={this.fetchMoreData}
                                hasMore={hasMore} 
                                loader={<div className="d-flex justify-content-center" style={{ marginTop: '10%' }}>
                                <img width="7%" height="3%" src={loader} />
                            </div>}
                                endMessage={
                                    <p style={{ textAlign: "center" }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                            <Container className="mt-3">
                            <Row>
                                {
                                    ads.map((item, index) => {
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
                                </Container>
                            </InfiniteScroll>


                        

                    }
                <Ads modalState={this.state.modal} toggle={this.toggle} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        ads: state.adsReducer.ads,
        showLoader: state.adsReducer.showLoader
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAddsFunc: (limit) => dispatch(getAds(limit)),
        searchByTitle: (e) => dispatch(searchByTitle(e)),
        categoryFilter: (category) => dispatch(filterByCategory(category)),
        sortByOrder: (type) => dispatch(sortByOrder(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);