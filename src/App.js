import './App.css';
// import { useEffect,useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Addblog from './pages/Addblog';
// import { off ,remove} from 'firebase/database';
// import OpenPost from './components/OpenPost';
// import SearchList from './components/SearchList';
import { SignedIn, SignedOut, SignInButton, UserButton,SignUpButton} from '@clerk/clerk-react'
// import { useUser } from '@clerk/clerk-react'
// import Post from './components/Post'
// import firebaseConfig from "./config/firebaseconfig";
// import PageNotFound from './pages/PageNotFound'
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set,onValue } from "firebase/database";
// import { toast } from 'react-toastify';
// import SignIn from './components/SignInComp';
// import SignUp from './components/SignUpComp';
import Home from './pages/Home'
import Sign from './pages/Sign';

// const app = initializeApp(firebaseConfig);

// const database = getDatabase(app);

function App() { 
//     const [loading,setloading] = useState(false) ;
//     const [postsData,setPostsData] = useState([])
//     const [notesloading, setnotesloading] = useState(false)

//     const {user} = useUser()
//     function writeUserData(userId, title,note,date,time,id,choice) {
//       set(ref(database, 'users/' + `${userId}/`+id), {
//         id:id,
//         title:title,
//         note:note,
//         date:date,
//         time:time,
//         choice: choice
//       });
//     }

//     const editNoteData = (userId ,Noteid,title,note,id,date,time,choice) => {
//       set(ref(database, 'users/' + userId + '/' + Noteid), { 
//         id:id,
//         title:title,
//         note:note,
//         date:date,
//         time:time,
//         choice: choice
//       })
//       .then(() => {
//           toast('Note successfully edited.')
//       })
//       .catch((error) => {
//           toast.error("Error writing data: ", error);

//       });
//   };

//     useEffect(() => {
//       if (loading && user) {  
//         setnotesloading(true)
//         const starCountRef = ref(database, 'users/' + user.id);
        
//         onValue(starCountRef, (snapshot) => {
//           const data = snapshot.val();
      
    
//           if (data) {
//             // Convert the data object to an array
//             const postsArray = Object.keys(data).map((key) => data[key]);
//             setPostsData([ ...postsArray]);
//             // console.log(postsData)
//           } else {
            
//             setPostsData([
//               {
//                 choice: true,
//                 date: "now",
//                 id: "1",
//                 note: "## Follow the below steps to create your first Note:\n 1.Click on 'Create Note' button\n - 2.Add title and your note, and select your preferred note format\n - 3.Click on create\n - 4.View it here.",
//                 time: "now",
//                 title: "Creating New Note"
//               }
//             ]);
            

//           }
//           setnotesloading(false)
          
//         });
    

//         return () => off(starCountRef);
//       }
//     }, [loading, user]);

    
//   function deleteNoteHandler(userId,id) {
//     const postRef = ref(database, `users/${userId}/${id}`);
    
//     // Remove the post from Firebase
//     remove(postRef)
//       .then(() => {
//         toast.success('Post deleted Successfully',);
//       })
//       .catch((error) => {
//         toast.error("Error deleting post:", error);
//         // alert("Could not delete the post. Please try again.");
//       });
// }
    
//     const [addBlog, setAddBlog] = useState(false);

    return (
  
        // <Router>
        <>
          <SignedOut>

            {/* <SignInButton />
            <SignUpButton></SignUpButton> */}
            <Home></Home>

          </SignedOut>
          <SignedIn>
            <Sign></Sign>
            {/* <div className="App">
                <Navbar logo='NoteTaker' add={addBlog} setadd={setAddBlog} len={postsData.length} signin={<UserButton />} />
              {loading===false ? setloading(true): ''}
                <Routes>
                    <Route path="/" element={
                      <>
                      {
                        notesloading ? <h1 className='loading'>Loading</h1> : 
                        <div className="postlist">
                            {postsData.map((item) => (
                              <Post
                                key={item.id }
                                title={item.title} 
                                blog={item.note}       
                                date={item.date} 
                                time={item.time} 
                                data={postsData} 
                                setdata={editNoteData} 
                                delhandler={deleteNoteHandler}
                                id={item.id}
                                choice={item.choice}
                              />
                            ))}
                          </div>
                      }
                      </>
                    } />
                    <Route path="/add" element={<Addblog addnote={writeUserData} />} />
                    <Route exact path="/post/:id" element={<OpenPost data={postsData} />} />
                    <Route path="/search" element={<SearchList data={postsData} setdata={editNoteData} delhandler={deleteNoteHandler} />} />
                    <Route path='*' element={<PageNotFound/>} />
                    </Routes>
            </div> */}
          </SignedIn>
                    </>
        // </Router>                                              
    );
}

export default App;
