import Post from "./Post";
import React from "react";
import { useLocation } from "react-router-dom";

function SearchList({ data, setdata, delhandler }) {
  const location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery();
  const searchQuery = query.get("query");
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="postlist">
      {filteredData.length > 0 ? (
        filteredData.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            blog={post.note}
            data={data}
            setdata={setdata}
            date={post.date}
            time={post.time}
            id={post.id}
            choice={post.choice}
            delhandler={delhandler}
          />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchList;
