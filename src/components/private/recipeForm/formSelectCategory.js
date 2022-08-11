import { useState, useEffect } from "react";
import { getCategories } from "../../../services/categoryService";

export function FormSelectCategory({ value, onChange }) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories()
            .then(result => setCategories(result))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="form-group">
            <label htmlFor="categories">Category: </label>
            <select
                className="form-control"
                name="category"
                value={value}
                onChange={onChange}
            >
                <option value='' />
                {
                    (categories.length === 0 && <option value=''>loading categories... </option>) 
                    ||
                    categories.map((c) => (
                        <option key={c._id} value={c.name}>
                            {c.name}
                        </option>
                    ))
                }
            </select>

        </div>
    );
}