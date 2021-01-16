import React from 'react'
import {useDispatch} from 'react-redux'
import {Button} from 'react-bootstrap'
import {likePostAction} from '../actions/postActions'

const HandleLike = ({post}) => {

    const dispatch = useDispatch()
    return (
        <>
            <Button
            onClick={() => dispatch(likePostAction(post._id))}
            type="button"
            variant='light'
          >
            <i className="fas fa-thumbs-up" />{' '}
            <span>{post.likes.length > 0 && <span>{post.likes.length}</span>}</span>
          </Button>{' '}
          </>
    )
}

export default HandleLike
