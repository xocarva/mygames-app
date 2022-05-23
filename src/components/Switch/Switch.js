import './Switch.css'

const Switch = ({ value, onClick }) => {

  return (

    <div className={ 'switch ' + ( value ? 'on' : 'off' ) } onClick={ onClick } />

  );

}

export default Switch;

