import React from 'react';

export default class Reader extends React.Component{

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      src: props.src
    };
    // if the image does not return a valid source
    getImage();
  }

  render(){
    return (
      <div>
        <img src={props.src}/>
      </div>
    );
  }

  //* function for if the source URL doesn't return an image. This will convert
  getImage(sourceURL){
    const requestedIndex = '3';
    const isRequestedAlreadyLoaded = loadedIndices.includes(requestedIndex);
    console.log(isRequestedAlreadyLoaded);
    if(!isRequestedAlreadyLoaded){

      // this fetch gets an image and turns it into an image element
      // normally the fetch URL in question would ask for a
      /** route to get image from the server **/
      //**
        fetch('http://127.0.0.1:5000/get_image').
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
              this.setState({src: url});
              return;
            }
          );
    }
  }//**/

}
