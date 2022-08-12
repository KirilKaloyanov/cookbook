export function Input({label, name, type = 'text', value, onChange, ...rest }) {
    return (
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <input
                {...rest}
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