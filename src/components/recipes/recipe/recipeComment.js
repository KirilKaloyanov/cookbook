export function RecipeComment({c}) {
    let d = new Date(c.createdAt);
    return (
        <div className="border border-secondary rounded p-2 my-3" >
            <div>{c.comment}</div>
            <br />
            <em>{c.user}, {d.toDateString()}, {d.toLocaleTimeString()}</em>
        </div>
    )
}