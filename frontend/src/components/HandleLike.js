import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Button} from 'react-bootstrap'
import {likePostAction} from '../actions/postActions'

const HandleLike = ({post}) => {
  const [count, setCount] = useState(post.likes.length)
  const [color, setColor] = useState('light')

  const clickHandler = (id) => {
    dispatch(likePostAction(id))
    setColor('primary')
    setCount(post.likes.length + 1)
  }

    const dispatch = useDispatch()
    return (
        <>
            <Button
            onClick={() => {clickHandler(post._id)}}
            type="button"
            variant={color}
          >
            <i className="fas fa-thumbs-up" />{' '}
            <span>{post.likes.length > 0 && <span>{count}</span>}</span>
          </Button>{' '}
          </>
    )
}

export default HandleLike
