import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Addblog from "./Addblog";
import { off, remove } from "firebase/database";
import OpenPost from "../components/OpenPost";
import SearchList from "../components/SearchList";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import Post from "../components/Post";
import firebaseConfig from "../config/firebaseconfig";
import PageNotFound from "./PageNotFound";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { toast } from "react-toastify";

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


function Main() {
  const [loading, setLoading] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);

  const { user } = useUser();
  function createPost(userId, title, note, date, time, id, choice) {
    set(ref(database, "users/" + userId +'/' + id), {
      id: id,
      title: title,
      note: note,
      date: date,
      time: time,
      choice: choice,
    });
  }


  const editNote = async (userId, noteId, title, note, id, date, time, choice) => {
    try {
        await set(ref(database, `users/${userId}/${noteId}`), {
            id, title, note, date, time, choice
          });
          toast.success('Note successfully edited.');
    } catch (error) {
        toast.error(`Error editing note: ${error.message}`);
    }
};

useEffect(() => {
setLoading(true);
}, []);
  useEffect(() => {
    // Display data with the userid if exists
    if (loading && user) {
      setNotesLoading(true);
      const starCountRef = ref(database, "users/" + user.id);

      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          // Convert the data object to an array
          const postsArray = Object.keys(data).map((key) => data[key]);
          setPostsData([...postsArray]);
        } else {
          setPostsData([
            {
              choice: true,
              date: "now",
              id: "1",
              note: "## Follow the below steps to create your first Note:\n 1.Click on 'Create Note' button\n - 2.Add title and your note, and select your preferred note format\n - 3.Click on create\n - 4.View it here.",
              time: "now",
              title: "Creating New Note",
            },
          ]);
        }
        setNotesLoading(false);
      });

      return () => off(starCountRef);
    }
  }, [loading, user]);

 
  const deleteNoteHandler = async (userId, id) => {
    try {
        await remove(ref(database, `users/${userId}/${id}`));
        toast.success('Post deleted successfully.');
    } catch (error) {
        toast.error(`Error deleting post: ${error.message}`);
    }
};

  const [addBlog, setAddBlog] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar
          logo="NoteTaker"
          add={addBlog}
          setadd={setAddBlog}
          len={postsData.length}
          signin={<UserButton />}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {notesLoading ? (
                  <h1 className="loading">Loading...</h1>
                ) : (
                  <div className="postlist">
                    {postsData.map((item) => (
                      <Post
                        key={item.id}
                        title={item.title}
                        blog={item.note}
                        date={item.date}
                        time={item.time}
                        data={postsData}
                        setdata={editNote}
                        delhandler={deleteNoteHandler}
                        id={item.id}
                        choice={item.choice}
                      />
                    ))}
                  </div>
                )}
              </>
            }
          />
          <Route path="/add" element={<Addblog addnote={createPost} />} />
          <Route
            exact
            path="/post/:id"
            element={<OpenPost data={postsData} />}
          />
          <Route
            path="/search"
            element={
              <SearchList
                data={postsData}
                setdata={editNote}
                delhandler={deleteNoteHandler}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Main;
