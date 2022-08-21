import styles from './recipeForm.module.css';

export function FormDynamicFields({
    label,
    fields,
    fieldName,
    onFieldChange
}) {
    return (
        <>
            <br />
            <h5>{label}:</h5>
            {fields.map((field, index, arr) => {
                let autoFocusFlag = false;
                if (arr.length > 1 && index === arr.length - 1 && field[fieldName].length === 0) autoFocusFlag = true;
                return (
                    <div className="row" key={field.id}>
                        <h5 className={`col-md-1 ${styles.center}`}>{index + 1}.</h5>

                        <div className="col-md-8">
                            <input
                                autoFocus={autoFocusFlag}
                                name={fieldName}
                                className="form-control"
                                value={field[fieldName]}
                                onChange={(e) => onFieldChange(e, 'change', index)}
                            />
                        </div>
                        <div className="col-md-3">
                            <button
                                name={fieldName}
                                onClick={(e) => onFieldChange(e, 'remove', index)} 
                                className="btn btn-danger mx-2 mb-2"
                                form=''
                            >Remove</button>
                        </div>
                    </div>
                )
            })}

            <button
                name={fieldName}
                onClick={(e) => onFieldChange(e, 'add')}
                className='btn btn-success my-2'
                form=''
            >
                Add {fieldName}
            </button>
            <br />
        </>
    );
}