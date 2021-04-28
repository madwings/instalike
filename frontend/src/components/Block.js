import React from 'react';

function Block({ hash, time, height }) {
    const timeISO = new Date();
    timeISO.setTime(time * 1000);

    return (
        <tr>
            <td>{hash}</td>
            <td>{timeISO.toISOString()}</td>
            <td>{height}</td>
        </tr>
    );
}

export default Block;
