export function FormDynamicFields({
    path,
    label,
    fields,
    fieldName,
    onFieldChange,
    onFieldRemove,
    onFieldAdd
}) {
    const item = path === 'new' ? 'name' : fieldName;
    return (
        <>
            <h3>{label}</h3>

            {fields.map((field, index) => {
                return (
                    <div className="row" key={field.id}>
                        <div className="col-md-9">
                            <input
                                name={fieldName}
                                className="form-control"
                                value={field[item]}//.name(new) .method(edit)
                                onChange={(e) => onFieldChange(e, index)}
                            />
                        </div>
                        <div className="col-md-3">
                            <button
                                name={fieldName}
                                onClick={(e) => onFieldRemove(e, index)}
                                className="btn btn-primary mx-2 mb-2"
                                form=''
                            >Remove {fieldName}</button>
                        </div>
                    </div>
                )
            })}

            <button
                name={fieldName}
                onClick={onFieldAdd}
                className="btn btn-primary my-2"
                form=''
            >
                Add {fieldName}
            </button>
            <br />
        </>
    );
}