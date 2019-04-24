


async function fetchAlbums() {

  const res = await fetch('http://reduxblog.herokuapp.com/api/posts');

  res.then( )

  console.log("res", res);
  // console.log("res", res.json());
  const json = await res.json();
  console.log("json", json);


}

// fetchAlbums();



async function fetchAlbums2() {


console.log("etch('http://reduxblog.herokuapp.com/api/posts')", fetch('http://reduxblog.herokuapp.com/api/posts'));

  fetch('http://reduxblog.herokuapp.com/api/posts')
    .then( (res) => {
      console.log("res", res);

      return res.json();

    })
    .then((json) =>{
      console.log("json", json);


    })
}

fetchAlbums2()


