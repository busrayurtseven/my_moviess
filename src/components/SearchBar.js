import React from "react";
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {

    //formun varsayılan submit buttonunu durdurur yani search kısmında entera basıldıgında sayfa yenılenmez
    handleFormSubmit =(event) => {
        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-row mb-5 mt-3 d-flex">
                    <div className="col-10">
                        <input 
                            onChange={this.props.searchMovieProp}   
                            type="text" 
                            className="form-control" 
                            placeholder="Search a movie.."
                        />
                    </div>
                    <div className="col-2">
                        <Link   
                                to="/add"
                                type="button"
                                className="btn btn-md btn-danger"
                                style={{float: "right"}}>Add Movies
                        </Link>
                    </div>
                </div>
            </form>
        )

    }
}
export default SearchBar;