import PropTypes from "prop-types";
import './currencyInput.css';

function CurrencyInput(props) {
  const { amount, currency, currencies, onAmountChange, onCurrencyChange } = props;

  return (
    <div className="group">
      <input type="text" value={amount} onChange={ev => onAmountChange(ev.target.value)} />
      <select value={currency} onChange={ev => onCurrencyChange(ev.target.value)}>
        {currencies && currencies.map(currency => (
          <option value={currency} key={currency}>{currency}</option>
        ))}
      </select>
    </div>
  );
}

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
};

export default CurrencyInput;
