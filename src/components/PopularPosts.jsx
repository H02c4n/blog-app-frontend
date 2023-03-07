import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PopularPosts = () => {

  const { posts } = useSelector((state) => state.blog);
  const navigate = useNavigate();


  return (
    <div className="recent-posts">
      <h3>Popular Posts</h3>
      <ul className="posts-list margin-top-10">
        {posts?.filter(post => post?.visit_count > 0).sort((post1, post2) => post2.visit_count - post1.visit_count).slice(0, 5).map(post => {
          return (
            <li onClick={() => navigate(`posts/${post?.id}/${post?.slug}`, { state: post })} key={post?.id}>
              <div className="recent-post">
                <Link to="">
                  <img className="pull-left pullleft" src={post?.image} alt="" />
                </Link>
                <Link to="" className="posts-list-title">{post?.title}</Link>
                <br />
                <span className="recent-post-date">
                  {post?.created}
                </span>
              </div>
              <div className="clearfix"></div>
            </li>
          )
        })}


      </ul>
    </div>
  )
}

export default PopularPosts