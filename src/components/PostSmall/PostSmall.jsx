import React, {useState, useContext } from 'react'
import bemCssModules from 'bem-css-modules'

//Styles
import { default as PostSmallStyles } from './PostSmall.module.scss'
const style = bemCssModules(PostSmallStyles);


const PostSmall = () => {
    return (
        <React.Fragment>
            <div className={style()}>
                <div className={style('likeSideBar')}>
                    <button className={style('likeSideBar__likeUpButton')}>
                        LikeUp
                    </button>

                    <div className={style('likeSideBar__likeCounter')}>
                        likeCounter
                    </div>

                    <button className={style('likeSideBar__likeDownButton')}>
                        LikeDown
                    </button>
                </div>

                <div className={style('Main')}>
                    <div className={style('Main__Information')}>
                        <div className={style('Main__Information__UserNameANDpostCategory')}>
                            <h4>User</h4>
                            <h4>PostCategory</h4>
                        </div>

                        <div className={style('Main__Information__Title')}>
                            Title
                        </div>
                    </div>

                    <div className={style('Main__PostContent')}
                        >
                        <div className={style('Main__PostContent__Text')}
                        >
                            Text
                        </div>

                        <div className={style('Main__PostContent__Photos')}
                        >
                            Photo
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PostSmall;