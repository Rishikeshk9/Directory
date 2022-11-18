function Dropdown(props) {
  return (
    <select
      onChange={props.onChange}
      className="select  select-bordered w-full  "
      name={props.name}
    >
      <option selected disabled>
        {props.placeholder}
      </option>
      {props.options?.length > 0
        ? props.options.map((option, key) => {
            return <option key={key}>{option.name}</option>;
          })
        : null}
    </select>
  );
}

export default Dropdown;
