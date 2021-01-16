import React from 'react'
import {useDispatch} from 'react-redux'
import {Button} from 'react-bootstrap'
import {dislikePostAction} from '../actions/postActions'

const HandleDislike = ({post}) => {

    const dispatch = useDispatch()

    return (
        <>
            <Button
            onClick={() => dispatch(dislikePostAction(post._id))}
            type="button"
            variant='light'
          >
            <i className="fas fa-thumbs-down" />{' '}
            <span>{post.dislikes.length > 0 && <span>{post.dislikes.length}</span>}</span>
          </Button>{' '}
          </>
    )
}

export default HandleDislike
