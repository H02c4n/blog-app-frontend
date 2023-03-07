import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useBlogCalls from '../hooks/useBlogCalls'
import { MdAddPhotoAlternate, MdDeleteForever } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';
import profile from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom';
import CustomCss from '../components/CustomCss';

const Profile = () => {


  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const { getOneAuthor, updateProfilePicture, getPosts, deleteCurrentPost } = useBlogCalls();
  const { currentUserId } = useSelector((state) => state.auth);
  const { currentAuthor, posts } = useSelector((state) => state.blog);


  useEffect(() => {
    getOneAuthor(currentUserId)
    getPosts()
  }, [currentUserId, image])


  const sendImage = () => {
    const formData = new FormData()
    formData.append('image', image)
    updateProfilePicture(currentAuthor?.id, formData)
    getOneAuthor(currentUserId)
  }


  return (
    <div>
      <div className="primary-container-group">
        <div className="primary-container">

          <div className="container">
            {/* === END HEADER === */}
            {/* === BEGIN CONTENT === */}
            <div className="row margin-vert-30">
              {/* Main Column */}
              <div className="col-md-12">

                <div className="row margin-vert-30">
                  <div className="col-md-12">
                    <h3 className="padding-top-10">About {currentAuthor?.display_name}</h3>
                    <div className="row">
                      <div className="col-md-3">
                        <div className='position-relative'>
                          <img
                            src={currentAuthor?.image ? currentAuthor?.image : profile}
                            alt="about-me"
                            className="margin-top-10"
                          />
                          <MdAddPhotoAlternate type='button' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ fontSize: "32px" }} className='position-absolute top-0 end-0' />

                        </div>

                      </div>
                      <div className="col-md-9 margin-bottom-10">
                        {currentAuthor?.bio && (
                          <h3 className="padding-top-10 pull-left mt-2 border-0 d-block">
                          Biography <small> **</small>
                          </h3>
                        )}
                        <div className="clearfix" />
                        <p>
                          {currentAuthor?.bio}
                        </p>
                      </div>
                    </div>


                    <h4 className="padding-top-10 my-2  border-bottom  border-secondary">
                      {currentAuthor?.display_name}'s <small>Post</small>
                    </h4>
                    {posts?.filter(post => post?.author_id === currentUserId).map(post => {
                      return (
                        <div key={post?.id} className='border boerder-3 p-2 mb-1 rounded-2 d-flex justify-content-between'>
                          <span>{post?.title}</span>
                          <span>
                            <span role="button" onClick={() => {
                              navigate(`/update-post/${post?.id}`, { state: post });
                            }} className='badge bg-warning me-1'><RxUpdate /> update</span>
                            <span role="button" onClick={() => deleteCurrentPost(post?.id)} className='badge bg-danger'><MdDeleteForever /> delete</span>
                          </span>
                        </div>
                      )
                    })}


                    <h4 className="padding-top-10 my-2  border-bottom  border-secondary">
                      {currentAuthor?.display_name}'s <small>Reading List</small>
                    </h4>
                    
                    {posts?.filter(post => post.favourites.includes(currentUserId)).map(post => {
                      return(
                        <div key={post?.id} className='border boerder-3 p-2 mb-1 rounded-2 d-flex justify-content-between'>
                          <span role="button"  onClick={() => {
                              navigate(`/posts/${post?.id}/${post?.slug}`);}}>
                                {post?.title}
                                </span>
                          <span>
                            <img src={post?.image} style={{width:'70px', height:'auto' }} className='rounded-2'  alt="" />
                          </span>
                        </div>
                      )
                    })}



                    <h4 className="padding-top-10 my-2  border-bottom  border-secondary">
                      {currentAuthor?.display_name}'s <small>custom style</small>
                    </h4>

                    <CustomCss currentUserId={currentUserId}/>





                    {/* Author profil picture upload modal */}
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                              Update Profile
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <label htmlFor="myfile">Select a file:</label>
                            <input
                              type="file" multiple accept="image/*"
                              onChange={(e) => {
                                setImage(e.target.files[0])
                              }}
                              id="myfile"
                              name="myfile" />
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button onClick={sendImage} type="button" data-bs-dismiss="modal" className="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Author profil picture upload modal */}

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Profile