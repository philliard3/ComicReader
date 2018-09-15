import React from 'react';
import ReactDOM from 'react-dom';
import ReaderRouter from './ReaderRouter';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import MaterialApp from './MaterialApp'
//import './Theme'
/*const fs = require('fs');
fs.readFile('../../images/maus-p12.jpg', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    document.getElementById('imgToLoad').src = URL.createObjectURL(data);
});
**/
/*import maus from '../dist/maus-p12.jpg';
console.log(maus);
*/
const title = 'My spooky React Webpack Babel Setup';
const pages = [];/*
  {pageName: '1', img: ()=>{return (<img src="page.png" />)}},
  {pageName: '2', img: ()=>{return (<img src="page.png" />)}},
];*/
console.log(pages);
const loadedIndices = pages.map((obj)=>{return obj.pageName;})
console.log(loadedIndices);
const requestedIndex = '3';
const isRequestedAlreadyLoaded = loadedIndices.includes(requestedIndex);
console.log(isRequestedAlreadyLoaded);
if(!isRequestedAlreadyLoaded){

  // this fetch gets an image and turns it into an image element
  // normally the fetch URL in question would ask for a
    fetch('http://127.0.0.1:5000/get_image'/** route to get image from the server **/).
      then((response)=>{return response.body;}).
      then((body)=>{
        const reader = body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                    controller.close();
                    return;
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          }
        })
      })
      .then((stream)=>{return new Response(stream);})
      .then((response)=>{ return response.blob();})
      .then((blob)=>{return URL.createObjectURL(blob);})
      .then(
        function(url){
          console.log(url);
          pages.push({pageName: requestedIndex, img: url})
          console.log(pages);
          // return blobURL OR a React-rendered img tag
          // return URL.createObjectURL(response);
          // OR
          return <img src={url} />
        }
      ).then(
        function(img){
          /*pages.push({pageName: requestedIndex, img: blob})
          console.log(pages);*/
          return;
        }
      );
}

// Here I need to decide
// Do I want to have a bunch of Reader components or just done?
// If I have just one, I make it very easy to maintain reading state when I swap pages
const pageRoutes = pages.map(
  (obj)=>{
    return {
      component: <img /> // replace with the necessary routing properties when needed
      // the properties here should be sufficient to route the proper image
      // to the inner Reader
    };
  }
);

// TODO: Convert this to a component
// TODO: find out why this isn't rendering new elements
  // (it's probably because there's no this.state to update)
ReactDOM.render(
  <div>
    <ReaderRouter />
  </div>,
  //<div>{title} {pages.map((page)=>{return <img src={page.img} />;})}</div>,
  document.getElementById('reader-root')
);

module.hot.accept();

// const root = document.getElementById('reader-root');

/*
console.log(root);
console.log(root.random);

ReactDOM.render(<MaterialApp />, root);
registerServiceWorker();
*/
