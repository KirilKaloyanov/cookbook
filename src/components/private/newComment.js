import { useState } from "react";
import { publishComment } from "../../services/recipeService";

export function NewComment({ recipe, onRender }) {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);

    
    const handleChange = (e) => {
        if (comment.length !== 0) setError(null);
        setComment(e.target.value);
    }
    
    
    async function handleSubmit(e) {
        e.preventDefault();
        if (comment.length < 1) {
            setError({message: 'Comment field cannot be empty.'});
            return;
        } 
        const response = await publishComment({comment: comment}, recipe);
        setComment('');
        setError(null);
        onRender(response);
    }

    return (
        <>
            <h4 className="mt-4">New Comment</h4>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows='4'
                    className="form-control"
                    name='comment'
                    value={comment}
                    onChange={handleChange}
                />
                {error && <div className='alert alert-warning my-2' >{error.message}</div>}
                <input type='submit' className="btn btn-primary my-3" />
            </form>
        </>
    )
}