import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import useBlogCalls from '../hooks/useBlogCalls';

const UptadePost = () => {

    const { p_id } = useParams();
    const { state: post } = useLocation();

    let danger, success = '';
    if (post?.is_published === true) {
        danger = 'light';
        success = "success";
    } else {
        danger = "danger";
        success = "light";
    }


    const { categories } = useSelector((state) => state.blog)
    const [color, setColor] = useState({ danger: danger, success: success });
    const [singleBlogData, setSingleBlogData] = useState({
        title: post?.title,
        category_id: post?.category_id,
        content: post?.content,
        is_published: post?.is_published
    });
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState({});

    const { getCategories, updateCurrentPost, addNewCategory, getOnePost } = useBlogCalls();







    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', singleBlogData?.title);
        formData.append('category_id', singleBlogData?.category_id);
        formData.append('content', singleBlogData?.content);
        if (image) {
            formData.append('image', image);
        }
        formData.append('is_published', singleBlogData?.is_published);
        updateCurrentPost(p_id, formData);
    }

    const categorySubmit = (e) => {
        e.preventDefault();
        addNewCategory(category);
        setTimeout(() => {
            getCategories();
        }, 1000);
    }


    useEffect(() => {
        getCategories();
        getOnePost(p_id);
    }, [])

    return (
        <div className="primary-container-group">
            <div className="primary-container pt-4">
                <div className="container">
                    <div className="row margin-vert-10">
                        <div className="col-12">

                            <div className="row">
                                <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                                    <h2 className="text-center">--UPDATE POST--</h2>

                                    <div className='pb-1'>


                                        <img
                                            className="mb-1 rounded-2"
                                            src={post?.image}
                                            alt={post?.title}
                                        />

                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                value={singleBlogData.title || ''}
                                                onChange={(e) => setSingleBlogData({ ...singleBlogData, title: e.target.value })}
                                                className="form-control"
                                                id="floatingInput"
                                                placeholder="title"
                                                required
                                            />
                                            <label htmlFor="floatingInput">Title</label>
                                        </div>

                                        <div className='input-group mb-3' >
                                            <div className='form-floating'>
                                                <select className='form-control'
                                                    id="floatingSelectBox"
                                                    value={singleBlogData?.category_id || ''}
                                                    name="category"
                                                    onChange={(e) => setSingleBlogData({ ...singleBlogData, category_id: e.target.value })}
                                                >
                                                    <option style={{ visibility: 'hidden' }} defaultValue={singleBlogData?.category_id} value=""></option>
                                                    {categories?.map(category => {
                                                        return (
                                                            <option key={category?.id} value={category?.id}>{category?.name}</option>
                                                        )
                                                    })}

                                                </select>
                                                <label htmlFor="floatingSelectBox">Category</label>
                                            </div>
                                            <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                New
                                            </button>
                                        </div>

                                        <div className='form-floating mb-3 custom-file-button'>
                                            <div className='input-group'>
                                                <label className="input-group-text post-image" htmlFor="inputGroupFile">ADD POST IMAGE</label>
                                                <input
                                                    className='form-control'
                                                    type="file" multiple accept="image/*"
                                                    onChange={(e) => {
                                                        setImage(e.target.files[0])
                                                    }}
                                                    id="inputGroupFile"
                                                    name="myfile" />
                                            </div>
                                        </div>


                                        <div className="form-floating mb-3">
                                            <textarea
                                                style={{ height: "100px" }}
                                                value={singleBlogData.content || ''}
                                                onChange={(e) => setSingleBlogData({ ...singleBlogData, content: e.target.value })}
                                                className="form-control"
                                                placeholder="Leave a comment here"
                                                id="floatingTextarea"
                                                required
                                            />
                                            <label htmlFor="floatingTextarea">Content</label>
                                        </div>
                                        <div className='form-floating mb-4'>
                                            <div className='input-group'>

                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="is_published"
                                                    checked={singleBlogData.value === "true"}
                                                    onChange={(e) => setSingleBlogData({ ...singleBlogData, is_published: e.target.value })}
                                                    value="true"
                                                    id="success-outlined"
                                                    autoComplete="off"
                                                />
                                                <label onClick={(e) => setColor({ ...color, danger: 'light', success: 'success' })} className={`btn btn-${color?.success}`} htmlFor="success-outlined">
                                                    Published
                                                </label>
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="is_published"
                                                    checked={singleBlogData.value === "false"}
                                                    onChange={(e) => setSingleBlogData({ ...singleBlogData, is_published: e.target.value })}
                                                    value="false"
                                                    id="danger-outlined"
                                                    autoComplete="off"
                                                />
                                                <label onClick={(e) => setColor({ ...color, danger: 'danger', success: 'light' })} className={`btn btn-${color?.danger}`} htmlFor="danger-outlined">
                                                    Draft
                                                </label>
                                            </div>

                                        </div>

                                        <div className="d-grid gap-2">
                                            <button className="btn btn-primary" type="Submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>

                                    {/* Modal for adding a new category */}
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Category</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            value={category.name || ''}
                                                            onChange={(e) => setCategory({ ...category, name: e.target.value })}
                                                            className="form-control"
                                                            id="floatingInput"
                                                            placeholder="Add new category"
                                                            required
                                                        />
                                                        <label htmlFor="floatingInput">Category</label>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button data-bs-dismiss="modal" onClick={categorySubmit} type="button" className="btn btn-primary">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Modal for adding a new category */}


                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default UptadePost