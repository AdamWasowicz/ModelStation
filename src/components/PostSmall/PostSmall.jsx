import React, {useState, useContext, useEffect } from 'react'
import bemCssModules from 'bem-css-modules'
import { API_address } from '../../Constants';

//Styles
import { default as PostSmallStyles } from './PostSmall.module.scss'
const style = bemCssModules(PostSmallStyles);


const PostSmall = React.forwardRef((postObject, ref) => {
    const post = postObject.postObject;

    //useState
    const [photos, setPhotos] = useState([]);

    useEffect( () => {
        let urlArray = [];

        post.files.forEach(element => {
            urlArray.push(`${API_address}/api/v1/fileStorage/file/name/${element.storageName}`)
        })

        setPhotos(urlArray);

    }, []);

    return (
        <React.Fragment>
            <div className={style()} ref={ref}>
                <div className={style('likeSideBar')}>
                    <button className={style('likeSideBar__likeUpButton')}>
                        LikeUp
                    </button>

                    <div className={style('likeSideBar__likeCounter')}>
                        {post.likes}
                    </div>

                    <button className={style('likeSideBar__likeDownButton')}>
                        LikeDown
                    </button>
                </div>

                <div className={style('Main')}>
                    <div className={style('Main__Information')}>
                        <div className={style('Main__Information__UserNameANDpostCategory')}>
                            <h4>{post.userName}</h4>
                            {post.postCategoryId != null? <h4>PostCategory</h4> : null}
                        </div>

                        <div className={style('Main__Information__Title')}>
                            {post.title}
                        </div>
                    </div>

                    <div className={style('Main__PostContent')}
                        >
                        <div className={style('Main__PostContent__Text')}
                        >
                            {post.text}
                        </div>

                        {photos.length != 0 ?  (<div className={style('Main__PostContent__Photos')}
                        >
                            <img src={photos[0]}/>
                        </div>) : null}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
});

export default PostSmall;