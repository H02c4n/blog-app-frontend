import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import useBlogCalls from '../hooks/useBlogCalls';

import { BsFillPersonFill, BsFillTagFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { AiOutlineDislike, AiOutlineLike, AiFillStar } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { IoHeartDislike } from "react-icons/io5";
import { GrView } from "react-icons/gr";

import profile from '../assets/avatar.png';
import CommentForm from '../components/CommentForm';
import Favourite from '../components/Favourite';



const Details = () => {

  


  const { id } = useParams();
  const { getOnePost, likeChange, dislikeChange, commentLikeChange, commentDislikeChange, favouriteToggle } = useBlogCalls();
  const { currentUserId} = useSelector((state) => state.auth);
  const { currentPost, themes } = useSelector((state) => state.blog);


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


  

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const splittedmonth = currentPost?.created.split(',')[1]
  const formattedMonth = months[splittedmonth - 1]

  useEffect(() => {
    if (id) {
      getOnePost(id);
    }
  }, [id, currentPost?.like_count, currentPost?.dislike_count, currentPost?.rate_avg]);

  const author = currentPost?.author?.split('@')[0];


  return (
    <div id="content" className="container">
      <div className="row margin-vert-30">
        {/* Main Column */}
        <div className="col-md-10 offset-md-1">
          <div className="blog-post">
            <div className="blog-item-header border border-start-0 border-top-0 border-2">
              <div style={{color:customStyle.font_color, borderColor:customStyle.second_color}} className="blog-post-date pull-left">
                <span className="day">{currentPost?.created.split(',')[0]}</span>
                <span style={{backgroundColor:customStyle.second_color}} className="month">{formattedMonth}</span>
              </div>
              <h2>
                <p style={{color:customStyle.font_color, fontSize:customStyle.font_size}} >{currentPost?.title} <Favourite currentPost={currentPost} favouriteToggle={favouriteToggle} /></p>
              </h2>
            </div>
            <div className="blog-post-details">
              <div style={{backgroundColor:customStyle.second_color }} className="blog-post-details-item blog-post-details-item-left">
                <BsFillPersonFill className='icon' />
                {author}
              </div>
              <div style={{backgroundColor:customStyle.second_color }} className="blog-post-details-item blog-post-details-item-left">
                <BsFillTagFill className='icon' /> {currentPost?.category}
              </div>
              <div style={{backgroundColor:customStyle.second_color }} className="blog-post-details-item blog-post-details-item-left">
                <FaComments className='icon' /> {currentPost?.comments_count} Comments
              </div>
              
            </div>
            <div className="blog-item">
              <div className="clearfix" />
              <div className="blog-post-body row margin-top-10">
                <div className="col-md-7">
                  <div style={{background: customStyle.second_color}} className='postContainer pb-1'>


                    <img
                      className="pull-left mb-1"
                      src={currentPost?.image}
                      alt=""
                    />
                    <span role="button" onClick={() => likeChange(id)} className="badge bg-success me-1 ms-1">
                      <AiOutlineLike style={{ fontSize: "14px" }} /> {currentPost?.like_count}
                    </span>
                    <span role="button" onClick={() => dislikeChange(id)} className="badge bg-danger me-1">
                      <AiOutlineDislike style={{ fontSize: "14px" }} /> {currentPost?.dislike_count}
                    </span>
                    <span className='badge bg-info'>
                      <GrView /> {currentPost?.visit_count}
                    </span>
                    {/* <button className="btn btn-sm btn-info">
                      <GrView style={{ fontSize: "10px" }} /><span className="badge badge-sm badge-light">{currentPost?.visit_count}</span>
                    </button> */}
                    <div className='d-inline-block float-end me-1'>
                      <span className="heading text-center">
                        <AiFillStar className={`${currentPost?.rate_avg > 0 && 'star'}`} style={{ fontSize: "20px" }} />
                        <AiFillStar className={`${currentPost?.rate_avg > 1 && 'star'}`} style={{ fontSize: "20px" }} />
                        <AiFillStar className={`${currentPost?.rate_avg > 2 && 'star'}`} style={{ fontSize: "20px" }} />
                        <AiFillStar className={`${currentPost?.rate_avg > 3 && 'star'}`} style={{ fontSize: "20px" }} />
                        <AiFillStar className={`${currentPost?.rate_avg > 4 && 'star'}`} style={{ fontSize: "20px" }} />
                      </span>

                      <span className='badge bg-warning'>{currentPost?.rate_avg} / {currentPost?.rate_count}</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-3">
                  <p>
                    {currentPost?.content}
                  </p>
                </div>

              </div>
              <div className="blog-item-footer">
                {/* Comments */}
                <div className="blog-recent-comments panel panel-default margin-bottom-30">
                  <div className="panel-heading">
                    <h3>Comments</h3>
                  </div>
                  <ul className="list-group">
                    {currentPost?.comments?.map(comment => {
                      return (
                        <li key={comment.id} className="list-group-item">
                          <div className="row">
                            <div className="col-md-2 profile-thumb">
                              <Link to="">
                                <img
                                  className="media-object commentor"
                                  src={profile}
                                  alt=""
                                />
                                <p className='text-center commentor_name'>{comment.commentor?.split('@')[0]} </p>
                              </Link>
                            </div>
                            <div className="col-md-10">
                              <h4>{comment.title}</h4>
                              <p>
                                {comment.comment}
                              </p>

                              <div className='d-flex justify-content-between' >
                                <span className="date">
                                  <i className="fa fa-clock-o" /> {comment.created_date}
                                </span>
                                <div className='col-4 d-flex justify-content-evenly' >
                                  <div className='col-2 d-flex justify-content-center' >
                                    <button onClick={() => commentLikeChange(id, comment.id)} type="button" className="btn btn-sm btn-light">
                                      <FcLike style={{ fontSize: "16px" }} /> <span className="badge badge-light text-danger">{comment?.like_count}</span>
                                    </button>
                                  </div>
                                  <div className='col-2 d-flex justify-content-center' >
                                    <button onClick={() => commentDislikeChange(id, comment.id)} type="button" className="btn btn-sm btn-light">
                                      <IoHeartDislike style={{ fontSize: "16px" }} /> <span className="badge badge-light text-danger">{comment?.dislike_count}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    })}

                    {/* Comment Form */}
                    <li className="list-group-item">
                      <CommentForm id={id} />
                    </li>
                    {/* End Comment Form */}
                  </ul>
                </div>
                {/* End Comments */}
              </div>
            </div>
          </div>
          {/* End Blog Post */}{" "}
        </div>
        {/* End Main Column */}
        {/* Side Column */}

      </div>
    </div>


  )
}

export default Details