export function FormDynamicFields({
    label,
    fields,
    fieldName,
    onFieldChange,
    onFieldRemove,
    onFieldAdd
}) {
    return (
        <>
            <h3>{label}</h3>

            {fields.map((input, index) => {
                return (
                    <div className="row" key={input.id}>
                        <div className="col-md-9">
                            <input
                                name={fieldName}
                                className="form-control"
                                value={input.name}
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