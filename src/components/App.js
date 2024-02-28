import React from "react";
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//class base component filmlerin sayısı değişken olacagı ıcın bılgıler state ıcıne gomulur bu yuzden class base kullanıyoruz
class App extends React.Component{

    state={
            movies : [
                
            ],

            searchQuery: ""
    }

    //fetch api kullanarak
    //async componentDidMount(){
    //    const baseURL="http://localhost:3002/movies";
    //    const response= await fetch(baseURL); //async fonk.promise döner
    //    const data = await response.json();
    //    this.setState({movies:data})  
    //}


    componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        const response = await axios.get("http://localhost:3002/movies");
        this.setState({ movies: response.data })
    }

    //axios kullanarak
    /*async componentDidMount(){
        const response=await axios.get("http://localhost:3002/movies");
        console.log(response);
        this.setState({movies: response.data});
    }*/

    //app.js parent comp.dan movielist child comp.a propslarla delete işlemi tasınır
    //film silme işlemi için fonksiyon stateteki listeyi al yine ama silinenin id siyle aynı olmayanları
    //anlamına geliyor
    /*deleteMovie = (movie)=>{
        const newMovieList=this.state.movies.filter(
            m => m.id !== movie.id
        );

        //elimizde ilk durumda film bilgisi olmasaydı bu şablon kullanılırdı 
        //this.setState({
        //    movies : newMovieList
        //})

        //elimizde film bilgisi oldugu ıcın bu sekılde yazıyoruz
        this.setState(state =>({
            movies: newMovieList
        }))
    }*/

    //fetch api kullanarak
    /*deleteMovie = async(movie)=>{
       const baseURL=`http://localhost:3002/movies/${movie.id}`
       await fetch(baseURL,{
            method: "DELETE"
       })
       const newMovieList=this.state.movies.filter(
            m=> m.id !== movie.id
       );
       this.setState(state=>({
            movies: newMovieList
       }))

    }*/

    //axios kullanarak 
    //` işaretini altgr+virgül ile iki kere basarak yap
    //DELETE MOVIE
    deleteMovie = async (movie) => {

        axios.delete(`http://localhost:3002/movies/${movie.id}`)
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    }

     // ADD MOVIE
     addMovie = async (movie) => {
        await axios.post(`http://localhost:3002/movies/`, movie)
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }))

        this.getMovies(); //guncel yenılenen sayfa gelmesı ıcın
    }
    
    //arama input una her yazı yazıldıgında searchQuery i o yazılanla update ediyoruz
    //SEARCH MOVIE
    searchMovie = (event) => {
        this.setState({ searchQuery: event.target.value })
    }

    // EDIT MOVIE
    editMovie = async (id, updatedMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
        this.getMovies(); //guncel yenılenen sayfa gelmesı ıcın
    }


    render(){

        //indexof ile yazılan kelimeyi filmlerin name kısmı ıcınde arıyor bulamazsa indexof -1 döner o yuzden
        //-1 dönmediklerini yanı bulduklarını döndür diyoruz
        //hepsini küçük harf olarak algılayıp kıyaslaması ıcın toLowerCase kullandık
        let filteredMovies = this.state.movies.filter(
            (movie)=>{
                
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort((a,b)=>{
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        }); //en yeni filmi en başta görmek için 1 b yi al demek yani buyugu -1 de a yı al demek yanı buyugu eşitse de 0

        return (
            <Router>
                
                <Routes>
                <Route path="/" element={
                  <React.Fragment>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <SearchBar searchMovieProp={this.searchMovie} />
                      </div>
                    </div>
                    <MovieList
                      movies={filteredMovies}
                      deleteMovieProp={this.deleteMovie}
                    />
                    </div>
                    </React.Fragment>
                }> 
                </Route>
                <Route path="add" element={
                    <AddMovie 
                        onAddMovie = {(movie) => {this.addMovie(movie)}}
                    />
                }>
                </Route>

                {/* <Route path="/edit/:id" render={(props) => (
                    <EditMovie
                        {...props}
                        onEditMovie={(id, movie) => {
                            this.editMovie(id, movie)
                        }
                        }

                    />

                    )}>

                </Route> */}


                <Route
                    path="/edit/:id"
                    element={<EditMovie onEditMovie={(id, movie) => this.editMovie(id, movie)} />}
                />

                </Routes>
            </Router>
          );

    }
}

//functional component
//const App=()=>{
//    return (
//        <h1>My Movies</h1>
//    )
//}
export default App;