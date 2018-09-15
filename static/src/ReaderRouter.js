import React from 'react';
import ReactDOM from 'react-dom';
//import {Router, Route, browserHistory} from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom' in order to link pages to one another
import helloWorld from './helloWorld';
import Reader from './Reader';
export default class ReaderRouter extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      pages: [
        {
          name: "1",
          src: "http://127.0.0.1:5000/get_image"
        }
      ]
    };

  }



  render(){
    const pageRoutes = this.state.pages.map((page)=>{
      return (
        // return a reader matching the current route
        <Route key={page.name} exact={true} path={'/p/'+String(page.name)}
          render={(props)=>{return (<Reader {...props} src={page.src}/>);}}
        />
      );
    });
    console.log(pageRoutes);
    return (
      <Router>
        <div>
          <Route exact={true} path='/' component={helloWorld} />
          {pageRoutes}
        </div>
      </Router>
    );
  }

}

/**
      //create a single general route structure that directs the router
      <Route path='/:pageId' component={ Reader }/>

      /**
      //
      {this.state.pages.map((page)=>{
        return (
          // return a reader matching the current route
          <Route key={page.name} path={String(page.name)}
            render={(props)=>{return (<Reader {...props} src={page.src}/>);}}
          />
        );
      })}
      **/
