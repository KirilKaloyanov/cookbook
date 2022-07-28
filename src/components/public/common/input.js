export function Input({label, name, type = 'text', value, onChange}) {
    return (
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                className='form-control'
                onChange={onChange}
                value={value}
            />
        </div>
    );
}