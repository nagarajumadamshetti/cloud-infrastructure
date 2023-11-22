import React, { useState } from 'react';

const NumberConverter = () => {
    const [format, setFormat] = useState('decimal');
    const [value, setValue] = useState('');

    const isValidInput = (value, format) => {
        const regex = {
            octal: /^[0-7]+$/,
            decimal: /^[0-9]+$/,
            binary: /^[01]+$/,
            hexadecimal: /^[0-9a-fA-F]+$/,
        };

        return regex[format].test(value);
    };

    const convertNumber = (value, format) => {
        if (!isValidInput(value, format)) {
            alert('Invalid input for the selected format');
            return {};
        }

        const num = parseInt(value, {
            octal: 8,
            decimal: 10,
            binary: 2,
            hexadecimal: 16
        }[format]);

        return {
            octal: num.toString(8),
            decimal: num.toString(10),
            binary: num.toString(2),
            hexadecimal: num.toString(16).toUpperCase()
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = convertNumber(value, format);
        setValue('');
        setConverted(result);
    }

    const [converted, setConverted] = useState({});

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Format:
                    <select value={format} onChange={e => setFormat(e.target.value)}>
                        <option value="octal">Octal</option>
                        <option value="decimal">Decimal</option>
                        <option value="binary">Binary</option>
                        <option value="hexadecimal">Hexadecimal</option>
                    </select>
                </label>
                <label>
                    Value:
                    <input type="text" value={value} onChange={e => setValue(e.target.value)} />
                </label>
                <button type="submit">Convert</button>
            </form>
            <div>
                {Object.keys(converted).length > 0 && (
                    <>
                        <p>Octal: {converted.octal}</p>
                        <p>Decimal: {converted.decimal}</p>
                        <p>Binary: {converted.binary}</p>
                        <p>Hexadecimal: {converted.hexadecimal}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default NumberConverter;
