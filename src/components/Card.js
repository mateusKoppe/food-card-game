import React from 'react';

function Card (props) {
  const {name, attack, hitPoints, manaCost, onCastCard, isInField} = props

  return <div>
    <table>
      <h3>{name} ({manaCost})</h3>
      <div>
        <b>Atk:</b> {attack}
        <b>HP:</b> {hitPoints}
      </div>
      { !isInField && (
        <div>
          <button onClick={onCastCard}>Cast</button>
        </div>
      )}
    </table>
  </div>
}

export default Card;