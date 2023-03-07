
import { fetchStart, loadData, fetchFail, fetchEnd } from '../features/blogSlice';
import { useDispatch, useSelector } from 'react-redux'
import { toastSuccessNotify, toastErrorNotify } from '../helper/toastify';
import useAxios from './useAxios';
import { useNavigate } from 'react-router-dom';
import { axiosPublic } from './useAxios';

const useBlogCalls = () => {

    const dispatch = useDispatch();
    const { axiosWithToken } = useAxios();
    const { currentUserId } = useSelector((state) => state.auth);
    const navigate = useNavigate();





    //! --------------GET CALLS----------------
    const getAll = async (url) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosPublic.get(`api/${url}/`)
            dispatch(loadData({ data, url }));
        } catch (error) {
            dispatch(fetchFail());
            console.log(error);
        }
    };

    const getOne = async (url, id) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.get(`api/posts/${id}/`)
            dispatch(loadData({ data, url }));

        } catch (error) {
            dispatch(fetchFail());
            console.log(error);
        }
    };


    const getAuthor = async (url, id) => {
        dispatch(fetchStart());
        const { data } = await axiosWithToken.get(`api/author/`)
        let authorId = '';
        data?.forEach(author => {
            if (author.user_id === id) {
                authorId = author.id
            }
        });
        try {
            const { data } = await axiosWithToken.get(`api/author/${authorId}/`)
            dispatch(loadData({ data, url }));
        } catch (error) {
            dispatch(fetchFail());
            console.log(error);
        }

    };


    const getPostsByCategory = async (url, categoryId) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosPublic.get(`api/categories/${categoryId}/${url}/`)
            dispatch(loadData({ data, url }));
        } catch (error) {
            dispatch(fetchFail());
            console.log(error);
        }
    }

    const favouriteToggle = async(id) =>{
        await axiosWithToken.get(`api/fav/${id}/`)
    }


    const getPosts = () => getAll('posts');
    const getCategories = () => getAll('categories');
    const getThemes = () => getAll('themes');
    const getOnePost = (id) => getOne('currentPost', id);
    const getOneAuthor = (id) => getAuthor('currentAuthor', id);
    const updateCategory = (categoryId) => getPostsByCategory('posts', categoryId)


    //! ----------POST CALLS--------------------

    const sendData = async (id, url, info, message) => {

        try {
            await axiosWithToken.post(`api/posts/${id}/${url}/`, info);
            toastSuccessNotify(message);

            getOnePost(id);
        } catch (error) {
            console.log(error);
            //toastErrorNotify(error.response.data[0]);
        }
    }

    const sendPost = async (url, info, message) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.post(`api/${url}/`, info);
            dispatch(fetchEnd());
            toastSuccessNotify(message);
            navigate("/");
        } catch (error) {
            console.log(error);
            //toastErrorNotify(error.response.data[0]);
        }
    }

    const addNewCategory = async (info) => {
        try {
            await axiosWithToken.post(`api/categories/`, info);
            toastSuccessNotify(`Category ${info?.name} added!!!`);
        } catch (error) {
            console.log(error);
        }
    }


    const addComment = (id, info) => sendData(id, 'comments', info, 'You commented succesfully');


    const addRate = (id, info) => sendData(id, 'ratings', info, 'You rated succesfully');

    const addPost = (info) => sendPost('posts', info, `Post is created successfully`);



    //!  --------------UPDATE CALLS--------------

    const change = async (id, url) => {
        try {
            const { data } = await axiosWithToken.get(`api/posts/${id}/${url}/`);
            if (data.length === 0) {
                axiosWithToken.post(`api/posts/${id}/${url}/`)
                getOnePost(id);
            }

            data.forEach(element => {
                    
                if (parseInt(element.liker_id) === currentUserId) {
                
                    axiosWithToken.put(`api/posts/${id}/${url}/${element.id}/`)
                    getOnePost(id);
                } else if (parseInt(element.liker_id) !== currentUserId) {
                    axiosWithToken.post(`api/posts/${id}/${url}/`)
                    getOnePost(id);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const likeChange = (id) => change(id, 'likes');
    const dislikeChange = (id) => change(id, 'dislikes');



    const updatePost = async (id, info) => {
        try {
            await axiosWithToken.put(`api/posts/${id}/`, info);
            toastSuccessNotify('post is updated successfuly!');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const updateStyle = async (info) => {
        try {
            const {data} = await axiosWithToken.get('api/themes/');
            if (data.length === 0) {
                axiosWithToken.post(`api/themes/`, info);
                getThemes();
                    toastSuccessNotify('Theme is saved successfully!');
                    navigate('/');
            }
            data.forEach(theme => {
                if (parseInt(theme.theme_owner_id) !== currentUserId) {
                    axiosWithToken.post(`api/themes/`, info);
                    getThemes();
                    toastSuccessNotify('Theme is saved successfully!');
                    navigate('/');
                } else if (parseInt(theme.theme_owner_id) === currentUserId) {
                    axiosWithToken.put(`api/themes/${theme.id}/`, info);
                    toastSuccessNotify('Theme is saved successfully!');
                    navigate('/');
                }
            })
        } catch (error) {
            console.log(error);
        }
        
    }


    const updateCurrentPost = (id, info) => updatePost(id, info);




    const commentChange = async (id, cId, url) => {
        try {
            const { data } = await axiosWithToken.get(`api/posts/${id}/comments/${cId}/${url}/`);
            if (data.length === 0) {
                axiosWithToken.post(`api/posts/${id}/comments/${cId}/${url}/`);
                getOnePost(id);
            }
            data.forEach(element => {
                if (parseInt(element.liker_id) === currentUserId) {
                    axiosWithToken.put(`api/posts/${id}/comments/${cId}/${url}/${element.id}/`)
                    getOnePost(id);
                } else if (parseInt(element.liker_id) !== currentUserId) {
                    axiosWithToken.post(`api/posts/${id}/comments/${cId}/${url}/`);
                    getOnePost(id);
                }
            });

        } catch (error) {
            console.log(error)
        }
    }




    const updatePicture = async (id, info) => {
        try {
            await axiosWithToken.patch(`api/author/${id}/`, info);
        } catch (error) {

        }

    }


    const commentLikeChange = (id, cId) => commentChange(id, cId, 'likes');
    const commentDislikeChange = (id, cId) => commentChange(id, cId, 'dislikes');
    const updateProfilePicture = (id, info) => updatePicture(id, info);


    //! -------------------DELETE CALLS------------------------------

    const deletePost = async (id) => {
        try {
            await axiosWithToken.delete(`api/posts/${id}/`);

            toastSuccessNotify('post is deleted successfuly!');
            navigate('/');
        } catch (error) {
            toastErrorNotify('Something went wrong!!!');
            console.log(error);
        }
    }

    const deleteCurrentPost = (id) => deletePost(id);



    return {
        getPosts,
        getCategories,
        updateCategory,
        likeChange,
        dislikeChange,
        getOnePost,
        addComment,
        addRate,
        addPost,
        commentLikeChange,
        commentDislikeChange,
        addNewCategory,
        getOneAuthor,
        updateProfilePicture,
        updateCurrentPost,
        deleteCurrentPost,
        favouriteToggle,
        getThemes,
        updateStyle
    }
}

export default useBlogCalls