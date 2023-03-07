import React, { useEffect } from 'react'
import useBlogCalls from '../../hooks/useBlogCalls';
import { BsFillPersonFill, BsFillTagFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


const BlogCard = () => {

  const { getPosts, getOneAuthor, getThemes } = useBlogCalls();
  const navigate = useNavigate();
  const { posts, themes } = useSelector((state) => state.blog);
  const { currentUserId } = useSelector((state) => state.auth);


  useEffect(() => {
    getPosts();
    getThemes();
    getOneAuthor(currentUserId);
  }, [])



  const customStyle = {
  }

  themes?.forEach(theme => {
    if (theme.theme_owner_id === currentUserId) {
      customStyle.first_color = theme?.first_color;
    customStyle.second_color = theme?.second_color;
    customStyle.font_color = theme?.font_color;
    customStyle.font_size = theme?.font_size;
    }
  });


  return (
    <div>
      {posts?.filter(post => post?.is_published === true).map(post => {
        const { id, title, image, slug, author, created, content, category, comments_count } = post

        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const splittedmonth = created.split(',')[1]
        const formattedMonth = months[splittedmonth - 1]

        return (
          <div key={id} className="blog-post padding-bottom-20">
            {/* Blog Item Header */}
            <div className="blog-item-header">
              {/* Date */}
              <div style={{color:customStyle.font_color, borderColor:customStyle.second_color}} className="blog-post-date pull-left">
                <span className="day">{created.split(',')[0]}</span>
                <span style={{backgroundColor:customStyle.second_color}} className="month">{formattedMonth}</span>
              </div>
              {/* End Date */}
              {/* Title */}
              <h2>
                <p style={{color:customStyle.font_color, fontSize:customStyle.font_size}}>
                  {title}		</p>
              </h2>
              <div className="clearfix" />
              {/* End Title */} 
            </div>
            {/* End Blog Item Header */}
            {/* Blog Item Details */}
            <div className="blog-post-details">

              <div style={{backgroundColor:customStyle.second_color }} className="blog-post-details-item blog-post-details-item-left user-icon">
                <BsFillPersonFill className='icon' /> {author?.split('@')[0]}
              </div>
              <div style={{backgroundColor:customStyle.second_color }} className="blog-post-details-item blog-post-details-item-left user-icon">
                <BsFillTagFill className='icon' /> {category}
              </div><div style={{backgroundColor:customStyle.second_color }} className="blog-post-details-item blog-post-details-item-left user-icon">
                <FaComments className='icon' /> {comments_count} Comments
              </div>

            </div>
            {/* End Blog Item Details */}
            {/* Blog Item Body */}
            <div className="blog">
              <div className="clearfix" />
              <div className="blog-post-body row margin-top-15">
                <div className="col-md-5">
                  <img className="pull-left rounded-3" src={image} alt="" />
                </div>
                <div className="col-md-7">
                  <p style={{ height: "146px", overflow: "hidden" }}>{content}</p>
                  {/* Read More */}
                  <span onClick={() => navigate(`posts/${id}/${slug}`, { state: post })} className="btn btn-primary">
                    Read More <i className="icon-chevron-right readmore-icon" />
                  </span>
                  {/* End Read More */}
                </div>
              </div>
            </div>
            {/* End Blog Item Body */}
          </div>
        )
      })}


    </div>
  )
}

export default BlogCard