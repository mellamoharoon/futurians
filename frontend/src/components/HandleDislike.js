import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Button} from 'react-bootstrap'
import {dislikePostAction} from '../actions/postActions'

const HandleDislike = ({post}) => {
  const [count, setCount] = useState(post.dislikes.length)
  const [color, setColor] = useState('light')

  const clickHandler = (id) => {
    dispatch(dislikePostAction(id))
    setColor('primary')
    setCount(post.dislikes.length + 1)
  }

    const dispatch = useDispatch()

    return (
        <>
            <Button
            onClick={() => {clickHandler(post._id)}}
            type="button"
            variant={color}
          >
            <i className="fas fa-thumbs-down" />{' '}
            <span>{post.dislikes.length > 0 && <span>{count}</span>}</span>
          </Button>{' '}
          </>
    )
}

export default HandleDislike
