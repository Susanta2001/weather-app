import React, { Component } from "react";

export class Navbar extends Component {
    
    constructor() {
        super();
        this.state = {
            weather: [],
            loading: true,
            searchValue: ' '
        };
    }

    async componentDidMount() {
        this.fetchWeatherData("Raleigh")
    }

    fetchWeatherData = async (city) => {
        this.setState({loading: true});
        let url =
            `https://api.weatherbit.io/v2.0/current?&key=3451d2ef1e404673a20b77f2f364d315&city=${city}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            weather: parseData.data,
            loading: false,
        });
    }

    handleSearchClick = (event) =>{
        event.preventDefault();
        this.fetchWeatherData(this.state.searchValue)
    }

    handleInputChange = (event) => {
        this.setState({
            searchValue : event.target.value
        })
    }

    render() {
        const { weather, loading, searchValue } = this.state;
        return (
            <><nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Weather App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={this.handleSearchClick}>
                            <input className="form-control me-2" type="search" placeholder="Search" value={searchValue} aria-label="Search" onChange={this.handleInputChange}/>
                            <button className="btn btn-outline-success" type="submit" >Search</button>
                        </form>
                    </div>
                </div>
            </nav>

                <div
                    className="container my-4 d-flex align-items-center justify-content-center flex-column"
                    style={{ gap: "2rem" }}
                >
                    <h1 className="text-center text-success">Weather Information</h1>
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body text-center">
                            <h5 className="card-title">
                                {!loading && weather.length > 0 ? (
                                    <h3>{weather[0].city_name}</h3>
                                ) : (
                                    <p>Loading</p>
                                )}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">
                                {!loading && weather.length > 0 ? (
                                    <h3>{weather[0].weather.description}</h3>
                                ) : (
                                    <p>Loading</p>
                                )}
                            </h6>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
                            </p>
                            <div className="container d-flex align-items-center justify-content-around">
                                <p>
                                    Temperature:{" "}
                                    {!loading && weather.length > 0 ? (
                                        <h3>{weather[0].temp}</h3>
                                    ) : (
                                        <p>Loading</p>
                                    )}{" "}
                                </p>
                                <p>
                                    Visibility:{" "}
                                    {!loading && weather.length > 0 ? (
                                        <h3>{weather[0].vis}</h3>
                                    ) : (
                                        <p>Loading</p>
                                    )}{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Navbar;
